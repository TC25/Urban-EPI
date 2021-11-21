//Author: TC Chakraborty
//website: https://tc25.github.io/
var urban=ee.FeatureCollection('users/datadrivenlab/cities/cities_2019');
Map.addLayer(urban)

function splitty(feature){
  var code=ee.String(feature.get('nbhd_code'))
  var splitted=code.split("_")
  var city_name=ee.String(splitted.get(0))
  return feature.set({"city":city_name})
}

var urban_split=urban.map(splitty)
print(urban_split.filterMetadata('city','equals','newyork'))

//extract and print unique city names
print(ee.Dictionary(urban_split.aggregate_histogram('city')).keys())


function unitebycity(names)
{ var collection=ee.FeatureCollection(urban_split.filterMetadata('city','equals',names))
  var dissolved=collection.union()
  return ee.Feature(dissolved.first()).set({'city':names})
  
}

var city_names = ee.Dictionary(urban_split.aggregate_histogram('city')).keys()

var city_diss=ee.FeatureCollection(city_names.map(unitebycity))
print(city_diss)
Map.addLayer(city_diss)

Export.table.toAsset({collection:city_diss, description:'Dissolved_by_city', assetId:'cities/cities_2019_diss'})
