#Set working directory
setwd("F:/Yale important/Other/Data driven yale/Cleaned cities/UHI/backup")
#List all the csv files in directory
temp = list.files(pattern="*.csv")
for (i in 1:length(temp)){
  #Assign the csv file to a variable
  Input_f <- assign(temp[i], read.csv(temp[i]))
  #Create a variable for the UHI column in the csv
  UHICol <-Input_f[,2]
  #Find minimum value in column
  MinUHI=min(UHICol)
  #Normalize values in column such that the minimum UHI value of a city is zero
  UHIEQ=UHICol+(-MinUHI)
  #Create a 5 column dataframe with 4 columns of the original csv and the newly created vector
  FIN <- data.frame(Input_f[,1],Input_f[,2],Input_f[,3],Input_f[,4], UHIEQ)
  #Set the names of each column
  colnames(FIN) <- c("system:index", "UHI", "UHINIGHT", "nbhd_code", "UHIEQ")
  #Give the file the same names as the oiriginal input csv and overwrite it in the working directory
  write.table (FIN, file = temp[i], sep = ",", dec =".",row.names = F) 
    }



