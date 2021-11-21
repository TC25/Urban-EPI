//Author: TC Chakraborty
//website: https://tc25.github.io/ 
//var urban=ee.FeatureCollection('users/tirthankar25/urban_Schneider');

/*Import shapefiles of neighborhoods*/
var urban=/* color: #98ff00 */ee.FeatureCollection('users/datadrivenlab/cities/cities_2019');

/*Create a new feature with the dissolved urban shapefile (so, no neighborhoods)*/
var urban_diss=ee.FeatureCollection('users/datadrivenlab/cities/cities_2019_diss');

print(ee.List(urban_diss.aggregate_array('city')))

//LST images
var LST_Day_AQUA_mean=ee.Image('users/tirthankar25/LST_Day_AQUA_mean_2016_vfF')

//var LST_Day_AQUA_mean=ee.ImageCollection([ee.Image('users/tirthankar25/LST_Day_AQUA_mean_2013_vfF'),ee.Image('users/tirthankar25/LST_Day_AQUA_mean_2014_vfF')]).mean()

//var LST_Day_AQUA_mean=ee.ImageCollection([ee.Image('users/tirthankar25/LST_Day_AQUA_mean_2012_vfF'),ee.Image('users/tirthankar25/LST_Day_AQUA_mean_2013_vfF'),ee.Image('users/tirthankar25/LST_Day_AQUA_mean_2014_vfF'),ee.Image('users/tirthankar25/LST_Day_AQUA_mean_2015_vfF'),ee.Image('users/tirthankar25/LST_Day_AQUA_mean_2016_vfF')]).mean()

//var LST_Day_AQUA_mean=ee.ImageCollection([ee.Image('users/tirthankar25/LST_Day_AQUA_mean_2011_vfF'),ee.Image('users/tirthankar25/LST_Day_AQUA_mean_2012_vfF'),ee.Image('users/tirthankar25/LST_Day_AQUA_mean_2013_vfF'),ee.Image('users/tirthankar25/LST_Day_AQUA_mean_2014_vfF'),ee.Image('users/tirthankar25/LST_Day_AQUA_mean_2015_vfF'),ee.Image('users/tirthankar25/LST_Day_AQUA_mean_2016_vfF')]).mean()


//print(LST_Day_AQUA_mean)
var LST_Night_AQUA_mean=ee.Image('users/tirthankar25/LST_Night_AQUA_mean_2016_vfF')


//var LST_Night_AQUA_mean=ee.ImageCollection([ee.Image('users/tirthankar25/LST_Night_AQUA_mean_2013_vfF'),ee.Image('users/tirthankar25/LST_Night_AQUA_mean_2014_vfF')]).mean()

//var LST_Night_AQUA_mean=ee.ImageCollection([ee.Image('users/tirthankar25/LST_Night_AQUA_mean_2012_vfF'),ee.Image('users/tirthankar25/LST_Night_AQUA_mean_2013_vfF'),ee.Image('users/tirthankar25/LST_Night_AQUA_mean_2014_vfF'),ee.Image('users/tirthankar25/LST_Night_AQUA_mean_2015_vfF'),ee.Image('users/tirthankar25/LST_Night_AQUA_mean_2016_vfF')]).mean()

//var LST_Night_AQUA_mean=ee.ImageCollection([ee.Image('users/tirthankar25/LST_Night_AQUA_mean_2012_vfF'),ee.Image('users/tirthankar25/LST_Night_AQUA_mean_2012_vfF'),ee.Image('users/tirthankar25/LST_Night_AQUA_mean_2013_vfF'),ee.Image('users/tirthankar25/LST_Night_AQUA_mean_2014_vfF'),ee.Image('users/tirthankar25/LST_Night_AQUA_mean_2015_vfF'),ee.Image('users/tirthankar25/LST_Night_AQUA_mean_2016_vfF')]).mean()

//Import MODIS images and filter to time period of interest
var MODIS_Bands=ee.ImageCollection('MODIS/006/MYD09A1').filterDate('2010-01-01', '2010-12-31')
print(MODIS_Bands)
//Map.addLayer(LST_Day_AQUA_mean)
//For NDVI, EVI
//var Monthfilter=ee.Filter.dayOfYear(122,152)
var VI = ee.ImageCollection("MODIS/006/MYD13Q1").filterDate('2010-01-01', '2010-12-31')//.filter(Monthfilter);
var Alb = ee.ImageCollection("MODIS/006/MCD43A3").filterDate('2010-01-01', '2010-12-31')//.filter(Monthfilter);

/*Import MODIS land use and land cover data for 2013 and select the 1st land cover classification type 
(International Geosphere‑Biosphere Programme classification)*/
//Bands are for particular years (b1=1992 to b24=2015)
var landcover=ee.Image('users/tirthankarchakraborty/GOBLandcover1992_2015').select('b24');
// For data from 2013-2014, use land use for 2014, for 2012-2016, use land use for 2014, for 2011-2016, use landuse for 2013

var PM=ee.Image('users/tirthankar25/PM25_2010_no');
//var PM=ee.ImageCollection([ee.Image('users/tirthankar25/PM25_2013_no'),ee.Image('users/tirthankar25/PM25_2014_no')]).mean()

//var PM=ee.ImageCollection([ee.Image('users/tirthankar25/PM25_2012_no'),ee.Image('users/tirthankar25/PM25_2013_no'),ee.Image('users/tirthankar25/PM25_2014_no'),ee.Image('users/tirthankar25/PM25_2015_no'),ee.Image('users/tirthankar25/PM25_2016_no')]).mean()

//var PM=ee.ImageCollection([ee.Image('users/tirthankar25/PM25_2011_no'),ee.Image('users/tirthankar25/PM25_2012_no'),ee.Image('users/tirthankar25/PM25_2013_no'),ee.Image('users/tirthankar25/PM25_2014_no'),ee.Image('users/tirthankar25/PM25_2015_no'),ee.Image('users/tirthankar25/PM25_2016_no')]).mean()


//Map.addLayer(Alb.select('BRDF_Albedo_Band_Mandatory_Quality_shortwave').mean());
//print(Alb.limit(5))
//    MODLST = ee.ImageCollection("MODIS/006/MOD11A2"),
 //   MYDLST = ee.ImageCollection("MODIS/006/MYD11A2"),
 //   ET = ee.ImageCollection("MODIS/006/MOD16A2"),
//    GPP = ee.ImageCollection("MODIS/006/MOD17A2H"),
//    LandCover = ee.ImageCollection("MODIS/051/MCD12Q1"),
//    Snow = ee.ImageCollection("MODIS/006/MOD10A1"),
 //   AVHRR_LAI = ee.ImageCollection("NOAA/CDR/AVHRR/LAI_FAPAR/V4"),
 //   MODIS_LAI = ee.ImageCollection("MODIS/006/MCD15A3H"),
   // point = /* color: #98ff00 */ee.Geometry.Point([100.4494, 38.9311]);

// Data Analysis
//Map.setCenter(100.4494, 38.9311, 10);
//var SA = ee.Geometry.Polygon(100.165,38.700, 100.8450,38.700, 100.8450,39.0655, 100.165,39.0655)
//.aside(Map.addLayer)
//;

var getQABits = function(image, start, end, newName) {
    // Compute the bits we need to extract.
    var pattern = 0;
    for (var i = start; i <= end; i++) {
       pattern += Math.pow(2, i);
    }
    // Return a single band image of the extracted QA bits, giving the band
    // a new name.
    return image.select([0], [newName])
                  .bitwiseAnd(pattern)
                  .rightShift(start);
};

//For albedo, less than equal to 0= good quality, less than equal to 1= all quality
var qualityControlWSAlb = function(image){
  var mask = image.select('BRDF_Albedo_Band_Mandatory_Quality_shortwave').lte(0);
  var Final = image.select('Albedo_WSA_shortwave').mask(mask);
  return Final.multiply(.001);
  // var valid_pixels = ee.Image(0).where(mandatory.eq(0).and(quality.eq(0)).and(error.eq(0,1,2)),1);
  // image = image.mask(valid_pixels);
  // image.mask(image);
  // return image;
};


var qualityControlBSAlb = function(image){
  var mask = image.select('BRDF_Albedo_Band_Mandatory_Quality_shortwave').lte(0);
  var Final = image.select('Albedo_BSA_shortwave').mask(mask);
  return Final.multiply(.001);
  // var valid_pixels = ee.Image(0).where(mandatory.eq(0).and(quality.eq(0)).and(error.eq(0,1,2)),1);
  // image = image.mask(valid_pixels);
  // image.mask(image);
  // return image;
};


var qualityControlEVI = function(image){
  var mandatory  = getQABits(image.select('DetailedQA'),0,1,'mandatory');
  // var usefulness  = getQABits(image.select('DetailedQA'),2,5,'usefulness');
  // var BRDF_correction  = getQABits(image.select('DetailedQA'),9,9,'BRDF_correction');
  // var water_mask  = getQABits(image.select('DetailedQA'),11,13,'water_mask');
  // var cloud_mask_1= getQABits(image.select('DetailedQA'),8,8,'cloud_mask_1');
  // var cloud_mask_2= getQABits(image.select('DetailedQA'),10,10,'cloud_mask_1');
  // var mask = mandatory.lte(1).and(usefulness.lte(1).and(water_mask.eq(1).and(cloud_mask_1.eq(0).and(cloud_mask_2.eq(0)))));
  var mask=mandatory.eq(0);
  var Final = image.select('EVI').mask(mask);
  return Final.multiply(.0001);
  // var valid_pixels = ee.Image(0).where(mandatory.eq(0).and(quality.eq(0)).and(error.eq(0,1,2)),1);
  // image = image.mask(valid_pixels);
  // image.mask(image);
  // return image;
};

var qualityControlNDVI = function(image){
  var mandatory  = getQABits(image.select('DetailedQA'),0,1,'mandatory');
  // var usefulness  = getQABits(image.select('DetailedQA'),2,5,'usefulness');
  // var BRDF_correction  = getQABits(image.select('DetailedQA'),9,9,'BRDF_correction');
  // var water_mask  = getQABits(image.select('DetailedQA'),11,13,'water_mask');
  // var cloud_mask_1= getQABits(image.select('DetailedQA'),8,8,'cloud_mask_1');
  // var cloud_mask_2= getQABits(image.select('DetailedQA'),10,10,'cloud_mask_1');
  //var mask = mandatory.lte(1).and(usefulness.lte(1).and(water_mask.eq(1).and(cloud_mask_1.eq(0).and(cloud_mask_2.eq(0)))));
  var mask=mandatory.eq(0);
  var Final = image.select('NDVI').mask(mask);
  return Final.multiply(.0001);
  // var valid_pixels = ee.Image(0).where(mandatory.eq(0).and(quality.eq(0)).and(error.eq(0,1,2)),1);
  // image = image.mask(valid_pixels);
  // image.mask(image);
  // return image;
};

var qualityControlMODIS = function(image){
  var mandatory6  = getQABits(image.select('QA'),22,25,'mandatory');
  var mask6 = mandatory6.eq(0);
    var mandatory1  = getQABits(image.select('QA'),2,5,'mandatory');
  var mask1 = mandatory1.eq(0);
    var mandatory2  = getQABits(image.select('QA'),6,9,'mandatory');
  var mask2 = mandatory2.eq(0);
  var Band6 = image.select('sur_refl_b06').mask(mask6).multiply(.0001);
  var Band2 = image.select('sur_refl_b02').mask(mask2).multiply(.0001);
  var Band1 = image.select('sur_refl_b01').mask(mask1).multiply(.0001);
  
  return Band6.addBands(Band2).addBands(Band1)
  // var valid_pixels = ee.Image(0).where(mandatory.eq(0).and(quality.eq(0)).and(error.eq(0,1,2)),1);
  // image = image.mask(valid_pixels);
  // image.mask(image);
  // return image;
};


//var Scaling=function(image){
//  return image.multiply(.0001)
//}
 var MOD=MODIS_Bands.map(qualityControlMODIS).mean();
//print(MOD)
//var NDVI = VI.map(qualityControlNDVI).mean();
//var EVI = VI.map(qualityControlEVI).mean();
var BSA = Alb.map(qualityControlBSAlb).mean();
var WSA = Alb.map(qualityControlWSAlb).mean();
var NDBI = MOD.normalizedDifference(['sur_refl_b06', 'sur_refl_b02']);
var NDVI = MOD.normalizedDifference(['sur_refl_b02', 'sur_refl_b01']);

//Map.addLayer(NDBI.clip(urban),{min: -.5, max: 0},'NDBI')

//Map.addLayer(NDVI.clip(urban),{min: 0, max: 1},"NDVI")

//Map.addLayer(BSA.clip(urban),{min: 0, max: 1},"BSA")

/*Create reducer to find mean and standard deviation*/
var reducers = ee.Reducer.mean().combine({
  reducer2: ee.Reducer.stdDev(),
  sharedInputs: true
});

 
//print(urban)
//Map.addLayer(urban)


/*World Geometry to export data, if required*/
var World=ee.Geometry.Rectangle(-180, -90, 180, 90);
var World=ee.Geometry(World, null, false);



/*Only keep values of land use and land cover within the predefined urban boundaries*/
var urban_raster=landcover.clip(urban);

/*select all image pixels which are not water to get the actual LST within the urban boundaries*/
var urbanurban=urban_raster.neq(210);


var DEM=(ee.Image('USGS/GMTED2010'));
var DEM_urban=DEM.updateMask(urbanurban);
//print(DEM)
/*Function to calculate area of each urban boundary*/
var Ar = function(feature) { 
  var Ar= ee.Number(DEM_urban.reduceRegion({reducer:ee.Reducer.median(), geometry: feature.geometry(), scale: 30, maxPixels: 10000000000000}).get('be75'))
  return feature.set({'City_DEM': Ar});
};




Map.addLayer(urban_diss)
//print(urban_diss)

/*Apply function to find area of each urban boundary*/
var urban_diss=urban_diss.map(Ar);
//print((urban).limit(200))

var DEM_urban_median=urban_diss.filter(ee.Filter.neq('City_DEM', null)).reduceToImage({properties: ['City_DEM'], reducer: ee.Reducer.first()});

//Map.addLayer(DEM_urban_median,{},'urban DEM')

var DEM_diff=(DEM.subtract(DEM_urban_median)).abs()

//Map.addLayer(DEM_diff,{},'DEM difference');
//Map.addLayer(urbanurban,{},'urban')
/*select all image pixels that represent any land use or land cover other than urban and built up land*/
var urbannonurban1=urban_raster.neq(190);
var urbannonurban2=urban_raster.neq(210);
var urbannonurban3=DEM_diff.lte(50);


var urbanNDVI=NDVI.updateMask(urbanurban);

/*Create new image with daytime LST pixels where the land use pixel is anything but urban and built up*/
var ruralNDVI=NDVI.updateMask(urbannonurban1).updateMask(urbannonurban2)//.updateMask(urbannonurban3);

/*Create new image with nighttime LST pixels where the land use pixel is urban and built up*/
var urbanBSA=BSA.updateMask(urbanurban);

var ruralBSA=BSA.updateMask(urbannonurban1).updateMask(urbannonurban2)//.updateMask(urbannonurban3);

var urbanWSA=WSA.updateMask(urbanurban);

/*Create new image with daytime LST pixels where the land use pixel is anything but urban and built up*/
var ruralWSA=WSA.updateMask(urbannonurban1).updateMask(urbannonurban2)//.updateMask(urbannonurban3);

var urbanNDBI=NDBI.updateMask(urbanurban);

var ruralNDBI=NDBI.updateMask(urbannonurban1).updateMask(urbannonurban2)//.updateMask(urbannonurban3);

// var urbanEVI=EVI.updateMask(urbanurban);

// var ruralEVI=EVI.updateMask(urbannonurban1).updateMask(urbannonurban2)//.updateMask(urbannonurban3);


var dayurbanLST_AQUA=LST_Day_AQUA_mean.updateMask(urbanurban);

/*Create new image with daytime LST pixels where the land use pixel is anything but urban and built up*/
var dayruralLST_AQUA=LST_Day_AQUA_mean.updateMask(urbannonurban1).updateMask(urbannonurban2)//.updateMask(urbannonurban3);

/*Create new image with daytime LST pixels where the land use pixel is anything but urban and built up*/
var nighturbanLST_AQUA=LST_Night_AQUA_mean.updateMask(urbanurban);

/*Create new image with nighttime LST pixels where the land use pixel is anything but urban and built up*/
var nightruralLST_AQUA=LST_Night_AQUA_mean.updateMask(urbannonurban1).updateMask(urbannonurban2)//.updateMask(urbannonurban3);
//Map.addLayer(nightruralLST_AQUA)
/*Function to replace all pixels within a feature with the mean of all the pixels.
This creates a feature collection with the mean property added for each feature*/
var regions = function(image){
  return image.reduceRegions({collection: urban,  reducer: ee.Reducer.mean(),  scale: 300,
});
}

/*Call the function for each case*/
var duLST_AQUA = regions(dayurbanLST_AQUA);
var nuLST_AQUA= regions(nighturbanLST_AQUA);
var uNDVI=regions(urbanNDVI);
var uBSA=regions(urbanBSA);
var uWSA=regions(urbanWSA);
var uNDBI=regions(urbanNDBI);
//var uEVI=regions(urbanEVI);

//Map.addLayer(EVI)
//Export.table.toDrive({
//collection: duLST_AQUA,  description: 'Cities_urbanLST',  fileFormat: 'CSV'
//});


/*Function to replace all pixels within a feature with the reduced version of the pixels it contains.
This creates a feature (for the with the mean and standard deviation property added for each feature*/

var regions2 = function(image){
  
  return image.reduceRegions({collection: urban_diss,  reducer: ee.Reducer.mean(),  scale: 300,
});
}

//print(urban)

var nrLST_AQUA = regions2(nightruralLST_AQUA);
var drLST_AQUA = regions2(dayruralLST_AQUA);
var rNDVI=regions2(ruralNDVI);
var rBSA=regions2(ruralBSA);
var rWSA=regions2(ruralWSA);
var rNDBI=regions2(ruralNDBI);
//var rEVI=regions2(ruralEVI);

//print(urbanNDVI)
//print(dayurbanLST_AQUA)

// Export.table.toDrive({
// collection: rBSA,  description: 'drLST_AQUA',folder: 'UHI data for paper with Angel',  fileFormat: 'CSV'
// });


// /* Export the feature collection for further analysis*/
// Export.table.toDrive({
// collection: rNDVI,  description: 'nrLST_AQUA', folder: 'UHI data for paper with Angel', fileFormat: 'CSV'
// });
print(nrLST_AQUA)
var nightruralLST_AQUA_image=nrLST_AQUA.filter(ee.Filter.neq('mean', null)).reduceToImage({properties: ['mean'],reducer: ee.Reducer.mean()});
//Map.addLayer(LST_Night_AQUA_mean.clip(urban))
/* Create image from feature collection and subtract the rural daytime LST image from the urban 
daytime LST image to get the daytime urban heat island*/
//var dayUHI_AQUA = duLST_AQUA.filter(ee.Filter.neq('mean', null)).reduceToImage({properties: ['mean'],reducer: ee.Reducer.mean()})
//.subtract(drLST_AQUA.filter(ee.Filter.neq('mean', null)).reduceToImage({properties: ['mean'],reducer: ee.Reducer.mean()}))

var dayUHI_AQUA = LST_Day_AQUA_mean.subtract(drLST_AQUA.filter(ee.Filter.neq('mean', null)).reduceToImage({properties: ['mean'],reducer: ee.Reducer.mean()}))



/* Create image from feature collection and subtract the rural nighttime LST image from the urban 
nighttime LST image to get the nighttime urban heat island*/
//var nightUHI_AQUA = nuLST_AQUA.filter(ee.Filter.neq('mean', null)).reduceToImage({properties: ['mean'],reducer: ee.Reducer.mean()})
//.subtract(nrLST_AQUA.filter(ee.Filter.neq('mean', null)).reduceToImage({properties: ['mean'],reducer: ee.Reducer.mean()}))

var nightUHI_AQUA = LST_Night_AQUA_mean.subtract(nrLST_AQUA.filter(ee.Filter.neq('mean', null)).reduceToImage({properties: ['mean'],reducer: ee.Reducer.mean()}))

//Map.addLayer(nightUHI_AQUA)

//var vectors=ee.List(urban_diss.aggregate_array('city'))

//function clippy_day(names){
//  var city=ee.FeatureCollection(urban_diss.filterMetadata('city','equals',names))
//  return ee.Image(dayUHI_AQUA.clip(city.geometry()))

//}

//function clippy_night(names){
//    var city=ee.FeatureCollection(urban_diss.filterMetadata('city','equals',names))
//  return ee.Image(nightUHI_AQUA.clip(city.geometry()))
//}


//Clip everything for export
//var dayUHI_AQUA_clipped=ee.ImageCollection(vectors.map(clippy_day))

//var nightUHI_AQUA_clipped=ee.ImageCollection(vectors.map(clippy_night))
//Map.addLayer(urban)
//print(dayUHI_AQUA)


//function to convert line string to polygon
function lineStringToPolygon(f) {
  return ee.Algorithms.GeometryConstructors.Polygon(f.geometry().coordinates())
}




var Name=ee.Feature(urban_diss.filterMetadata('city','equals','Johannesburg').union().first().geometry())
print(Name)
var dayUHI_AQUA_clipped=dayUHI_AQUA.clip(Name)
var nightUHI_AQUA_clipped=nightUHI_AQUA.clip(Name)

// //---------------------Convert All Features to Polygons ----------------------------------
// var Name = Name.map(lineStringToPolygon);


Map.addLayer(Name)
//Import air data and clip to city
var PM=ee.Image('users/tirthankar25/PM25_2016_no');
var NO2=ee.Image('users/tirthankar25/NO2_2011');
var PM_clipped=PM.clip(Name)
var NO2_clipped=NO2.clip(Name)

//Import hanse's tree cover data and clip to city
var Hansen=ee.Image('UMD/hansen/global_forest_change_2016_v1_4').select('treecover2000');
var Hansen_clipped=Hansen.clip(Name)



Export.image.toDrive({image: dayUHI_AQUA_clipped, description: 'johannesburg_UHI_day', folder:'Rasters', region: Name.bounds(), maxPixels:9999999999999, scale:1000})
Export.image.toDrive({image: nightUHI_AQUA_clipped, description: 'johannesburg_UHI_night', folder:'Rasters', region: Name.bounds(), maxPixels:9999999999999, scale:1000})
Export.image.toDrive({image: Hansen_clipped, description: 'johannesburg_treecover', folder:'Rasters', region: Name.bounds(), maxPixels:9999999999999, scale:1000})
Export.image.toDrive({image: NO2_clipped, description: 'johannesburg_NO2', folder:'Rasters', region: Name.bounds(), maxPixels:9999999999999, scale:1000})
Export.image.toDrive({image: PM_clipped, description: 'johannesburg_PM', folder:'Rasters', region: Name.bounds(), maxPixels:9999999999999, scale:1000})



//Map.addLayer(ee.Image(dayUHI_AQUA_clipped),{min:-3, max:6,palette:["green","yellow","red"]})
