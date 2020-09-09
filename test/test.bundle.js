/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/color-test.less":
/*!*****************************!*\
  !*** ./src/color-test.less ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/color-test.ts":
/*!***************************!*\
  !*** ./src/color-test.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _this3 = this;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var ui_1 = __webpack_require__(/*! ./ui */ "./src/ui.ts");
/**
 * test user interface
 */


var ColorPickerTest = /*#__PURE__*/function () {
  /**
   * constructor
   */
  function ColorPickerTest() {
    _classCallCheck(this, ColorPickerTest);

    this.syncWithInput = true;
    this.syncWithMarker = true;
    this.inputRestoringValue = false;
  }
  /**
   * find color input item
   */


  _createClass(ColorPickerTest, [{
    key: "bind",

    /**
     * atatch this object into html element.
     */
    value: function bind() {
      var _this = this;

      this.inputHdlr = function (event) {
        this.onInput(event);
      }.bind(this);

      this.pickerHdlr = function (event) {
        this.onMarkColorChanged(event);
      }.bind(this);

      var colorClasses = ["red", "green", "blue"];
      colorClasses.forEach(function (className) {
        var item = ColorPickerTest.findColorInput(className);

        if (item) {
          item.addEventListener('input', _this.inputHdlr);
        }
      });
      var ui = new ui_1.UI();
      ui.bind(document.body.getElementsByClassName('color-picker')[0]);
      ui.addEventListener(null, this.pickerHdlr);
      this.colorPickerUI = ui;
    }
    /**
     * detatch this object into html element.
     */

  }, {
    key: "unbind",
    value: function unbind() {
      var _this2 = this;

      if (this.inputHdlr) {
        var colorClasses = ["red", "green", "blue"];
        colorClasses.forEach(function (className) {
          var item = ColorPickerTest.findColorInput(className);

          if (item) {
            item.removeEventListener('input', _this2.inputHdlr);
          }
        });
        this.inputHdlr = undefined;
      }

      if (this.pickerHdlr) {
        var ui = this.colorPickerUI;
        ui.unbind();
        ui.removeEventListener(null, this.pickerHdlr);
        this.pickerHdlr = undefined;
      }
    }
    /**
     * handle input event
     */

  }, {
    key: "onInput",
    value: function onInput(event) {
      var elem = event.target;
      var compValue = parseInt(elem.value);

      if (!this.inputRestoringValue) {
        if (!isNaN(compValue)) {
          this.postSyncColorPickerMarkerWithInput();
        } else {
          setTimeout(function () {
            var savedState = this.inputRestoringValue;
            this.inputRestoringValue = true;
            elem.value = elem.dataset.lastvalue;
            this.inputRestoringValue = savedState;
          }.bind(this));
        }
      }
    }
    /**
     * handle color picker event
     */

  }, {
    key: "onMarkColorChanged",
    value: function onMarkColorChanged(event) {
      if ('pickerLocation' == event.type || 'indexValue' == event.type) {
        this.postSyncInputWithColorPickerMarker();
      }
    }
    /**
     * synchronzie color picker marker with input rgb.
     */

  }, {
    key: "postSyncColorPickerMarkerWithInput",
    value: function postSyncColorPickerMarkerWithInput() {
      setTimeout(function () {
        this.syncColorPickerMarkerWithInput();
      }.bind(this));
    }
    /**
     * synchronzie color picker marker with input rgb.
     */

  }, {
    key: "syncColorPickerMarkerWithInput",
    value: function syncColorPickerMarkerWithInput() {
      var savedState = this.syncWithMarker;
      this.syncWithMarker = false;
      var newColor = this.inputColor;

      if (newColor) {
        this.markColorUI = newColor;
      }

      this.syncWithMarker = savedState;
    }
    /**
     * synchronize input color with color picker marker
     */

  }, {
    key: "postSyncInputWithColorPickerMarker",
    value: function postSyncInputWithColorPickerMarker() {
      this.syncInputWithColorPickerMarker();
    }
    /**
     * synchronize input color with color picker marker
     */

  }, {
    key: "syncInputWithColorPickerMarker",
    value: function syncInputWithColorPickerMarker() {
      var savedStatus = this.syncWithInput;
      this.syncWithInput = false;
      var markColor = this.markColorUI;

      if (markColor) {
        this.inputColor = markColor;
      }

      this.syncWithInput = savedStatus;
    }
  }, {
    key: "inputRed",

    /**
     * red color in input user interface
     */
    get: function get() {
      var colorUI = ColorPickerTest.findColorInput('red');
      var result = undefined;

      if (colorUI != null) {
        result = parseInt(colorUI.value);
      }

      return result;
    }
    /**
     * red color in input user interface
     */
    ,
    set: function set(value) {
      var newValue = Math.min(Math.max(value, 0), 0xff);

      if (newValue != this.inputRed) {
        var colorUI = ColorPickerTest.findColorInput('red');

        if (colorUI != null) {
          colorUI.value = value.toString();
        }

        if (this.syncWithInput) {
          this.postSyncColorPickerMarkerWithInput();
        }
      }
    }
    /**
     * green color in input user interface
     */

  }, {
    key: "inputGreen",
    get: function get() {
      var colorUI = ColorPickerTest.findColorInput('green');
      var result = undefined;

      if (colorUI != null) {
        result = parseInt(colorUI.value);
      }

      return result;
    }
    /**
     * green color in input user interface
     */
    ,
    set: function set(value) {
      var newValue = Math.min(Math.max(value, 0), 0xff);

      if (newValue != this.inputGreen) {
        var colorUI = ColorPickerTest.findColorInput('green');

        if (colorUI != null) {
          colorUI.value = value.toString();
        }

        if (this.syncWithInput) {
          this.postSyncColorPickerMarkerWithInput();
        }
      }
    }
    /**
     * blue color in input user interface
     */

  }, {
    key: "inputBlue",
    get: function get() {
      var colorUI = ColorPickerTest.findColorInput('blue');
      var result = undefined;

      if (colorUI != null) {
        result = parseInt(colorUI.value);
      }

      return result;
    }
    /**
     * green color in input user interface
     */
    ,
    set: function set(value) {
      var newValue = Math.min(Math.max(value, 0), 0xff);

      if (newValue != this.inputBlue) {
        var colorUI = ColorPickerTest.findColorInput('blue');

        if (colorUI != null) {
          colorUI.value = value.toString();
        }

        if (this.syncWithInput) {
          this.postSyncColorPickerMarkerWithInput();
        }
      }
    }
    /**
     * rgb input color
     */

  }, {
    key: "inputColor",
    set: function set(rgb) {
      var thisRgb = this.inputColor;

      if (thisRgb) {
        if (!ColorPickerTest.isEqualRgb(thisRgb, rgb)) {
          var savedState = this.syncWithInput;
          this.syncWithInput = false;

          if (rgb.length > 0) {
            this.inputRed = rgb[0];
          }

          if (rgb.length > 1) {
            this.inputGreen = rgb[1];
          }

          if (rgb.length > 2) {
            this.inputBlue = rgb[2];
          }

          if (savedState) {
            this.postSyncColorPickerMarkerWithInput();
          }

          this.syncWithInput = savedState;
        }
      }
    }
    /**
     * rgb input color
     */
    ,
    get: function get() {
      var red = this.inputRed;
      var green = this.inputGreen;
      var blue = this.inputBlue;
      var result = undefined;

      if (typeof red !== 'undefined' && typeof green !== 'undefined' && typeof blue !== 'undefined') {
        result = [red, green, blue];
      }

      return result;
    }
    /**
     * user inteface mark color
     */

  }, {
    key: "markColorUI",
    set: function set(rgb) {
      var picker = this.colorPickerUI;

      if (picker != null) {
        picker.markColor = rgb;
      }
    }
    /**
     * user inteface mark color
     */
    ,
    get: function get() {
      var picker = this.colorPickerUI;
      var result = undefined;

      if (picker != null) {
        result = picker.markColor;
      }

      return result;
    }
  }], [{
    key: "findColorInput",
    value: function findColorInput(className) {
      var controls = document.getElementsByClassName("color-controls");
      var result = undefined;

      if (controls.length > 0) {
        var colorItems = controls[0].getElementsByClassName(className);

        if (colorItems.length > 0) {
          result = colorItems[0];
        }
      }

      return result;
    }
    /**
     * you get true if rgb1 equals rgb2
     */

  }, {
    key: "isEqualRgb",
    value: function isEqualRgb(rgb1, rgb2) {
      var result = true;

      for (var i = 0; i < Math.min(rgb1.length, rgb2.length); i++) {
        if (rgb1[i] != rgb2[i]) {
          result = false;
          break;
        }
      }

      return result;
    }
  }]);

  return ColorPickerTest;
}();

if (typeof window !== 'undefined') {
  var colorPickerTest = new ColorPickerTest();
  var savedLoad = window.onload;

  var handleUnload = function handleUnload() {
    colorPickerTest.unbind();
  };

  var initialSetting = function initialSetting() {
    var testColor = [0x38, 0xbb, 0xda, 0xff];
    colorPickerTest.markColorUI = testColor;
  };

  var handleLoad = function handleLoad(event) {
    if (typeof savedLoad === 'function') {
      savedLoad.call(_this3, event);
    }

    colorPickerTest.bind();
    setTimeout(initialSetting);
    window.addEventListener('onunload', handleUnload);
  };

  window.onload = handleLoad;
} // vi: se ts=2 sw=2 et:

/***/ }),

/***/ "./src/rgb-hs.ts":
/*!***********************!*\
  !*** ./src/rgb-hs.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RgbHs = void 0;
/**
 * rgb hsv management
 */

var RgbHs = /*#__PURE__*/function () {
  function RgbHs() {
    _classCallCheck(this, RgbHs);
  }

  _createClass(RgbHs, null, [{
    key: "rgbToHex",

    /**
     * convert from rgb to hex
     * @param {number[]} rgb
     * @return {number}
     */
    value: function rgbToHex(rgb) {
      var result;
      result = Math.round(rgb[0] * 255) << 16;

      for (var index = 1; index < 3; index++) {
        result |= Math.round(rgb[index] * 255) << 8 * (2 - index);
      }

      return result;
    }
    /**
     * convert hex to rgb
     * @param {number} rgb
     * @return {number[]}
     */

  }, {
    key: "hexToRgb",
    value: function hexToRgb(rgb) {
      var intMask;
      intMask = [0xff0000, 0x00ff00, 0x0000ff];
      var result;
      result = [0, 0, 0];

      for (var index = 0; index < 3; index++) {
        result[index] = (rgb & intMask[index]) >> 8 * (2 - index);
      }

      return result;
    }
    /**
     * convert from rgb to array
     * @param {{red: number, green: number, blue: number}} rgb
     * @return {number[]}
     */

  }, {
    key: "toRgbArray",
    value: function toRgbArray(rgb) {
      return [rgb.red, rgb.green, rgb.blue];
    }
    /**
     * find index
     * @param {number[]} rgb
     * @param {(a: number, b: number) => number} comparator
     */

  }, {
    key: "findIndex",
    value: function findIndex(rgb, comparator) {
      var result;
      var index;
      result = 0;

      for (index = 0; index < 3; index++) {
        if (comparator(rgb[index], rgb[result]) < 0) {
          result = index;
        }
      }

      return result;
    }
    /**
     * find max index
     * @param {number[]} rgb
     */

  }, {
    key: "findMaxIndex",
    value: function findMaxIndex(rgb) {
      return RgbHs.findIndex(rgb, function (value1, value2) {
        return value2 - value1;
      });
    }
    /**
     * find minimum index
     * @param {number[]} rgb
     */

  }, {
    key: "findMinIndex",
    value: function findMinIndex(rgb) {
      return RgbHs.findIndex(rgb, function (value1, value2) {
        return value1 - value2;
      });
    }
    /**
     * calculate chroma
     * @param {number[]} rgb
     * @return {{value: number, maxIndex: number,  minIndex: number}}
     */

  }, {
    key: "calcChroma",
    value: function calcChroma(rgb) {
      var maxIndex = RgbHs.findMaxIndex(rgb);
      var minIndex = RgbHs.findMinIndex(rgb);
      return {
        value: rgb[maxIndex] - rgb[minIndex],
        maxIndex: maxIndex,
        minIndex: minIndex
      };
    }
    /**
     * heu operator
     * @return {((v: number) => number)[]}
     */

  }, {
    key: "calcHue",

    /**
     * calculate hue
     * @param {number[]} rgb
     * @param {{maxIndex: number}} chroma
     * @return {number} hue
     */
    value: function calcHue(rgb, chroma) {
      var result;

      if (chroma.value != 0) {
        var tempValue;
        tempValue = rgb[(chroma.maxIndex + 1) % 3] - rgb[(chroma.maxIndex + 2) % 3];
        tempValue /= chroma.value;
        result = RgbHs.hueOperator[chroma.maxIndex](tempValue);
        result *= 60;
      } else {
        result = 0;
      }

      return result;
    }
    /**
     * calculate hue and chroma
     * @param {number[]} rgb
     * @return {{chroma: {value: number, maxIndex: number, minIndex: number},
     *           hue: number}}
     */

  }, {
    key: "calcHueChroma",
    value: function calcHueChroma(rgb) {
      var chroma = RgbHs.calcChroma(rgb);
      var hue = RgbHs.calcHue(rgb, chroma);
      return {
        chroma: chroma,
        hue: hue
      };
    }
    /**
     * calculate hue and chroma with hexagonal mode
     * @param {number[]} rgb
     * @return {{alpha: number, beta: number, hue2: number, chroma2: number}}
     */

  }, {
    key: "calcHueChroma2",
    value: function calcHueChroma2(rgb) {
      var alpha = (2 * rgb[0] - rgb[1] - rgb[2]) / 2;
      var cos30 = Math.pow(3, 0.5) / 2;
      var beta = cos30 * (rgb[1] - rgb[2]);
      var hue2 = Math.atan2(alpha, beta);
      var chroma2 = Math.sqrt(alpha * alpha + beta * beta);
      return {
        alpha: alpha,
        beta: beta,
        hue2: hue2,
        chroma2: chroma2
      };
    }
    /**
     * calculate luma
     * @param {number[]} rgb
     * @param {number[]} coefficients
     * @return {number} luma value
     */

  }, {
    key: "luma",
    value: function luma(rgb, coefficients) {
      var result;
      result = rgb[0] * coefficients[0];

      for (var index = 1; index < 3; index++) {
        result = rgb[index] * coefficients[index];
      }

      return result;
    }
    /**
     * calculate luma y 709
     * @param {number[]} rgb
     * @return {number} luma value
     */

  }, {
    key: "lumaY709",
    value: function lumaY709(rgb) {
      return RgbHs.luma(rgb, [.21, .72, .07]);
    }
    /**
     * calculate luma y 601
     * @param {number[]} rgb
     * @return {number} luma value
     */

  }, {
    key: "lumaY601",
    value: function lumaY601(rgb) {
      return RgbHs.luma(rgb, [.3, .59, .11]);
    }
    /**
     * get maximum value of rgb component
     * @param {number[]} rgb
     * @return {number}
     */

  }, {
    key: "rgbMaxValue",
    value: function rgbMaxValue(rgb) {
      return rgb[RgbHs.findMaxIndex(rgb)];
    }
    /**
     * get minimum value of rgb component
     * @param {number[]} rgb
     * @return {number}
     */

  }, {
    key: "rgbMinValue",
    value: function rgbMinValue(rgb) {
      return rgb[RgbHs.findMinIndex(rgb)];
    }
    /**
     * calculate average between max and min value of rgb component
     * @param {number[]} rgb
     * @return {number}
     */

  }, {
    key: "rgbMinMaxAverage",
    value: function rgbMinMaxAverage(rgb) {
      return (rgb[RgbHs.findMaxIndex(rgb)] + rgb[RgbHs.findMinIndex(rgb)]) / 2;
    }
    /**
     * calculate average of rgb components
     * @param {number[]} rgb
     * @return {number}
     */

  }, {
    key: "rgbAverage",
    value: function rgbAverage(rgb) {
      var result;
      var index;
      result = rgb[0];

      for (index = 1; index < 3; index++) {
        result += rgb[index];
      }

      return result / 3;
    }
    /**
     * lightness procedures
     * @return {{ average: (rgb: number[]) => number,
     *           i: (rgb: number[]) => number,
     *           max: (rgb: number[]) => number,
     *           v: (rgb: number[]) => number,
     *           minMaxAverage: (rgb: number[]) => number,
     *           l: (rgb: number[]) => number,
     *           lumaY709: (rgb: number[]) => number,
     *           lumaY601: (rgb: number[]) => number,
     *           luma: (rgb: number[]) => number
     *          }}
     */

  }, {
    key: "rgb255ToRgb1",

    /**
     * convert rgb [0, 255] array to rgb [0, 1] array
     * @param {number[]} rgb
     * @return {number[]} rgb
     */
    value: function rgb255ToRgb1(rgb) {
      return {
        red: rgb.red / 255.0,
        green: rgb.green / 255.0,
        blue: rgb.blue / 255.0
      };
    }
    /**
     * convert rgb to hexagnal hsv
     * @param {{red: number, green: number, blue: number}}
     * @return {{hue2: number, chroma2: number, v: number, saturation: number}}
     */

  }, {
    key: "rgbToHsv2",
    value: function rgbToHsv2(rgb) {
      var rgb0 = RgbHs.toRgbArray(rgb);
      var hueChroma = RgbHs.calcHueChroma2(rgb0);
      var v = RgbHs.lightness.v(rgb0);
      var result = {
        hue2: hueChroma.hue2,
        chroma2: hueChroma.chroma2,
        v: v,
        saturation: RgbHs.saturation.v(rgb0, hueChroma.chroma2, v)
      };
      return result;
    }
    /**
     * convert rgb to hexagnal hsl
     * @param {{red: number, green: number, blue: number}}
     * @return {{hue2: number, chroma2: number, l: number, saturation: number}}
     */

  }, {
    key: "rgbToHsl2",
    value: function rgbToHsl2(rgb) {
      var rgb0 = RgbHs.toRgbArray(rgb);
      var hueChroma = RgbHs.calcHueChroma2(rgb0);
      var l = RgbHs.lightness.l(rgb0);
      var result = {
        hue2: hueChroma.hue2,
        chroma2: hueChroma.chroma2,
        l: l,
        saturation: RgbHs.saturation.l(rgb0, hueChroma.chroma2, l)
      };
      return result;
    }
    /**
     * calculate chroma from hue
     * @param {number} hue
     */

  }, {
    key: "calcChromaRatioFromHue",
    value: function calcChromaRatioFromHue(hue) {
      var root3 = Math.sqrt(3);
      var angle;
      angle = hue % (Math.PI / 3);
      var raise;
      raise = Math.tan(angle);
      var x;
      x = root3 / (raise + root3);
      var y;
      y = raise * x;
      var result = Math.sqrt(x * x + y * y);
      return result;
    }
    /**
     * convert [x, y, r, v] to rgb.
     *
     * @param {number} x - x coordinate
     * @param {number} y - y coordinage
     * @param {number} r - radius
     * @param {number} v - value for hsv
     * @param {(v: number, chroma: number, rgb: number[]) => number} vToColorValue
     */

  }, {
    key: "xyrvToRgb",
    value: function xyrvToRgb(x, y, r, v, vToColorValue) {
      var theta;
      theta = Math.atan2(y, x);

      if (y > 0) {} else if (y < 0) {
        theta = Math.PI * 2 + theta;
      } else if (y == 0 || y == -.0) {
        if (x < 0) {
          theta = Math.PI;
        }
      }

      var xyRadius = Math.sqrt(x * x + y * y) / r;
      var hue = theta;
      var result;

      if (xyRadius <= 1) {
        var chroma = xyRadius;
        result = RgbHs.hueChromaToRgb(hue, chroma, v, vToColorValue);
      } else {
        result = undefined;
      }

      return result;
    }
    /**
     * calc rgb from hue and chroma
     * @param {number} hue
     * @param {number} chroma
     * @param {number} v - value for hsv
     * @param {(v: number, chroma: number, rgb: number[]) => number} vToColorValue
     */

  }, {
    key: "hueChromaToRgb",
    value: function hueChromaToRgb(hue, chroma, v, vToColorValue) {
      var hue6 = hue / (Math.PI / 3);
      hue6 = Math.min(hue6, 6);
      hue6 = Math.max(hue6, 0);
      var result = [0, 0, 0];

      if (chroma > 0) {
        var hue6Int = Math.floor(hue6);
        var firstValueIndex = Math.floor((hue6Int + 1) % 6 / 2);
        var secValueIndex = (6 - hue6Int + 1) % 3;
        var secValue = chroma * (1 - Math.abs(hue6 % 2 - 1));
        result[firstValueIndex] = chroma;
        result[secValueIndex] = secValue;
      }

      var colorValue = vToColorValue(v, chroma, result);

      for (var i = 0; i < 3; i++) {
        result[i] += colorValue;
        result[i] = Math.max(result[i], 0);
        result[i] = Math.min(result[i], 1);
      }

      return result;
    }
    /**
     * value to color value
     * @param {number} v
     * @param {number} chroma
     * @param {number[]} rgbTempValue
     * @return {number}
     */

  }, {
    key: "vToColorValue",
    value: function vToColorValue(v, chroma, rgbTempValue) {
      return v - chroma;
    }
    /**
     * lightness to color value
     * @param {number} l
     * @param {number} chroma
     * @param {number[]} rgbTempValue
     * @return {number}
     */

  }, {
    key: "lToColorValue",
    value: function lToColorValue(l, chroma, rgbTempValue) {
      return l - chroma / 2;
    }
    /**
     * luma Y 709 to color value
     * @param {number} y709
     * @param {number} chroma
     * @param {number[]} rgbTempValue
     * @return {number}
     */

  }, {
    key: "lumaY709ToColorValue",
    value: function lumaY709ToColorValue(y709, chroma, rgbTempValue) {
      return y709 - RgbHs.lumaY709(rgbTempValue);
    }
    /**
     * luma Y 601 to color value
     * @param {number} y601
     * @param {number} chroma
     * @param {number[]} rgbTempValue
     * @return {number}
     */

  }, {
    key: "lumaY601ToColorValue",
    value: function lumaY601ToColorValue(y601, chroma, rgbTempValue) {
      return y601 - RgbHs.lumaY601(rgbTempValue);
    }
    /**
     * get true if [x, y] coordinate in circle which has radius
     * @param {number} x
     * @param {number} y
     * @param {number} radius
     */

  }, {
    key: "isInCircle",
    value: function isInCircle(x, y, radius) {
      return Math.sqrt(x * x + y * y) < radius;
    }
    /**
     * conversion procedures from index value to color value
     * @return {{
     *            value: (v: number, chroma: number, rgb: number[]) => number,
     *            lightness: (v: number, chroma: number, rgb: number[]) => number,
     *            lumaY601: (v: number, chroma: number, rgb: number[]) => number,
     *            lumaY709: (v: number, chroma: number, rgb: number[]) => number,
     *            luma: (v: number, chroma: number, rgb: number[]) => number
     *         }}
     */

  }, {
    key: "createColorCircle",

    /**
     * create color circle
     * @param {number} radius
     * @param {number} indexValue
     * @param {Object | undefined} notCircleValue
     * @return {{rgb: number[], row: number, col: number}}
     */
    value: function createColorCircle(radius, indexValue, notCircleValue) {
      var rgbValues = [];

      for (var rowIndex = 0; rowIndex < 2 * radius; rowIndex++) {
        var rowRgbValues = [];

        for (var colIndex = 0; colIndex < 2 * radius; colIndex++) {
          var x = void 0;
          var y = void 0;
          x = colIndex - radius;
          y = radius - rowIndex - 1;
          var rgbValue = RgbHs.xyrvToRgb(x, y, radius, indexValue.value, RgbHs.indexValueToColorValueFunctions[indexValue.type]);

          if (typeof rgbValue !== 'undefined') {
            rowRgbValues[colIndex] = RgbHs.rgbToHex(rgbValue);
          } else {
            rowRgbValues[colIndex] = notCircleValue;
          }
        }

        rgbValues[rowIndex] = rowRgbValues;
      }

      var result = {
        rgb: rgbValues,
        row: 2 * radius,
        col: 2 * radius
      };
      return result;
    }
    /**
     * create color circle region with progress callback
     * @param {number} radius
     * @param {number} indexValue
     * @param {Object|undefined} notCircleValue
     * @return {{
     *            start:(progress:(state: {
     *                    rgb: number[],
     *                    row: number,
     *                    col: number,
     *                    calcRowColumnIndex: (index: number) => number},
     *                    curRange: number[])=>void) => Promise
     *         }}
     */

  }, {
    key: "createColorCircleProgress",
    value: function createColorCircleProgress(radius, indexValue, notCircleValue) {
      var diameter;
      diameter = 2 * radius;
      var totalPixcels;
      totalPixcels = 4 * radius * radius;

      var calcRowColumnIndex = function calcRowColumnIndex(index) {
        var result = {
          row: Math.floor(index / (2 * radius)),
          column: index % (2 * radius)
        };
        return result;
      };

      var createColorCircleState = function createColorCircleState() {
        var result = {
          stepCount: diameter,
          rgb: [],
          row: diameter,
          col: diameter,
          calcRowColumnIndex: calcRowColumnIndex
        };
        return result;
      };

      var createColorCircleRunningState = function createColorCircleRunningState() {
        var result = {
          currentIndex: 0
        };
        return result;
      };

      var createColorCircle = function createColorCircle(colorCircleState, colorCircleRunningState) {
        for (var index = 0; index < colorCircleState.stepCount; index++) {
          var rowColumn = calcRowColumnIndex(colorCircleRunningState.currentIndex);
          var rowIndex = rowColumn.row;
          var colIndex = rowColumn.column;
          var rowRgbValues = void 0;

          if (colIndex == 0) {
            rowRgbValues = [];
            colorCircleState.rgb[rowIndex] = rowRgbValues;
          } else {
            rowRgbValues = colorCircleState.rgb[rowIndex];
          }

          var x = colIndex - radius;
          var y = radius - rowIndex - 1;
          var rgbValue = RgbHs.xyrvToRgb(x, y, radius, indexValue.value, RgbHs.indexValueToColorValueFunctions[indexValue.type]);

          if (rgbValue != undefined) {
            rowRgbValues[colIndex] = RgbHs.rgbToHex(rgbValue);
          } else {
            rowRgbValues[colIndex] = notCircleValue;
          }

          colorCircleRunningState.currentIndex++;

          if (colorCircleRunningState.currentIndex >= totalPixcels) {
            break;
          }
        }
      };

      var createTimeoutMethod = function createTimeoutMethod(deferred, colorCircleState) {
        var colorCircleRunningState = createColorCircleRunningState();

        var timeoutCallBack = function timeoutCallBack() {
          if (colorCircleRunningState.currentIndex < totalPixcels) {
            var lastIndex = colorCircleRunningState.currentIndex;
            createColorCircle(colorCircleState, colorCircleRunningState);
            deferred.notify(colorCircleState, [lastIndex, colorCircleRunningState.currentIndex]);
            setTimeout(timeoutCallBack);
          } else {
            deferred.done(colorCircleState);
          }
        };

        return timeoutCallBack;
      };

      var colorCircleState = createColorCircleState();

      var startMethod = function startMethod(progress) {
        var res = new Promise(function (resolve, regject) {
          var timeoutCallBack = createTimeoutMethod({
            notify: progress,
            done: resolve
          }, colorCircleState);
          setTimeout(timeoutCallBack);
        });
        return res;
      };

      var result = {
        start: startMethod
      };
      return result;
    }
  }, {
    key: "hueOperator",
    get: function get() {
      return [function (value) {
        return value % 6;
      }, function (value) {
        return value + 2;
      }, function (value) {
        return value + 4;
      }];
    }
  }, {
    key: "lightness",
    get: function get() {
      return {
        average: RgbHs.rgbAverage,
        i: RgbHs.rgbAverage,
        max: RgbHs.rgbMaxValue,
        v: RgbHs.rgbMaxValue,
        minMaxAverage: RgbHs.rgbMinMaxAverage,
        l: RgbHs.rgbMinMaxAverage,
        lumaY709: RgbHs.lumaY709,
        lumaY601: RgbHs.lumaY601,
        luma: RgbHs.lumaY601
      };
    }
    /**
     * saturation procedures
     * @return {{
     *            i: (rgb: number[], chroma: number, i: number) => number,
     *            v: (rgb: number[], chroma: number, v: number) => number,
     *            l: (rgb: number[], chroma: number, l: number) => number
     *          }}
     */

  }, {
    key: "saturation",
    get: function get() {
      return {
        i: function i(rgb, chroma, _i) {
          var result;

          if (_i == 0) {
            result = 0;
          } else {
            result = 1 - RgbHs.rgbMinValue(rgb) / _i;
          }

          return result;
        },
        v: function v(rgb, chroma, _v) {
          var result;

          if (_v == 0) {
            result = 0;
          } else {
            result = chroma / _v;
          }

          return result;
        },
        l: function l(rgb, chroma, _l) {
          var result;

          if (_l == 0 || _l == 1) {
            result = 0;
          } else {
            result = chroma / (1 - Math.abs(2 * _l - 1));
          }

          return result;
        }
      };
    }
  }, {
    key: "indexValueToColorValueFunctions",
    get: function get() {
      return {
        value: RgbHs.vToColorValue,
        lightness: RgbHs.lToColorValue,
        lumaY601: RgbHs.lumaY601ToColorValue,
        lumaY709: RgbHs.lumaY709ToColorValue,
        luma: RgbHs.lumaY601ToColorValue
      };
    }
  }]);

  return RgbHs;
}();

exports.RgbHs = RgbHs; // vi: se ts=2 sw=2 et:

/***/ }),

/***/ "./src/ui.ts":
/*!*******************!*\
  !*** ./src/ui.ts ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UI = void 0; // @ts-ignore

var rgb_hs_ts_1 = __webpack_require__(/*! ./rgb-hs.ts */ "./src/rgb-hs.ts");
/**
 * user interface
 */


var UI = /*#__PURE__*/function () {
  /**
   * constructor
   * @param {string} template
   * @param {{value: string, colorCircleCanvas: string}} classMapping
   * @param {number} indexValue
   * @param {number} colorType
   */
  function UI() {
    var template = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : UI.defaultTemplate;
    var classMapping = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : UI.defaultClassNameMapping;
    var indexValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1.0;
    var colorType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'value';

    _classCallCheck(this, UI);

    /**
     * @type {boolean}
     */
    this.updateUi = false;
    /**
     * @type {boolean}
     */

    this.syncFieldWithUi = false;
    /**
     * internal use to decied whether notify event or not
     */

    this.raiseEvent = false;
    /**
     * class mapping
     */

    this.classMapping = undefined;
    /**
     * handler for color picker
     */

    this.pickColorHandler = undefined;
    /**
     * handler for value event
     */

    this.valueHandler = undefined;
    this.updateUi = false;
    this.raiseEvent = false;
    this.syncFieldWithUi = false;
    this.template = template;
    this.classMapping = classMapping;
    this.indexValue = indexValue;
    this.colorType = colorType;
    this.pickerLocation = {
      radius: 0,
      radian: 0
    };
    this.pickerMarker = UI.defaultPickerMarker;
    this.markerRadius = 2;
    this.listeners = {};
    this.updateUi = true;
    this.raiseEvent = true;
    this.syncFieldWithUi = true;
  }
  /**
   * defatult template
   * @return {string}
   */


  _createClass(UI, [{
    key: "bind",

    /**
     * hive into root element
     * @param {HTMLElement} rootElement
     */
    value: function bind(rootElement) {
      if (this.template) {
        this.oldContents = rootElement.innerHTML;
        var newContents = this.template;
        rootElement.innerHTML = newContents;
      }

      this.bindValue(rootElement);
      this.bindColorCircle(rootElement);
      this.rootElement = rootElement;
      this.postUpdateColorCircleCanvas();
      setTimeout(function () {
        this.syncValueUiWithValue();
      }.bind(this));
    }
    /**
     * tear down hives
     */

  }, {
    key: "unbind",
    value: function unbind() {
      var rootElement = this.rootElement;

      if (typeof rootElement !== 'undefined') {
        this.unbindColorCircle(rootElement);
        this.unbindValue(rootElement);

        if (typeof this.oldContents !== 'undefined') {
          rootElement.innerHTML = this.oldContents;
        }

        this.oldContents = undefined;
        this.rootElement = undefined;
      }
    }
    /**
     * add event listener
     * @param {string} type
     * @param {(type: string, target: Object)=>void} listener
     */

  }, {
    key: "addEventListener",
    value: function addEventListener(type, listener) {
      if (typeof this.listeners !== 'undefined') {
        if (!type) {
          type = 'any';
        }

        var listeners = this.listeners[type];

        if (typeof listeners === 'undefined') {
          listeners = [];
          this.listeners[type] = listeners;
        }

        listeners.push(listener);
      }
    }
    /**
     * remove event listener
     * @param {string} type
     * @param {(type: string, target: object)=>void} listener
     */

  }, {
    key: "removeEventListener",
    value: function removeEventListener(type, listener) {
      if (typeof this.listeners !== 'undefined') {
        if (!type) {
          type = 'any';
        }

        var listeners = this.listeners[type];

        if (typeof listeners !== 'undefined') {
          var indexToRemove;

          for (var i = listeners.length - 1; i >= 0; i--) {
            if (listeners[i] == listener) {
              indexToRemove = i;
              break;
            }
          }

          if (typeof indexToRemove !== 'undefined') {
            listeners.splice(indexToRemove, 1);
          }
        }
      }
    }
    /**
     * notify event message to event listener
     * @param {string} type
     */

  }, {
    key: "notify",
    value: function notify(type) {
      if (typeof this.listeners !== 'undefined') {
        var listenersArray = [this.listeners[type]];

        if (type !== 'any') {
          listenersArray.push(this.listeners['any']);
        }

        var uiObj = this;
        listenersArray.forEach(function (listeners) {
          if (listeners) {
            listeners.forEach(function (elem) {
              elem({
                type: type,
                target: uiObj
              });
            });
          }
        });
      }
    }
    /**
     * attach callbacks to button
     * @param {HTMLElement} rootElement
     */

  }, {
    key: "bindValue",
    value: function bindValue(rootElement) {
      var _this = this;

      var listenerParams = [{
        setListener: function setListener(listener) {
          _this.valueHandler = listener;
        },
        listener: function (event) {
          if ('input' == event.type) {
            setTimeout(this.handleValue.bind(this), 0, event);
          } else if ('blur' == event.type) {
            setTimeout(this.handleValueValidate.bind(this), 0, event);
          }
        }.bind(this),
        className: this.classMapping.value
      }];
      listenerParams.forEach(function (param) {
        var elem = rootElement.getElementsByClassName(param.className)[0];

        if (typeof elem !== 'undefined') {
          elem.addEventListener('input', param.listener);
          elem.addEventListener('blur', param.listener);
          param.setListener(param.listener);
        }
      });
    }
    /**
     * attach callbacks to button
     * @param {HTMLElement} rootElement
     */

  }, {
    key: "unbindValue",
    value: function unbindValue(rootElement) {
      var _this2 = this;

      var listenerParams = [{
        clearListener: function clearListener() {
          _this2.valueHandler = undefined;
        },
        listener: this.valueHandler,
        className: this.classMapping.value
      }];
      listenerParams.forEach(function (param) {
        var elem = rootElement.getElementsByClassName(param.className)[0];

        if (typeof elem !== 'undefined') {
          elem.removeEventListener('click', param.listener);
          elem.removeEventListener('blur', param.listener);
          param.clearListener();
        }
      });
    }
    /**
     * bind color circle
     * @param {HTMLElement} rootElement
     */

  }, {
    key: "bindColorCircle",
    value: function bindColorCircle(rootElement) {
      var colorCircle = rootElement.getElementsByClassName(this.classMapping.colorCircleCanvas)[0];

      if (typeof colorCircle !== 'undefined') {
        this.pickColorHandler = function (event) {
          if (event.type == 'click') {
            this.postHandleClickInColorCircle(event);
          }
        }.bind(this);

        colorCircle.addEventListener('click', this.pickColorHandler);
      }
    }
    /**
     * detach handler for color circle
     * @param {HTMLElement} rootElement
     */

  }, {
    key: "unbindColorCircle",
    value: function unbindColorCircle(rootElement) {
      var pickColorHandler = this.pickColorHandler;

      if (typeof pickColorHandler !== 'undefined') {
        var colorCircle = rootElement.getElementsByClassName(this.classMapping.colorCircleCanvas)[0];
        colorCircle.removeEventListener('click', pickColorHandler);
        this.pickColorHandler = undefined;
      }
    }
    /**
     * handle event for clicking in color circle canvas lately.
     * @param {Event} event
     */

  }, {
    key: "postHandleClickInColorCircle",
    value: function postHandleClickInColorCircle(event) {
      setTimeout(function () {
        this.handleClickInColorCircle(event);
      }.bind(this));
    }
    /**
     * handle event for clicking in color circle canvas
     * @param {Event} event
     */

  }, {
    key: "handleClickInColorCircle",
    value: function handleClickInColorCircle(event) {
      var canvas = event.target;
      var pickerLoc = this.calcPickerLocationFromCanvasLocation(canvas, [event.offsetX, event.offsetY]);

      if (typeof pickerLoc !== 'undefined') {
        this.pickerLocation = pickerLoc;
      }
    }
    /**
     * color circle location and radius
     * @param {HTMLCanvasElement} colorCanvas
     */

  }, {
    key: "getColorCircleLocRadius",
    value: function getColorCircleLocRadius(colorCanvas) {
      var result = undefined;

      if (typeof colorCanvas !== 'undefined') {
        var radius = undefined;
        var loc = undefined;

        if (colorCanvas.width < colorCanvas.height) {
          radius = Math.ceil(colorCanvas.width / 2);
          loc = [0, Math.ceil(colorCanvas.height - 2 * radius) / 2];
        } else {
          radius = Math.ceil(colorCanvas.height / 2);
          loc = [Math.ceil(colorCanvas.width - 2 * radius) / 2, 0];
        }

        result = {
          loc: loc,
          radius: radius
        };
      }

      return result;
    }
    /**
     * update color circle canvas lately
     */

  }, {
    key: "postUpdateColorCircleCanvas",
    value: function postUpdateColorCircleCanvas() {
      setTimeout(function () {
        if (typeof this.rootElement !== 'undefined') {
          this.updateColorCircleCanvas(this.rootElement);
        }
      }.bind(this));
    }
    /**
     * update color circle canvas
     * @param {HTMLElement} rootElement
     */

  }, {
    key: "updateColorCircleCanvas",
    value: function updateColorCircleCanvas(rootElement) {
      var colorCanvas = rootElement.getElementsByClassName(this.classMapping.colorCircleCanvas)[0];

      if (typeof colorCanvas !== 'undefined') {
        if (typeof colorCanvas.getContext === 'function') {
          var ctx = colorCanvas.getContext('2d');
          ctx.clearRect(0, 0, colorCanvas.width, colorCanvas.height);
          this.updateColorCircle(ctx);
          this.updatePickerMarker(ctx);
        }
      }
    }
    /**
     * picker location to rgb
     * @param {{radius: number, radian: number}} pickerLoc
     * @return {number[]}
     */

  }, {
    key: "convertPickerLocToRgb",
    value: function convertPickerLocToRgb(pickerLoc) {
      var result = undefined;
      var indexValue = this.colorIndexValue;
      var vToColorValue = rgb_hs_ts_1.RgbHs.indexValueToColorValueFunctions[indexValue.type];
      result = rgb_hs_ts_1.RgbHs.hueChromaToRgb(pickerLoc.radian, pickerLoc.radius, indexValue.value, vToColorValue);

      if (typeof result !== 'undefined') {
        for (var i = 0; i < result.length; i++) {
          result[i] = Math.round(Math.min(Math.max(result[i] * 0xff, 0), 0xff));
        }
      }

      return result;
    }
    /**
     * convert rgb to marker position and index
     * @param {number[]} rgb255
     * @return {{ indexValue: number,
     *            pickerLocation: {radius: number, radian: number } }}
     */

  }, {
    key: "convertRgbToPickerLocationAndIndex",
    value: function convertRgbToPickerLocationAndIndex(rgb255) {
      var result = undefined;

      if (this.colorType == 'value') {
        var rgb = [0, 0, 0];

        for (var i = 0; i < rgb.length; i++) {
          rgb[i] = rgb255[i] / 0xff;
        }

        var hueChroma = rgb_hs_ts_1.RgbHs.calcHueChroma(rgb);
        var indexValue = rgb[hueChroma.chroma.maxIndex];
        var pickerLocation = {
          radius: hueChroma.chroma.value,
          radian: hueChroma.hue * Math.PI / 180
        };
        result = {
          pickerLocation: pickerLocation,
          indexValue: indexValue
        };
      }

      return result;
    }
    /**
     * update color circle
     * @param {CanvasRenderingcontext2D} ctx
     */

  }, {
    key: "updateColorCircle",
    value: function updateColorCircle(ctx) {
      var locRadius = this.getColorCircleLocRadius(ctx.canvas);
      var indexValue = this.colorIndexValue;
      var imageData = ctx.getImageData(locRadius.loc[0], locRadius.loc[1], locRadius.radius * 2, locRadius.radius * 2);

      for (var rIndex = 0; rIndex < locRadius.radius * 2; rIndex++) {
        for (var cIndex = 0; cIndex < locRadius.radius * 2; cIndex++) {
          var x = cIndex - locRadius.radius;
          var y = locRadius.radius - rIndex;
          var rgb = rgb_hs_ts_1.RgbHs.xyrvToRgb(x, y, locRadius.radius, indexValue.value, rgb_hs_ts_1.RgbHs.indexValueToColorValueFunctions[indexValue.type]);

          if (rgb != undefined) {
            for (var i = 0; i < 3; i++) {
              imageData.data[4 * (rIndex * 2 * locRadius.radius + cIndex) + i] = Math.round(rgb[i] * 0xff);
            }

            imageData.data[4 * (rIndex * 2 * locRadius.radius + cIndex) + 3] = 0xff;
          }
        }
      }

      ctx.putImageData(imageData, locRadius.loc[0], locRadius.loc[1]);
    }
    /**
     * update color circle
     * @param {CanvasRenderingcontext2D} ctx
     */

  }, {
    key: "updateColorCircleProgress",
    value: function updateColorCircleProgress(ctx) {
      var locRadius = this.getColorCircleLocRadius(ctx.canvas);
      var indexValue = this.colorIndexValue;
      var colorCircleState = rgb_hs_ts_1.RgbHs.createColorCircleProgress(locRadius.radius, indexValue, undefined);

      var colorCircleProgress = function colorCircleProgress(state, lastProcessedIndex) {
        var imageData = ctx.getImageData(locRadius.loc[0], locRadius.loc[1], state.col, state.row);

        for (var index = lastProcessedIndex[0]; index < lastProcessedIndex[1]; index++) {
          var rowColumnIndex = state.calcRowColumnIndex(index);
          var rowIndex = rowColumnIndex.row;
          var colIndex = rowColumnIndex.column;
          var rgbHex = state.rgb[rowIndex][colIndex];

          if (typeof rgbHex !== 'undefined') {
            var rgb = rgb_hs_ts_1.RgbHs.hexToRgb(rgbHex);

            for (var i = 0; i < 3; i++) {
              imageData.data[(rowIndex * state.col + colIndex) * 4 + i] = rgb[i];
            }

            imageData.data[(rowIndex * state.col + colIndex) * 4 + 3] = 255;
          }

          ctx.putImageData(imageData, locRadius.loc[0], locRadius.loc[1]);
        }
      };

      var promise = colorCircleState.start(colorCircleProgress);
    }
    /**
     * update picker marker
     * @param {CanvasRenderingcontext2D} ctx
     */

  }, {
    key: "updatePickerMarker",
    value: function updatePickerMarker(ctx) {
      var pickerLocation = this.pickerLocation;

      if (typeof pickerLocation !== 'undefined') {
        var canvasLoc = this.calcCanvasLocationFromPickerLocation(ctx.canvas, pickerLocation);
        var pickerMarker = this.pickerMarker;
        var markerRadius = this.markerRadius;
        var colorIndexValue = this.colorIndexValue;

        if (typeof canvasLoc !== 'undefined' && typeof pickerMarker !== 'undefined' && typeof colorIndexValue !== 'undefined' && typeof markerRadius !== 'undefined') {
          pickerMarker(ctx, Math.round(canvasLoc[0]), Math.round(canvasLoc[1]), markerRadius, colorIndexValue.value);
        }
      }
    }
    /**
     * calculate cartesian location on canvas from picker location
     * @param {HTMLCanvasElement} canvas
     * @param {{ radius: number, radian: number }}
     * @return {number[]}
     */

  }, {
    key: "calcCanvasLocationFromPickerLocation",
    value: function calcCanvasLocationFromPickerLocation(canvas, pickerLocation) {
      var result;

      if (typeof pickerLocation !== 'undefined') {
        var locRadius = this.getColorCircleLocRadius(canvas);
        var center = [locRadius.loc[0] + locRadius.radius, locRadius.loc[1] + locRadius.radius];
        var cartesian = [0, 0];
        cartesian[0] = pickerLocation.radius * locRadius.radius;
        cartesian[1] = cartesian[0];
        cartesian[0] *= Math.cos(pickerLocation.radian);
        cartesian[1] *= -Math.sin(pickerLocation.radian);
        cartesian[0] += center[0];
        cartesian[1] += center[1];
        result = cartesian;
      }

      return result;
    }
    /**
     * calculate picker location from cartesian on  canvas
     * @param {HTMLCanvasElement} canvas
     * @param {number[]} cartesian
     * @return {{ radian: number, radius: number }}
     */

  }, {
    key: "calcPickerLocationFromCanvasLocation",
    value: function calcPickerLocationFromCanvasLocation(canvas, cartesian) {
      var result;

      if (typeof cartesian !== 'undefined') {
        var locRadius = this.getColorCircleLocRadius(canvas);
        var center = [locRadius.loc[0] + locRadius.radius, locRadius.loc[1] + locRadius.radius];
        var pickerLoc = [0, 0];
        pickerLoc[0] = cartesian[0] - center[0];
        pickerLoc[1] = -(cartesian[1] - center[1]);
        var radian;

        if (pickerLoc[0] != 0 || pickerLoc[0] != -0.0) {
          var tan = pickerLoc[1] / pickerLoc[0];
          radian = Math.atan(tan);

          if (pickerLoc[0] < 0) {
            if (pickerLoc[1] < 0) {
              radian += Math.PI;
            } else {
              radian -= Math.PI;
            }
          }

          radian += 2 * Math.PI;
          radian -= Math.trunc(radian / (2 * Math.PI)) * 2 * Math.PI;
        } else {
          if (pickerLoc[1] != 0 || pickerLoc[1] != -0.0) {
            if (pickerLoc[1] > 0) {
              radian = Math.PI / 2;
            } else {
              radian = 3 * Math.PI / 2;
            }
          } else {
            radian = 0;
          }
        }

        var radius = Math.sqrt(Math.pow(pickerLoc[0], 2) + Math.pow(pickerLoc[1], 2));
        radius /= locRadius.radius;

        if (radius <= 1) {
          result = {
            radius: radius,
            radian: radian
          };
        }
      }

      return result;
    }
    /**
     * varidate value input
     */

  }, {
    key: "handleValueValidate",
    value: function handleValueValidate() {
      var value = this.indexValueUi;

      if (typeof value === 'undefined') {
        this.indexValueUi = this.indexValueInt;
      } else {
        var oldValue = value;

        if (value < 0) {
          value = 0;
        }

        if (value > 0xff) {
          value = 0xff;
        }

        if (oldValue != value) {
          this.indexValueUi = value;
        }
      }
    }
    /**
     * handle index increment event
     * @param {Event} event
     */

  }, {
    key: "handleValue",
    value: function handleValue(event) {
      this.syncValueWithUi();
    }
    /**
     * synchronize index value with value user interface.
     */

  }, {
    key: "syncValueWithUi",
    value: function syncValueWithUi() {
      var savedUpdateUi = this.updateUi;
      this.updateUi = false;
      this.indexValueInt = this.indexValueUi;
      this.updateUi = savedUpdateUi;

      if (savedUpdateUi) {
        this.postUpdateColorCircleCanvas();
      }
    }
    /**
     * synchronize value on user interface with value field
     */

  }, {
    key: "syncValueUiWithValue",
    value: function syncValueUiWithValue() {
      var savedSync = this.syncFieldWithUi;
      this.syncFieldWithUi = false;
      this.indexValueUi = this.indexValueInt;
      this.syncFieldWithUi = savedSync;
    }
  }, {
    key: "indexValue",

    /**
     * index value
     * @return {number | undefined}
     */
    get: function get() {
      /** @private */
      return this.indexValueField;
    }
    /**
     * index value
     * @param {number | undefined} value
     */
    ,
    set: function set(value) {
      var thisValue = this.indexValue;
      var doSet = false;

      if (typeof value !== 'undefined') {
        if (value > 1) {
          value = 1;
        }

        if (value < 0) {
          value = 0;
        }
      }

      if (typeof thisValue !== 'undefined') {
        if (typeof value !== 'undefined') {
          doSet = thisValue != value;
        }
      } else {
        doSet = typeof value !== 'undefined';
      }

      if (doSet) {
        this.indexValueField = value;

        if (this.updateUi) {
          setTimeout(function () {
            this.syncValueUiWithValue();
          }.bind(this));
          this.postUpdateColorCircleCanvas();
        }

        if (this.raiseEvent) {
          this.notify('indexValue');
        }
      }
    }
    /**
     * index value as integer
     * @return {number | undefined}
     */

  }, {
    key: "indexValueInt",
    get: function get() {
      var result = this.indexValue;

      if (typeof result !== 'undefined') {
        result = result * 0xff;
      }

      return result;
    }
    /**
     * index value as integer
     * @param {number} value
     */
    ,
    set: function set(value) {
      if (typeof value !== 'undefined') {
        value = value / 0xff;
      }

      this.indexValue = value;
    }
    /**
     * index value on user interface
     * @return {number | undefined}
     */

  }, {
    key: "indexValueUi",
    get: function get() {
      var result;
      var valueUi = this.valueUi;

      if (typeof valueUi !== 'undefined') {
        var num = parseInt(valueUi.value);

        if (!isNaN(num)) {
          result = num;
        }
      }

      return result;
    }
    /**
     * index value on user interface
     * @param {number} value
     */
    ,
    set: function set(value) {
      var thisValue = this.indexValueUi;
      var doSet = false;
      doSet = typeof value !== 'undefined';

      if (doSet) {
        doSet = thisValue != value;
      }

      if (doSet) {
        var valueUi = this.valueUi;
        valueUi.value = value.toString();

        if (this.syncFieldWithUi) {
          setTimeout(function () {
            this.syncValueWithUi();
          }.bind(this));
        }
      }
    }
    /**
     *  value user interface
     *  @return {HTMLInputElement | undefined}
     */

  }, {
    key: "valueUi",
    get: function get() {
      var result;

      if (typeof this.rootElement !== 'undefined') {
        result = this.rootElement.getElementsByClassName(this.classMapping.value)[0];
      }

      return result;
    }
    /**
     * color type
     * @return {string | undefined}
     */

  }, {
    key: "colorType",
    get: function get() {
      /** @ignore */
      return this.colorTypeField;
    }
    /**
     * color type
     * @param {string}
     */
    ,
    set: function set(value) {
      var thisValue = this.colorType;
      var doSet = false;

      if (typeof thisValue !== 'undefined') {
        if (typeof value !== 'undefined') {
          doSet = thisValue != value;
        }
      } else {
        doSet = typeof value !== 'undefined';
      }

      if (doSet) {
        this.colorTypeField = value;

        if (this.updateUi) {
          this.postUpdateColorCircleCanvas();
        }
      }
    }
    /**
     * color index value
     * @return {{ value: number, type: string }}
     */

  }, {
    key: "colorIndexValue",
    get: function get() {
      return {
        value: this.indexValue,
        type: this.colorType
      };
    }
    /**
     * picker location
     * radius is in range [0, 1]
     * radian is in range [0, Math.PI * 2]
     * @return {{ radius: number, radian: number }}
     */

  }, {
    key: "pickerLocation",
    get: function get() {
      return this.pickerLocationField;
    }
    /**
     * picker location
     * @param {{ radius: number, radian: number }} value
     */
    ,
    set: function set(value) {
      var thisValue = this.pickerLocation;
      var doSet = false;

      if (typeof thisValue !== 'undefined') {
        if (typeof value !== 'undefined') {
          doSet = thisValue.radius != value.radius;

          if (!doSet) {
            doSet = thisValue.radian != value.radian;
          }
        } else {
          doSet = true;
        }
      } else {
        doSet = typeof value !== 'undefined';
      }

      if (doSet) {
        this.pickerLocationField = value;

        if (this.updateUi) {
          this.postUpdateColorCircleCanvas();
        }

        if (this.raiseEvent) {
          this.notify('pickerLocation');
        }
      }
    }
    /**
     * picker maker
     * @return {(ctx: CanvasRenderingContext2D,
     *            x: number, y: number, r: number, i: number)=>number}
     */

  }, {
    key: "pickerMarker",
    get: function get() {
      /** @ignore */
      return this.pickerMarkerField;
    }
    /**
     * picker marker
     * @param {pickerMarker: {(ctx: CanvasRenderingContext2D,
     *            x: number, y: number, r: number, i: number)=>number}}
     */
    ,
    set: function set(value) {
      var thisValue = this.pickerMarker;
      var doSet = false;

      if (typeof thisValue !== 'undefined') {
        if (typeof value !== 'undefined') {
          doSet = thisValue != value;
        } else {
          doSet = true;
        }
      } else {
        doSet = typeof value !== 'undefined';
      }

      if (doSet) {
        this.pickerMarkerField = value;

        if (this.updateUi) {
          this.postUpdateColorCircleCanvas();
        }
      }
    }
    /**
     * marker radius
     * @return {number}
     */

  }, {
    key: "markerRadius",
    get: function get() {
      /** @ignore */
      return this.markerRadiusField;
    }
    /**
     * marker radius
     * @param {number} value
     */
    ,
    set: function set(value) {
      var thisValue = this.markerRadius;
      var doSet = false;

      if (typeof thisValue !== 'undefined') {
        if (typeof value !== 'undefined') {
          doSet = thisValue != value;
        } else {
          doSet = true;
        }
      } else {
        doSet = typeof value !== 'undefined';
      }

      if (doSet) {
        this.markerRadiusField = value;

        if (this.updateUi) {
          this.postUpdateColorCircleCanvas();
        }
      }
    }
    /**
     * color circle user interface
     * @return {HTMLCanvasElement}
     */

  }, {
    key: "colorCircleUi",
    get: function get() {
      var result = undefined;

      if (typeof this.rootElement !== 'undefined') {
        result = this.rootElement.getElementsByClassName(this.classMapping.colorCircleCanvas)[0];
      }

      return result;
    }
    /**
     * marker color
     * @return {number[]}
     */

  }, {
    key: "markColor",
    get: function get() {
      var result = undefined;
      var colorCircle = this.colorCircleUi;

      if (typeof colorCircle !== 'undefined') {
        var pickerLoc = this.pickerLocation;

        if (typeof pickerLoc !== 'undefined') {
          result = this.convertPickerLocToRgb(pickerLoc);
        }
      }

      return result;
    }
    /**
     * set mark color
     * @param {number[]} value
     */
    ,
    set: function set(value) {
      var thisValue = this.markColor;
      var doSet = false;

      if (typeof thisValue !== 'undefined') {
        if (typeof value !== 'undefined') {
          if (thisValue.length <= value.length) {
            for (var i = 0; i < thisValue.length; i++) {
              doSet = thisValue[i] != value[i];

              if (doSet) {
                break;
              }
            }
          }
        }
      }

      if (doSet) {
        var pickerLocAndIndex = this.convertRgbToPickerLocationAndIndex(value);

        if (typeof pickerLocAndIndex !== 'undefined') {
          var savedUpdateUi = this.updateUi;
          var savedEvent = this.raiseEvent;
          this.updateUi = false;
          this.raiseEvent = false;
          this.pickerLocation = pickerLocAndIndex.pickerLocation;
          this.indexValue = pickerLocAndIndex.indexValue;
          this.updateUi = savedUpdateUi;
          this.raiseEvent = savedEvent;

          if (this.updateUi) {
            setTimeout(function () {
              this.syncValueUiWithValue();
            }.bind(this));
            this.postUpdateColorCircleCanvas();
          }

          if (this.raiseEvent) {
            setTimeout(function () {
              this.notify('pickerLocation');
            }.bind(this));
          }
        }
      }
    }
  }], [{
    key: "createDefaultPickerMarker",

    /**
     * picker marker
     * @param {number} lineWidth
     * @return {(ctx: CanvasRenderingcontext2D,
     *            x: number, y: number, r: number, i: number)=>number}
     */
    value: function createDefaultPickerMarker(lineWidth) {
      return function (ctx, x, y, r, i) {
        var savedLineWidth = ctx.lineWidth;
        var savedStrokeStyle = ctx.strokeStyle;
        var grayIdx = UI.calcRecognizableGrayIndex(i);
        var strokeStyle = "rgb(".concat(grayIdx, ", ").concat(grayIdx, ", ").concat(grayIdx, ")");
        ctx.beginPath();
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeStyle;
        ctx.ellipse(x, y, r, r, 0, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.lineWidth = savedLineWidth;
        ctx.strokeStyle = savedStrokeStyle;
      };
    }
    /**
     * calculate recognizable gray index
     * @param {number} grayIndex
     * @return {number}
     */

  }, {
    key: "calcRecognizableGrayIndex",
    value: function calcRecognizableGrayIndex(grayIndex) {
      var result;

      if (grayIndex < 1.0 / 4 || grayIndex >= 3.0 / 4) {
        result = 1 - grayIndex;
      } else {
        if (grayIndex <= 2.0 / 4) {
          result = grayIndex - 1.0 / 4 + 3.0 / 4;
        } else {
          result = grayIndex - 2.0 / 4;
        }
      }

      result = result * 0xff;

      if (result > 0xff) {
        result = 0xff;
      } else if (result < 0) {
        result = 0;
      }

      return result;
    }
  }, {
    key: "defaultTemplate",
    get: function get() {
      return "<div class=\"oc-color-circle-container\">\n  <canvas class=\"oc-color-circle\" width=\"200px\" height=\"200px\"></canvas>\n</div>\n<div class=\"oc-color-controller\">\n  <input class=\"oc-value\" type=\"range\" min=\"0\" max=\"255\">\n</div>\n";
    }
    /**
     * default template mapping
     * @return {{value: string, colorCircleCanvas: string}}
     */

  }, {
    key: "defaultClassNameMapping",
    get: function get() {
      return {
        value: 'oc-value',
        colorCircleCanvas: 'oc-color-circle'
      };
    }
    /**
     * picker marker
     * @return {(ctx: CanvasRenderingcontext2D,
     *            x: number, y: number, r: number, i: number)=>number}
     */

  }, {
    key: "defaultPickerMarker",
    get: function get() {
      return UI.createDefaultPickerMarker(1.0);
    }
  }]);

  return UI;
}();

exports.UI = UI; // vi: se ts=2 sw=2 et:

/***/ }),

/***/ 0:
/*!*******************************************************!*\
  !*** multi ./src/color-test.ts ./src/color-test.less ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./src/color-test.ts */"./src/color-test.ts");
module.exports = __webpack_require__(/*! ./src/color-test.less */"./src/color-test.less");


/***/ })

/******/ });
//# sourceMappingURL=test.bundle.js.map