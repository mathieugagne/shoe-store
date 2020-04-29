# frozen_string_literal: true

require 'pstore'
require 'fileutils'

class ClearDb
  class << self
    def call
      FileUtils.rm_rf(Dir['data/*'])
    end
  end
end
