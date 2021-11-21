//Author: TC Chakraborty
//website: https://tc25.github.io/
//Location - Replace with the single geometry for all cities.
var SaoPaulo = /* color: #98ff00 */ee.FeatureCollection('users/tirthankar25/montreal');
//Other city files; Amsterdam, Beijing, Berlin, Bangkok, Vancouver, atlanta, barcelona, boston
var GDP=ee.Image('users/tirthankar25/GDP_PPP_Kummu');
var GRUMPS=ee.Image('users/tirthankar25/Pop_2000');
print(GDP)
print(GRUMPS)
 
function Extract_airq(feature){
  //Get mean PM2.5 for each neighborhood
  var GDP_mean=GDP.reduceRegion({reducer:ee.Reducer.mean(), geometry: feature.geometry(), scale: GDP.projection().nominalScale()})
  //Get mean NO2 for each neighborhood
 var POP_mean=GRUMPS.reduceRegion({reducer:ee.Reducer.mean(), geometry: feature.geometry(), scale: GRUMPS.projection().nominalScale()})
 
    return feature.set({"GDP": GDP_mean.get('b1'),/*"GDPPC": ee.Number(GDP_mean.get('b1')).divide(ee.Number(POP_mean.get('b1')))*/})
 
 }
 //Map over the feature ecollection
var Final=SaoPaulo.map(Extract_airq)
print(Final)
Map.addLayer(Final)
//Select relevant properties and exclude geometry from the final csv
var Final=Final.select({propertySelectors: ['ndhb','nbhd_code','GDP',"GDPPC"], retainGeometry: false})


// // Exporting as csvs. 
Export.table.toDrive({collection: Final, description: 'GDP_Manila', folder: 'GDP_Automation_UESI', fileFormat: 'CSV'})
