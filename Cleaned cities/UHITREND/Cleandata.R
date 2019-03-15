#Set working directory
setwd("F:/Yale important/Other/Data driven yale/Cleaned cities/UHITREND")
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
  FIN <- data.frame(Input_f[,13],Input_f[,2],Input_f[,3],Input_f[,4],Input_f[,5],Input_f[,6],Input_f[,7],Input_f[,8],Input_f[,9],Input_f[,10],Input_f[,11],Input_f[,12])
  #Set the names of each column
  colnames(FIN) <- c("nbhd_code", "UHI2003", "UHI2004", "UHI2005", "UHI2006", "UHI2007", "UHI2008", "UHI2009", "UHI2010", "UHI2011", "UHI2012", "UHI2013")
  #Give the file the same names as the oiriginal input csv and overwrite it in the working directory
  write.table (FIN, file = temp[i], sep = ",", dec =".",row.names = F) 
    }



