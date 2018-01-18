#!/usr/bin/ruby

require 'breasal'
require 'csv'
require 'json'

postcodes = {}

CSV.foreach(ARGV[0], headers: true) do |line|
	wgs84 = Breasal::EastingNorthing.new(easting: line["EASTING"].to_f, northing: line["NORTHING"].to_f).to_wgs84
	pc = line["POST CODE"].tr(' ', '') # remove spaces
	postcodes[pc] = wgs84.values_at(:latitude, :longitude).map {|f| f.round(4)}
end

puts postcodes.to_json


