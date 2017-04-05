require 'net/http'

namespace :rates do
  desc "Update rates from the European Central Bank (ECB) feed"
  task :update do
    # http://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist-90d.xml
    Net::HTTP.start("www.ecb.europa.eu") do |http|
      resp = http.get("/stats/eurofxref/eurofxref-hist-90d.xml")
      open("rates.xml", "w") { |file| file.write(resp.body) }
    end
  end
end
