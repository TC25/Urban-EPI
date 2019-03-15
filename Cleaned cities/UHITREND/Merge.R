#Set working directory
setwd("F:/Yale important/Other/Data driven yale/Cleaned cities/UHITREND")
temp <- list.files(pattern="*.csv")

#Skip to skip the number of rows from the top. Cannot be used if there is no data
All <- lapply(temp,function(i){
  read.csv(i, header=TRUE, skip=0)
})
#Bind them together
df <- do.call(rbind.data.frame, All)

#Output
write.table(df, file = "UHITREND.csv", sep = ",", dec =".", row.names = F) 
