library(openxlsx)
#Set working directory
setwd("F:/Yale important/Other/Data driven yale/Cleaned cities/UHI/UHIfinal")
#List all the csv files in directory
temp = list.files(pattern="*.csv")
p <- par(mfrow=c(2,2))
for (i in 1:length(temp)){
  #Assign the csv file to a variable
  Input_f <- assign(temp[i], read.csv(temp[i]))
 
  plot(Input_f[,8],Input_f[,10])
  
}
plot(Input_f[,8],Input_f[,10])
par(p)
