library(openxlsx)
library(ggplot2)
library(gridExtra)
library(devtools)


#Set working directory
setwd("E:/Disk backup/Pen drive/Yale important/Other/Data driven yale/Cleaned cities/UHI/Raster analysis")
#List all the csv files in directory
temp = list.files(pattern="*1000m.csv")
plot_list = list()
for (i in 1:length(temp)){
  #Assign the csv file to a variable
  Input_f <- assign(temp[i], read.csv(temp[i]))
  S = substr(temp[i],1,nchar(temp[i])-10)
  # Change the point colors and shapes
  # Change the line type and color
  p=ggplot(Input_f, aes(x=UHI, y=NDVI)) + 
    geom_point(shape=18, color="blue")+
    geom_smooth(method=lm, se=FALSE, linetype="dashed",
                color="darkred")
  # Change the confidence interval fill color
  q=ggplot(Input_f, aes(x=UHI, y=NDVI)) + 
    geom_point(shape=18, color="blue")+
    geom_smooth(method=lm,  linetype="dashed",
                color="darkred", fill="blue")+ggtitle(S)
  #plot_list[[i]] = p
  plot_list[[i]] = q
  
}
do.call(grid.arrange,plot_list)