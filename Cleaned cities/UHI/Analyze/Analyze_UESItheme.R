
# Setting up the environment
library(ggplot2)
library(extrafont)
library(Hmisc)
library(pastecs)
library(psych)
library(doBy)
library(lubridate)
library(tibble)
library(plyr)
library(tidyr)
library(Cairo)
library(UESIplots)

# Run TC's code in order to get to the df used for plotting
setwd("E:/Disk backup/Pen drive/Yale important/Other/Data driven yale/Cleaned cities/UHI/UHIfinal")

#List all the csv files in directory
temp <- list.files(pattern="^\\D+.csv")
temp <- temp[temp != "Buffer_UHI.csv"]
Buffer=data.frame(read.csv("Buffer_UHI.csv"))
for (i in 1:length(temp)){
  print(temp[i])
  #Assign the csv file to a variable
  Input_f <- assign(temp[i], read.csv(temp[i]))
  #Create a variable for the UHI column in the csv
  Merged =merge(Input_f,Buffer,by="nbhd_code")
  #Create a 5 column dataframe with 4 columns of the original csv and the newly created vector
  FIN <- data.frame(Merged[,1],Merged[,2],Merged[,3],Merged[,4],Merged[,5],Merged[,8])
  #Set the names of each column
  colnames(FIN) <- c("nbhd_code","system:index", "UHI", "UHINIGHT", "UHIEQ","Buffer_UHI")
  #Give the file the same names as the oiriginal input csv and overwrite it in the working directory
  write.table(FIN, file = temp[i], sep = ",", dec =".",row.names = F) 
}

for (i in 1:length(temp)){
  #Assign the csv file to a variable
  Input_f <- assign(temp[i], read.csv(temp[i]))
  #Create a variable for the UHI column in the csv
  UHICol <-Input_f[,3]
  #Find data value in column
  J<-describe(UHICol)
  #Add city name to be added as a column
  City_name<-sub(".csv", "", temp[i])
  FIN <- data.frame(J,City_name)
}


for (i in 1:length(temp)){
  #Assign the csv file to a variable
  Input_f <- assign(temp[i], read.csv(temp[i]))
  #Create a variable for the UHI column in the csv
  UHICol <-Input_f[,3]
  #Find data value in column
  J[i,]<-describe(UHICol)
  #Add city name to be added as a column
  City_name[i]<-sub(".csv", "", temp[i])
}

#Create final dataset
FIN <- data.frame(J,City_name)



FIN$mean=round(FIN$mean,1)
###############################Plotting the plots#####################################

FIN$City_name <- UESIplots::format_city_name(City_name)

# Import and load fonts
# font_import(path = "urban-statistics/Final_Project/fonts",
#             pattern = "MyriadPro-Light.ttf", prompt = FALSE)
loadfonts()

# Daytime UHI intensity plot
CairoPDF("../../imgs/Issue_Profile_Chapters/UHI-Climate_change/UHI_updated.pdf",
         family = "Myriad Pro Light", fonts = "Myriad Pro Light",
         width = 10, height = 8)
UHI.a <- ggplot(FIN, aes(x=reorder(City_name,mean), y=mean, label=mean))+
  geom_errorbar(aes(ymin=mean-sd, ymax=mean+sd), width=.8,color = rgb(70,95,111, max = 255), size=1)+
  geom_segment(aes(y = 0,
                   x = City_name,
                   yend = mean,
                   xend = City_name),
               color = "deepskyblue3", alpha=(0)) +
  geom_point(stat='identity', fill="green", color=rgb(145,189,196, max = 255), size=8) +
  geom_text(color="white", size= 3) +
  coord_flip()+ylab("Daytime UHI magnitude (°C)")+
  xlab("City")+
  ggtitle("Daytime UHI intensity of pilot cities") +
  UESIplots::theme_UESI()
print(UHI.a)
dev.off()