# frozen_string_literal: true

class Api::V1::PartnersController < Api::V1::BaseController
  extend Api::Filterable
  class MissingUserError < ArgumentError; end

  skip_before_action :require_resource_owner, only: %i[create index]
  before_action -> { require_scope(:bpn) }

  can_filter(ecommerce_partner_programs: :filter_ecommerce_partner_programs, email: :filter_user_emails, name: :partial, status: :enum, tapfiliate_partner_programs: :filter_tapfiliate_partner_programs)

  def create
    authorize(Partner)
    render(json: error_json(422, detail: 'Partner name is required', source: { pointer: "/data/attributes/name" }), status: 422) and return if partner_attributes[:name].blank?
    raise MissingUserError unless partner_user
    partnerservice = PartnerService.create_partner(user: partner_user, **partner_attributes)
    partner = partnerservice.partner
    render json: partner, status: :created, location: api_v1_partner_url(id: partner.id), current_user: current_resource_owner
  rescue MissingUserError
    handle_invalid_request(nil, status: 422, pointer: '/data/attributes/user-id', detail: 'Invalid or missing user id.')
  rescue ActiveRecord::RecordNotUnique => exception
    handle_invalid_request(exception, status: 409, pointer: '/data/attributes/name')
  rescue ActiveRecord::RecordInvalid => error
    respond_with_errors(error.record)
  end

  def destroy
    error_404 and return unless partner
    authorize(partner)

    partner&.update_attributes(status: :disabled, deleted_at: Time.now.utc)
    ActionLog.log(type: :disabled, actioned: partner, user: current_resource_owner)
    head(:no_content)
  end

  def index
    authorize(Partner)
    handle_invalid_request(detail: 'Cannot sort by invalid attributes', pointer: 'sort') and return unless sort_valid_for?(Partner)

    results = filter(policy_scope(Partner))
    results = results.order(sort_fields) if sort_fields.any?
    results = results.page(page_number).per(page_size)
    render json: results, fields: field_params, meta: { total: results.total_count }, include: include_param
  end

  def show
    error_404 and return unless partner
    authorize(partner)

    render json: partner, include: include_param
  end

  def update
    error_404 and return unless partner
    authorize(partner)

    respond_with_errors(partner) and return unless partner.update_attributes(update_params)
    ActionLog.log(type: :updated, actioned: partner, user: current_resource_owner)
    if partner.previous_changes.keys.include?('status_cd')
      Hubspot::UpdateContactJob.perform_later(partner.hubspot_contact.id, hs_lead_status: Constants::Hubspot::HS_LEAD_STATUS_FROM_PARTNER_STATUS[partner.status]) if partner.hubspot_contact.present? && %i[disabled rejected].include?(partner.status)
      BpnMailer.partner_status_change(partner_id: partner.id).deliver_later unless partner.pending?
    end
    render json: partner, status: :ok, location: api_v1_partner_url(id: partner.id), current_user: current_resource_owner, include: include_param
  end

  private

    def filter_ecommerce_partner_programs(scope, value)
      scope = scope.joins(:ecommerce_partner_programs).group('partners.id')
      scope = scope.where(ecommerce_partner_programs: { status_cd: EcommercePartnerProgram.statuses[value.to_sym] }) unless ['all', 'true'].include?(value) || EcommercePartnerProgram.statuses[value.to_sym].nil?
      scope
    end

    def filter_tapfiliate_partner_programs(scope, value)
      scope = scope.joins(:tapfiliate_partner_programs).group('partners.id')
      scope = scope.where(tapfiliate_partner_programs: { status_cd: TapfiliatePartnerProgram.statuses[value.to_sym] }) unless ['all', 'true'].include?(value) || TapfiliatePartnerProgram.statuses[value.to_sym].nil?
      scope
    end

    def filter_user_emails(scope, value)
      scope.joins(:users).where("users.email ILIKE ?", "%#{value}%")
    end

    def partner
      @_partner ||= Partner.find_by(id: params[:id])
    end

    def partner_attributes
      partner_params[:attributes].symbolize_keys || {}
    end

    def partner_params
      api_params.permit(
        :type,
        attributes: %i[
          name
          billing-account
          enable-admin-emails
          payment-account
          status
        ],
        relationships: [user: [data: [:id]]]
      ).to_h.deep_transform_keys!(&:underscore)
    end

    def partner_user
      User.find_by(id: partner_params.dig(:relationships, :user, :data, :id)) || current_resource_owner
    end

    def pundit_user
      current_resource_owner || doorkeeper_token.application
    end

    def update_params
      update_fields = api_params.permit(
        :type,
        attributes: policy(partner).update_fields
      ).to_h.deep_transform_keys!(&:underscore)
      update_fields[:attributes] || {}
    end
end
