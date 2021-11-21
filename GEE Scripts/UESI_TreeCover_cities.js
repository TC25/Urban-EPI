//Author: TC Chakraborty
//website: https://tc25.github.io/
//Location - Replace with the single geometry for all cities.
var city = /* color: #98ff00 */ee.FeatureCollection('users/datadrivenlab/cities/cities_2019');
//Other city files; Amsterdam, Beijing, Berlin, Bangkok, Vancouver, atlanta, barcelona, boston
var Hansen=ee.Image('UMD/hansen/global_forest_change_2016_v1_4');

print(Hansen)
 //Select corresponding bands of image
var TCB=Hansen.select('treecover2000')
var TCL=Hansen.select('lossyear')
var TCG=Hansen.select('gain')
//Remap data make binary distinction between loss (regardless of year) and no loss
var TCL_remapped=TCL.remap([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
           [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1])
//Remap data make binary distinction between canopy (1-100) to no-canopy (0)
var TCB_remapped=TCB.remap([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100],
           [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1])

print(TCL_remapped)

//Function to map feature collection over
function Extract_tree(feature){
  //Get mean tree cover
  var TCB_mean=TCB.reduceRegion({reducer:ee.Reducer.mean(), geometry: feature.geometry(),maxPixels: 1e9, scale: Hansen.projection().nominalScale()})
 //Get area of tree cover
  var TCB_reduced=TCB_remapped.mask(TCB_remapped.gte(1)).multiply(ee.Image.pixelArea()).reduceRegion({reducer:ee.Reducer.sum(), geometry: feature.geometry(),maxPixels: 1e9, scale: Hansen.projection().nominalScale()})
  //Get area with losses
  var TCL_reduced=TCL_remapped.mask(TCL_remapped.gte(1)).multiply(ee.Image.pixelArea()).reduceRegion({reducer:ee.Reducer.sum(), geometry: feature.geometry(),maxPixels: 1e9, scale: Hansen.projection().nominalScale()})
  //Get area of gain
  var TCG_reduced=TCG.mask(TCG.gte(1)).multiply(ee.Image.pixelArea()).reduceRegion({reducer:ee.Reducer.sum(), geometry: feature.geometry(),maxPixels: 1e9, scale: Hansen.projection().nominalScale()})
  //Get the year for which maximum loss occured
  var TCL_mode=TCL.mask(TCL.gte(1)).reduceRegion({reducer:ee.Reducer.mode(), geometry: feature.geometry(),maxPixels: 1e9, scale: Hansen.projection().nominalScale()})
 //Return each feature with added properties
 return feature.set({
    "TREECAN": TCB_mean.get('treecover2000'),
    "TREEBASE": ee.Number(TCB_reduced.get('remapped')),
    "TREELOSS": ee.Number(TCL_reduced.get('remapped')), 
    "TREEGAIN":ee.Number(TCG_reduced.get('gain')),
    "TREECOV":ee.Number(TCB_reduced.get('remapped')).subtract(ee.Number(TCL_reduced.get('remapped'))).add(ee.Number(TCG_reduced.get('gain'))),
    "TREELOSSMODE": TCL_mode.get('lossyear')
 })
  
}
//Map over function
var Final=city.map(Extract_tree)
//print(Final)

//Select relevant properties and exclude geometry from the final csv
var Final=Final.select({propertySelectors: ['nbhd_code','TREECAN','TREEBASE','TREELOSS','TREEGAIN','TREECOV','TREELOSSMODE'], retainGeometry: false})


// Extracting as csvs. 
Export.table.toDrive({collection: Final, description: 'TREE_cities', fileFormat: 'CSV'})
