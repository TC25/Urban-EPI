//Author: TC Chakraborty
//website: https://tc25.github.io/
//Location - Replace with the single geometry for all cities.
var city = /* color: #98ff00 */ee.FeatureCollection('users/datadrivenlab/cities/cities_2019');
//Other city files; Amsterdam, Beijing, Berlin, Bangkok, Vancouver, atlanta, barcelona, boston

//Function to map feature collection over
var addArea = function(feature) {
  return feature.set({area: feature.geometry().area()});
};

// Map the area getting function over the FeatureCollection.
var Final = city.map(addArea);

print('First feature: ', Final.first());

//Select relevant properties and exclude geometry from the final csv
var Final=Final.select({propertySelectors: ['nbhd_code','area'], retainGeometry: false})


// Extracting as csvs. 
Export.table.toDrive({collection: Final, description: 'area_cities', fileFormat: 'CSV'})
