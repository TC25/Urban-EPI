//Author: TC Chakraborty
//website: https://tc25.github.io/
//var urban=ee.FeatureCollection('users/tirthankar25/urban_Schneider');
/*Import shapefiles of neighborhoods*/
var urban=/* color: #98ff00 */ee.FeatureCollection('users/datadrivenlab/cities/cities_2019');
//Other city files; Amsterdam, Beijing, Berlin, Bangkok, Vancouver, atlanta, barcelona, boston
//var urban=urban.select(['nbhd_code']);
//print(urban)
/*Create a new feature with the dissolved urban shapefile (so, no neighborhoods)*/
var urban_diss=urban.union();
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
//print(MODIS_Bands)
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
var BSAr = Alb.map(qualityControlBSAlb).mean();
var WSAr = Alb.map(qualityControlWSAlb).mean();
var NDBIr = MOD.normalizedDifference(['sur_refl_b06', 'sur_refl_b02']);
var NDVIr = MOD.normalizedDifference(['sur_refl_b02', 'sur_refl_b01']);

//Map.addLayer(NDBIr.clip(urban),{min: -.5, max: 0},'NDBI')

//Map.addLayer(NDVIr.clip(urban),{min: 0, max: 1},"NDVI")

/*Create reducer to find mean and standard deviation*/
var reducers = ee.Reducer.mean().combine({
  reducer2: ee.Reducer.stdDev(),
  sharedInputs: true
});

//print(urban)
//Map.addLayer(urban)

function featurecreate(feature){
  // Get mean NDVI
  var NDVI=NDVIr.reduceRegion({geometry: feature.geometry(), maxPixels: 1e9,  reducer: ee.Reducer.mean(),  scale: 300});
  var NDBI=NDBIr.reduceRegion({geometry: feature.geometry(),maxPixels: 1e9,  reducer: ee.Reducer.mean(),  scale: 300});
  return feature.set({
  'NDVI': NDVI.get('nd'), 
  'NDBI': NDBI.get('nd')});

}

var Final=urban.map(featurecreate)
//print(Final)

//Select relevant properties and exclude geometry from the final csv
var Final=Final.select({propertySelectors: ['nbhd_code','NDVI','NDBI'], retainGeometry: false})

// Extracting as csvs. 
Export.table.toDrive({collection: Final, description: 'Phys_cities', fileFormat: 'CSV'})

