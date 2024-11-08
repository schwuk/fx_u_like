require "test/unit"

require "nokogiri"

require "fx_u_like"

class TestExchangeRate < Test::Unit::TestCase
  XML = <<-eos
<?xml version="1.0" encoding="UTF-8"?>
<gesmes:Envelope xmlns:gesmes="http://www.gesmes.org/xml/2002-08-01" xmlns="http://www.ecb.int/vocabulary/2002-08-01/eurofxref">
  <gesmes:subject>Reference rates</gesmes:subject>
  <gesmes:Sender>
    <gesmes:name>European Central Bank</gesmes:name>
  </gesmes:Sender>
  <Cube>
    <Cube time="2017-04-05">
      <Cube currency="USD" rate="1.0678"/>
      <Cube currency="GBP" rate="0.8551"/>
      <Cube currency="AUD" rate="1.4085"/>
      <Cube currency="CAD" rate="1.4291"/>
    </Cube>
    <Cube time="2017-04-04">
      <Cube currency="USD" rate="1.0651"/>
      <Cube currency="GBP" rate="0.85623"/>
      <Cube currency="AUD" rate="1.4109"/>
      <Cube currency="CAD" rate="1.432"/>
    </Cube>
  </Cube>
</gesmes:Envelope>
  eos

  def test_new_with_xml
    fx = FxULike::ExchangeRate.new(xml: XML)

    assert(fx.xml.xml?)
    assert_equal(XML, fx.xml.to_xml(:indent => 2, :encoding => 'UTF-8'))
  end

  def test_new_with_file
    filename = 'test_rates.xml'
    File.open(filename, 'w') do |f|
      f.write(XML)
    end
    fx = FxULike::ExchangeRate.new(file: filename)

    assert(fx.xml.xml?)
    assert_equal(XML, fx.xml.to_xml(:indent => 2, :encoding => 'UTF-8'))

    File.delete(filename)
  end

  def test_new_with_mssing_file
    fx = FxULike::ExchangeRate.new(file: 'this_file_does_not_exist.xml')

    assert(fx.xml.xml?)
    assert_equal("", fx.xml.content)
  end

  def test_new
    fx = FxULike::ExchangeRate.new
    assert(fx.xml.xml?)
  end

  def test_dates
    expected = ['2017-04-05', '2017-04-04']
    fx = FxULike::ExchangeRate.new(xml: XML)

    assert_respond_to(fx, 'dates')
    assert_equal(expected, fx.dates)
  end

  def test_dates_with_empty_xml
    expected = []
    fx = FxULike::ExchangeRate.new(xml: "")

    assert_equal(expected, fx.dates)
  end

  def test_currencies
    expected = ['EUR', 'USD', 'GBP', 'AUD', 'CAD']
    fx = FxULike::ExchangeRate.new(xml: XML)

    assert_respond_to(fx, 'currencies')
    assert_equal(expected, fx.currencies)
  end

  def test_currencies_with_empty_xml
    expected = []
    fx = FxULike::ExchangeRate.new(xml: "")

    assert_equal(expected, fx.currencies)
  end

  def test_at
    fx = FxULike::ExchangeRate.new(xml: XML)

    assert_respond_to(fx, 'at')
    # For reference: on 2017-04-06, 1.00USD == 0.8019376540GBP
    # http://www.xe.com/currencytables/?from=USD&date=2017-04-06
    expected = 0.8008053942685895 # (1.0/1.0678)*0.8551

    assert_equal(expected, fx.at('2017-04-05', 'USD', 'GBP'))
  end

  def test_at_invalid_date
    fx = FxULike::ExchangeRate.new(xml: XML)
    assert_raise FxULike::DateError do
      fx.at('1970-01-01', 'FOO', 'BAR')
    end
  end

  def test_at_invalid_from_currency
    fx = FxULike::ExchangeRate.new(xml: XML)
    assert_raise FxULike::CurrencyError do
      fx.at('2017-04-05', 'FOO', 'EUR')
    end
  end

  def test_at_invalid_to_currency
    fx = FxULike::ExchangeRate.new(xml: XML)
    assert_raise FxULike::CurrencyError do
      fx.at('2017-04-05', 'EUR', 'BAR')
    end
  end

  def test_at_euros
    fx = FxULike::ExchangeRate.new(xml: XML)

    assert_respond_to(fx, 'at')
    expected = 1.0 # (1.0/1.0)*1.0

    assert_equal(expected, fx.at('2017-04-05', 'EUR', 'EUR'))
  end
end
