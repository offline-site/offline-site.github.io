//========================================Source_ORI========================================
/**
*
*  Base64 encode / decode
*  http://www.webtoolkit.info/
*
**/

var Base64 = 
{
//========================================_keyStr========================================
	// private property
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
//========================================_keyStr========================================
//========================================encode_mod_+_decode_mod_SD========================================
	// public method for encoding
	encode_mod : function (input)
	{
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;

		//input = Base64._utf8_encode(input);

		while ( i < input.length )
		{
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);

			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;

			if ( isNaN(chr2) )			{enc3 = enc4 = 64;}
			else if ( isNaN(chr3) )		{enc4 = 64;}

			output = output + 
			this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + 
			this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
		}

		return output;
	},

	// public method for decoding
	decode_mod : function (input)
	{
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;

		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

		while ( i < input.length )
		{
			enc1 = this._keyStr.indexOf(input.charAt(i++));
			enc2 = this._keyStr.indexOf(input.charAt(i++));
			enc3 = this._keyStr.indexOf(input.charAt(i++));
			enc4 = this._keyStr.indexOf(input.charAt(i++));

			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;

			output = output + String.fromCharCode(chr1);

			if ( enc3 != 64 )		{output = output + String.fromCharCode(chr2);}
			if ( enc4 != 64 )		{output = output + String.fromCharCode(chr3);}
		}

		//output = Base64._utf8_decode(output);

		return output;

	},
//========================================encode_mod_+_decode_mod_SD========================================
//========================================encode_ori_+_decode_ori_SD========================================
	// public method for encoding
	encode_ori : function (input)
	{
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;

		input = Base64._utf8_encode(input);

		while ( i < input.length )
		{
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);

			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;

			if ( isNaN(chr2) )			{enc3 = enc4 = 64;}
			else if ( isNaN(chr3) )		{enc4 = 64;}

			output = output + 
			this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + 
			this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
		}

		return output;
	},

	// public method for decoding
	decode_ori : function (input)
	{
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;

		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

		while ( i < input.length )
		{
			enc1 = this._keyStr.indexOf(input.charAt(i++));
			enc2 = this._keyStr.indexOf(input.charAt(i++));
			enc3 = this._keyStr.indexOf(input.charAt(i++));
			enc4 = this._keyStr.indexOf(input.charAt(i++));

			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;

			output = output + String.fromCharCode(chr1);

			if ( enc3 != 64 )		{output = output + String.fromCharCode(chr2);}
			if ( enc4 != 64 )		{output = output + String.fromCharCode(chr3);}
		}

		output = Base64._utf8_decode(output);

		return output;

	},
//========================================encode_ori_+_decode_ori_SD========================================
//========================================_utf8_encode_ori_+__utf8_decode_ori_SD========================================
	// private method for UTF-8 encoding
	_utf8_encode : function (string)
	{
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";

		for (var n = 0; n < string.length; n++)
		{
			var c = string.charCodeAt(n);

			if ( c < 128 )
			{
				utftext += String.fromCharCode(c);
			}
			else if ( (c > 127) && (c < 2048) )
			{
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else
			{
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
		}

		return utftext;
	},

	// private method for UTF-8 decoding
	_utf8_decode : function (utftext)
	{
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;

		while ( i < utftext.length )
		{
			c = utftext.charCodeAt(i);

			if ( c < 128 )
			{
				string += String.fromCharCode(c);
				i++;
			}
			else if ( (c > 191) && (c < 224) )
			{
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else
			{
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
		}

		return string;
	},
//========================================_utf8_encode_ori_+__utf8_decode_ori_SD========================================
//========================================encode_ori_utf_8_mod_01_SD========================================
	encode_ori_utf_8_mod_01 : function (input)
	{
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;

		input = Base64._utf8_encode_mod_01(input);

		while ( i < input.length )
		{
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);

			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;

			if ( isNaN(chr2) )			{enc3 = enc4 = 64;}
			else if ( isNaN(chr3) )		{enc4 = 64;}

			output = output + 
			this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + 
			this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
		}

		return output;
	},

	// private method for UTF-8 encoding
	_utf8_encode_mod_01 : function (string)//"\r\n";
	{
		//string = string.replace(/\r\n/g,"\n");
		var utftext = "";

		for (var n = 0; n < string.length; n++)
		{
			var c = string.charCodeAt(n);

			if ( c < 128 )
			{
				utftext += String.fromCharCode(c);
			}
			else if ( (c > 127) && (c < 2048) )
			{
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else
			{
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
		}

		return utftext;
	},
//========================================encode_ori_utf_8_mod_01_SD========================================
//========================================encode_+_decode_SD========================================
	//Failure :
	//encode : Base64.encode_mod,
	//decode : Base64.decode_mod

	//encode : null,
	//decode : null
	// public method for encoding

	encode : function (input)
	{
		var output;
		output = btoa(input);//"binary to ASCII";
		//output = Base64.encode_mod(input);//Same to btoa(input);
		//output = Base64.encode_ori(input);

		return output;
	},
	decode : function (input)
	{
		var output;
		output = atob(input);//"ASCII to binary";
		//output = Base64.decode_mod(input);//Same to atob(input);
		//output = Base64.decode_ori(input);

		return output;
	}
//========================================encode_decode_SD========================================
};
//Base64.encode=Base64.encode_mod;
//Base64.decode=Base64.decode_mod;
//========================================Source_ORI========================================
//========================================Source_MOD========================================
//Base64.encode("");Base64.decode("");
//base64.encode("");base64.decode("");

var base64;
base64=Base64;

//console.log(base64.encode_mod);
//console.log(base64.encode);
//========================================Source_MOD========================================
