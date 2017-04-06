require 'nokogiri'

require "fx_u_like/version"

module FxULike
  class Error < StandardError
  end

  class DateError < Error
    def initialize(msg="Invalid date")
      super
    end
  end

  class CurrencyError < Error
    def initialize(msg="Invalid currency")
      super
    end
  end

  class ExchangeRate
    # Filename to retrieve rates from by default.
    RATES = "rates.xml"

    # Access to +Nokogiri::XML::Document+ for testing.
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

    # For the given +date+, returns the exchange rate between the +from+ and
    # +to+ currencies.
    #
    # If we do not hold currency information for the date, a +DateError+ is
    # raised.
    #
    # If we do not recognise a currency, a +CurrencyError+ is raised.
    def at(date, from, to)
      if not dates.include? date
        raise DateError
      end

      if not [from, to].all? { |c| currencies.include? c }
        raise CurrencyError
      end

      euro_rate = 1.0
      from_rate = from == 'EUR' ? euro_rate : get_rate(date, from)
      to_rate = to == 'EUR' ? euro_rate : get_rate(date, to)

      # The +from_rate+ and +to_rate+ are based on Euros. This calculates the
      # rate between the given currencies.
      return (euro_rate/from_rate)*to_rate
    end

    # Returns an +Array+ of the dates available in the current file.
    def dates
      return get_strings('//@time')
    end

    # Returns an +Array+ of currencies (plus 'EUR') from the most recent date
    # in the current file.
    def currencies
      begin
        xpath = '//xmlns:Cube[1]/xmlns:Cube/@currency'
        return get_strings(xpath).unshift('EUR')
      rescue Nokogiri::XML::XPath::SyntaxError
        return []
      end
    end

    private
      # Returns an array of strings from the nodes that match the XPath
      # expression.
      def get_strings(xpath)
        return @xml.xpath(xpath).map { |n| n.to_s }
      end

      # Returns the +FLoat+ Euro to +currency+ rate for a given +date+.
      def get_rate(date, currency)
        xpath = "//*[@time='#{date}']/*[@currency='#{currency}']/@rate"
        return @xml.xpath(xpath).to_s.to_f
      end
  end
end
