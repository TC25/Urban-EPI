//Author: TC Chakraborty
//website: https://tc25.github.io/
//var urban=ee.FeatureCollection('users/tirthankar25/urban_Schneider');
//
/*Import shapefiles of neighborhoods*/
var urban=/* color: #98ff00 */ee.FeatureCollection('users/datadrivenlab/cities/cities_2019');
//Other city files; Amsterdam, Beijing, Berlin, Bangkok, Vancouver, atlanta, barcelona, boston
//var urban=urban.select(['nbhd_code']);
//print(urban)
/*Create a new feature with the dissolved urban shapefile (so, no neighborhoods)*/
var urban_diss=urban.union();

/*Import MODIS land use and land cover data for 2013 and select the 1st land cover classification type 
(International Geosphere‑Biosphere Programme classification)*/
//Bands are for particular years (b1=1992 to b24=2015)
var landcover=ee.Image('users/tirthankarchakraborty/GOBLandcover1992_2015').select('b24');
// For data from 2013-2014, use land use for 2014, for 2012-2016, use land use for 2014, for 2011-2016, use landuse for 2013

function featurecreate(feature){

  var all_count=landcover.reduceRegion({geometry: feature.geometry(),  reducer: ee.Reducer.count(),  scale: 300,
});

  var urban_count=landcover.mask(landcover.eq(190)).reduceRegion({geometry: feature.geometry(),  reducer: ee.Reducer.count(),  scale: 300,
});


//return feature.set({'UHIDAY': UHI.get('mean'), 'UHINIGHT': UHINIGHT.get('mean'), 'Urban_LST_Count': LST_count.get('LST_Day_1km_mean'),'Total_Count': all_count.get('b24'),'Urban_Count': urban_count.get('b24')});
return feature.set({'Total_Count': all_count.get('b24'),'Urban_Count': urban_count.get('b24')});

}


var Final_data=urban.map(featurecreate);
var Final_data=Final_data.select({propertySelectors: ['nbhd_code','Urban_count','Total_Count'], retainGeometry: false});
//print(Final_data)
//print(Final_data)
/* Export the feature collection for further analysis*/
Export.table.toDrive({
collection: Final_data,  description: 'UHI_cities_pixels',  fileFormat: 'CSV'
});

//print(urban_diss.geometry().centroid())
