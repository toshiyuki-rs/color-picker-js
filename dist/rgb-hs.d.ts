/**
 * rgb hsv management
 */
export declare class RgbHs {
    /**
     * convert from rgb to hex
     * @param {number[]} rgb
     * @return {number}
     */
    static rgbToHex(rgb: any): any;
    /**
     * convert hex to rgb
     * @param {number} rgb
     * @return {number[]}
     */
    static hexToRgb(rgb: any): any;
    /**
     * convert from rgb to array
     * @param {{red: number, green: number, blue: number}} rgb
     * @return {number[]}
     */
    static toRgbArray(rgb: any): any[];
    /**
     * find index
     * @param {number[]} rgb
     * @param {(a: number, b: number) => number} comparator
     */
    static findIndex(rgb: any, comparator: any): any;
    /**
     * find max index
     * @param {number[]} rgb
     */
    static findMaxIndex(rgb: any): any;
    /**
     * find minimum index
     * @param {number[]} rgb
     */
    static findMinIndex(rgb: any): any;
    /**
     * calculate chroma
     * @param {number[]} rgb
     * @return {{value: number, maxIndex: number,  minIndex: number}}
     */
    static calcChroma(rgb: any): {
        value: number;
        maxIndex: any;
        minIndex: any;
    };
    /**
     * heu operator
     * @return {((v: number) => number)[]}
     */
    static get hueOperator(): ((value: any) => any)[];
    /**
     * calculate hue
     * @param {number[]} rgb
     * @param {{maxIndex: number}} chroma
     * @return {number} hue
     */
    static calcHue(rgb: any, chroma: any): any;
    /**
     * calculate cos 30 degree
     * @return {number}
     */
    static get cos30(): number;
    /**
     * calculate hue and chroma
     * @param {number[]} rgb
     * @return {{chroma: {value: number, maxIndex: number, minIndex: number},
     *           hue: number}}
     */
    static calcHueChroma(rgb: any): {
        chroma: {
            value: number;
            maxIndex: any;
            minIndex: any;
        };
        hue: any;
    };
    /**
     * calculate hue and chroma with hexagonal mode
     * @param {number[]} rgb
     * @return {{alpha: number, beta: number, hue2: number, chroma2: number}}
     */
    static calcHueChroma2(rgb: any): {
        alpha: number;
        beta: number;
        hue2: number;
        chroma2: number;
    };
    /**
     * calculate luma
     * @param {number[]} rgb
     * @param {number[]} coefficients
     * @return {number} luma value
     */
    static luma(rgb: any, coefficients: any): any;
    /**
     * calculate luma y 709
     * @param {number[]} rgb
     * @return {number} luma value
     */
    static lumaY709(rgb: any): any;
    /**
     * calculate luma y 601
     * @param {number[]} rgb
     * @return {number} luma value
     */
    static lumaY601(rgb: any): any;
    /**
     * get maximum value of rgb component
     * @param {number[]} rgb
     * @return {number}
     */
    static rgbMaxValue(rgb: any): any;
    /**
     * get minimum value of rgb component
     * @param {number[]} rgb
     * @return {number}
     */
    static rgbMinValue(rgb: any): any;
    /**
     * calculate average between max and min value of rgb component
     * @param {number[]} rgb
     * @return {number}
     */
    static rgbMinMaxAverage(rgb: any): number;
    /**
     * calculate average of rgb components
     * @param {number[]} rgb
     * @return {number}
     */
    static rgbAverage(rgb: any): number;
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
    static get lightness(): {
        average: typeof RgbHs.rgbAverage;
        i: typeof RgbHs.rgbAverage;
        max: typeof RgbHs.rgbMaxValue;
        v: typeof RgbHs.rgbMaxValue;
        minMaxAverage: typeof RgbHs.rgbMinMaxAverage;
        l: typeof RgbHs.rgbMinMaxAverage;
        lumaY709: typeof RgbHs.lumaY709;
        lumaY601: typeof RgbHs.lumaY601;
        luma: typeof RgbHs.lumaY601;
    };
    /**
     * saturation procedures
     * @return {{
     *            i: (rgb: number[], chroma: number, i: number) => number,
     *            v: (rgb: number[], chroma: number, v: number) => number,
     *            l: (rgb: number[], chroma: number, l: number) => number
     *          }}
     */
    static get saturation(): {
        i: (rgb: any, chroma: any, i: any) => any;
        v: (rgb: any, chroma: any, v: any) => any;
        l: (rgb: any, chroma: any, l: any) => any;
    };
    /**
     * convert rgb [0, 255] array to rgb [0, 1] array
     * @param {number[]} rgb
     * @return {number[]} rgb
     */
    static rgb255ToRgb1(rgb: any): {
        red: number;
        green: number;
        blue: number;
    };
    /**
     * convert rgb to hexagnal hsv
     * @param {{red: number, green: number, blue: number}}
     * @return {{hue2: number, chroma2: number, v: number, saturation: number}}
     */
    static rgbToHsv2(rgb: any): {
        hue2: any;
        chroma2: any;
        v: any;
        saturation: any;
    };
    /**
     * convert rgb to hexagnal hsl
     * @param {{red: number, green: number, blue: number}}
     * @return {{hue2: number, chroma2: number, l: number, saturation: number}}
     */
    static rgbToHsl2(rgb: any): {
        hue2: number;
        chroma2: number;
        l: number;
        saturation: any;
    };
    /**
     * calculate chroma from hue
     * @param {number} hue
     * @param {number} chroma
     */
    static calcChromaRatioFromHue(hue: any): any;
    /**
     * convert [x, y, r, v] to rgb.
     *
     * @param {number} x - x coordinate
     * @param {number} y - y coordinage
     * @param {number} r - radius
     * @param {number} v - value for hsv
     * @param {(v: number, chroma: number, rgb: number[]) => number} vToColorValue
     */
    static xyrvToRgb(x: any, y: any, r: any, v: any, vToColorValue: any): any;
    /**
     * calc rgb from hue and chroma
     * @param {number} hue
     * @param {number} chroma
     * @param {number} v - value for hsv
     * @param {(v: number, chroma: number, rgb: number[]) => number} vToColorValue
     */
    static hueChromaToRgb(hue: any, chroma: any, v: any, vToColorValue: any): number[];
    /**
     * value to color value
     * @param {number} v
     * @param {number} chroma
     * @param {number[]} rgbTempValue
     * @return {number}
     */
    static vToColorValue(v: any, chroma: any, rgbTempValue: any): number;
    /**
     * lightness to color value
     * @param {number} l
     * @param {number} chroma
     * @param {number[]} rgbTempValue
     * @return {number}
     */
    static lToColorValue(l: any, chroma: any, rgbTempValue: any): number;
    /**
     * luma Y 709 to color value
     * @param {number} y709
     * @param {number} chroma
     * @param {number[]} rgbTempValue
     * @return {number}
     */
    static lumaY709ToColorValue(y709: any, chroma: any, rgbTempValue: any): number;
    /**
     * luma Y 601 to color value
     * @param {number} y601
     * @param {number} chroma
     * @param {number[]} rgbTempValue
     * @return {number}
     */
    static lumaY601ToColorValue(y601: any, chroma: any, rgbTempValue: any): number;
    /**
     * get true if [x, y] coordinate in circle which has radius
     * @param {number} x
     * @param {number} y
     * @param {number} radius
     * @return {number}
     */
    static isInCircle(x: any, y: any, radius: any): boolean;
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
    static get indexValueToColorValueFunctions(): {
        value: typeof RgbHs.vToColorValue;
        lightness: typeof RgbHs.lToColorValue;
        lumaY601: typeof RgbHs.lumaY601ToColorValue;
        lumaY709: typeof RgbHs.lumaY709ToColorValue;
        luma: typeof RgbHs.lumaY601ToColorValue;
    };
    /**
     * create color circle
     * @param {number} radius
     * @param {number} indexValue
     * @param {Object | undefined} notCircleValue
     * @return {{rgb: number[], row: number, col: number}}
     */
    static createColorCircle(radius: any, indexValue: any, notCircleValue: any): {
        rgb: any[];
        row: number;
        col: number;
    };
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
    static createColorCircleProgress(radius: any, indexValue: any, notCircleValue: any): {
        start: (progress: any) => Promise<unknown>;
    };
}
