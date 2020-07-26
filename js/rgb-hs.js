(function(factory) {
     var registerAPI = function(apiFactory) {
	 var rgbToHex = function(rgb) {
	     var result;
	     result = Math.round(rgb[0] * 255) << 16;
	     for (var index = 1; index < 3; index++) {
		 result |= Math.round(rgb[index] * 255) << (8 * (2 - index));
		   
	     }
	     return result;
	 };
	 var hexToRgb = function(rgb) {
	     var intMask;
	     intMask = [0xff0000, 0x00ff00, 0x0000ff];
	     
	     var result;
	     result = [0, 0, 0];
	     for (var index = 0; index < 3; index++) {
		 result[index] = (rgb & intMask[index]) >> (8 * (2 - index));
	     }
	     return result;
	 };

	 var toRgbArray = function(rgb) {
	     return [rgb.red, rgb.green, rgb.blue];
	 };

	 var findIndex = function(rgb, comparator) {
	     var result;
	     var index;
	     result = 0;
	     for (index = 0; index < 3; index++) {
		 if (comparator(rgb[index], rgb[result]) < 0) {
		     result = index;
		 }
	     }
	     return result;
	 };
	 var findMaxIndex = function(rgb) {
	     return findIndex
	     (rgb, 
	      function(value1, value2) { 
		  return value2 - value1;
	      });
	 };

	 var findMinIndex = function(rgb) {
	     return findIndex
	     (rgb, 
	      function(value1, value2) { 
		  return value1 - value2;
	      });
	 };

	 var calcChroma = function(rgb) {
	     var maxIndex;
	     var minIndex;
	     maxIndex = findMaxIndex(rgb);
	     minIndex = findMinIndex(rgb);
	     return {
		 value: rgb[maxIndex] - rgb[minIndex],
		 maxIndex: maxIndex,
		 minIndex: minIndex
	     };
	 };

	 var hueOperator = [
	     function(value) { return value % 6; },
	     function(value) { return value + 2; },
	     function(value) { return value + 4; }
	 ];

	 var calcHue = function(rgb, chroma) {
	     var result;
	     if (chroma.value != 0) {
		 var tempValue;
		 tempValue = rgb[(maxIndex + 1) % 3]
		     - rgb[(maxIndex + 2) % 3];
		 tempValue /= rgb[maxIndex];
		 result = hueOperator[maxIndex](tempValue);
		 result *= 60;
	     } else {
		 result = 0;
	     }
	     return result;
	 };

	 var cos30 = Math.pow(3, 0.5) / 2;
	 
	 var calcHueChroma2 = function(rgb) {
	     var alpha;
	     var beta;
	     var hue2;
	     var chroma2;
	     alpha = (2 * rgb[0] - rgb[1] - rgb[2]) / 2;
	     beta = cos30 * (rgb[1] - rgb[2]);
	     hue2 = Math.atan(alpha, beta);
	     chroma2 = Math.sqrt(alpha * alpha + beta * beta);
	     return {
		 alpha: alpha,
		 beta: beta,
		 hue2: hue2,
		 chroma2: chroma2
	     };
	 };

	 var luma = function(rgb, coefficients) {
	     var result;
	     result = rgb[0] * coefficients[0];
	     for (var index = 1; index < 3; index++) {
		 result = rgb[index] * coefficients[index];
	     }
	     return result;
	 };
	 
	 var lumaY709 = function(rgb) {
	     return luma(rgb, [.21, .72, .07]);  
	 };

	 var lumaY601 = function(rgb) {
	       return luma(rgb, [.3, .59, .11]);
	 };

	 var rgbMaxValue = function(rgb) {
	     return rgb[findMaxIndex(rgb)];
	 };

	 var rgbMinValue = function(rgb) {
	     return rgb[findMinIndex(rgb)];
	 };

	 var rgbMinMaxAverage = function(rgb) {
	     return (rgb[findMaxIndex(rgb)] + rgb[findMinIndex(rgb)]) / 2;
	 };

	 var rgbAverage = function(rgb) {
	     var result;
	     var index;
	     result = rgb[0];
	     for (index = 1; index < 3; index++) {
		 result += rgb[index];
	     }
	     return result / 3;
	 };

	 var lightness = {
	     average: rgbAverage,
	     i: rgbAverage,
	     max: rgbMaxValue,
	     v: rgbMaxValue,
	     minMaxAverage: rgbMinMaxAverage,
	     l: rgbMinMaxAverage,
	     lumaY709: lumaY709,
	     lumaY601: lumaY601,
	     luma: lumaY601
	 };

	 var saturation = {
	     i: function(rgb, chroma, i) {
		 var result;
		 if (i == 0) {
		     result = 0;
		 } else {
		     result = 1 - rgbMinValue(rgb) / i;
		 }
		 return result;
	     },
	     v: function(rgb, chroma, v) {
		 var result;
		 if (v == 0) {
		     result = 0;
		 } else {
		     result = chroma / v;
		 }
		 return result;
	     },
	     l: function(rgb, chroma, l) {
		 var result;
		 if (l == 0 || l == 1) {
		     result = 0;
		 } else {
		     result = chroma / (1 - Math.abs(2 * l - 1));
		 }
		 return result;
	     }
	 };

	 var rgb255ToRgb1 = function(rgb) {
	     return {
		 red: rgb.red / 255.0,
		 green: rgb.green / 255.0,
		 blue: rgb.blue / 255.0
	     };
	 };

	 var rgbToHsv2 = function(rgb) {
	     rgb = toRgbArray(rgb);
	     var hueChroma;
	     hueChroma = calcHueChroma2(rgb);
	     var v = lightness.v(rgb);
	     
	     var result = {
		 hue2: hueChroma.hue2,
		 chroma2: hueChroma.chroma2,
		 v: v,
		 satulation:satulation.v(rgb, chroma, v)
	     };
	     return result;
	 };

	 var rgbToHsl2 = function(rgb) {
	     rgb = toRgbArray(rgb);
	     var hueChroma;
	     hueChroma = calcHueChroma2(rgb);
	     var l = lightness.l(rgb);
	     
	     var result = {
		 hue2: hueChroma.hue2,
		 chroma2: hueChroma.chroma2,
		 l: l,
		 satulation:satulation.l(rgb, chroma, l)
	     };
	     return result;
	 };

	 var root3 = Math.sqrt(3);

	 var calcChromaRatioFromHue = function(hue) {
	     var angle;
	     angle = hue % (Math.PI / 3);
	     var raise;
	     raise = Math.tan(angle);
	     var x;
	     x = root3 / (raise + root3);
	     var y;
	     y = raise * x;
	     var result;
	     result = Math.sqrt(x * x + y * y);
	     return result;
	 };

	 var xyrvToRgb = function(x, y, r, v, vToColorValue) {
	     var theta;
	     theta = Math.atan2(y, x);
	     if (y > 0) {
		 
	     } else if (y < 0) {
		 theta = Math.PI * 2 + theta;
	     } else if (y == 0 || y == -.0) {
		 if (x < 0) {
		     theta = Math.PI * 2;
		 }
	     }
	     var xyRadius;
	     xyRadius = Math.sqrt(x * x + y * y) / r;
	     var hue;
	     hue = theta;
	     var result;
	     if (xyRadius <= 1) {
		 var chroma;
		 chroma = xyRadius / calcChromaRatioFromHue(hue);

		 var secValue;
		 var hue6;
		 hue6 = hue / (Math.PI / 3);
		 secValue = chroma * (1 - Math.abs((hue6 % 2) - 1));

		 result = [0, 0, 0];
		 if (chroma > 0) {
		     var hue6Int;
		     hue6Int = Math.floor(hue6);
		     var firstValueIndex;
		     firstValueIndex = Math.floor(((hue6Int + 1) % 6) / 2);
		     var secValueIndex;
		     secValueIndex = (6 - hue6Int + 1) % 3;
		     
		     result[firstValueIndex] = chroma;
		     result[secValueIndex] = secValue;
		 }
		 var colorValue;
		 colorValue = vToColorValue(v, chroma, result);
		 for (var i = 0; i < 3; i++) {
		     result[i] += colorValue;
		     result[i] = Math.max(result[i], 0);
		     result[i] = Math.min(result[i], 1);
		 }
	     } else {
		 result = undefined;
	     }
	     return result;
	 };

	 var vToColorValue = function(v, chroma, rgbTempValue) {
	     return v - chroma;
	 };

	 var lToColorValue = function(l, chroma, rgbTempValue) {
	     return l - chroma / 2;  
	 };

	 var lumaY709ToColorValue = function(y709, chroma, rgbTempValue) {
	     return y709 - lumaY709(rgbTempValue);
	 };

	 var lumaY601ToColorValue = function(y601, chroma, rgbTempValue) {
	     return y601 - lumaY601(rgbTempValue);
	 };

	 var isInCircle = function(x, y, radius) {
	     return Math.sqrt(x * x, y * y) < radius;
	 };

	 var indexValueToColorValueFunctions = {
	     value: vToColorValue,
	     lightness: lToColorValue,
	     lumaY601: lumaY601ToColorValue,
	     lumaY709: lumaY709ToColorValue,
	     luma: lumaY601ToColorValue
	 };


	 var createColorCircle = function
	 (radius, indexValue, 
	  notCircleValue) {
	     var diameter;
	     var result;
	     var rgbValues;
	     rgbValues = [];
	     for (var rowIndex = 0; rowIndex < 2 * radius; rowIndex++) {
		 var rowRgbValues;
		 rowRgbValues = [];
		 for (var colIndex = 0; colIndex < 2 * radius; colIndex++) {
		     var x;
		     var y;
		     x = colIndex - radius;
		     y = radius - rowIndex - 1;
		     var rgbValue;
		     rgbValue = xyrvToRgb
		     (x, y, radius, 
		      indexValue.value, 
		      indexValueToColorValueFunctions[indexValue.type]);
		     if (rgbValue != undefined) {
			 rowRgbValues[colIndex] = rgbToHex(rgbValue);
		     } else {
			 rowRgbValues[colIndex] = notCircleValue;
		     }
		 }
		 rgbValues[rowIndex] = rowRgbValues;
	     }
	     result = {
		 rgb: rgbValues,
		 row: 2 * radius,
		 col: 2 * radius
	     };
	     return result;
	 };
	 var createColorCircleProgress = function
	 (radius, indexValue, 
	  notCircleValue) {
	     var diameter;
	     diameter = 2 * radius;
	     var totalPixcels;
	     totalPixcels = 4 * radius * radius;
	     var calcRowColumnIndex = function(index) {
		 var result;
		 result = {};
		 result.row = Math.floor(index / (2 * radius));
		 result.column = index % (2 * radius);
		 return result;
	     };

	     var createColorCircleState = function() {
		 var result;
		 result = {};
		 result.stepCount = diameter;
		 result.rgb = [];
		 result.row = diameter;
		 result.col = diameter;
		 
		 result.calcRowColumnIndex = calcRowColumnIndex;
		 return result;
	     };
	     var createColorCircleRunningState = function() {
		 var result;
		 result = {};
		 result.currentIndex = 0;
		 return result;
	     };
	     var createColorCircle = function
	     (colorCircleState, colorCircleRunningState) {
		 for (var index = 0; index < colorCircleState.stepCount; 
		      index++) {
		     var rowColumn;
		     rowColumn = calcRowColumnIndex
		     (colorCircleRunningState.currentIndex);
		     var rowIndex;
		     rowIndex = rowColumn.row;
		     var colIndex;
		     colIndex = rowColumn.column;
		     
		     var rowRgbValues;
		     if (colIndex == 0) {
			 rowRgbValues = [];
			 colorCircleState.rgb[rowIndex] = rowRgbValues;
		     } else {
			 rowRgbValues = colorCircleState.rgb[rowIndex];
		     }
		     var x;
		     var y;
		     x = colIndex - radius;
		     y = radius - rowIndex - 1;
		     var rgbValue;
		     rgbValue = xyrvToRgb
		     (x, y, radius, 
		      indexValue.value, 
		      indexValueToColorValueFunctions[indexValue.type]);
		     if (rgbValue != undefined) {
			 rowRgbValues[colIndex] = rgbToHex(rgbValue);
		     } else {
			 rowRgbValues[colIndex] = notCircleValue;
		     }
		     colorCircleRunningState.currentIndex++;
		     if (colorCircleRunningState.currentIndex
			 >= totalPixcels) {
			 break;
		     }
		 }
		 
	     };
	     var createTimeoutMethod = function
	     (deferred, colorCircleState) {

		 var colorCircleRunningState;
		 colorCircleRunningState = createColorCircleRunningState();
		 var timeoutCallBack = function() {
		     if (colorCircleRunningState.currentIndex < totalPixcels) {
			 var lastIndex;
			 lastIndex = colorCircleRunningState.currentIndex;

			 createColorCircle
			 (colorCircleState, colorCircleRunningState);
			 
			 deferred.notify
			 (colorCircleState, 
			  [lastIndex, colorCircleRunningState.currentIndex]);
			 setTimeout(timeoutCallBack);
		     } else {
			 deferred.done(colorCircleState);
		     }
		 };
		 return timeoutCallBack;
	     };

	     var colorCircleState;
	     colorCircleState = createColorCircleState();
	     var startMethod = function() {
		 var deferred;

		 deferred = apiFactory.Deferred();
		 colorCircleState.start = function() {
		   return deferred.promise();  
		 };
		 var timeoutCallBack;
		 timeoutCallBack = createTimeoutMethod
		 (deferred, colorCircleState);
		 setTimeout(timeoutCallBack);
		 return deferred.promise();
	     };
	     colorCircleState.start = startMethod;
	     var result = colorCircleState;
	     return result;
	 };

	 apiFactory.rgbHs = {
	     rgbToHex: rgbToHex,
	     hexToRgb: hexToRgb,
	     toRgbArray: toRgbArray,
	     findIndex: findIndex,
	     findMaxIndex: findMaxIndex,
	     findMinIndex: findMinIndex,
	     calcChroma:calcChroma,
	     hueOperator:hueOperator,
	     calcHue:calcHue,
	     calcHueChroma2:calcHueChroma2,
	     luma:luma,
	     lumaY709:lumaY709,
	     lumaY601:lumaY601,
	     rgbMaxValue:rgbMaxValue,
	     rgbMinValue:rgbMinValue,
	     rgbMinMaxAverage:rgbMinMaxAverage,
	     rgbAverage:rgbAverage,
	     lightness:lightness,
	     saturation:saturation,
	     rgb255ToRgb1:saturation,
	     rgbToHsv2:rgbToHsv2,
	     rgbToHsl2:rgbToHsl2,
	     xyrvToRgb: xyrvToRgb,
	     vToColorValue: vToColorValue,
	     lToColorValue:lToColorValue,
	     lumaY709ToColorValue: lumaY709ToColorValue,
	     lumaY601ToColorValue: lumaY601ToColorValue,
	     isInCircle: isInCircle,
	     indexValueToColorValueFunctions: indexValueToColorValueFunctions,
	     createColorCircle: createColorCircle,
	     createColorCircleProgress: createColorCircleProgress
	 };
     };
     registerAPI(factory);
 }(jQuery));
