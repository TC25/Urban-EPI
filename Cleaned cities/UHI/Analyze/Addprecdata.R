library(openxlsx)
#Set working directory
setwd("F:/Yale important/Other/Data driven yale/Cleaned cities/UHI/Analyze")
#List all the csv files in directory
temp = list.files(pattern="*.csv")
#Buffer=data.frame(read.xlsx("Buffer_UHI.xlsx"))

Prec=data.frame(read.xlsx("Prec_all.xlsx"))
for (i in 1:length(temp)){
  #Assign the csv file to a variable
  Input_f <- assign(temp[i], read.csv(temp[i]))
  #Create a variable for the UHI column in the csv
  #Merged =merge(Input_f,Buffer,by="nbhd_code")
  Merged =merge(Input_f,Prec,by="nbhd_code")
  #Create a new dataframe
  FIN <- data.frame(Merged[,1],Merged[,2],Merged[,3],Merged[,4],Merged[,5],Merged[,6],Merged[,7],Merged[,8],Merged[,9],Merged[,10],Merged[,11],Merged[,12])
  #Set the names of each column
  colnames(FIN) <- c("nbhd_code","system:index", "UHI", "UHINIGHT",  "UHIEQ","Buffer_UHI","NDVI","NDBI","Albedo","Impervious_surface","DEM","Prec")
  #Give the file the same names as the oiriginal input csv and overwrite it in the working directory
  write.table (FIN, file = temp[i], sep = ",", dec =".",row.names = F) 
}
