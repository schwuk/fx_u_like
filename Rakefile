require 'bundler/gem_tasks'
require 'rake/testtask'
require 'rdoc/task'
require 'net/http'

desc 'Run tests'
task :default => :test

RDoc::Task.new do |rdoc|
  rdoc.rdoc_dir = 'doc'
  rdoc.main = 'README.rdoc'
  rdoc.rdoc_files.include('README.rdoc', 'lib/**/*.rb')
end

Rake::TestTask.new do |t|
  t.libs << 'test'
  t.test_files = FileList['test/**/test*.rb']
  t.verbose = true
end

namespace :rates do
  desc 'Update rates from the European Central Bank (ECB) feed'
  task :update do
    require 'uri'

    url = URI('https://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist-90d.xml')

    # Follow redirects
    response = nil
    Net::HTTP.start(url.host, url.port, use_ssl: url.scheme == 'https') do |http|
      loop do
        response = http.request(Net::HTTP::Get.new(url))
        break unless response.is_a?(Net::HTTPRedirection)

        url = URI(response['location'])
        puts "Redirected to #{url}"
      end
    end

    # Write the response body to a file
    if response.is_a?(Net::HTTPSuccess)
      File.open('rates.xml', 'w') { |file| file.write(response.body) }
      puts 'Rates updated successfully.'
    else
      puts "Failed to fetch rates: #{response.code} #{response.message}"
    end
  end
end
