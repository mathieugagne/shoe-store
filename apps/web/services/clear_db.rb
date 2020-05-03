# frozen_string_literal: true

require 'fileutils'

class ClearDb
  class << self
    def call
      FileUtils.rm_rf(Dir['data/data.pstore'])
    end
  end
end
