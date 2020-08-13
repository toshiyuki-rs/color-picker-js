import RgbHs from './rgb-hs.js'

/**
 * user interface
 */
class UI {

  /**
   * defatult template
   */
  static get defaultTemplate() {
    return `<div class="oc-color-circle-container">
  <canvas class="oc-color-circle" width="200px" height="200px"></canvas>
</div>
<div class="oc-color-controller">
  <input class="oc-value" type="number" min="0" max="255">
</div>
`
  }

  /**
   * default template mapping
   */
  static get defaultClassNameMapping() {
    return {
      value: 'oc-value',
      colorCircleCanvas: 'oc-color-circle'
    }
  }
  /**
   * picker marker
   */
  static get defaultPickerMarker() {
    return UI.createDefaultPickerMarker(1.0)
  }
 
  /**
   * picker marker
   */
  static createDefaultPickerMarker(lineWidth) {
    return (ctx, x, y, r, i) => {

      const savedLineWidth = ctx.lineWidth
      const savedStrokeStyle = ctx.strokeStyle
      const grayIdx = UI.calcRecognizableGrayIndex(i)
      const strokeStyle = `rgb(${grayIdx}, ${grayIdx}, ${grayIdx})`
      ctx.beginPath()
      ctx.lineWidth = lineWidth
      ctx.strokeStyle = strokeStyle
      ctx.ellipse(x, y, r, r, 0, 0, 2 * Math.PI)
      ctx.stroke()
      ctx.lineWidth = savedLineWidth
      ctx.strokeStyle = savedStrokeStyle
    }
  }

  /**
   * calculate recognizable gray index
   */
  static calcRecognizableGrayIndex(grayIndex) {
    let result
    if (grayIndex < 1.0 / 4 || grayIndex >= 3.0 / 4) {
      result = 1 - grayIndex
    } else {
      if (grayIndex <= 2.0 / 4) {
        result = grayIndex - 1.0 / 4 + 3.0 / 4
      } else {
        result = grayIndex - 2.0 / 4
      }
    }
    result = parseInt(result * 0xff) 
    if (result > 0xff) {
      result = 0xff
    } else if (result < 0) {
      result = 0
    }
    return result
  }

  /**
   * index value
   */
  get indexValue() {
    return this.indexValueField
  }

  set indexValue(value) {
    const thisValue = this.indexValue
    let doSet = false
    if (typeof value !== 'undefined') {
      if (value > 1) {
        value = 1
      }
      if (value < 0) {
        value = 0
      }
    }
    if (typeof thisValue !== 'undefined') {
      if (typeof value !== 'undefined') {
        doSet = thisValue != value
      }
    } else {
      doSet = typeof value !== 'undefined'
    }
    if (doSet) {
      this.indexValueField = value
      if (this.updateUi) {
        setTimeout(function() { this.syncValueUiWithValue() }.bind(this))
        this.postUpdateColorCircleCanvas()
      }
    }
  }

  /**
   * index value as integer
   */
  get indexValueInt() {
    let result = this.indexValue
    if (typeof result !== 'undefined') {
      result = parseInt(result * 0xff)
    }
    return result
  }

  set indexValueInt(value) {
    if (typeof value !== 'undefined') {
      value = parseFloat(value) / 0xff
    }
    this.indexValue = value
  }

  /**
   * index value on user interface
   */
  get indexValueUi() {
    let result
    let valueUi = this.valueUi
    if (typeof valueUi !== 'undefined') {
      const num = parseInt(valueUi.value)
      if (!isNaN(num)) {
        result = num
      }
    }
    return result
  }

  /**
   * index value on user interface
   */
  set indexValueUi(value) {
    const thisValue = this.indexValueUi
    let doSet = false
    doSet = typeof value !== 'undefined'
    if (doSet) {
      doSet = thisValue != value
    }
    if (doSet) {
      let valueUi = this.valueUi
      valueUi.value = value
      if (this.syncFieldWithUi) {
        setTimeout(function() { this.syncValueWithUi() }.bind(this))
      }
    }
  }


  
  /**
   *  value user interface
   */
  get valueUi() {
    let result
    if (typeof this.rootElement !== 'undefined') {
      result = this.rootElement.getElementsByClassName(
        this.classMapping.value)[0]
    }
    return result
  }

  /**
   * color type
   */
  get colorType() {
    return this.colorTypeField;
  }

  set colorType(value) {
    const thisValue = this.colorType
    let doSet = false
    if (typeof thisValue !== 'undefined') {
      if (typeof value !== 'undefined') {
        doSet = thisValue != value
      }
    } else {
      doSet = typeof value !== 'undefined'
    }
    if (doSet) {
      this.colorTypeField = value
      if (this.updateUi) {
        this.postUpdateColorCircleCanvas()
      }
    }
  }

  /**
   * color index value
   */
  get colorIndexValue() {
    return {
      value: this.indexValue,
      type: this.colorType
    }
  }

  /**
   * picker location
   * radius is in range [0, 1]
   * radian is in range [0, Math.PI * 2]
   */
  get pickerLocation() {
    return this.pickerLocationField
  }
  set pickerLocation(value) {
    const thisValue = this.pickerLocation
    let doSet = false
    if (typeof thisValue !== 'undefined') {
      if (typeof value !== 'undefined') {
        doSet = thisValue.radius != value.radius
        if (!doSet) {
          doSet = thisValue.radian != value.radian 
        }
      } else {
        doSet = true
      }
    } else {
      doSet = typeof value !== 'undefined'
    }
    if (doSet) {
      this.pickerLocationField = value
      if (this.updateUi) {
        this.postUpdateColorCircleCanvas()
      }
      if (this.raiseEvent) {
        this.notify('pickerLocation')
      }
    }
  }


  /**
   * picker maker
   */
  get pickerMarker() {
    return this.pickerMarkerField
  }

  set pickerMarker(value) {
    const thisValue = this.pickerMarker
    let doSet = false
    if (typeof thisValue !== 'undefined') {
      if (typeof value !== 'undefined') {
        doSet = thisValue != value
      } else {
        doSet = true
      }
    } else {
      doSet = typeof value !== 'undefined'
    }
    if (doSet) {
      this.pickerMarkerField = value
      if (this.updateUi) {
        this.postUpdateColorCircleCanvas()
      }
    }
  }

  /**
   * marker radius
   */
  get markerRadius() {
    return this.markerRadiusField
  }
  set markerRadius(value) {
    const thisValue = this.markerRadius
    let doSet = false
    if (typeof thisValue !== 'undefined') {
      if (typeof value !== 'undefined') {
        doSet = thisValue != value
      } else {
        doSet = true
      }
    } else {
      doSet = typeof value !== 'undefined'
    }
    if (doSet) {
      this.markerRadiusField = value
      if (this.updateUi) {
        this.postUpdateColorCircleCanvas()
      }
    }
  }

  /**
   * color circle user interface
   */
  get colorCircleUi() {
    let result = undefined
    if (typeof this.rootElement !== 'undefined') {
      result = this.rootElement.getElementsByClassName(
        this.classMapping.colorCircleCanvas)[0]
    }
    return result
  }

  /**
   * marker color
   */
  get markColor() {
    let result = undefined
    const colorCircle = this.colorCircleUi 
    if (typeof colorCircle !== 'undefined') {
      const pickerLoc = this.pickerLocation
      if (typeof pickerLoc !== 'undefined') {
        result = this.convertPickerLocToRgb(pickerLoc)
      }
    }
    return result
  }

  /**
   * set mark color
   */
  set markColor(value) {
    const thisValue = this.markColor
    let doSet = false
    if (typeof thisValue !== 'undefined') {
      if (typeof value !== 'undefined') {
        if (thisValue.length <= value.length) {
          for (let i = 0; i < thisValue.length; i++) {
            doSet = thisValue[i] != value[i]
            if (doSet) {
              break
            }
          }
        }
      }
    }
    if (doSet) {
      const pickerLocAndIndex = 
        this.convertRgbToPickerLocationAndIndex(value)
      if (typeof pickerLocAndIndex !== 'undefined') {
        const savedUpdateUi = this.updateUi
        const savedEvent = this.raiseEvent
        this.updateUi = false 
        this.raiseEvent = false
        this.pickerLocation = pickerLocAndIndex.pickerLocation
        this.indexValue = pickerLocAndIndex.indexValue
        this.updateUi = savedUpdateUi
        this.raiseEvent = savedEvent
        if (this.updateUi) {
          setTimeout(function() { 
            this.syncValueUiWithValue()
          }.bind(this))
          this.postUpdateColorCircleCanvas()
        }
        if (this.raiseEvent) {
          setTimeout(function() {
            this.notify('pickerLocation')
          }.bind(this))
        }
      }
    }
  }

  /**
   * constructor
   */
  constructor(template = UI.defaultTemplate,
    classMapping = UI.defaultClassNameMapping,
    indexValue = 1.0,
    colorType = 'value') {
    this.updateUi = false 
    this.raiseEvent = false
    this.syncFieldWithUi = false
    this.template = template
    this.classMapping = classMapping
    this.indexValue = indexValue
    this.colorType = colorType

    this.pickerLocation = {
      radius: 0,
      radian: 0
    }
    this.pickerMarker = UI.defaultPickerMarker 
    this.markerRadius = 2

    this.listeners = { }
    this.updateUi = true 
    this.raiseEvent = true
    this.syncFieldWithUi = true
  }

  /**
   * hive into root element
   */
  bind(rootElement) {
    if (typeof this.template !== 'undefined') {
      this.oldContents = rootElement.innerHTML
      const newContents = this.template
      rootElement.innerHTML = newContents
    }

    this.bindValue(rootElement)
    this.bindColorCircle(rootElement)
    this.rootElement = rootElement
    this.postUpdateColorCircleCanvas()
    setTimeout(function() { this.syncValueUiWithValue() }.bind(this))
  }

  /**
   * tear down hives
   */
  unbind() {
    const rootElement = this.rootElement
    if (typeof rootElement !== 'undefined') {
      this.unbindColorCircle(rootElement)
      this.unbindValue(rootElement)
      if (typeof this.oldContents !== 'undefined') {
        rootElement.innnerHtml = this.oldContents
      }
      delete this.oldContents
      delete this.rootElement
    }
  }


  /**
   * add event listener
   */
  addEventListener(type, listener) {
    if (typeof this.listeners !== 'undefined') {
      let listeners = this.listeners[type]
      if (typeof listeners === 'undefined') {
        listeners = [];
        this.listeners[type] = listeners;
      }
      listeners.push(listener)
    }
  }

  /**
   * remove event listener
   */
  removeEventListener(type, listener) {
    if (typeof this.listeners !== 'undefined') {
      const listeners = this.listeners[type]
      if (typeof listeners !== 'undefined') {
        let indexToRemove
        for (let i = listeners.length - 1; i >= 0; i--) {
          if (listeners[i] == listener) {
            indexToRemove = i
            break
          }
        }
        if (typeof indexToRemove !== 'undefined') {
          listeners.splice(indexToRemove, 1)
        }
      }
    }
  }


  /**
   * notify event message to event listener
   */
  notify(type) {
    if (typeof this.listeners !== 'undefined') {
      const listeners = this.listeners[type]
      if (listeners !== 'undefined') {
        listeners.forEach(function (elem) { 
          elem({ 
            type, 
            target: this
          })
        }.bind(this))
      }
    }
  }




  /**
   * attach callbacks to button
   */
  bindValue(rootElement) {
    const listenerParams = [
      {
        setListener: (listener) => { this.valueHandler = listener },
        listener: function(event) {
          if ('input' == event.type) {
            setTimeout(this.handleValue.bind(this), 0, event)
          } else if ('blur' == event.type) {
            setTimeout(this.handleValueValidate.bind(this), 0, event)
          }
        }.bind(this),
        className: this.classMapping.value
      }
    ]

    listenerParams.forEach(param => {
      const elem = rootElement.getElementsByClassName(param.className)[0]; 
      if (typeof elem !== 'undefined') {
        elem.addEventListener('input', param.listener)
        elem.addEventListener('blur', param.listener)
        param.setListener(param.Listener)
      }
    })
  }
  /**
   * attach callbacks to button
   */
  unbindValue(rootElement) {
    const listenerParamss = [
      {
        clearListener: () => { delete this.valueHandler },
        listener: this.valueHandler,
        className: this.classMapping.value
      }
    ]

    listenerParams.forEach(param => {
      const elem = rootElement.getElementsByClassName(param.className)[0]; 
      if (typeof elem !== 'undefined') {
        elem.removeEventListener('click', param.listener)
        elem.remvoeEventListener('blur', pram.listener)
        param.clearListener()
      }
    })
  }

  /**
   * bind color circle
   */
  bindColorCircle(rootElement) {
    const colorCircle = rootElement.getElementsByClassName(
      this.classMapping.colorCircleCanvas)[0]
    if (typeof colorCircle !== 'undefined') {
      this.pickColorHandler = function(event) {
        if (event.type == 'click') {
          this.postHandleClickInColorCircle(event)
        }
      }.bind(this)
      colorCircle.addEventListener('click', this.pickColorHandler)
    }
  }

  /**
   * detach handler for color circle
   */
  unbindColorCircle(rootElement) {
    const pickColorHandler = this.pickColorHandler
    if (typeof pickColorHandler !== 'undefined') {
      const colorCircle = rootElement.getElementsByClassName(
        this.classMapping.colorCircleCanvas)[0]
      colorCircle.removeEventListener('click', pickColorHandler) 
      delete this.pickColorHandler
    }
  }

  /**
   * handle event for clicking in color circle canvas lately.
   */
  postHandleClickInColorCircle(event) {
    setTimeout(function() {
      this.handleClickInColorCircle(event)
    }.bind(this))
  }

  /**
   * handle event for clicking in color circle canvas
   */
  handleClickInColorCircle(event) {
    const canvas = event.target
    const pickerLoc = this.calcPickerLocationFromCanvasLocation(canvas,
      [event.offsetX, event.offsetY]) 
    if (typeof pickerLoc !== 'undefined') {
      this.pickerLocation = pickerLoc
    }
  }

 
  /**
   * color circle location and radius
   */
  getColorCircleLocRadius(colorCanvas) {
    let result = undefined
    if (typeof colorCanvas !== 'undefined') {
      let radius = undefined
      let loc = undefined
      if (colorCanvas.width < colorCanvas.height) {
        radius = Math.ceil(colorCanvas.width / 2)
        loc = [0, Math.ceil(colorCanvas.height - 2 * radius) / 2]
      } else {
        radius = Math.ceil(colorCanvas.height / 2)
        loc = [Math.ceil(colorCanvas.width - 2 * radius) / 2, 0]
      }
      result = {
        loc,
        radius
      }
    } 
    return result
  }

  /**
   * update color circle canvas lately
   */
  postUpdateColorCircleCanvas() {
    setTimeout(function() {
      if (typeof this.rootElement !== 'undefined') {
        this.updateColorCircleCanvas(this.rootElement)
      }
    }.bind(this))
  }
       
  /**
   * update color circle canvas
   */
  updateColorCircleCanvas(rootElement) {
    const colorCanvas = rootElement.getElementsByClassName(
      this.classMapping.colorCircleCanvas)[0];
    if (typeof colorCanvas !== 'undefined') {
      if (typeof colorCanvas.getContext === 'function') {
        const ctx = colorCanvas.getContext('2d')
        ctx.clearRect(0, 0, colorCanvas.width, colorCanvas.height)
        this.updateColorCircle(ctx)
        this.updatePickerMarker(ctx)
      }
    }
  }

  /**
   * picker location to rgb
   */
  convertPickerLocToRgb(pickerLoc) {
    let result = undefined
    const indexValue = this.colorIndexValue
    const vToColorValue = RgbHs.indexValueToColorValueFunctions[indexValue.type]
    result = RgbHs.hueChromaToRgb(
      pickerLoc.radian, 
      pickerLoc.radius, indexValue.value,
      vToColorValue)   
    if (typeof result !== 'undefined') {
      for (let i = 0; i < result.length; i++) {
        result[i] = Math.min(Math.max(parseInt(result[i] * 0xff), 0), 0xff)
      }
    }
    return result
  }

  /**
   * convert rgb to marker position and index
   */
  convertRgbToPickerLocationAndIndex(rgb255) {
    let result = undefined
    if (this.colorType == 'value') {
      let rgb = [0, 0, 0]
      for (let i = 0; i < rgb.length; i++) {
        rgb[i] = parseFloat(rgb255[i]) / 0xff
      }
      const hueChroma = RgbHs.calcHueChroma(rgb) 
      const indexValue = rgb[hueChroma.chroma.maxIndex]
      const pickerLocation = {
        radius: hueChroma.chroma.value / indexValue,
        radian: (hueChroma.hue * Math.PI) / 180
      }
      result = {
        pickerLocation,
        indexValue 
      }
    }
    return result
  }

  /**
   * update color circle
   */
  updateColorCircle(ctx) {
    const locRadius = this.getColorCircleLocRadius(ctx.canvas)
    const indexValue = this.colorIndexValue
    const imageData = ctx.getImageData(
      locRadius.loc[0], locRadius.loc[1],
      locRadius.radius * 2, locRadius.radius * 2)
      
    for (let rIndex = 0; rIndex <= locRadius.radius * 2; rIndex++) {
      for (let cIndex = 0; cIndex <= locRadius.radius * 2; cIndex++) {
        const x = cIndex - locRadius.radius
        const y = locRadius.radius - rIndex
        const rgb = RgbHs.xyrvToRgb(x, y, locRadius.radius, 
          indexValue.value, 
          RgbHs.indexValueToColorValueFunctions[indexValue.type]);
        if (rgb != undefined) {
          for (let i = 0; i < 3; i++) {
            imageData.data[
              4 * (rIndex * 2 * locRadius.radius + cIndex) + i] = 
                Math.round(rgb[i] * 0xff)
          }
          imageData.data[4 * (rIndex * 2 * locRadius.radius + cIndex) + 3] = 
            0xff
        }
      }
    }
    ctx.putImageData(imageData, locRadius.loc[0], locRadius.loc[1])
  } 

  /**
   * update color circle
   */
  updateColorCircleProgress(ctx) {
    const locRadius = this.getColorCircleLocRadius(ctx.canvas)
    const indexValue = this.colorIndexValue
  
    const colorCircleState = RgbHs.createColorCircleProgress(
      locRadius.radius, indexValue, undefined);
      
    const colorCircleProgress = function(state, lastProcessedIndex) {
      const imageData = ctx.getImageData(
        locRadius.loc[0], locRadius.loc[1], state.col, state.row)
  
      for (var index = lastProcessedIndex[0]; 
        index < lastProcessedIndex[1]; index++) {
        const rowColumnIndex = state.calcRowColumnIndex(index);
        const rowIndex = rowColumnIndex.row;
        const colIndex = rowColumnIndex.column;
        const rgbHex = state.rgb[rowIndex][colIndex];
        if (typeof rgbHex !== 'undefined') {
          const rgb = RgbHs.hexToRgb(rgbHex);
          for (let i = 0; i < 3; i++) {
            imageData.data[
              (rowIndex * state.col + colIndex) * 4 + i] = rgb[i];
          }
          imageData.data[(rowIndex * state.col + colIndex) * 4 + 3] = 255
        }
        ctx.putImageData(imageData, locRadius.loc[0], locRadius.loc[1])
      }

    }
    const promise = colorCircleState.start(colorCircleProgress)

  }

  /**
   * update picker marker
   */
  updatePickerMarker(ctx) {
    const pickerLocation = this.pickerLocation
    if (typeof pickerLocation !== 'undefined') {
      const canvasLoc = this.calcCanvasLocationFromPickerLocation(
        ctx.canvas,
        pickerLocation)
      const pickerMarker = this.pickerMarker 
      const markerRadius = this.markerRadius
      const colorIndexValue = this.colorIndexValue
      if (typeof canvasLoc !== 'undefined'
        && typeof pickerMarker !== 'undefined'
        && typeof colorIndexValue !== 'undefined'
        && typeof markerRadius !== 'undefined') {

        pickerMarker(ctx, 
          Math.round(canvasLoc[0]), 
          Math.round(canvasLoc[1]),
          markerRadius, colorIndexValue.value)
      }
    }
  }

  /**
   * calculate cartesian location on canvas from picker location
   */
  calcCanvasLocationFromPickerLocation(canvas, pickerLocation) {
    let result
    if (typeof pickerLocation !== 'undefined') {
      const locRadius = this.getColorCircleLocRadius(canvas)
       
      const center = [
        locRadius.loc[0] + locRadius.radius,
        locRadius.loc[1] + locRadius.radius]

      const cartesian = [0, 0]
      cartesian[0] = pickerLocation.radius * locRadius.radius
      cartesian[1] = cartesian[0]
      cartesian[0] *= Math.cos(pickerLocation.radian)
      cartesian[1] *= -Math.sin(pickerLocation.radian)
      cartesian[0] += center[0]
      cartesian[1] += center[1]
      result = cartesian
    }
    return result
  }

  /**
   * calculate picker location from cartesian on  canvas 
   */
  calcPickerLocationFromCanvasLocation(canvas, cartesian) {
    let result
    if (typeof cartesian !== 'undefined') {
      const locRadius = this.getColorCircleLocRadius(canvas)
       
      const center = [
        locRadius.loc[0] + locRadius.radius,
        locRadius.loc[1] + locRadius.radius]

      const pickerLoc = [0, 0]
      pickerLoc[0] = cartesian[0] - center[0]
      pickerLoc[1] = -(cartesian[1] - center[1])
      let radian
      if (pickerLoc[0] != 0 || pickerLoc[0] != -0.0) {
        const tan = parseFloat(pickerLoc[1]) / pickerLoc[0]
        radian = Math.atan(tan)
        if (pickerLoc[0] < 0) {
          if (pickerLoc[1] < 0) {
            radian += Math.PI
          } else {
            radian -= Math.PI
          }
        }
        radian += 2 * Math.PI
        radian -= Math.trunc(radian / (2 * Math.PI)) * 2 * Math.PI
      } else {
        if (pickerLoc[1] != 0 || pickerLoc[1] != -0.0) {
          if (pickerLoc[1] > 0) { 
            radian = Math.PI / 2
          } else {
            radian = 3 * Math.PI / 2
          }
        } else {
          radian = 0 
        }
      }
      let radius = Math.sqrt(
        Math.pow(pickerLoc[0], 2) + Math.pow(pickerLoc[1], 2))
      radius /= locRadius.radius
      if (radius <= 1) {
        result = {
          radius,
          radian
        }
      }
    }
    return result
  }

  /**
   * varidate value input
   */
  handleValueValidate() {
    let value = this.indexValueUi
    if (typeof value === 'undefined') {
        this.indexValueUi = this.indexValueInt
    } else {
      const oldValue = value
      if (value < 0) {
        value = 0
      }
      if (value > 0xff) {
        value = 0xff
      }
      if (oldValue != value) {
        this.indexValueUi = value
      }
    }
  }

  /**
   * handle index increment event
   */
  handleValue(event) {
    this.syncValueWithUi() 
  }


  /**
   * synchronize index value with value user interface.
   */
  syncValueWithUi() {
    const savedUpdateUi = this.updateUi
    this.updateUi = false
    this.indexValueInt = this.indexValueUi
    this.updateUi = savedUpdateUi
    if (savedUpdateUi) {
      this.postUpdateColorCircleCanvas()
    }
  }

  /**
   * synchronize value on user interface with value field
   */
  syncValueUiWithValue() {
    const savedSync = this.syncFieldWithUi
    this.syncFieldWithUi = false
    this.indexValueUi = this.indexValueInt
    this.syncFieldWithUi = savedSync

  }
}

export { UI as default}
// vi: se ts=2 sw=2 et:
