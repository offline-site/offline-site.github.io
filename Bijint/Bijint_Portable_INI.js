//var Bijint_Table_ID_Inuse;
Bijint_Table_ID_Inuse=[0,0,0,0,0];
Bijint_Table_ID_Inuse=[1,1,1,1,1];
//IE7-IE11:
//Bijint_Table_ID_Inuse=[1,0,0,0,0];
//Bijint_Table_ID_Inuse=[1,1,0,0,0];
//Bijint_Table_ID_Inuse=[1,1,1,0,0];
if ( Browser_Type=="MSIE" && parseInt(Browser_Ver,10)>=7 && parseInt(Browser_Ver,10)<10 )
{
	//IE7-IE9:
	Bijint_Table_ID_Inuse=[1,0,0,0,0];
	//Bijint_Table_ID_Inuse=[1,1,0,0,0];
	//Bijint_Table_ID_Inuse=[1,1,1,0,0];
}
else if ( Browser_Type=="MSIE" && parseInt(Browser_Ver,10)>=10 )
{
	//IE10-IE11:
	Bijint_Table_ID_Inuse=[1,1,1,0,0];
}
else if ( Browser_Type=="Chrome" || Browser_Type=="OPR" || 
			Browser_Type=="Firefox" || Browser_Type=="SeaMonkey" || Browser_Type=="Waterfox" || 
			Browser_Type=="Safari" )
{
	Bijint_Table_ID_Inuse=[1,1,1,1,1];
}
else
{
	Bijint_Table_ID_Inuse=[1,0,0,0,0];
}
