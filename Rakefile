require "bundler/gem_tasks"
require "rake/testtask"
require "net/http"

desc "Run tests"
task :default => :test

Rake::TestTask.new do |t|
  t.libs << "test"
  t.test_files = FileList['test/**/test*.rb']
  t.verbose = true
end

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
