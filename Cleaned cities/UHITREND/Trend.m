
%First load data
for i=1:length(UHI2003)
    Data(i,:)=[UHI2003(i) UHI2004(i) UHI2005(i) UHI2006(i) UHI2007(i) UHI2008(i) UHI2009(i) UHI2010(i) UHI2011(i)];
end
%Create array for years
t=[2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011]
for i=1:length(UHI2003)
    d(i,:) = polyfit(t,Data(i,:), 1);
    trend(i,:) = polyval(d(i,:), t);
end

%plot(trend')

%mean(d(:,1))
X=d(:,1)*10