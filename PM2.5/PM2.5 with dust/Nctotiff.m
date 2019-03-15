clear all
OutFolder = 'E:\Disk backup\Pen drive\Yale important\Other\Data driven yale\PM2.5\PM2.5 with dust\Tiff_files';
cd 'E:\Disk backup\Pen drive\Yale important\Other\Data driven yale\PM2.5\PM2.5 with dust'
dinfo = dir('*.nc');
nfile = length(dinfo);
filenames = {dinfo.name};
for k = 1:nfile
  file_name{k} = filenames{k};
  lat = double(ncread(file_name{k},'LAT')) ;
  lon = double(ncread(file_name{k},'LON')) ; 
  A{k} = ncread(file_name{k},'PM25');
  Ad = (double(A{k}));
  R = georasterref('RasterSize',size(Ad),'LatitudeLimits',[min(lat),max(lat)],'LongitudeLimits',[min(lon),max(lon)]);
  tiffile{k} = strcat(filenames{k},'.tif') ;
  geotiffwrite(fullfile(OutFolder,tiffile{k}),Ad,R);
  clearvars -except filenames OutFolder nfile
end