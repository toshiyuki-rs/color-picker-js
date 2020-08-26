
/**
 * rgb hsv management
 */
export class RgbHs {

  /**
   * convert from rgb to hex
   * @param {number[]} rgb
   * @return {number}
   */
  static rgbToHex(rgb: number[]): number {
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
  static hexToRgb(rgb: number): number[] {
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
  static toRgbArray(
    rgb: {red: number, green: number, blue: number}): number[] {
    return [rgb.red, rgb.green, rgb.blue];
  }

  /**
   * find index 
   * @param {number[]} rgb
   * @param {(a: number, b: number) => number} comparator
   */
  static findIndex(
    rgb: number[], 
    comparator: (a: number, b: number) => number): number {
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
  static findMaxIndex(rgb: number[]): number {
    return RgbHs.findIndex(rgb, 
      (value1, value2) => { 
        return value2 - value1;
      });
   }

  /**
   * find minimum index
   * @param {number[]} rgb
   */
  static findMinIndex(rgb: number[]): number {
    return RgbHs.findIndex(rgb, 
      (value1, value2) => { 
        return value1 - value2;
      });
  }

  /**
   * calculate chroma
   * @param {number[]} rgb
   * @return {{value: number, maxIndex: number,  minIndex: number}}
   */
  static calcChroma(rgb: number[]): 
    {value: number, maxIndex: number,  minIndex: number} {
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
   * @return {((v: number) => number)[]} 
   */
  static get hueOperator(): ((value: number)=>number)[] {
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
  static calcHue(
    rgb: number[], 
    chroma: {maxIndex: number, value: number}): number {
    let result;
    if (chroma.value != 0) {
      let tempValue;
      tempValue = rgb[(chroma.maxIndex + 1) % 3]
        - rgb[(chroma.maxIndex + 2) % 3];
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
  static calcHueChroma(rgb: number[])
    : {chroma: {value: number, maxIndex: number, minIndex: number}, 
        hue: number} {
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
  static calcHueChroma2(
    rgb: number[]):
    {alpha: number, beta: number, hue2: number, chroma2: number} {
    const alpha = (2 * rgb[0] - rgb[1] - rgb[2]) / 2;
    const cos30 = Math.pow(3, 0.5) / 2;
    const beta = cos30 * (rgb[1] - rgb[2]);
    const hue2 = Math.atan2(alpha, beta);
    const chroma2 = Math.sqrt(alpha * alpha + beta * beta);
    return {
      alpha,
      beta,
      hue2,
      chroma2
    };
  }

  /**
   * calculate luma
   * @param {number[]} rgb
   * @param {number[]} coefficients
   * @return {number} luma value
   */
  static luma(
    rgb: number[], 
    coefficients: number[]): number {
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
  static lumaY709(rgb: number[]): number {
    return RgbHs.luma(rgb, [.21, .72, .07]);  
  }

  /**
   * calculate luma y 601
   * @param {number[]} rgb
   * @return {number} luma value
   */
  static lumaY601(rgb: number[]): number {
    return RgbHs.luma(rgb, [.3, .59, .11]);
  }

  /**
   * get maximum value of rgb component
   * @param {number[]} rgb
   * @return {number}
   */
  static rgbMaxValue(rgb: number[]): number {
    return rgb[RgbHs.findMaxIndex(rgb)];
  }

  /**
   * get minimum value of rgb component
   * @param {number[]} rgb
   * @return {number}
   */
  static rgbMinValue(rgb: number[]): number {
    return rgb[RgbHs.findMinIndex(rgb)];
  }

  /**
   * calculate average between max and min value of rgb component
   * @param {number[]} rgb
   * @return {number}
   */
  static rgbMinMaxAverage(rgb: number[]): number {
    return (rgb[RgbHs.findMaxIndex(rgb)] + rgb[RgbHs.findMinIndex(rgb)]) / 2;
  }

  /**
   * calculate average of rgb components
   * @param {number[]} rgb
   * @return {number}
   */
  static rgbAverage(rgb: number[]): number {
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
  static get lightness():
    { average: (rgb: number[]) => number,
      i: (rgb: number[]) => number,
      max: (rgb: number[]) => number,
      v: (rgb: number[]) => number,
      minMaxAverage: (rgb: number[]) => number,
      l: (rgb: number[]) => number,
      lumaY709: (rgb: number[]) => number,
      lumaY601: (rgb: number[]) => number,
      luma: (rgb: number[]) => number }{
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
  static get saturation(): 
    { i: (rgb: number[], chroma: number, i: number) => number,
      v: (rgb: number[], chroma: number, v: number) => number,
      l: (rgb: number[], chroma: number, l: number) => number} {
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
  static rgb255ToRgb1(
    rgb: {red: number, green: number, blue: number}):
      {red: number, green: number, blue: number} {
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
  static rgbToHsv2(
    rgb: {red: number, green: number, blue: number}):
      {hue2: number, chroma2: number, v: number, saturation: number} {
    const rgb0 = RgbHs.toRgbArray(rgb);
    const hueChroma = RgbHs.calcHueChroma2(rgb0);
    const v = RgbHs.lightness.v(rgb0);
       
    const result = {
      hue2: hueChroma.hue2,
      chroma2: hueChroma.chroma2,
      v,
      saturation: RgbHs.saturation.v(rgb0, hueChroma.chroma2, v)
    };
    return result;
  }
  /**
   * convert rgb to hexagnal hsl
   * @param {{red: number, green: number, blue: number}}
   * @return {{hue2: number, chroma2: number, l: number, saturation: number}}
   */
  static rgbToHsl2(
    rgb:{red: number, green: number, blue: number}):
      {hue2: number, chroma2: number, l: number, saturation: number} {
    const rgb0 = RgbHs.toRgbArray(rgb);
    const hueChroma = RgbHs.calcHueChroma2(rgb0);
    const l = RgbHs.lightness.l(rgb0);
       
    const result = {
      hue2: hueChroma.hue2,
      chroma2: hueChroma.chroma2,
      l,
      saturation: RgbHs.saturation.l(rgb0, hueChroma.chroma2, l)
    };
    return result;
  }

  /**
   * calculate chroma from hue
   * @param {number} hue
   */
  static calcChromaRatioFromHue(hue: number): number {
    const root3 = Math.sqrt(3);
    let angle;
    angle = hue % (Math.PI / 3);
    let raise;
    raise = Math.tan(angle);
    let x;
    x = root3 / (raise + root3);
    let y;
    y = raise * x;
    const result = Math.sqrt(x * x + y * y);
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
  static xyrvToRgb(
    x: number, 
    y: number,
    r: number, 
    v: number, 
    vToColorValue: (v: number, chroma: number, rgb: number[]) => number):
    number[] | undefined {
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
      const chroma = xyRadius;
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
  static hueChromaToRgb(
    hue: number, 
    chroma: number, 
    v: number, 
    vToColorValue: (v:number, chroma:number, rgb:number[]) => number):
    number[] {
    var hue6 = hue / (Math.PI / 3);
    hue6 = Math.min(hue6, 6)
    hue6 = Math.max(hue6, 0) 

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
  static vToColorValue(v: number, chroma: number, rgbTempValue: number[]):
    number {
    return v - chroma;
  }

  /**
   * lightness to color value
   * @param {number} l
   * @param {number} chroma
   * @param {number[]} rgbTempValue
   * @return {number}
   */
  static lToColorValue(
    l: number, 
    chroma: number, 
    rgbTempValue: number[]): number {
    return l - chroma / 2;  
  }

  /**
   * luma Y 709 to color value
   * @param {number} y709
   * @param {number} chroma
   * @param {number[]} rgbTempValue
   * @return {number}
   */
  static lumaY709ToColorValue(
    y709: number, 
    chroma: number, 
    rgbTempValue: number[]): number {
    return y709 - RgbHs.lumaY709(rgbTempValue);
  }

  /**
   * luma Y 601 to color value
   * @param {number} y601
   * @param {number} chroma
   * @param {number[]} rgbTempValue
   * @return {number}
   */
  static lumaY601ToColorValue(
    y601: number, 
    chroma: number, 
    rgbTempValue: number[]): number {
    return y601 - RgbHs.lumaY601(rgbTempValue);
  }

  /**
   * get true if [x, y] coordinate in circle which has radius
   * @param {number} x
   * @param {number} y
   * @param {number} radius
   */
  static isInCircle(
    x: number, 
    y: number, 
    radius: number): boolean {
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
  static get indexValueToColorValueFunctions(): 
    {
      value: (v: number, chroma: number, rgb: number[]) => number,
      lightness: (v: number, chroma: number, rgb: number[]) => number,
      lumaY601: (v: number, chroma: number, rgb: number[]) => number,
      lumaY709: (v: number, chroma: number, rgb: number[]) => number,
      luma: (v: number, chroma: number, rgb: number[]) => number}{
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
  static createColorCircle(
    radius: number, 
    indexValue: { value: number, type: string }, 
    notCircleValue: any): {
        rgb: (number | any)[], 
        row: number, 
        col: number}  {
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
          rowRgbValues[colIndex] = RgbHs.rgbToHex(rgbValue);
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
   * @return {{
   *            start:(progress:(state: {
   *                    rgb: number[],
   *                    row: number,
   *                    col: number,
   *                    calcRowColumnIndex: (index: number) => number},
   *                    curRange: number[])=>void) => Promise
   *         }}
   */
  static createColorCircleProgress(
    radius: number, 
    indexValue: { value: number, type: string}, 
    notCircleValue: any): {
      start:(progress:
             (state: {
                rgb: number[],
                row: number,
                col: number,
                calcRowColumnIndex: (index: number) => number},
                curRange: number[])=>void) => Promise<{
                  state: {
                    rgb: number[],
                    row: number,
                    col: number,
                    calcRowColumnIndex: (index: number) => number},
                    curRange: number[]}> } {
    let diameter;
    diameter = 2 * radius;
    var totalPixcels;
    totalPixcels = 4 * radius * radius;
    const calcRowColumnIndex = function(index) {
      const result = {
        row: Math.floor(index / (2 * radius)),
        column: index % (2 * radius)
      }
      return result;
    }

    const createColorCircleState = function() {
      const result = {
        stepCount: diameter,
        rgb: [],
        row: diameter,
        col: diameter,
        calcRowColumnIndex: calcRowColumnIndex
      }
      return result
    }
    const createColorCircleRunningState = function() {
      const result = {
        currentIndex: 0
      };
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
      const res = new Promise<{
        state: {
          rgb: number[],
          row: number,
          col: number,
          calcRowColumnIndex: (index: number) => number},
          curRange: number[]}>((resolve, regject) => {
        const timeoutCallBack = 
          createTimeoutMethod({
            notify: progress,
            done: resolve
          }, colorCircleState);
        setTimeout(timeoutCallBack);
      });
      return res;
    };
    const result = {
      start: startMethod
    };
    return result;
  } 
}

// vi: se ts=2 sw=2 et:
