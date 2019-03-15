% srcFiles = dir('*.tif');  % the folder in which ur images exists;
% numRows = ceil(sqrt(length(srcFiles)));
% for i = 1 : length(srcFiles)
%     filename = strcat(srcFiles(i).name);
%     I = imread(filename);
%     subplot(numRows, numRows, i);
%     imshow(I);
% end
% 
% Altanta_IMP=double(imread('boston_IMP30.tif'));
% Altanta_IMP(Altanta_IMP==0)=NaN;
% Altanta_NDBI=double(imread('boston_NDBI.tif'));
% scatter(Altanta_IMP(:),Altanta_NDBI(:));
clear all
NDBI=double(imread('boston_NDBI.tif'));
%% NDBI(NDBI<=0)=NaN;
IMP=double(imread('boston_IMP30.tif'));
IMP(IMP==0)=NaN;
Final=[NDBI(:) IMP(:)];
chead={'NDBI','IMP'};
header=strjoin(chead,',');
fid=fopen('boston_30m.csv','w');
fprintf(fid,'%s\n',header);
fclose(fid);
%% Append data
dlmwrite('boston_30m.csv', Final, '-append');

NDVI=double(imread('boston_NDVI.tif'));
%% NDBI(NDBI<=0)=NaN;
UHI=double(imread('boston_UHI.tif'));
Final=[NDVI(:) UHI(:)];
chead={'NDVI','UHI'};
header=strjoin(chead,',');
fid=fopen('boston_1000m.csv','w');
fprintf(fid,'%s\n',header);
fclose(fid);
%% Append data
dlmwrite('boston_1000m.csv', Final, '-append');
