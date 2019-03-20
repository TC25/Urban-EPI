library(openxlsx)
#Set working directory
setwd("F:/Yale important/Other/Data driven yale/Cleaned cities/UHI/UHIfinal")
#List all the csv files in directory
temp = list.files(pattern="*.csv")
Buffer=data.frame(read.xlsx("Buffer_UHI.xlsx"))
for (i in 1:length(temp)){
  #Assign the csv file to a variable
  Input_f <- assign(temp[i], read.csv(temp[i]))
  #Create a variable for the UHI column in the csv
  Merged =merge(Input_f,Buffer,by="nbhd_code")
  #Create a 6 column dataframe
  FIN <- data.frame(Merged[,1],Merged[,2],Merged[,3],Merged[,4],Merged[,5],Merged[,8])
  #Set the names of each column
  colnames(FIN) <- c("nbhd_code","system:index", "UHI", "UHINIGHT",  "UHIEQ","Buffer_UHI")
  #Give the file the same names as the oiriginal input csv and overwrite it in the working directory
  write.table (FIN, file = temp[i], sep = ",", dec =".",row.names = F) 
    }



