/**
 * @namespace oc.color
 */

/**
 * rgb hsv management
 */
class RgbHs {

  /**
   * convert from rgb to hex
   * @param {number[]} rgb
   * @return {number}
   */
  static rgbToHex(rgb) {
    let result;
    result = Math.round(rgb[0] * 255) << 16;
    for (var index = 1; index < 3; index++) {
      result |= Math.round(rgb[index] * 255) << (8 * (2 - index));
    }
    return result;
  }

  /**
   * convert hex to rgb
   * @param {number} rgb
   * @return {number[]}
   */
  static hexToRgb(rgb) {
    let intMask;
    intMask = [0xff0000, 0x00ff00, 0x0000ff];
       
    let result;
    result = [0, 0, 0];
    for (var index = 0; index < 3; index++) {
      result[index] = (rgb & intMask[index]) >> (8 * (2 - index));
    }
    return result;
  }

  /**
   * convert from rgb to array
   * @param {{red: number, green: number, blue: number}} rgb
   * @return {number[]}
   */
  static toRgbArray(rgb) {
    return [rgb.red, rgb.green, rgb.blue];
  }

  /**
   * find index 
   * @param {number[]} rgb
   * @param {RgbHs~comparator} comparator
   */
  static findIndex(rgb, comparator) {
    let result;
    let index;
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
  static findMaxIndex(rgb) {
    return RgbHs.findIndex(rgb, 
      (value1, value2) => { 
        return value2 - value1;
      });
   }

  /**
   * find minimum index
   * @param {number[]} rgb
   */
  static findMinIndex(rgb) {
    return RgbHs.findIndex(rgb, 
      (value1, value2) => { 
        return value1 - value2;
      });
  }

  /**
   * calc chroma
   * @param {number[]} rgb
   * @return {RgbHs~Chroma}
   */
  static calcChroma(rgb) {
    const maxIndex = RgbHs.findMaxIndex(rgb);
    const minIndex = RgbHs.findMinIndex(rgb);
    return {
      value: rgb[maxIndex] - rgb[minIndex],
      maxIndex: maxIndex,
      minIndex: minIndex
    }
  }

  /**
   * heu operator
   * @return {RgbHs~hueOperatorProc[]} 
   */
  static get hueOperator() {
    return [
      function(value) { return value % 6; },
      function(value) { return value + 2; },
      function(value) { return value + 4; }
    ];
  }

  /**
   * calculate hue
   * @param {number[]} rgb
   * @param {{maxIndex: number}} chroma
   * @return {number} hue 
   */
  static calcHue(rgb, chroma) {
    let result;
    if (chroma.value != 0) {
      let tempValue;
      tempValue = rgb[(chroma.maxIndex + 1) % 3]
        - rgb[(chroma.maxIndex + 2) % 3];
      tempValue /= rgb[chroma.maxIndex];
      result = RgbHs.hueOperator[chroma.maxIndex](tempValue);
      result *= 60;
    } else {
      result = 0;
    }
    return result;
  }

  static get cos30() {
    return Math.pow(3, 0.5) / 2;
  }

  /**
   * calculate hue and chroma
   * @param {number[]} rgb
   * @return {{chroma: RgbHs~Chroma, hue: number}}
   */
  static calcHueChroma(rgb) {
    const chroma = RgbHs.calcChroma(rgb)
    const hue = RgbHs.calcHue(rgb, chroma)
    return {
      chroma,
      hue
    }
  }
   
  /**
   * calculate hue and chroma with hexagonal mode
   * @param {number[]} rgb
   * @return {{alpha: number, beta: number, hue2: number, chroma2: number}}
   */
  static calcHueChroma2(rgb) {
    const alpha = (2 * rgb[0] - rgb[1] - rgb[2]) / 2;
    const beta = RgbHs.cos30 * (rgb[1] - rgb[2]);
    const hue2 = Math.atan(alpha, beta);
    const chroma2 = Math.sqrt(alpha * alpha + beta * beta);
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
  static luma(rgb, coefficients) {
    let result;
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
  static lumaY709(rgb) {
    return RgbHs.luma(rgb, [.21, .72, .07]);  
  }

  /**
   * calculate luma y 601
   * @param {number[]} rgb
   * @return {number} luma value
   */
  static lumaY601(rgb) {
    return RgbHs.luma(rgb, [.3, .59, .11]);
  }

  /**
   * get maximum value of rgb component
   * @param {number[]} rgb
   * @return {number}
   */
  static rgbMaxValue(rgb) {
    return rgb[RgbHs.findMaxIndex(rgb)];
  }

  /**
   * get minimum value of rgb component
   * @param {number[]} rgb
   * @return {number}
   */
  static rgbMinValue(rgb) {
    return rgb[RgbHs.findMinIndex(rgb)];
  }

  /**
   * calculate average between max and min value of rgb component
   * @param {number[]} rgb
   * @return {number}
   */
  static rgbMinMaxAverage(rgb) {
    return (rgb[RgbHs.findMaxIndex(rgb)] + rgb[RgbHs.findMinIndex(rgb)]) / 2;
  }

  /**
   * calculate average of rgb components
   * @param {number[]} rgb
   * @return {number}
   */
  static rgbAverage(rgb) {
    let result;
    let index;
    result = rgb[0];
    for (index = 1; index < 3; index++) {
      result += rgb[index];
    }
    return result / 3;
  }
  /**
   * lightness procedures
   * {RgbHs~LightnessProcs}
   */
  static get lightness() {
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
   * @return {Rgb~SaturationProcs)
   */
  static get saturation() {
    return {
      i: function(rgb, chroma, i) {
        let result;
        if (i == 0) {
          result = 0;
        } else {
          result = 1 - RgbHs.rgbMinValue(rgb) / i;
        }
        return result;
      },
      v: function(rgb, chroma, v) {
        let result;
        if (v == 0) {
          result = 0;
        } else {
          result = chroma / v;
        }
        return result;
      },
      l: function(rgb, chroma, l) {
        let result;
        if (l == 0 || l == 1) {
          result = 0;
        } else {
          result = chroma / (1 - Math.abs(2 * l - 1));
        }
        return result;
      }
    }
  }

  /**
   * convert rgb [0, 255] array to rgb [0, 1] array
   * @param {number[]} rgb
   * @return {number[]} rgb
   */
  static rgb255ToRgb1(rgb) {
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
  static rgbToHsv2(rgb) {
    rgb = RgbHs.toRgbArray(rgb);
    let hueChroma;
    hueChroma = RgbHs.calcHueChroma2(rgb);
    let v = lightness.v(rgb);
       
    const result = {
      hue2: hueChroma.hue2,
      chroma2: hueChroma.chroma2,
      v: v,
      satulation: RgbHs.satulation.v(rgb, chroma, v)
    };
    return result;
  }
  /**
   * convert rgb to hexagnal hsl
   * @param {{red: number, green: number, blue: number}}
   * @return {{hue2: number, chroma2: number, l: number, saturation: number}}
   */
  static rgbToHsl2(rgb) {
    rgb = toRgbArray(rgb);
    const hueChroma = RgbHs.calcHueChroma2(rgb);
    const l = RgbHs.lightness.l(rgb);
       
    const result = {
      hue2: hueChroma.hue2,
      chroma2: hueChroma.chroma2,
      l: l,
      satulation: RgbHs.satulation.l(rgb, chroma, l)
    };
    return result;
  }

  /**
   * calculate chroma from hue
   * @param {number} hue
   * @param {number} chroma
   */
  static calcChromaRatioFromHue(hue) {
    const root3 = Math.sqrt(3);
    let angle;
    angle = hue % (Math.PI / 3);
    let raise;
    raise = Math.tan(angle);
    let x;
    x = root3 / (raise + root3);
    let y;
    y = raise * x;
    let result;
    result = Math.sqrt(x * x + y * y);
    return result;
  }

  /**
   * convert [x, y, r, v] to rgb.
   *
   * @param {number} x - x coordinate
   * @param {number} y - y coordinage
   * @param {number} r - radius
   * @param {number} v - value for hsv
   * @param {RgbHs~vToColorProc} vToColorValue
   */
  static xyrvToRgb(x, y, r, v, vToColorValue) {
    let theta;
    theta = Math.atan2(y, x);
    if (y > 0) {
    } else if (y < 0) {
      theta = Math.PI * 2 + theta;
    } else if (y == 0 || y == -.0) {
      if (x < 0) {
        theta = Math.PI;
      }
    }
    const xyRadius = Math.sqrt(x * x + y * y) / r;
    const hue = theta;
    let result;
    if (xyRadius <= 1) {
      let chroma;
      chroma = xyRadius / RgbHs.calcChromaRatioFromHue(hue);
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
   * @param {RgbHs~vToColorProc} vToColorValue
   */
  static hueChromaToRgb(hue, chroma, v, vToColorValue) {
    const hue6 = hue / (Math.PI / 3);

    const result = [0, 0, 0];
    if (chroma > 0) {
      const hue6Int = Math.floor(hue6);
      const firstValueIndex = Math.floor(((hue6Int + 1) % 6) / 2);
      const secValueIndex = (6 - hue6Int + 1) % 3;
      const secValue = chroma * (1 - Math.abs((hue6 % 2) - 1));         
      result[firstValueIndex] = chroma;
      result[secValueIndex] = secValue;
    }
    const colorValue = vToColorValue(v, chroma, result);
    for (let i = 0; i < 3; i++) {
      result[i] += colorValue;
      result[i] = Math.max(result[i], 0);
      result[i] = Math.min(result[i], 1);
    }
    return result
  }

  /**
   * value to color value
   * @param {number} v
   * @param {number} chroma
   * @param {number[]} rgbTempValue
   * @return {number}
   */
  static vToColorValue(v, chroma, rgbTempValue) {
    return v - chroma;
  }

  /**
   * lightness to color value
   * @param {number} l
   * @param {number} chroma
   * @param {number[]} rgbTempValue
   * @return {number}
   */
  static lToColorValue(l, chroma, rgbTempValue) {
    return l - chroma / 2;  
  }

  /**
   * luma Y 709 to color value
   * @param {number} y709
   * @param {number} chroma
   * @param {number[]} rgbTempValue
   * @return {number}
   */
  static lumaY709ToColorValue(y709, chroma, rgbTempValue) {
    return y709 - RgbHs.lumaY709(rgbTempValue);
  }

  /**
   * luma Y 601 to color value
   * @param {number} y601
   * @param {number} chroma
   * @param {number[]} rgbTempValue
   * @return {number}
   */
  static lumaY601ToColorValue(y601, chroma, rgbTempValue) {
    return y601 - RgbHs.lumaY601(rgbTempValue);
  }

  /**
   * get true if [x, y] coordinate in circle which has radius
   * @param {number} x
   * @param {number} y
   * @param {number} radius
   * @return {number}
   */
  static isInCircle(x, y, radius) {
    return Math.sqrt(x * x, y * y) < radius;
  }

  /**
   * conversion procedures from index value to color value
   * @return {RgbHs~ValueToColorProcedures}
   */
  static get indexValueToColorValueFunctions() {
    return {
       value: RgbHs.vToColorValue,
       lightness: RgbHs.lToColorValue,
       lumaY601: RgbHs.lumaY601ToColorValue,
       lumaY709: RgbHs.lumaY709ToColorValue,
       luma: RgbHs.lumaY601ToColorValue
    }
  }

  /**
   * create color circle
   * @param {number} radius
   * @param {number} indexValue
   * @param {Object | undefined} notCircleValue
   * @return {{rgb: number[], row: number, col: number}}
   */
  static createColorCircle(radius, indexValue, notCircleValue) {
    const rgbValues = [];
    for (let rowIndex = 0; rowIndex < 2 * radius; rowIndex++) {
      const rowRgbValues = [];
      for (let colIndex = 0; colIndex < 2 * radius; colIndex++) {
        let x;
        let y;
        x = colIndex - radius;
        y = radius - rowIndex - 1;
        const rgbValue = RgbHs.xyrvToRgb(x, y, radius, 
          indexValue.value, 
          RgbHs.indexValueToColorValueFunctions[indexValue.type]);
        if (typeof rgbValue !== 'undefined') {
          rowRgbValues[colIndex] = rgbToHex(rgbValue);
        } else {
          rowRgbValues[colIndex] = notCircleValue;
        }
      }
      rgbValues[rowIndex] = rowRgbValues;
    }
    const result = {
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
   * @return {{start:{RgbHs~startToCreateColorCircleProc}}}
   */
  static createColorCircleProgress(radius, indexValue, notCircleValue) {
    let diameter;
    diameter = 2 * radius;
    var totalPixcels;
    totalPixcels = 4 * radius * radius;
    const calcRowColumnIndex = function(index) {
      const result = {};
      result.row = Math.floor(index / (2 * radius));
      result.column = index % (2 * radius);
      return result;
    };

    const createColorCircleState = function() {
      const result = {};
      result.stepCount = diameter;
      result.rgb = [];
      result.row = diameter;
      result.col = diameter;
     
      result.calcRowColumnIndex = calcRowColumnIndex;
      return result;
    };
    const createColorCircleRunningState = function() {
      const result = {};
      result.currentIndex = 0;
      return result;
    };
    const createColorCircle = function(
      colorCircleState, colorCircleRunningState) {
      for (let index = 0; index < colorCircleState.stepCount; 
        index++) {
        const rowColumn = calcRowColumnIndex(
          colorCircleRunningState.currentIndex);
        const rowIndex = rowColumn.row;
        const colIndex = rowColumn.column;
         
        let rowRgbValues;
        if (colIndex == 0) {
          rowRgbValues = [];
          colorCircleState.rgb[rowIndex] = rowRgbValues;
        } else {
          rowRgbValues = colorCircleState.rgb[rowIndex];
        }
        const x = colIndex - radius;
        const y = radius - rowIndex - 1;
        const rgbValue = RgbHs.xyrvToRgb(x, y, radius, 
          indexValue.value, 
          RgbHs.indexValueToColorValueFunctions[indexValue.type]);
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
    const createTimeoutMethod = function(deferred, colorCircleState) {
      const colorCircleRunningState = createColorCircleRunningState();
      const timeoutCallBack = function() {
        if (colorCircleRunningState.currentIndex < totalPixcels) {
          const lastIndex = colorCircleRunningState.currentIndex;
          createColorCircle(colorCircleState, colorCircleRunningState);
       
          deferred.notify(colorCircleState, 
            [lastIndex, colorCircleRunningState.currentIndex]);
          setTimeout(timeoutCallBack);
        } else {
          deferred.done(colorCircleState);
        }
      };
      return timeoutCallBack;
    };

    const colorCircleState = createColorCircleState();
    const startMethod = function(progress) {
      const res = new Promise((resolve, regject) => {
        const timeoutCallBack = 
          createTimeoutMethod({
            notify: progress,
            done: resolve
          }, colorCircleState);
        setTimeout(timeoutCallBack);
      });
      return res;
    };
    colorCircleState.start = startMethod;
    const result = colorCircleState;
    return result;
  } 
}

/**
 * rgb comparator
 * @callback RgbHs~comparator
 * @param {number} a
 * @param {number} b
 * @return {number}
 */

/**
 * hue operator procedure
 * @callback RgbHs~hueOperatorProc
 * @param {number} value
 */

/**
 * procedure to calculate lightness
 * @callback RgbHs~lightnessProc
 * @praram {number[]} rgb
 * @return {number}
 */

/**
 * procedure to calculate saturation
 * @calback RgbHs~saturationProc
 * @param {number[]} rgb
 * @param {number} chroma
 * @param {number} arg0
 */

/**
 * the procedure to calculate rgb bias value from value and chroma
 * @callback RgbHs~vToColorProc
 * @param {number} v
 * @param {number} chroma
 * @param {number[]} rgb
 * @return {number} bias - the bias to be added 
 */

/**
 * color circle progress procedure
 * @callback RgbHs~colorCircleProgressProc
 * @param {{rgb: number[], row: number, col: number, stepCount: number,
 * col, calcRowColumnIndex: {RgbHs~indexToRowColumn}}} colorCircleState
 * @param {number[]} runningState
 */

/**
 * the start procedrue to create color circle
 * @callback RgbHs~startToCreateColorCircleProc
 * @param {RgbHs~colorCircleProgressProc} progress} progress} progress} progress
 * @return {Promise}
 */


/**
 * calculate row and column index from sequencial index
 * @callback RgbHs~indexToRowColumn
 * @param {number} index
 */

/**
 * chroma representation
 * @typedef {Object} RgbHs~Chroma
 * @property {number} value
 * @property {number} maxIndex
 * @property {number} minIndex
 */

/**
 * lightness procedures
 * @typedef {Object} RgbHs~LightnessProcs
 * @property {RgbHs~lightnessProc} average
 * @property {RgbHs~lightnessProc} i 
 * @property {RgbHs~lightnessProc} max 
 * @property {RgbHs~lightnessProc} v
 * @property {RgbHs~lightnessProc} minMaxAverage
 * @property {RgbHs~lightnessProc} l
 * @property {RgbHs~lightnessProc} lumaY709
 * @property {RgbHs~lightnessProc} lumaY601
 * @property {RgbHs~lightnessProc} luma
 */

/**
 * saturation procedures
 * @typedef {Object} RgbHs~SaturatioProcs
 * @property {RgsHs~SaturationProc) i
 * @property {RgbHs~SaturationProc) v
 * @property {RgbHs~SaturationProc} l
 */

/**
 * convert index value to color value offset procedures
 * @typedef {Object} RgbHs~ValueToColorProcedures
 * @property {RgbHs~vToColorProc} value
 * @property {RgbHs~vToColorProc} lightness
 * @property {RgbHs~vToColorProc} lumaY601
 * @property {RgbHs~vToColorProc} lumaY709
 * @property {RgbHs~vToColorProc} luma
 */



export { RgbHs as default };
// vi: se ts=2 sw=2 et:
