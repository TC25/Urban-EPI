//Author: TC Chakraborty
//website: https://tc25.github.io/
//var urban=ee.FeatureCollection('users/tirthankar25/urban_Schneider');
 
/*Import shapefiles of neighborhoods*/
var urban=/* color: #98ff00 */ee.FeatureCollection('users/datadrivenlab/cities/cities_2019');
//Other city files; Amsterdam, Beijing, Berlin, Bangkok, Vancouver, atlanta, barcelona, boston
//var urban=urban.select(['nbhd_code']);

//LST images
var LST_Day_AQUA_2003=ee.Image('users/tirthankar25/LST_Day_AQUA_mean_2003_vfF')
var LST_Day_AQUA_2004=ee.Image('users/tirthankar25/LST_Day_AQUA_mean_2004_vfF')
var LST_Day_AQUA_2005=ee.Image('users/tirthankar25/LST_Day_AQUA_mean_2005_vfF')
var LST_Day_AQUA_2006=ee.Image('users/tirthankar25/LST_Day_AQUA_mean_2006_vfF')
var LST_Day_AQUA_2007=ee.Image('users/tirthankar25/LST_Day_AQUA_mean_2007_vfF')
var LST_Day_AQUA_2008=ee.Image('users/tirthankar25/LST_Day_AQUA_mean_2008_vfF')
var LST_Day_AQUA_2009=ee.Image('users/tirthankar25/LST_Day_AQUA_mean_2009_vfF')
var LST_Day_AQUA_2010=ee.Image('users/tirthankar25/LST_Day_AQUA_mean_2010_vfF')
var LST_Day_AQUA_2011=ee.Image('users/tirthankar25/LST_Day_AQUA_mean_2011_vfF')
var LST_Day_AQUA_2012=ee.Image('users/tirthankar25/LST_Day_AQUA_mean_2012_vfF')
var LST_Day_AQUA_2013=ee.Image('users/tirthankar25/LST_Day_AQUA_mean_2013_vfF')
var LST_Day_AQUA_2014=ee.Image('users/tirthankar25/LST_Day_AQUA_mean_2014_vfF')
var LST_Day_AQUA_2015=ee.Image('users/tirthankar25/LST_Day_AQUA_mean_2015_vfF')
var LST_Day_AQUA_2016=ee.Image('users/tirthankar25/LST_Day_AQUA_mean_2016_vfF')
var LST_Day_AQUA_2017=ee.Image('users/tirthankar25/LST_Day_AQUA_mean_2017_vfF')

//LST images
var LST_Night_AQUA_2003=ee.Image('users/tirthankar25/LST_Night_AQUA_mean_2003_vfF')
var LST_Night_AQUA_2004=ee.Image('users/tirthankar25/LST_Night_AQUA_mean_2004_vfF')
var LST_Night_AQUA_2005=ee.Image('users/tirthankar25/LST_Night_AQUA_mean_2005_vfF')
var LST_Night_AQUA_2006=ee.Image('users/tirthankar25/LST_Night_AQUA_mean_2006_vfF')
var LST_Night_AQUA_2007=ee.Image('users/tirthankar25/LST_Night_AQUA_mean_2007_vfF')
var LST_Night_AQUA_2008=ee.Image('users/tirthankar25/LST_Night_AQUA_mean_2008_vfF')
var LST_Night_AQUA_2009=ee.Image('users/tirthankar25/LST_Night_AQUA_mean_2009_vfF')
var LST_Night_AQUA_2010=ee.Image('users/tirthankar25/LST_Night_AQUA_mean_2010_vfF')
var LST_Night_AQUA_2011=ee.Image('users/tirthankar25/LST_Night_AQUA_mean_2011_vfF')
var LST_Night_AQUA_2012=ee.Image('users/tirthankar25/LST_Night_AQUA_mean_2012_vfF')
var LST_Night_AQUA_2013=ee.Image('users/tirthankar25/LST_Night_AQUA_mean_2013_vfF')
var LST_Night_AQUA_2014=ee.Image('users/tirthankar25/LST_Night_AQUA_mean_2014_vfF')
var LST_Night_AQUA_2015=ee.Image('users/tirthankar25/LST_Night_AQUA_mean_2015_vfF')
var LST_Night_AQUA_2016=ee.Image('users/tirthankar25/LST_Night_AQUA_mean_2016_vfF')
var LST_Night_AQUA_2017=ee.Image('users/tirthankar25/LST_Night_AQUA_mean_2017_vfF')



function featurecreate(feature){
  var LST_day_2003=LST_Day_AQUA_2003.reduceRegion({geometry: feature.geometry(),  reducer: ee.Reducer.mean(),  scale: 1000,
});
  var LST_day_2004=LST_Day_AQUA_2004.reduceRegion({geometry: feature.geometry(),  reducer: ee.Reducer.mean(),  scale: 1000,
});
  var LST_day_2005=LST_Day_AQUA_2005.reduceRegion({geometry: feature.geometry(),  reducer: ee.Reducer.mean(),  scale: 1000,
});
  var LST_day_2006=LST_Day_AQUA_2006.reduceRegion({geometry: feature.geometry(),  reducer: ee.Reducer.mean(),  scale: 1000,
});
  var LST_day_2007=LST_Day_AQUA_2007.reduceRegion({geometry: feature.geometry(),  reducer: ee.Reducer.mean(),  scale: 1000,
});
  var LST_day_2008=LST_Day_AQUA_2008.reduceRegion({geometry: feature.geometry(),  reducer: ee.Reducer.mean(),  scale: 1000,
});
  var LST_day_2009=LST_Day_AQUA_2009.reduceRegion({geometry: feature.geometry(),  reducer: ee.Reducer.mean(),  scale: 1000,
});
  var LST_day_2010=LST_Day_AQUA_2010.reduceRegion({geometry: feature.geometry(),  reducer: ee.Reducer.mean(),  scale: 1000,
});
  var LST_day_2011=LST_Day_AQUA_2011.reduceRegion({geometry: feature.geometry(),  reducer: ee.Reducer.mean(),  scale: 1000,
});
  var LST_day_2012=LST_Day_AQUA_2012.reduceRegion({geometry: feature.geometry(),  reducer: ee.Reducer.mean(),  scale: 1000,
});

  var LST_day_2013=LST_Day_AQUA_2013.reduceRegion({geometry: feature.geometry(),  reducer: ee.Reducer.mean(),  scale: 1000,
});


  var LST_day_2014=LST_Day_AQUA_2014.reduceRegion({geometry: feature.geometry(),  reducer: ee.Reducer.mean(),  scale: 1000,
});


  var LST_day_2015=LST_Day_AQUA_2015.reduceRegion({geometry: feature.geometry(),  reducer: ee.Reducer.mean(),  scale: 1000,
});


  var LST_day_2016=LST_Day_AQUA_2016.reduceRegion({geometry: feature.geometry(),  reducer: ee.Reducer.mean(),  scale: 1000,
});


  var LST_day_2017=LST_Day_AQUA_2017.reduceRegion({geometry: feature.geometry(),  reducer: ee.Reducer.mean(),  scale: 1000,
});


  var LST_night_2003=LST_Night_AQUA_2003.reduceRegion({geometry: feature.geometry(),  reducer: ee.Reducer.mean(),  scale: 1000,
});
  var LST_night_2004=LST_Night_AQUA_2004.reduceRegion({geometry: feature.geometry(),  reducer: ee.Reducer.mean(),  scale: 1000,
});
  var LST_night_2005=LST_Night_AQUA_2005.reduceRegion({geometry: feature.geometry(),  reducer: ee.Reducer.mean(),  scale: 1000,
});
  var LST_night_2006=LST_Night_AQUA_2006.reduceRegion({geometry: feature.geometry(),  reducer: ee.Reducer.mean(),  scale: 1000,
});
  var LST_night_2007=LST_Night_AQUA_2007.reduceRegion({geometry: feature.geometry(),  reducer: ee.Reducer.mean(),  scale: 1000,
});
  var LST_night_2008=LST_Night_AQUA_2008.reduceRegion({geometry: feature.geometry(),  reducer: ee.Reducer.mean(),  scale: 1000,
});
  var LST_night_2009=LST_Night_AQUA_2009.reduceRegion({geometry: feature.geometry(),  reducer: ee.Reducer.mean(),  scale: 1000,
});
  var LST_night_2010=LST_Night_AQUA_2010.reduceRegion({geometry: feature.geometry(),  reducer: ee.Reducer.mean(),  scale: 1000,
});
  var LST_night_2011=LST_Night_AQUA_2011.reduceRegion({geometry: feature.geometry(),  reducer: ee.Reducer.mean(),  scale: 1000,
});
  var LST_night_2012=LST_Night_AQUA_2012.reduceRegion({geometry: feature.geometry(),  reducer: ee.Reducer.mean(),  scale: 1000,
});

  var LST_night_2013=LST_Night_AQUA_2013.reduceRegion({geometry: feature.geometry(),  reducer: ee.Reducer.mean(),  scale: 1000,
});


  var LST_night_2014=LST_Night_AQUA_2014.reduceRegion({geometry: feature.geometry(),  reducer: ee.Reducer.mean(),  scale: 1000,
});


  var LST_night_2015=LST_Night_AQUA_2015.reduceRegion({geometry: feature.geometry(),  reducer: ee.Reducer.mean(),  scale: 1000,
});


  var LST_night_2016=LST_Night_AQUA_2016.reduceRegion({geometry: feature.geometry(),  reducer: ee.Reducer.mean(),  scale: 1000,
});


  var LST_night_2017=LST_Night_AQUA_2017.reduceRegion({geometry: feature.geometry(),  reducer: ee.Reducer.mean(),  scale: 1000,
});

var LST_count_2003=LST_Day_AQUA_2003.reduceRegion({geometry: feature.geometry(),  reducer: ee.Reducer.count(),  scale: 1000,
});

var LST_count_2004=LST_Day_AQUA_2004.reduceRegion({geometry: feature.geometry(),  reducer: ee.Reducer.count(),  scale: 1000,
});

var LST_count_2005=LST_Day_AQUA_2005.reduceRegion({geometry: feature.geometry(),  reducer: ee.Reducer.count(),  scale: 1000,
});

var LST_count_2006=LST_Day_AQUA_2006.reduceRegion({geometry: feature.geometry(),  reducer: ee.Reducer.count(),  scale: 1000,
});

var LST_count_2007=LST_Day_AQUA_2007.reduceRegion({geometry: feature.geometry(),  reducer: ee.Reducer.count(),  scale: 1000,
});

var LST_count_2008=LST_Day_AQUA_2008.reduceRegion({geometry: feature.geometry(),  reducer: ee.Reducer.count(),  scale: 1000,
});

var LST_count_2009=LST_Day_AQUA_2009.reduceRegion({geometry: feature.geometry(),  reducer: ee.Reducer.count(),  scale: 1000,
});

var LST_count_2010=LST_Day_AQUA_2010.reduceRegion({geometry: feature.geometry(),  reducer: ee.Reducer.count(),  scale: 1000,
});

var LST_count_2011=LST_Day_AQUA_2011.reduceRegion({geometry: feature.geometry(),  reducer: ee.Reducer.count(),  scale: 1000,
});

var LST_count_2012=LST_Day_AQUA_2012.reduceRegion({geometry: feature.geometry(),  reducer: ee.Reducer.count(),  scale: 1000,
});

var LST_count_2013=LST_Day_AQUA_2013.reduceRegion({geometry: feature.geometry(),  reducer: ee.Reducer.count(),  scale: 1000,
});

var LST_count_2014=LST_Day_AQUA_2014.reduceRegion({geometry: feature.geometry(),  reducer: ee.Reducer.count(),  scale: 1000,
});

var LST_count_2015=LST_Day_AQUA_2015.reduceRegion({geometry: feature.geometry(),  reducer: ee.Reducer.count(),  scale: 1000,
});

var LST_count_2016=LST_Day_AQUA_2016.reduceRegion({geometry: feature.geometry(),  reducer: ee.Reducer.count(),  scale: 1000,
});

var LST_count_2017=LST_Day_AQUA_2017.reduceRegion({geometry: feature.geometry(),  reducer: ee.Reducer.count(),  scale: 1000,
});

return feature.set({'Day_LST_2003': LST_day_2003.get('LST_Day_1km_mean'), 
  'Day_LST_2004': LST_day_2004.get('LST_Day_1km_mean'), 
  'Day_LST_2005': LST_day_2005.get('LST_Day_1km_mean'), 
  'Day_LST_2006': LST_day_2006.get('LST_Day_1km_mean'), 
  'Day_LST_2007': LST_day_2007.get('LST_Day_1km_mean'), 
  'Day_LST_2008': LST_day_2008.get('LST_Day_1km_mean'), 
  'Day_LST_2009': LST_day_2009.get('LST_Day_1km_mean'), 
  'Day_LST_2010': LST_day_2010.get('LST_Day_1km_mean'), 
  'Day_LST_2011': LST_day_2011.get('LST_Day_1km_mean'), 
  'Day_LST_2012': LST_day_2012.get('LST_Day_1km_mean'), 
  'Day_LST_2013': LST_day_2013.get('LST_Day_1km_mean'), 
  'Day_LST_2014': LST_day_2014.get('LST_Day_1km_mean'), 
  'Day_LST_2015': LST_day_2015.get('LST_Day_1km_mean'), 
  'Day_LST_2016': LST_day_2016.get('LST_Day_1km_mean'), 
  'Day_LST_2017': LST_day_2017.get('LST_Day_1km_mean'),
  'Night_LST_2003': LST_night_2003.get('LST_Night_1km_mean'), 
  'Night_LST_2004': LST_night_2004.get('LST_Night_1km_mean'), 
  'Night_LST_2005': LST_night_2005.get('LST_Night_1km_mean'), 
  'Night_LST_2006': LST_night_2006.get('LST_Night_1km_mean'), 
  'Night_LST_2007': LST_night_2007.get('LST_Night_1km_mean'), 
  'Night_LST_2008': LST_night_2008.get('LST_Night_1km_mean'), 
  'Night_LST_2009': LST_night_2009.get('LST_Night_1km_mean'), 
  'Night_LST_2010': LST_night_2010.get('LST_Night_1km_mean'), 
  'Night_LST_2011': LST_night_2011.get('LST_Night_1km_mean'), 
  'Night_LST_2012': LST_night_2012.get('LST_Night_1km_mean'), 
  'Night_LST_2013': LST_night_2013.get('LST_Night_1km_mean'), 
  'Night_LST_2014': LST_night_2014.get('LST_Night_1km_mean'), 
  'Night_LST_2015': LST_night_2015.get('LST_Night_1km_mean'), 
  'Night_LST_2016': LST_night_2016.get('LST_Night_1km_mean'), 
  'Night_LST_2017': LST_night_2017.get('LST_Night_1km_mean'),
    'Count_2003': LST_count_2003.get('LST_Day_1km_mean'), 
  'Count_2004': LST_count_2004.get('LST_Day_1km_mean'), 
  'Count_2005': LST_count_2005.get('LST_Day_1km_mean'), 
  'Count_2006': LST_count_2006.get('LST_Day_1km_mean'), 
  'Count_2007': LST_count_2007.get('LST_Day_1km_mean'), 
  'Count_2008': LST_count_2008.get('LST_Day_1km_mean'), 
  'Count_2009': LST_count_2009.get('LST_Day_1km_mean'), 
  'Count_2010': LST_count_2010.get('LST_Day_1km_mean'), 
  'Count_2011': LST_count_2011.get('LST_Day_1km_mean'), 
  'Count_2012': LST_count_2012.get('LST_Day_1km_mean'), 
  'Count_2013': LST_count_2013.get('LST_Day_1km_mean'), 
  'Count_2014': LST_count_2014.get('LST_Day_1km_mean'), 
  'Count_2015': LST_count_2015.get('LST_Day_1km_mean'), 
  'Count_2016': LST_count_2016.get('LST_Day_1km_mean'), 
  'Count_2017': LST_count_2017.get('LST_Day_1km_mean'),
});

}


var Final_data=urban.map(featurecreate)
print(Final_data)
var Final_data=Final_data.select({propertySelectors: ['nbhd_code','Day_LST_2003',
'Day_LST_2004','Day_LST_2005','Day_LST_2006','Day_LST_2007','Day_LST_2008','Day_LST_2009',
'Day_LST_2010','Day_LST_2011','Day_LST_2012','Day_LST_2013','Day_LST_2014',
'Day_LST_2015','Day_LST_2016','Day_LST_2017','Night_LST_2003',
'Night_LST_2004','Night_LST_2005','Night_LST_2006','Night_LST_2007','Night_LST_2008','Night_LST_2009',
'Night_LST_2010','Night_LST_2011','Night_LST_2012','Night_LST_2013','Night_LST_2014',
'Night_LST_2015','Night_LST_2016','Night_LST_2017','Count_2003',
'Count_2004','Count_2005','Count_2006','Count_2007','Count_2008','Count_2009',
'Count_2010','Count_2011','Count_2012','Count_2013','Count_2014',
'Count_2015','Count_2016','Count_2017'], retainGeometry: false})

Export.table.toDrive({
collection: Final_data,  description: 'LST_cities_yearly',  fileFormat: 'CSV'
});
