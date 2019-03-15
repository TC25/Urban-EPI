#Set working directory
setwd("E:/Disk backup/Pen drive/Yale important/Other/Data driven yale/Cleaned cities/UHI/UHIfinal")
#List all the csv files in directory
temp = list.files(pattern="*.csv")
for (i in 1:length(temp)){
  #Assign the csv file to a variable
  Input_f <- assign(temp[i], read.csv(temp[i]))
  #Replace by NA if count is zero
  Input_f[ Input_f[ ,12] == 0 , 3] <- NA 
  Input_f[ Input_f[ ,12] == 0 , 4] <- NA
  Input_f[ Input_f[ ,12] == 0 , 6] <- NA
  FIN<-data.frame(Input_f)
  colnames(FIN) <- c("nbhd_code","system:index", "UHI", "UHINIGHT",  "UHIEQ","Buffer_UHI","NDVI","NDBI","Albedo","Impervious_surface","DEM","Count")
  #Give the file the same names as the oiriginal input csv and overwrite it in the working directory
  write.table (FIN, file = temp[i], sep = ",", dec =".",row.names = F) 
    }



