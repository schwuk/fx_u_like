require 'nokogiri'

require "fx_u_like/version"

module FxULike

  class ExchangeRate
    # Filename to retrieve rates from by default
    RATES = "rates.xml"

    # Access to +Nokogiri::XML::Document+ for testing
    attr_reader :xml

    # Creates a Nokogiri::XML::Document to retrieve dates, currencies, and
    # rates from.
    #
    # By default, the XML is loaded from the filename in RATES
    #
    # Alternatively, you can pass a string containing XML, or override the
    # filename that contains the XML
    #
    # +xml+ – String containing XML, used for testing
    # +file+ – File containing XML
    def initialize(xml: nil, file: RATES)
      if (not xml) && File.exist?(file)
        File.open(file, 'r') do |f|
          xml = f.read
        end
      end

      @xml = Nokogiri::XML(xml)
    end

    # Returns an +Array+ of the dates available in the current file
    def dates
      return @xml.xpath('//@time').map { |date| date.to_s }
    end
  end
end
