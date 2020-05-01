# frozen_string_literal: true

module Web
  module Views
    module Dashboard
      class Index
        include Web::View

        def ordered(data)
          data.sort_by { |_key, value| value }.reverse
        end
      end
    end
  end
end
