# frozen_string_literal: true

module Web
  module Views
    module Dashboard
      class Index
        include Web::View

        def formate_label(key)
          key.split('_').map(&:capitalize).join(' ')
        end

        def formate_value(settings, key)
          value = settings[key].last
          value == '' ? '-' : value
        end
      end
    end
  end
end
