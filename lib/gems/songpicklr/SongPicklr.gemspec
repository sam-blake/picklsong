# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'SongPicklr/version'

Gem::Specification.new do |spec|
  spec.name          = "SongPicklr"
  spec.version       = SongPicklr::VERSION
  spec.authors       = ["ericodes"]
  spec.email         = ["erica.cheung@flatironschool.com"]
  spec.summary       = %q{Searches youtube for karaoke songs.}
  spec.description   = %q{Searches youtube for great karaoke songs.}
  spec.homepage      = ""
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0")
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.require_paths = ["lib"]

  spec.add_development_dependency "bundler", "~> 1.6"
  spec.add_development_dependency "rake"
  spec.add_dependency "rest-client"
end
