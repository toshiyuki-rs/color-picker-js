import { UI } from './ui'


/**
 * test user interface 
 */
class ColorPickerTest {
  /**
   * find color input item
   */
  static findColorInput(className: string) : HTMLInputElement | undefined {
    const controls = document.getElementsByClassName("color-controls")  
    let result = undefined 
    if (controls.length > 0) {
      const colorItems = controls[0].getElementsByClassName(className)
      if (colorItems.length > 0) {
        result = colorItems[0]
      }
    }
    return result
  }

  /**
   * you get true if rgb1 equals rgb2
   */
  private static isEqualRgb(rgb1: number[], rgb2: number[]): boolean {
    let result = true

    for (let i = 0; i < Math.min(rgb1.length, rgb2.length); i++) {
      if (rgb1[i] != rgb2[i]) {
        result = false
        break
      }
    }
    return result
  }

  /**
   * red color in input user interface
   */
  get inputRed(): number | undefined {
    const colorUI  = ColorPickerTest.findColorInput('red')
    let result = undefined
    if (colorUI != null) {
      result = parseInt(colorUI.value)
    }
    return result
  }

  /**
   * red color in input user interface
   */
  set inputRed(value: number) {
    let newValue = Math.min(Math.max(value, 0), 0xff)
    if (newValue != this.inputRed) {
      const colorUI  = ColorPickerTest.findColorInput('red')
      if (colorUI != null) {
        colorUI.value = value.toString()
      }
      if (this.syncWithInput) {
        this.postSyncColorPickerMarkerWithInput()
      }
    }
  }

  /**
   * green color in input user interface
   */
  get inputGreen(): number | undefined {
    const colorUI  = ColorPickerTest.findColorInput('green')
    let result = undefined
    if (colorUI != null) {
      result = parseInt(colorUI.value)
    }
    return result
  }

  /**
   * green color in input user interface
   */
  set inputGreen(value: number) {
    let newValue = Math.min(Math.max(value, 0), 0xff)
    if (newValue != this.inputGreen) {
      const colorUI  = ColorPickerTest.findColorInput('green')
      if (colorUI != null) {
        colorUI.value = value.toString()
      }
      if (this.syncWithInput) {
        this.postSyncColorPickerMarkerWithInput()
      }
    }
  }
  /**
   * blue color in input user interface
   */
  get inputBlue(): number | undefined {
    const colorUI  = ColorPickerTest.findColorInput('blue')
    let result = undefined
    if (colorUI != null) {
      result = parseInt(colorUI.value)
    }
    return result
  }

  /**
   * green color in input user interface
   */
  set inputBlue(value: number) {
    let newValue = Math.min(Math.max(value, 0), 0xff)
    if (newValue != this.inputBlue) {
      const colorUI  = ColorPickerTest.findColorInput('blue')
      if (colorUI != null) {
        colorUI.value = value.toString()
      }
      if (this.syncWithInput) {
        this.postSyncColorPickerMarkerWithInput()
      }
    }
  }




  /**
   * rgb input color
   */
  set inputColor(rgb: number[]) {
    const thisRgb = this.inputColor  
    if (thisRgb) {
      if (!ColorPickerTest.isEqualRgb(thisRgb, rgb)) {
        let savedState = this.syncWithInput
        this.syncWithInput = false
        if (rgb.length > 0) {
          this.inputRed = rgb[0]
        }
        if (rgb.length > 1) {
          this.inputGreen = rgb[1]
        }
        if (rgb.length > 2) {
          this.inputBlue = rgb[2]
        }
        if (savedState) {
          this.postSyncColorPickerMarkerWithInput()
        }
        this.syncWithInput = savedState
      }
    }
  }

  /**
   * rgb input color
   */
  get inputColor(): number[] | undefined  {
    const red = this.inputRed
    const green = this.inputGreen
    const blue = this.inputBlue 
    let result = undefined
    if (typeof red !== 'undefined'
        && typeof green !== 'undefined'
        && typeof blue !== 'undefined') {
      result = [red, green, blue]
    }
    return result
  }

  /**
   * user inteface mark color
   */
  set markColorUI(rgb: number[]) {
    const picker = this.colorPickerUI
    if (picker != null) {
      picker.markColor = rgb
    }
  }

  /**
   * user inteface mark color
   */
  get markColorUI(): number[] | undefined {
    const picker = this.colorPickerUI
    let result = undefined
    if (picker != null) {
      result = picker.markColor
    }
    return result
  }

  /**
   * input handler
   */
  private inputHdlr: ((InputEvent) => void | undefined)

  /**
   * color picker hanlder
   */
  private pickerHdlr: (({type: string, target: object}) => void | undefined)

  /**
   * color picker 
   */
  private colorPickerUI: UI | undefined


  /**
   * flag to synchronize picker marker with user input value
   */
  private syncWithInput: boolean 
  /**
   * flag to synchronize picker user input value with  marker 
   */
  private syncWithMarker: boolean

  /**
   * flag to try to back value to last data.
   */
  private inputRestoringValue: boolean
  /**
   * constructor
   */
  constructor() {
    this.syncWithInput = true
    this.syncWithMarker = true
    this.inputRestoringValue = false
  }

  /**
   * atatch this object into html element.
   */
  bind() {

    this.inputHdlr = function(event: InputEvent) {
      this.onInput(event)
    }.bind(this)
    this.pickerHdlr = function(event: {type: string, target: object}) {
      this.onMarkColorChanged(event)
    }.bind(this)
    const colorClasses = [ "red", "green", "blue" ]
    colorClasses.forEach(className => {
      const item = ColorPickerTest.findColorInput(className)
      if (item) {
        item.addEventListener('input', this.inputHdlr)
      }
    })
    const ui = new UI()
    ui.bind(<HTMLElement>document.body.getElementsByClassName(
      'color-picker')[0]);
    ui.addEventListener(null, this.pickerHdlr)
    this.colorPickerUI = ui
  }


  /**
   * detatch this object into html element.
   */
  unbind() {

    if (this.inputHdlr) {
      const colorClasses = [ "red", "green", "blue" ]
      colorClasses.forEach(className => {
        const item = ColorPickerTest.findColorInput(className)
        if (item) {
          item.removeEventListener('input', this.inputHdlr)
        }
      })
      this.inputHdlr = undefined;
    }

    if (this.pickerHdlr) {
      const ui = this.colorPickerUI
      ui.unbind();
      ui.removeEventListener(null, this.pickerHdlr)
      this.pickerHdlr = undefined
    }
  }

  /**
   * handle input event
   */
  onInput(event: InputEvent) {
    const elem = <HTMLInputElement> event.target 
    const compValue = parseInt(elem.value)
    if (!this.inputRestoringValue) {
      if (!isNaN(compValue)) {
        this.postSyncColorPickerMarkerWithInput()
      } else {
        setTimeout(function() {
          const savedState = this.inputRestoringValue
          this.inputRestoringValue = true 
          elem.value = elem.dataset.lastvalue 
          this.inputRestoringValue = savedState
        }.bind(this)) 
      }
    }
  }

  /**
   * handle color picker event
   */
  onMarkColorChanged(event: {type: string, target: object}) {
    if ('pickerLocation' == event.type
       || 'indexValue' == event.type) { 
      this.postSyncInputWithColorPickerMarker() 
    }
  }
 
  /**
   * synchronzie color picker marker with input rgb.
   */
  postSyncColorPickerMarkerWithInput() {
    setTimeout(function() {
      this.syncColorPickerMarkerWithInput()
    }.bind(this))
  }

  /**
   * synchronzie color picker marker with input rgb.
   */
  syncColorPickerMarkerWithInput() {
    const savedState = this.syncWithMarker
    this.syncWithMarker = false 
    const newColor = this.inputColor
    if (newColor) {
      this.markColorUI = newColor
    }
    this.syncWithMarker = savedState
  }

  /**
   * synchronize input color with color picker marker
   */
  postSyncInputWithColorPickerMarker() {
    this.syncInputWithColorPickerMarker()
  } 

  /**
   * synchronize input color with color picker marker
   */
  syncInputWithColorPickerMarker() {
    const savedStatus = this.syncWithInput 
    this.syncWithInput = false
    const markColor = this.markColorUI
    if (markColor) {
      this.inputColor = markColor
    } 
    this.syncWithInput = savedStatus
  }
}

if (typeof window !== 'undefined') {
  const colorPickerTest = new ColorPickerTest();
  const savedLoad = window.onload

  const handleUnload = () => {
    colorPickerTest.unbind()
  }
  const initialSetting = ()=> {
    const testColor = [0x38, 0xbb, 0xda, 0xff]
    colorPickerTest.markColorUI = testColor
  }
  const handleLoad = (event) => {
    if (typeof savedLoad === 'function') {
      savedLoad.call(this, event);
    }
    colorPickerTest.bind() 
    setTimeout(initialSetting)
    window.addEventListener('onunload', handleUnload)
  }
  window.onload = handleLoad
}

// vi: se ts=2 sw=2 et:
