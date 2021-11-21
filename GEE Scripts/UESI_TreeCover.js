//Author: TC Chakraborty
//website: https://tc25.github.io/
//Location - Replace with the single geometry for all cities.
var SaoPaulo = /* color: #98ff00 */ee.FeatureCollection('users/tirthankar25/SaoPaulo');
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


print(TCL_remapped)

//Function to map feature collection over
function Extract_tree(feature){
  //Get mean tree cover
  var TCB_mean=TCB.reduceRegion({reducer:ee.Reducer.mean(), geometry: feature.geometry(), scale: Hansen.projection().nominalScale()})
 //Get area of tree cover
  var TCB_reduced=TCB.mask(TCB.gte(1)).multiply(ee.Image.pixelArea()).reduceRegion({reducer:ee.Reducer.sum(), geometry: feature.geometry(), scale: Hansen.projection().nominalScale()})
  //Get area with losses
  var TCL_reduced=TCL_remapped.mask(TCL_remapped.gte(1)).multiply(ee.Image.pixelArea()).reduceRegion({reducer:ee.Reducer.sum(), geometry: feature.geometry(), scale: Hansen.projection().nominalScale()})
  //Get area of gain
  var TCG_reduced=TCG.mask(TCG.gte(1)).multiply(ee.Image.pixelArea()).reduceRegion({reducer:ee.Reducer.sum(), geometry: feature.geometry(), scale: Hansen.projection().nominalScale()})
  //Get the year for which maximum loss occured
  var TCL_mode=TCL.mask(TCL.gte(1)).reduceRegion({reducer:ee.Reducer.mode(), geometry: feature.geometry(), scale: Hansen.projection().nominalScale()})
 //Return each feature with added properties
 return feature.set({"TREECOV": TCB_mean.get('treecover2000'),"TREECOVAREA": TCB_reduced.get('treecover2000'),
 "TREELOSS": ee.Number(TCL_reduced.get('remapped')), "TREEGAIN":ee.Number(TCG_reduced.get('gain')),
 "TREECHANGE":ee.Number(TCB_reduced.get('treecover2000')).subtract(ee.Number(TCL_reduced.get('remapped'))).add(ee.Number(TCG_reduced.get('gain'))),
   "TREELOSSMODE": TCL_mode.get('lossyear')
 })
  
}
//Map over function
var Final=SaoPaulo.map(Extract_tree)
print(Final)

//Select relevant properties and exclude geometry from the final csv
var Final=Final.select({propertySelectors: ['ndhb','nbhd_code','TREECOV','TREECOVAREA','TREELOSS','TREECHANGE','TREELOSSMODE'], retainGeometry: false})


// Extracting as csvs. 
Export.table.toDrive({collection: Final, description: 'TREE_SaoPaulo', fileFormat: 'CSV'})
