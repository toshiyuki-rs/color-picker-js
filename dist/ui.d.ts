/// <reference path="rgb-hs.d.ts" />
/**
 * user interface
 */
export declare class UI {
    /**
     * defatult template
     * @return {string}
     */
    static get defaultTemplate(): string;
    /**
     * default template mapping
     * @return {{value: string, colorCircleCanvas: string}}
     */
    static get defaultClassNameMapping(): {
        value: string;
        colorCircleCanvas: string;
    };
    /**
     * picker marker
     * @return {(ctx: CanvasRenderingcontext2D,
     *            x: number, y: number, r: number, i: number)=>number}
     */
    static get defaultPickerMarker(): (ctx: any, x: any, y: any, r: any, i: any) => void;
    /**
     * picker marker
     * @param {number} lineWidth
     * @return {(ctx: CanvasRenderingcontext2D,
     *            x: number, y: number, r: number, i: number)=>number}
     */
    static createDefaultPickerMarker(lineWidth: any): (ctx: any, x: any, y: any, r: any, i: any) => void;
    /**
     * calculate recognizable gray index
     * @param {number} grayIndex
     * @return {number}
     */
    static calcRecognizableGrayIndex(grayIndex: any): any;
    /**
     * @type {number | undefined}
     */
    private indexValueField;
    /**
     * index value
     * @return {number | undefined}
     */
    get indexValue(): any;
    /**
     * index value
     * @param {number | undefined} value
     * @return {number}
     */
    set indexValue(value: any);
    /**
     * index value as integer
     * @return {number | undefined}
     */
    get indexValueInt(): any;
    /**
     * index value as integer
     * @param {number} value
     * @return {number}
     */
    set indexValueInt(value: any);
    /**
     * index value on user interface
     * @return {number | undefined}
     */
    get indexValueUi(): any;
    /**
     * index value on user interface
     * @param {number} value
     */
    set indexValueUi(value: any);
    /**
     *  value user interface
     *  @return {HTMLInputElement | undefined}
     */
    get valueUi(): any;
    /**
     * color type.
     */
    private colorTypeField?;
    /**
     * color type
     * @return {string | undefined}
     */
    get colorType(): string;
    /**
     * color type
     * @param {string}
     */
    set colorType(value: string);
    /**
     * color index value
     * @return {{ value: number, type: string }}
     */
    get colorIndexValue(): {
        value: any;
        type: string;
    };
    /**
     * color location which user selected on color circle
     */
    private pickerLocationField?;
    /**
     * picker location
     * radius is in range [0, 1]
     * radian is in range [0, Math.PI * 2]
     * @return {{ radius: number, radian: number }}
     */
    get pickerLocation(): {
        radius: number;
        radian: number;
    };
    /**
     * picker location
     * @param {{ radius: number, radian: number }} value
     */
    set pickerLocation(value: {
        radius: number;
        radian: number;
    });
    /**
     * picker marker
     */
    private pickerMarkerField?;
    /**
     * picker maker
     * @return {(ctx: CanvasRenderingContext2D,
     *            x: number, y: number, r: number, i: number)=>number}
     */
    get pickerMarker(): (ctx: CanvasRenderingContext2D, x: number, y: number, r: number, i: number) => void;
    /**
     * picker marker
     * @param {pickerMarker: {(ctx: CanvasRenderingContext2D,
     *            x: number, y: number, r: number, i: number)=>number}}
     */
    set pickerMarker(value: (ctx: CanvasRenderingContext2D, x: number, y: number, r: number, i: number) => void);
    /**
     * marker radius
     */
    private markerRadiusField?;
    /**
     * marker radius
     * @return {number}
     */
    get markerRadius(): number;
    /**
     * marker radius
     * @param {number} value
     */
    set markerRadius(value: number);
    /**
     * color circle user interface
     * @return {HTMLCanvasElement}
     */
    get colorCircleUi(): any;
    /**
     * marker color
     * @return {number[]}
     */
    get markColor(): any;
    /**
     * set mark color
     * @param {number[]} value
     */
    set markColor(value: any);
    /**
     * @type {boolean}
     */
    private updateUi;
    /**
     * @type {boolean}
     */
    private syncFieldWithUi;
    /**
     * internal use to decied whether notify event or not
     */
    private raiseEvent;
    /**
     * class mapping
     */
    private classMapping;
    /**
     * handler for color picker
     */
    private pickColorHandler;
    /**
     * handler for value event
     */
    private valueHandler;
    /**
     * event listener
     */
    private listeners?;
    /**
     * root element
     */
    private rootElement?;
    /**
     * saved root element contents
     */
    private oldContents?;
    /**
     * html template
     */
    private template?;
    /**
     * constructor
     * @param {string} template
     * @param {{value: string, colorCircleCanvas: string}} classMapping
     * @param {number} indexValue
     * @param {number} colorType
     */
    constructor(template?: string, classMapping?: {
        value: string;
        colorCircleCanvas: string;
    }, indexValue?: number, colorType?: string);
    /**
     * hive into root element
     * @param {HTMLElement} rootElement
     */
    bind(rootElement: any): void;
    /**
     * tear down hives
     */
    unbind(): void;
    /**
     * add event listener
     * @param {string} type
     * @param {(type: string, sender: Object)=>void} listener
     */
    addEventListener(type: any, listener: any): void;
    /**
     * remove event listener
     * @param {string} type
     * @param {(type: string, sender: Object)=>void} listener
     */
    removeEventListener(type: any, listener: any): void;
    /**
     * notify event message to event listener
     * @param {string} type
     */
    notify(type: any): void;
    /**
     * attach callbacks to button
     * @param {HTMLElement} rootElement
     */
    bindValue(rootElement: any): void;
    /**
     * attach callbacks to button
     * @param {HTMLElement} rootElement
     */
    unbindValue(rootElement: any): void;
    /**
     * bind color circle
     * @param {HTMLElement} rootElement
     */
    bindColorCircle(rootElement: any): void;
    /**
     * detach handler for color circle
     * @param {HTMLElement} rootElement
     */
    unbindColorCircle(rootElement: any): void;
    /**
     * handle event for clicking in color circle canvas lately.
     * @param {Event} event
     */
    postHandleClickInColorCircle(event: any): void;
    /**
     * handle event for clicking in color circle canvas
     * @param {Event} event
     */
    handleClickInColorCircle(event: any): void;
    /**
     * color circle location and radius
     * @param {HTMLCanvasElement} colorCanvas
     */
    getColorCircleLocRadius(colorCanvas: any): any;
    /**
     * update color circle canvas lately
     */
    postUpdateColorCircleCanvas(): void;
    /**
     * update color circle canvas
     * @param {HTMLElement} rootElement
     */
    updateColorCircleCanvas(rootElement: any): void;
    /**
     * picker location to rgb
     * @param {{radius: number, radian: number}} pickerLoc
     * @return {number[]}
     */
    convertPickerLocToRgb(pickerLoc: any): any;
    /**
     * convert rgb to marker position and index
     * @param {number[]} rgb255
     * @return {{ indexValue: number,
     *            pickerLocation: {radius: number, radian: number } }}
     */
    convertRgbToPickerLocationAndIndex(rgb255: any): any;
    /**
     * update color circle
     * @param {CanvasRenderingcontext2D} ctx
     */
    updateColorCircle(ctx: any): void;
    /**
     * update color circle
     * @param {CanvasRenderingcontext2D} ctx
     */
    updateColorCircleProgress(ctx: any): void;
    /**
     * update picker marker
     * @param {CanvasRenderingcontext2D} ctx
     */
    updatePickerMarker(ctx: any): void;
    /**
     * calculate cartesian location on canvas from picker location
     * @param {HTMLCanvasElement} canvas
     * @param {{ radius: number, radian: number }}
     * @return {number[]}
     */
    calcCanvasLocationFromPickerLocation(canvas: any, pickerLocation: any): any;
    /**
     * calculate picker location from cartesian on  canvas
     * @param {HTMLCanvasElement} canvas
     * @param {number[]} cartesian
     * @return {{ radian: number, radius: number }}
     */
    calcPickerLocationFromCanvasLocation(canvas: any, cartesian: any): any;
    /**
     * varidate value input
     */
    handleValueValidate(): void;
    /**
     * handle index increment event
     * @param {Event} event
     */
    handleValue(event: any): void;
    /**
     * synchronize index value with value user interface.
     */
    syncValueWithUi(): void;
    /**
     * synchronize value on user interface with value field
     */
    syncValueUiWithValue(): void;
}
