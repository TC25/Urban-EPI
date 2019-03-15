library(openxlsx)
library(ggplot2)
library(gridExtra)
library(devtools)
library(rsq)
library(ggpubr)
 
#Set working directory
setwd("E:/Disk backup/Pen drive/Yale important/Other/Data driven yale/Cleaned cities/UHI/Analyze")
#List all the csv files in directory
temp = list.files(pattern="*.csv")
plot_list = list()
R_sq1=array()
R_sq2=array()
R_sq3=array()
p_val1=array()
p_val2=array()
p_val3=array()
r_val1=array()
r_val2=array()
r_val3=array()
S=array()
for (i in 1:length(temp)){
  #Assign the csv file to a variable
  Input_f <- assign(temp[i], read.csv(temp[i]))
  S[i] = substr(temp[i],1,nchar(temp[i])-4)
  # Change the point colors and shapes
  # Change the line type and color
  igfit1 <- lm(NDVI~UHI,data=Input_f)
  R_sq1[i]<-summary(igfit1)$r.squared
  p_val1[i]<-summary(igfit1)$coefficients[,4] 
  igfit2 <- lm(NDBI~UHI,data=Input_f)
  R_sq2[i]<-summary(igfit2)$r.squared
  p_val2[i]<-summary(igfit2)$coefficients[,4] 
  igfit3 <- lm(Albedo~UHI,data=Input_f)
  R_sq3[i]<-summary(igfit3)$r.squared
  p_val3[i]<-summary(igfit3)$coefficients[,4] 
  p=ggplot(Input_f, aes(x=UHI, y=NDVI)) + 
    geom_point(shape=18, color="blue")+
    geom_smooth(method=lm, se=FALSE, linetype="dashed",
                color="darkred")
  # Change the confidence interval fill color
  q=ggplot(Input_f, aes(x=UHI, y=NDVI)) + 
    geom_point(shape=18, color="blue")+
    geom_smooth(method=lm,  linetype="dashed",
                color="darkred", fill="blue")+ggtitle(S[i])
  #plot_list[[i]] = p
  plot_list[[i]] = q
  r_val1[i]<-cor(Input_f$NDVI, Input_f$UHI,  method = "pearson", use = "complete.obs")
  r_val2[i]<-cor(Input_f$NDBI, Input_f$UHI,  method = "pearson", use = "complete.obs")
  r_val3[i]<-cor(Input_f$Albedo, Input_f$UHI,  method = "pearson", use = "complete.obs")
 
}
#+ coord_fixed()
do.call(grid.arrange,plot_list)

#Create data frame
Final=data.frame( R_sq1, R_sq2, R_sq3)

Final_r=data.frame( r_val1, r_val2, r_val3)
colnames(Final_r)<- c('NDVI','NDBI','Albedo')
rownames(Final_r)<- S
# Make baloon plot
p<-ggballoonplot(Final_r, fill = "value", shape = 21,rotate.x.text = TRUE)+
  #scale_color_continuous(breaks=seq(.25,1,.25))+
##guides(size = FALSE)+
  ##breaks=seq(-1,1,.25)+
  gradient_fill(c( "brown", "red","orange", "green", "yellow"))
p+ggtitle("Pearson correlation coefficient between daytime \n UHI and neighborhood surface characteristics") + 
  theme(plot.title = element_text(hjust = 0.5))