//Author: TC Chakraborty
//website: https://tc25.github.io/
//Location - Replace with the single geometry for all cities.
var city = /* color: #98ff00 */ee.FeatureCollection('users/datadrivenlab/cities/cities_2019');
//Other city files; Amsterdam, Beijing, Berlin, Bangkok, Vancouver, atlanta, barcelona, boston
var PM=ee.Image('users/tirthankar25/PM25_2016_no');
var NO2=ee.Image('users/tirthankar25/NO2_2011');
var GRUMPS=ee.Image('users/tirthankar25/Pop_2000');
print(PM)
print(NO2)
print(GRUMPS)

//Mask PM layer based on World Health Organization’s (WHO) interim I, II, and III targets
var PM_masked1=PM.updateMask(PM.gte(10)).updateMask(PM.lt(15))
var PM_masked2=PM.updateMask(PM.gte(15)).updateMask(PM.lt(25))
var PM_masked3=PM.updateMask(PM.gte(25)).updateMask(PM.lt(35))
var PM_masked4=PM.updateMask(PM.gte(35))
//For exposure fraction above 10
var PM_masked5=PM.updateMask(PM.gte(10))
 
 
//Mask population layer based on different PM thresholds 
var POP_masked1=GRUMPS.updateMask(PM_masked1);
var POP_masked2=GRUMPS.updateMask(PM_masked2);
var POP_masked3=GRUMPS.updateMask(PM_masked3);
var POP_masked4=GRUMPS.updateMask(PM_masked4);
var POP_masked5=GRUMPS.updateMask(PM_masked5);
 
Map.addLayer(PM_masked3)

function Extract_airq(feature){
  //Get mean PM2.5 for each neighborhood
  var PM25_mean=PM.reduceRegion({reducer:ee.Reducer.mean(),maxPixels: 1e9, geometry: feature.geometry(), scale: PM.projection().nominalScale()})
  //Get mean NO2 for each neighborhood
  var NO2_mean=NO2.reduceRegion({reducer:ee.Reducer.mean(),maxPixels: 1e9, geometry: feature.geometry(), scale: NO2.projection().nominalScale()})
  //Get total population for each neighborhood
  var POP_tot=GRUMPS.reduceRegion({reducer:ee.Reducer.sum(),maxPixels: 1e9, geometry: feature.geometry(), scale: GRUMPS.projection().nominalScale()})
  //Get total population exposed to 10 to 15 ug/m3 pm2.5 for each neighborhood
  var POP_exposed1=POP_masked1.reduceRegion({reducer:ee.Reducer.sum(),maxPixels: 1e9, geometry: feature.geometry(), scale: POP_masked1.projection().nominalScale()}).get('b1')
  var POP_exposed2=POP_masked2.reduceRegion({reducer:ee.Reducer.sum(),maxPixels: 1e9, geometry: feature.geometry(), scale: POP_masked2.projection().nominalScale()}).get('b1')
  var POP_exposed3=POP_masked3.reduceRegion({reducer:ee.Reducer.sum(),maxPixels: 1e9, geometry: feature.geometry(), scale: POP_masked3.projection().nominalScale()}).get('b1')
  var POP_exposed4=POP_masked4.reduceRegion({reducer:ee.Reducer.sum(),maxPixels: 1e9, geometry: feature.geometry(), scale: POP_masked4.projection().nominalScale()}).get('b1')
  //Find weighted average PM exceedence
   var POP_exposed5=POP_masked5.reduceRegion({reducer:ee.Reducer.sum(),maxPixels: 1e9, geometry: feature.geometry(), scale: POP_masked4.projection().nominalScale()}).get('b1')
  //Find weighted average PM exceedence
 
  
  var POP_exposed_tot=ee.Number(POP_exposed1).multiply(10).add(ee.Number(POP_exposed2).multiply(15)).add(ee.Number(POP_exposed3).multiply(25)).add(ee.Number(POP_exposed4).multiply(35)).divide(85)
    return feature.set({"PM25": PM25_mean.get('b1'),"NO2": NO2_mean.get('b1'),"PM25EX": POP_exposed_tot.divide(POP_tot.get('b1')).multiply(100),"PM25EX_10": ee.Number(POP_exposed5).divide(POP_tot.get('b1')).multiply(100)})
  
 }
 //Map over the feature ecollection
var Final=city.map(Extract_airq)
print(Final)
Map.addLayer(Final)
//Select relevant properties and exclude geometry from the final csv
var Final=Final.select({propertySelectors: ['nbhd_code','PM25','PM25EX','NO2','PM25EX_10'], retainGeometry: false})


// // Exporting as csvs. 
Export.table.toDrive({collection: Final, description: 'AIR_cities_final', folder: 'PM_Automation_UESI', fileFormat: 'CSV'})
