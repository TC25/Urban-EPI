Pollution_all=readtable('who-aap-database-may2016.csv');
Country_all=readtable('CountryTable_5.5.csv');
%%Sort based on country and request year
Sorted = sortrows(Country_all,[4 7],{'ascend', 'descend'});
%%Pull only the latest request year
%%Final=table(ones(1,squeeze(width(Sorted))));
Final=Sorted;
Final([2:height(Final)],:)=[];
for i=1:height(Sorted)
   if ismember(Sorted(i,4), Final(:,4));
       Final=Final;
   else
       Final=[Final; Sorted(i,:)];
   end
end
%Change column name
Final.Properties.VariableNames{'CountryName'} = 'Country';
%% Combining by country name
Combined=innerjoin(Pollution_all,Final,'Keys',{'Country'});
%% Saving data
writetable(Combined,'CombinedPM2.5.csv');
%% Checking distribution
histfit(Combined{:,31});
X=Combined{:,10};
Y=Combined{:,32};
%% Data cleaning
Y(Y<0)=NaN;
X(X<0)=NaN;
%% Scatter
scatter(Y,X,'r', 'filled');
xlabel('PM_{2.5} (?g m^{-3})','fontweight','bold');
ylabel('Median Income','fontweight','bold');
xlabel('Count','fontweight','bold');