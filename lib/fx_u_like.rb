require 'nokogiri'

require "fx_u_like/version"

module FxULike

  class ExchangeRate
    RATES = "rates.xml"

    attr_reader :xml

    def initialize(xml: nil, file: RATES)
      if (not xml) && File.exist?(file)
        File.open(file, 'r') do |f|
          xml = f.read
        end
      end

      @xml = Nokogiri::XML(xml)
    end
  end
end
