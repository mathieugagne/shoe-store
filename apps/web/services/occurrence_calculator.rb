# frozen_string_literal: true

class OccurrenceCalculator
  class << self
    def call(data: data)
      ordered_occurence(data)
    end

    private

    def ordered_occurence(data)
      compute_occurence(data).sort_by { |_key, value| value }.reverse
    end

    def compute_occurence(data)
      data.each_with_object(Hash.new(0)) do |e, total|
        total[e] += 1
      end
    end
  end
end
