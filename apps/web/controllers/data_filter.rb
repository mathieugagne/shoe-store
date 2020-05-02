# frozen_string_literal: true

module Web
  module Controllers
    module DataFilter
      private

      def select(key, filename)
        store = PStore.new("data/#{filename}.pstore")
        data = store.transaction(true) { store[filename.to_sym] }
        return [] if data.nil?

        data.map do |a|
          a.slice(key).values
        end.flatten
      end
    end
  end
end
