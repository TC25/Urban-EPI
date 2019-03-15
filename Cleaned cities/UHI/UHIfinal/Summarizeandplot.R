library(Hmisc)
library(pastecs)
library(psych)
library(doBy)
library(lubridate)
library(tibble)
library(plyr)
library(tidyr)


#Set working directory
setwd("E:/Disk backup/Pen drive/Yale important/Other/Data driven yale/Cleaned cities/UHI/UHIfinal")
temp <- list.files(pattern="*.csv")

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

#FIN$City_name <- UESIplots::format_city_name(City_name)

# Import and load fonts
# font_import(path = "urban-statistics/Final_Project/fonts",
#             pattern = "MyriadPro-Light.ttf", prompt = FALSE)
#loadfonts()

# Daytime UHI intensity plot
#CairoPDF("../../imgs/Issue_Profile_Chapters/UHI-Climate_change/UHI_updated.pdf",
 #        family = "Myriad Pro Light", fonts = "Myriad Pro Light",
 #        width = 10, height = 8)
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
  ggtitle("Daytime UHI intensity of pilot cities") 
  #UESIplots::theme_UESI()
print(UHI.a)
#dev.off()