//Author: TC Chakraborty
//website: https://tc25.github.io/
var city=ee.FeatureCollection('users/datadrivenlab/cities/cities_2019');
//Map.addLayer(city)
//Split by city name and add name as column
function splitty(feature){
  var code=ee.String(feature.get('nbhd_code'))
  var splitted=code.split("_")
  var city_name=ee.String(splitted.get(0))
  return feature.set({"city":city_name})
}

var city=city.map(splitty)

//extract and print unique city names
print(ee.Dictionary(city.aggregate_histogram('city')).keys())


//Choose each city individually
var city=city.filterMetadata('city','equals','yangon')



//Get dissolved city boundary
var city_diss=city.union()



var Bus=ee.FeatureCollection('users/datadrivenlab/Bus_stop').filterBounds(city_diss)
var Railway=ee.FeatureCollection('users/datadrivenlab/Railway_platform').filterBounds(city_diss)
var Station=ee.FeatureCollection('users/datadrivenlab/Railway_station').filterBounds(city_diss)
var Subway=ee.FeatureCollection('users/datadrivenlab/Subway_entrance').filterBounds(city_diss)
var Trams=ee.FeatureCollection('users/datadrivenlab/Tram_stop').filterBounds(city_diss)
var GRUMPS=ee.Image('users/tirthankar25/Pop_2000');
var landcover=ee.Image('users/tirthankarchakraborty/GOBLandcover1992_2015').select('b24');


//print(Trams.size())

//Merge all railway subsets into one feature collection
var Rail=Railway.merge(Station).merge(Subway).merge(Trams)
print(Rail.size())
//Function to create buffered collections (separate for buses and trains)
function bus_buff(feature){
  return feature.buffer(420)
}

function rail_buff(feature)
{
  return feature.buffer(1200)
}


//Remap data make binary distinction between urban and non urban pixels
var landcover_remapped=landcover.remap([0, 10,11,12,20,30,40,50,60,61, 62, 70, 71, 72, 80,81, 82, 90, 100, 110,120,121,122,130, 140, 150, 151, 152, 153, 160, 170, 180, 200, 201,202, 210, 220, 190],
           [0, 0,0,0,0,0,0,0,0,0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0,0,0,0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 1])

Map.addLayer(landcover_remapped)

//Map.addLayer(Rail_buffed)






//var Rail_clipped=Rail_buffed.union().filterBounds(city.limit(100))
//Map.addLayer(Rail_clipped)
//Extract data
function Extract_ptc(feature){
  //Merge bus and rail stopes
  //var Merged=Bus.filterBounds(feature.geometry()).merge(Rail.filterBounds(feature.geometry()))
  var Merged=Bus.merge(Rail)
  //Create 100 random points per neighborhood; decrease it to make the processing time reasonable
  var Rand=ee.FeatureCollection.randomPoints({region:feature.geometry(), points:100})
  
  
  //Function to get minimum distance between points and set of transit stops
function dist_min(rando){
  //Call function to create lines between each random point and transit stop
  var line=Merged.map(linecreate)
  function linecreate(trando){
    //var transitcoords = ee.Geometry.Point(trando.lon, trando.lat)
    //var randcoords = ee.Geometry.Point(rando.lon, rando.lat)
    var Lines=ee.Geometry.LineString({coords:[trando.geometry(),rando.geometry()], geodesic : true});
    return trando.set({'Length':Lines.length()})
    
  }
  var mini=line.aggregate_min('Length')
  return rando.set({'Mindis':mini})

  
}
  
  
  var MinDist=Rand.map(dist_min)
  var MeanDist=MinDist.aggregate_mean('Mindis')
  
  //Find bus and train stops within neighborhood
  var Bus_buffed=Bus.map(bus_buff)
  var Rail_buffed=Rail.map(rail_buff)
   //Get total population for each neighborhood
  var POP_tot=GRUMPS.reduceRegion({reducer:ee.Reducer.sum(),maxPixels: 1e9, geometry: feature.geometry(), scale: GRUMPS.projection().nominalScale()})
 //Get area of urban part of each neighborhood
 var landcover_reduced=landcover_remapped.mask(landcover_remapped.gte(1)).multiply(ee.Image.pixelArea()).reduceRegion({reducer:ee.Reducer.sum(), geometry: feature.geometry(), scale: landcover.projection().nominalScale()})
  
 
  //Merge all buffed
var Buffed=Bus_buffed.merge(Rail_buffed)
//Take union of all areas
var Buffed_united=Buffed.union()
//Intersect geometries to get the buffed region within each neighborhood
var Intert=feature.geometry().intersection(Buffed_united.geometry())
var Areaofintert=Intert.area()

//Get area of intersection divided by total area of neighborhood
  var PTC=ee.Number(Areaofintert).divide(ee.Number(feature.geometry().area()))
  
  //Get area of urban part of neighborhood divided by total population in neighborhood
  var Density= ee.Number(landcover_reduced.get('remapped')).divide(POP_tot.get('b1'))
    return feature.set({"TRANSCOV": PTC, "WGT":Density, "PUBTRANS": MeanDist})
  
 }
 //Map over the feature ecollection
var Final=city.map(Extract_ptc)
print(Final)
Map.addLayer(Final)
//Select relevant properties and exclude geometry from the final csv
var Final=Final.select({propertySelectors: ['nbhd_code','TRANSCOV', 'WGT','PUBTRANS'], retainGeometry: false})


// // Exporting as csvs. 
Export.table.toDrive({collection: Final, description: 'Trans_cities_Yangon', folder: 'Trans_Automation_UESI', fileFormat: 'CSV'})
