require 'json'
require 'sinatra'

require 'fx_u_like'

get '/' do
  erb :index
end

get '/currencies' do
  headers 'content-type' => 'application/json'
  fx = FxULike::ExchangeRate.new
  fx.currencies.to_json
end

get '/dates' do
  headers 'content-type' => 'application/json'
  fx = FxULike::ExchangeRate.new
  fx.dates.to_json
end

get '/rate/:date/:from/:to' do
  headers 'content-type' => 'application/json'
  fx = FxULike::ExchangeRate.new
  begin
    fx.at(params['date'], params['from'], params['to']).to_json
  rescue
    1.0.to_json
  end
end
