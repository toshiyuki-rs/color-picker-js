export { RgbHs as default };
/**
 * @namespace oc.color
 */
/**
 * rgb hsv management
 */
declare class RgbHs {
    /**
     * convert from rgb to hex
     * @param {number[]} rgb
     * @return {number}
     */
    static rgbToHex(rgb: number[]): number;
    /**
     * convert hex to rgb
     * @param {number} rgb
     * @return {number[]}
     */
    static hexToRgb(rgb: number): number[];
    /**
     * convert from rgb to array
     * @param {{red: number, green: number, blue: number}} rgb
     * @return {number[]}
     */
    static toRgbArray(rgb: {
        red: number;
        green: number;
        blue: number;
    }): number[];
    /**
     * find index
     * @param {number[]} rgb
     * @param {(a: number, b: number) => number} comparator
     */
    static findIndex(rgb: number[], comparator: (a: number, b: number) => number): number;
    /**
     * find max index
     * @param {number[]} rgb
     */
    static findMaxIndex(rgb: number[]): number;
    /**
     * find minimum index
     * @param {number[]} rgb
     */
    static findMinIndex(rgb: number[]): number;
    /**
     * calculate chroma
     * @param {number[]} rgb
     * @return {{value: number, maxIndex: number,  minIndex: number}}
     */
    static calcChroma(rgb: number[]): {
        value: number;
        maxIndex: number;
        minIndex: number;
    };
    /**
     * heu operator
     * @return {((v: number) => number)[]}
     */
    static get hueOperator(): ((v: number) => number)[];
    /**
     * calculate hue
     * @param {number[]} rgb
     * @param {{maxIndex: number}} chroma
     * @return {number} hue
     */
    static calcHue(rgb: number[], chroma: {
        maxIndex: number;
    }): number;
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
    static calcHueChroma(rgb: number[]): {
        chroma: {
            value: number;
            maxIndex: number;
            minIndex: number;
        };
        hue: number;
    };
    /**
     * calculate hue and chroma with hexagonal mode
     * @param {number[]} rgb
     * @return {{alpha: number, beta: number, hue2: number, chroma2: number}}
     */
    static calcHueChroma2(rgb: number[]): {
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
    static luma(rgb: number[], coefficients: number[]): number;
    /**
     * calculate luma y 709
     * @param {number[]} rgb
     * @return {number} luma value
     */
    static lumaY709(rgb: number[]): number;
    /**
     * calculate luma y 601
     * @param {number[]} rgb
     * @return {number} luma value
     */
    static lumaY601(rgb: number[]): number;
    /**
     * get maximum value of rgb component
     * @param {number[]} rgb
     * @return {number}
     */
    static rgbMaxValue(rgb: number[]): number;
    /**
     * get minimum value of rgb component
     * @param {number[]} rgb
     * @return {number}
     */
    static rgbMinValue(rgb: number[]): number;
    /**
     * calculate average between max and min value of rgb component
     * @param {number[]} rgb
     * @return {number}
     */
    static rgbMinMaxAverage(rgb: number[]): number;
    /**
     * calculate average of rgb components
     * @param {number[]} rgb
     * @return {number}
     */
    static rgbAverage(rgb: number[]): number;
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
        average: (rgb: number[]) => number;
        i: (rgb: number[]) => number;
        max: (rgb: number[]) => number;
        v: (rgb: number[]) => number;
        minMaxAverage: (rgb: number[]) => number;
        l: (rgb: number[]) => number;
        lumaY709: (rgb: number[]) => number;
        lumaY601: (rgb: number[]) => number;
        luma: (rgb: number[]) => number;
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
        i: (rgb: number[], chroma: number, i: number) => number;
        v: (rgb: number[], chroma: number, v: number) => number;
        l: (rgb: number[], chroma: number, l: number) => number;
    };
    /**
     * convert rgb [0, 255] array to rgb [0, 1] array
     * @param {number[]} rgb
     * @return {number[]} rgb
     */
    static rgb255ToRgb1(rgb: number[]): number[];
    /**
     * convert rgb to hexagnal hsv
     * @param {{red: number, green: number, blue: number}}
     * @return {{hue2: number, chroma2: number, v: number, saturation: number}}
     */
    static rgbToHsv2(rgb: any): {
        hue2: number;
        chroma2: number;
        v: number;
        saturation: number;
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
        saturation: number;
    };
    /**
     * calculate chroma from hue
     * @param {number} hue
     * @param {number} chroma
     */
    static calcChromaRatioFromHue(hue: number): number;
    /**
     * convert [x, y, r, v] to rgb.
     *
     * @param {number} x - x coordinate
     * @param {number} y - y coordinage
     * @param {number} r - radius
     * @param {number} v - value for hsv
     * @param {(v: number, chroma: number, rgb: number[]) => number} vToColorValue
     */
    static xyrvToRgb(x: number, y: number, r: number, v: number, vToColorValue: (v: number, chroma: number, rgb: number[]) => number): number[];
    /**
     * calc rgb from hue and chroma
     * @param {number} hue
     * @param {number} chroma
     * @param {number} v - value for hsv
     * @param {(v: number, chroma: number, rgb: number[]) => number} vToColorValue
     */
    static hueChromaToRgb(hue: number, chroma: number, v: number, vToColorValue: (v: number, chroma: number, rgb: number[]) => number): number[];
    /**
     * value to color value
     * @param {number} v
     * @param {number} chroma
     * @param {number[]} rgbTempValue
     * @return {number}
     */
    static vToColorValue(v: number, chroma: number, rgbTempValue: number[]): number;
    /**
     * lightness to color value
     * @param {number} l
     * @param {number} chroma
     * @param {number[]} rgbTempValue
     * @return {number}
     */
    static lToColorValue(l: number, chroma: number, rgbTempValue: number[]): number;
    /**
     * luma Y 709 to color value
     * @param {number} y709
     * @param {number} chroma
     * @param {number[]} rgbTempValue
     * @return {number}
     */
    static lumaY709ToColorValue(y709: number, chroma: number, rgbTempValue: number[]): number;
    /**
     * luma Y 601 to color value
     * @param {number} y601
     * @param {number} chroma
     * @param {number[]} rgbTempValue
     * @return {number}
     */
    static lumaY601ToColorValue(y601: number, chroma: number, rgbTempValue: number[]): number;
    /**
     * get true if [x, y] coordinate in circle which has radius
     * @param {number} x
     * @param {number} y
     * @param {number} radius
     * @return {number}
     */
    static isInCircle(x: number, y: number, radius: number): number;
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
        value: (v: number, chroma: number, rgb: number[]) => number;
        lightness: (v: number, chroma: number, rgb: number[]) => number;
        lumaY601: (v: number, chroma: number, rgb: number[]) => number;
        lumaY709: (v: number, chroma: number, rgb: number[]) => number;
        luma: (v: number, chroma: number, rgb: number[]) => number;
    };
    /**
     * create color circle
     * @param {number} radius
     * @param {number} indexValue
     * @param {Object | undefined} notCircleValue
     * @return {{rgb: number[], row: number, col: number}}
     */
    static createColorCircle(radius: number, indexValue: number, notCircleValue: any | undefined): {
        rgb: number[];
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
    static createColorCircleProgress(radius: number, indexValue: number, notCircleValue: any | undefined): {
        start: (progress: (state: {
            rgb: number[];
            row: number;
            col: number;
            calcRowColumnIndex: (index: number) => number;
        }, curRange: number[]) => void) => Promise<any>;
    };
}
