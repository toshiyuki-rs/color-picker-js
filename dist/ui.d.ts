export { UI as default };
/**
 * @namespace oc.color
 */
/**
 * user interface
 */
declare class UI {
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
    static get defaultPickerMarker(): (ctx: any, x: number, y: number, r: number, i: number) => number;
    /**
     * picker marker
     * @param {number} lineWidth
     * @return {(ctx: CanvasRenderingcontext2D,
     *            x: number, y: number, r: number, i: number)=>number}
     */
    static createDefaultPickerMarker(lineWidth: number): (ctx: any, x: number, y: number, r: number, i: number) => number;
    /**
     * calculate recognizable gray index
     * @param {number} grayIndex
     * @return {number}
     */
    static calcRecognizableGrayIndex(grayIndex: number): number;
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
    }, indexValue?: number, colorType?: number);
    /**
     * index value
     * @param {number | undefined} value
     * @return {number}
     */
    set indexValue(arg: number);
    /**
     * index value
     * @return {number | undefined}
     */
    get indexValue(): number;
    /** @private */
    private indexValueField;
    /**
     * index value as integer
     * @param {number} value
     * @return {number}
     */
    set indexValueInt(arg: number);
    /**
     * index value as integer
     * @return {number | undefined}
     */
    get indexValueInt(): number;
    /**
     * index value on user interface
     * @param {number} value
     */
    set indexValueUi(arg: number);
    /**
     * index value on user interface
     * @return {number | undefined}
     */
    get indexValueUi(): number;
    /**
     *  value user interface
     *  @return {HTMLInputElement | undefined}
     */
    get valueUi(): HTMLInputElement;
    /**
     * color type
     * @param {string}
     */
    set colorType(arg: string);
    /**
     * color type
     * @return {string | undefined}
     */
    get colorType(): string;
    /** @ignore */
    colorTypeField: string;
    /**
     * color index value
     * @return {{ value: number, type: string }}
     */
    get colorIndexValue(): {
        value: number;
        type: string;
    };
    /**
     * picker location
     * @param {{ radius: number, radian: number }} value
     */
    set pickerLocation(arg: {
        radius: number;
        radian: number;
    });
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
    /** @ignore */
    pickerLocationField: {
        radius: number;
        radian: number;
    };
    /**
     * picker marker
     * @param {pickerMarker: {(ctx: CanvasRenderingcontext2D,
     *            x: number, y: number, r: number, i: number)=>number}}
     */
    set pickerMarker(arg: (ctx: any, x: number, y: number, r: number, i: number) => number);
    /**
     * picker maker
     * @return {(ctx: CanvasRenderingcontext2D,
     *            x: number, y: number, r: number, i: number)=>number}
     */
    get pickerMarker(): (ctx: any, x: number, y: number, r: number, i: number) => number;
    /** @ignore */
    pickerMarkerField: (ctx: any, x: number, y: number, r: number, i: number) => number;
    /**
     * marker radius
     * @param {number} value
     */
    set markerRadius(arg: number);
    /**
     * marker radius
     * @return {number}
     */
    get markerRadius(): number;
    /** @ignore */
    markerRadiusField: number;
    /**
     * color circle user interface
     * @return {HTMLCanvasElement}
     */
    get colorCircleUi(): HTMLCanvasElement;
    /**
     * set mark color
     * @param {number[]} value
     */
    set markColor(arg: number[]);
    /**
     * marker color
     * @return {number[]}
     */
    get markColor(): number[];
    updateUi: any;
    raiseEvent: any;
    /** @ignore */
    syncFieldWithUi: any;
    template: string;
    classMapping: {
        value: string;
        colorCircleCanvas: string;
    };
    /** ignore */
    listeners: {};
    /**
     * hive into root element
     * @param {HTMLElement} rootElement
     */
    bind(rootElement: HTMLElement): void;
    /** @ignore */
    oldContents: string;
    rootElement: HTMLElement;
    /**
     * tear down hives
     */
    unbind(): void;
    /**
     * add event listener
     * @param {string} type
     * @param {(type: string, sender: Object)=>void} listener
     */
    addEventListener(type: string, listener: (type: string, sender: any) => void): void;
    /**
     * remove event listener
     * @param {string} type
     * @param {(type: string, sender: Object)=>void} listener
     */
    removeEventListener(type: string, listener: (type: string, sender: any) => void): void;
    /**
     * notify event message to event listener
     * @param {string} type
     */
    notify(type: string): void;
    /**
     * attach callbacks to button
     * @param {HTMLElement} rootElement
     */
    bindValue(rootElement: HTMLElement): void;
    /** @ignore */
    valueHandler: any;
    /**
     * attach callbacks to button
     * @param {HTMLElement} rootElement
     */
    unbindValue(rootElement: HTMLElement): void;
    /**
     * bind color circle
     * @param {HTMLElement} rootElement
     */
    bindColorCircle(rootElement: HTMLElement): void;
    /** @ignore */
    pickColorHandler: any;
    /**
     * detach handler for color circle
     * @param {HTMLElement} rootElement
     */
    unbindColorCircle(rootElement: HTMLElement): void;
    /**
     * handle event for clicking in color circle canvas lately.
     * @param {Event} event
     */
    postHandleClickInColorCircle(event: Event): void;
    /**
     * handle event for clicking in color circle canvas
     * @param {Event} event
     */
    handleClickInColorCircle(event: Event): void;
    /**
     * color circle location and radius
     * @param {HTMLCanvasElement} colorCanvas
     */
    getColorCircleLocRadius(colorCanvas: HTMLCanvasElement): {
        loc: number[];
        radius: number;
    };
    /**
     * update color circle canvas lately
     */
    postUpdateColorCircleCanvas(): void;
    /**
     * update color circle canvas
     * @param {HTMLElement} rootElement
     */
    updateColorCircleCanvas(rootElement: HTMLElement): void;
    /**
     * picker location to rgb
     * @param {{radius: number, radian: number}} pickerLoc
     * @return {number[]}
     */
    convertPickerLocToRgb(pickerLoc: {
        radius: number;
        radian: number;
    }): number[];
    /**
     * convert rgb to marker position and index
     * @param {number[]} rgb255
     * @return {{ indexValue: number,
     *            pickerLocation: {radius: number, radian: number } }}
     */
    convertRgbToPickerLocationAndIndex(rgb255: number[]): {
        indexValue: number;
        pickerLocation: {
            radius: number;
            radian: number;
        };
    };
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
    calcCanvasLocationFromPickerLocation(canvas: HTMLCanvasElement, pickerLocation: any): number[];
    /**
     * calculate picker location from cartesian on  canvas
     * @param {HTMLCanvasElement} canvas
     * @param {number[]} cartesian
     * @return {{ radian: number, radius: number }}
     */
    calcPickerLocationFromCanvasLocation(canvas: HTMLCanvasElement, cartesian: number[]): {
        radian: number;
        radius: number;
    };
    /**
     * varidate value input
     */
    handleValueValidate(): void;
    /**
     * handle index increment event
     * @param {Event} event
     */
    handleValue(event: Event): void;
    /**
     * synchronize index value with value user interface.
     */
    syncValueWithUi(): void;
    /**
     * synchronize value on user interface with value field
     */
    syncValueUiWithValue(): void;
}
