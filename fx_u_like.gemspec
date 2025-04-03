# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'fx_u_like/version'

Gem::Specification.new do |spec|
  spec.name          = "fx_u_like"
  spec.version       = FxULike::VERSION
  spec.authors       = ["David Murphy"]
  spec.email         = ["dave@schwuk.com"]

  spec.summary       = "Foreign Exchange (FX) Rates and Converter."
  spec.homepage      = "https://github.com/schwuk/fx_u_like"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").reject do |f|
    f.match(%r{^(test|spec|features)/})
  end
  spec.bindir        = "exe"
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ["lib"]

  spec.add_development_dependency "bundler", "~> 2.6"
  spec.add_development_dependency "rake", "~> 13.2"
  spec.add_development_dependency "test-unit", "~> 3.6"

  spec.add_runtime_dependency "nokogiri", "~> 1.18"
  spec.add_runtime_dependency "sinatra", "~> 4.1"
end
