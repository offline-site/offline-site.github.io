//========================================Self_Define========================================
//return String.fromCharCode.apply(null,new Uint8Array(buf));
//Uncaught RangeError: Maximum call stack size exceeded
//return String.fromCharCode.apply(null,new Uint16Array(buf));
//Uncaught RangeError: byte length of Uint16Array should be a multiple of 2
//return String.fromCharCode.apply(null,new Uint32Array(buf));
//Uncaught RangeError: byte length of Uint16Array should be a multiple of 4
//====================ArrayBuffer_<-->_BinaryString====================
function readAs_ArrayBuffer_2_BinaryString(buf)
{
	//====================ORI_Source_Code====================
	//return String.fromCharCode.apply(null,new Uint8Array(buf));
	//Uncaught RangeError: Maximum call stack size exceeded
	//====================ORI_Source_Code====================

	var str = "";
	var bufView = new Uint8Array(buf);
	for (var i=0;i<bufView.length;i++)
	{
		str+=String.fromCharCode(bufView[i]);
	}
	//console.log(str.length + "\n" + str + "\n" + bufView);
	return str;
}

function readAs_BinaryString_2_ArrayBuffer(str)
{
	var buf = new ArrayBuffer(str.length);
	var bufView = new Uint8Array(buf);
	for (var i=0;i<str.length;i++)
	{
		bufView[i] = str.charCodeAt(i);
	}
	//console.log(str.length + "\n" + str + "\n" + bufView);
	return buf;
}
//====================ArrayBuffer_<-->_BinaryString====================
//====================ArrayBuffer_<-->_Text====================
function readAs_ArrayBuffer_2_Text(buf)
{
	//====================ORI_Source_Code====================
	//return String.fromCharCode.apply(null,new Uint16Array(buf));
	//Uncaught RangeError: byte length of Uint16Array should be a multiple of 2
	//====================ORI_Source_Code====================
	//return undefined;

	var str = "";
	var bufView = new Uint16Array(buf);
	for (var i=0;i<bufView.length;i++)
	{
		str+=String.fromCharCode(bufView[i]);
	}
	//console.log(str.length + "\n" + str + "\n" + bufView);
	return str;
}

//readAsText : ORI text is utf-8 or unicode , js readAsText result is unicode format .
function readAs_Text_2_ArrayBuffer(str)//Function is right .
{
	if ( str[0]!=String.fromCharCode(0xFEFF) )	{str=String.fromCharCode(0xFEFF) + str;}//"FFFE......" : Unicode .
	//if ( str[0]!=String.fromCharCode(0xFFFE) )	{str=String.fromCharCode(0xFFFE) + str;}//"FEFF......" : Unicode big endian .

	var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
	var bufView = new Uint16Array(buf);
	for (var i=0;i<str.length;i++)
	{
		bufView[i] = str.charCodeAt(i);
	}
	//console.log(str.length + "\n" + str + "\n" + bufView);
	return buf;
}

//readAsText : ORI text is utf-8 or unicode , js readAsText result is unicode format .
function readAs_Text_2_ArrayBuffer_Uint_8_16_24_32___01(str)//Function is right .
{
	//var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
	//var bufView = new Uint16Array(buf);

	if ( str[0]!=String.fromCharCode(0xFEFF) )	{str=String.fromCharCode(0xFEFF) + str;}//"FFFE......" : Unicode .
	//if ( str[0]!=String.fromCharCode(0xFFFE) )	{str=String.fromCharCode(0xFFFE) + str;}//"FEFF......" : Unicode big endian .

	//utf8bytes = unescape(encodeURIComponent(unicodecharacters));
	//unicodecharacters = decodeURIComponent(escape(utf8bytes));
	//str=unescape(encodeURIComponent(str));//???

	var i,j,strLen;
	for (i=0,strLen=0;i<str.length;i++)
	{
		if ( str.charCodeAt(i)>0 && str.charCodeAt(i)<256 )//0-2^8
		//{strLen++;}
		{strLen+=2;}
		else if ( str.charCodeAt(i)>=256 && str.charCodeAt(i)<65536 )//2^8-2^16
		{strLen+=2;}
		else if ( str.charCodeAt(i)>=65536 && str.charCodeAt(i)<16777216 )//2^16-2^24
		{strLen+=3;}
		else if ( str.charCodeAt(i)>=16777216 && str.charCodeAt(i)<4294967296 )//2^24-2^32
		{strLen+=4;}
		else		{}
	}

	var buf = new ArrayBuffer(strLen);
	var bufView = new Uint8Array(buf);

	for (i=0,j=0;i<str.length && j<strLen;i++)
	{
		if ( str.charCodeAt(i)>0 && str.charCodeAt(i)<256 )//0-2^8
		{
			//bufView[j] = str.charCodeAt(i);
			//j++;
			bufView[j] = str.charCodeAt(i) & 0xFF;
			bufView[j+1] = (str.charCodeAt(i) & 0xFF00)>>8;
			j+=2;
		}
		else if ( str.charCodeAt(i)>=256 && str.charCodeAt(i)<65536 )//2^8-2^16
		{
			bufView[j] = str.charCodeAt(i) & 0xFF;
			bufView[j+1] = (str.charCodeAt(i) & 0xFF00)>>8;
			j+=2;
		}
		else if ( str.charCodeAt(i)>=65536 && str.charCodeAt(i)<16777216 )//2^16-2^24
		{
			bufView[j] = str.charCodeAt(i) & 0xFF;
			bufView[j+1] = (str.charCodeAt(i) & 0xFF00)>>8;
			bufView[j+2] = (str.charCodeAt(i) & 0xFF0000)>>16;
			j+=3;
		}
		else if ( str.charCodeAt(i)>=16777216 && str.charCodeAt(i)<4294967296 )//2^24-2^32
		{
			bufView[j] = str.charCodeAt(i) & 0xFF;
			bufView[j+1] = (str.charCodeAt(i) & 0xFF00)>>8;
			bufView[j+2] = (str.charCodeAt(i) & 0xFF0000)>>16;
			bufView[j+3] = (str.charCodeAt(i) & 0xFF000000)>>24;
			j+=4;
		}
		else		{}
	}
	//console.log(str.length + "\n" + str + "\n" + bufView);
	return buf;
}

function readAs_Text_2_ArrayBuffer_Uint_8_16_24_32___00(str)//Function error.
{
	//var buf = new ArrayBuffer(str.length); // 2 bytes for each char
	//var bufView = new Uint16Array(buf);

	var i,j,strLen;
	for (i=0,strLen=0;i<str.length;i++)
	{
		if ( str.charCodeAt(i)>0 && str.charCodeAt(i)<256 )//0-2^8
		{strLen++;}
		else if ( str.charCodeAt(i)>=256 && str.charCodeAt(i)<65536 )//2^8-2^16
		{strLen+=2;}
		else if ( str.charCodeAt(i)>=65536 && str.charCodeAt(i)<16777216 )//2^16-2^24
		{strLen+=3;}
		else if ( str.charCodeAt(i)>=16777216 && str.charCodeAt(i)<4294967296 )//2^24-2^32
		{strLen+=4;}
		else		{}
	}

	var buf = new ArrayBuffer(strLen);
	var bufView = new Uint8Array(buf);
	for (i=0,j=0;i<str.length && j<strLen;i++)
	{
		if ( str.charCodeAt(i)>0 && str.charCodeAt(i)<256 )//0-2^8
		{
			bufView[j] = str.charCodeAt(i);
			j++;
		}
		else if ( str.charCodeAt(i)>=256 && str.charCodeAt(i)<65536 )//2^8-2^16
		{
			bufView[j] = str.charCodeAt(i) & 0xFF;
			bufView[j+1] = (str.charCodeAt(i) & 0xFF00)>>8;
			j+=2;
		}
		else if ( str.charCodeAt(i)>=65536 && str.charCodeAt(i)<16777216 )//2^16-2^24
		{
			bufView[j] = str.charCodeAt(i) & 0xFF;
			bufView[j+1] = (str.charCodeAt(i) & 0xFF00)>>8;
			bufView[j+2] = (str.charCodeAt(i) & 0xFF0000)>>16;
			j+=3;
		}
		else if ( str.charCodeAt(i)>=16777216 && str.charCodeAt(i)<4294967296 )//2^24-2^32
		{
			bufView[j] = str.charCodeAt(i) & 0xFF;
			bufView[j+1] = (str.charCodeAt(i) & 0xFF00)>>8;
			bufView[j+2] = (str.charCodeAt(i) & 0xFF0000)>>16;
			bufView[j+3] = (str.charCodeAt(i) & 0xFF000000)>>24;
			j+=4;
		}
		else		{}
	}
	//console.log(str.length + "\n" + str + "\n" + bufView);
	return buf;
}

/*
TEST Result : readAs_Text_2_ArrayBuffer_Uint_8_16_24_32___01
========================================00_中文.txt========================================
var i,arr;
arr=[176,101,250,94,135,101,44,103,135,101,99,104,13,10,85,84,70,45,56,13,10];
for (i=0;i<arr.length;i++)
{
	arr[i]=arr[i].toString(16);
}
console.log(arr);
["B0", "65", "FA", "5E", "87", "65", "2C", "67", "87", "65", "63", "68", "0D", "0A", "55", "54", "46", "2D", "38", "0D", "0A"]
["E6", "96", "B0", "E5", "BB", "BA", "E6", "96", "87", "E6", "9C", "AC", "E6", "96", "87", "E6", "A1", "A3", "0D", "0A", "55", "54", "46", "2D", "38", "0D", "0A"]
==========Content(Failure)==========
新建文本文档

==========Content(Failure)==========
Failure
========================================00_中文.txt========================================
========================================02_UTF-8.txt========================================
var i,arr;
arr=[176,101,250,94,135,101,44,103,135,101,99,104,13,10,85,84,70,45,56,13,10];
for (i=0;i<arr.length;i++)
{
	arr[i]=arr[i].toString(16);
}
console.log(arr);
["B0", "65", "FA", "5E", "87", "65", "2C", "67", "87", "65", "63", "68", "0D", "0A", "55", "54", "46", "2D", "38", "0D", "0A"]
["E6", "96", "B0", "E5", "BB", "BA", "E6", "96", "87", "E6", "9C", "AC", "E6", "96", "87", "E6", "A1", "A3", "0D", "0A", "55", "54", "46", "2D", "38", "0D", "0A"]
==========Content==========
新建文本文档
UTF-8

==========Content==========
========================================02_UTF-8.txt========================================
========================================03_Unicode.txt========================================
var i,arr;
arr=[176,101,250,94,135,101,44,103,135,101,99,104,13,10,85,110,105,99,111,100,101,13,10];
for (i=0;i<arr.length;i++)
{
	arr[i]=arr[i].toString(16);
}
console.log(arr);
["B0", "65", "FA", "5E", "87", "65", "2C", "67", "87", "65", "63", "68", "0D", "0A", "55", "6E", "69", "63", "6F", "64", "65", "0D", "0A"]
["B0", "65", "FA", "5E", "87", "65", "2C", "67", "87", "65", "63", "68", "0D", "00", "0A", "00", "55", "00", "6E", "00", "69", "00", "63", "00", "6F", "00", "64", "00", "65", "00", "0D", "00", "0A", "00", ""]
==========Content==========
新建文本文档
Unicode

==========Content==========
========================================03_Unicode.txt========================================
*/
//====================ArrayBuffer_<-->_Text====================
//====================BinaryString_<-->_DataURL====================
function readAs_BinaryString_2_DataURL(str)
{
	var url;
	url = btoa(str);//"binary to ASCII";//PHP : base64_encode("");

	//console.log(url.length + "\n" + url + "\n");
	return url;
}

function readAs_BinaryString_2_DataURL_UTF_8(str)
{
	var url;
	url = base64.encode_ori(str);

	//console.log(url.length + "\n" + url + "\n");
	return url;
}

//var DataURL_RegExp=new RegExp("^data:(text|image|application)\/(plain|gif|jpeg|png|x-icon|octet-stream);base64,","gm");
function DataURL_No_Prefix(url)
{
	url=url.replace(/^data:,/gm,"").replace(/^data:(text|image|application)\/(plain|gif|jpeg|png|x-icon|octet-stream);base64,/gm,"");
	return url;
}

function readAs_DataURL_2_BinaryString(url)
{
	url=url.replace(/^data:,/gm,"").replace(/^data:(text|image|application)\/(plain|gif|jpeg|png|x-icon|octet-stream);base64,/gm,"");

	var str;
	str = atob(url);//"ASCII to binary";//PHP : base64_decode("");

	//console.log(str.length + "\n" + str + "\n");
	return str;
}

function readAs_DataURL_2_BinaryString_UTF_8(url)
{
	url=url.replace(/^data:,/gm,"").replace(/^data:(text|image|application)\/(plain|gif|jpeg|png|x-icon|octet-stream);base64,/gm,"");

	var str;
	str = base64.decode_ori(url);

	//console.log(str.length + "\n" + str + "\n");
	return str;
}
//====================BinaryString_<-->_DataURL====================
//========================================Self_Define========================================
//========================================ORI_Source_Code_Form_Network========================================
/*
function readAs_ArrayBuffer_2_BinaryString(buf)
{
	return String.fromCharCode.apply(null, new Uint8Array(buf));
}

function readAs_BinaryString_2_ArrayBuffer(str)
{
	var buf = new ArrayBuffer(str.length);
	var bufView = new Uint8Array(buf);
	for (var i=0, strLen=str.length; i < strLen; i++)
	{
		bufView[i] = str.charCodeAt(i);
	}
	console.log(str.length + "\n" + str + "\n" + bufView);
	return buf;
}

function readAs_ArrayBuffer_2_Text(buf)
{
	return String.fromCharCode.apply(null, new Uint16Array(buf));
}

function readAs_Text_2_ArrayBuffer(str)
{
	var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
	var bufView = new Uint16Array(buf);
	for (var i=0, strLen=str.length; i < strLen; i++)
	{
		bufView[i] = str.charCodeAt(i);
	}
	console.log(str.length + "\n" + str + "\n" + bufView);
	return buf;
}
*/
//========================================ORI_Source_Code_Form_Network========================================
