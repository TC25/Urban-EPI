#Set working directory
setwd("E:/Disk backup/Pen drive/Yale important/Other/Data driven yale/Albedo, NDVI, NDBI, DEM, Count")
#List all the csv files in directory
temp = list.files(pattern="*.csv")
for (i in 1:length(temp)){
  #Extract file name as a string and remove extension
  fname<-sub(pattern = "(.*)\\..*$", replacement = "\\1", basename(temp[i]))
  #Assign the csv file to a variable
  Input_f <- assign(temp[i], read.csv(temp[i]))
  #x<-c(2, 4, 7, 9, 12, 14, 49, 52, 64)
 #Input_f[x,]<-NULL
 
  #Create a 4 column dataframe with the first 4 columns of the original csv
  FIN <- data.frame(Input_f[,6],Input_f[,5])
  #Set the names of each column
  colnames(FIN) <- c("nbhd_code", fname)
  #Give the file the same names as the oiriginal input csv and overwrite it in the working directory
  write.table (FIN, file = temp[i], sep = ",", dec =".",row.names = F) 
    }



