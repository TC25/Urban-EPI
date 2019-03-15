for i=1:length(TL_2001)
    Data(i,:)=[TL_2001(i) TL_2002(i) TL_2003(i) TL_2004(i) TL_2005(i) TL_2006(i) TL_2007(i) TL_2008(i) TL_2009(i) TL_2010(i) TL_2011(i) TL_2012(i) TL_2013(i) TL_2014(i) TL_2015(i) TL_2016(i)];
end

t=[2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016]
for i=1:length(TL_2001)
    d(i,:) = polyfit(t,Data(i,:), 1);
    trend(i,:) = polyval(d(i,:), t);
end

%plot(trend')

%mean(d(:,1))
X=d(:,1)*10