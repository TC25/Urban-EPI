library(openxlsx)
#Set working directory
setwd("F:/Yale important/Other/Data driven yale/Cleaned cities/UHI/UHIfinal")
#List all the csv files in directory
temp = list.files(pattern="*.csv")
#Buffer=data.frame(read.xlsx("Buffer_UHI.xlsx"))
NDVI=data.frame(read.xlsx("ndvi_all.xlsx"))
NDBI=data.frame(read.xlsx("ndbi_all.xlsx"))
DEM=data.frame(read.xlsx("DEM_all.xlsx"))
Albedo=data.frame(read.xlsx("Albedo_all.xlsx"))
IMP=data.frame(read.xlsx("Impervious_surface.xlsx"))
for (i in 1:length(temp)){
  #Assign the csv file to a variable
  Input_f <- assign(temp[i], read.csv(temp[i]))
  #Create a variable for the UHI column in the csv
  #Merged =merge(Input_f,Buffer,by="nbhd_code")
  Merged =merge(Input_f,NDVI,by="nbhd_code")
  Merged =merge(Merged,NDBI,by="nbhd_code")
  Merged =merge(Merged,Albedo,by="nbhd_code")
  Merged =merge(Merged,IMP,by="nbhd_code")
  Merged =merge(Merged,DEM,by="nbhd_code")
  #Create a 5 column dataframe with 4 columns of the original csv and the newly created vector
  FIN <- data.frame(Merged[,1],Merged[,2],Merged[,3],Merged[,4],Merged[,5],Merged[,6],Merged[,7],Merged[,8],Merged[,9],Merged[,10],Merged[,11])
  #Set the names of each column
  colnames(FIN) <- c("nbhd_code","system:index", "UHI", "UHINIGHT",  "UHIEQ","Buffer_UHI","NDVI","NDBI","Albedo","Impervious_surface","DEM")
  #Give the file the same names as the oiriginal input csv and overwrite it in the working directory
  write.table (FIN, file = temp[i], sep = ",", dec =".",row.names = F) 
}
