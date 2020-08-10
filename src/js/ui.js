import RgbHs from './rgb-hs.js'

/**
 * user interface
 */
class UI {

  /**
   * defatult template
   */
  static get defaultTemplate() {
    return `<div class="oc-color-controller">
  <button class="oc-index-decrement">&#xff0d</button>
  <button class="oc-index-increment">&#xff0b;</button>
</div>
<div class="oc-color-circle-container">
  <canvas class="oc-color-circle" width="200px" height="200px"></canvas>
</div>
`
  }

  /**
   * default template mapping
   */
  static get defaultClassNameMapping() {
    return {
      incrementIndex: 'oc-index-increment',
      decrementIndex: 'oc-index-decrement',
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
      this.postUpdateColorCircleCanvas()
    }
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
      this.postUpdateColorCircleCanvas()
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
    const thisValue = this.getPickerLocation
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
      this.postUpdateColorCircleCanvas()
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
      this.postUpdateColorCircleCanvas()
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
      this.postUpdateColorCircleCanvas()
    }
  }

  /**
   * constructor
   */
  constructor(template = UI.defaultTemplate,
    classMapping = UI.defaultClassNameMapping,
    indexValue = 1.0,
    colorType = 'value') {
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

    this.bindButtons(rootElement)
    this.bindColorCircle(rootElement)
    this.rootElement = rootElement
    this.postUpdateColorCircleCanvas()
  }

  /**
   * tear down hives
   */
  unbind() {
    const rootElement = this.rootElement
    if (typeof rootElement !== 'undefined') {
      this.unbindColorCircle(rootElement)
      this.unbindButtons(rootElement)
      if (typeof this.oldContents !== 'undefined') {
        rootElement.innnerHtml = this.oldContents
      }
      delete this.oldContents
      delete this.rootElement
    }
  }

  /**
   * attach callbacks to button
   */
  bindButtons(rootElement) {
    const listenerParams = [
      {
        setListener: (listener) => { this.incrementHandler = listener },
        listener: function(event) {
          if ('click' == event.type) {
            setTimeout(this.handleIndexIncrement.bind(this), 0, event)
          }
        }.bind(this),
        className: this.classMapping.incrementIndex
      },
      {
        setListener: (listener) => { this.decrementHandler = listener },
        listener: function(event) {
          if ('click' == event.type) {
            setTimeout(this.handleIndexDecrement.bind(this), 0, event)
          }
        }.bind(this),
        className: this.classMapping.decrementIndex
      }
    ]

    listenerParams.forEach(param => {
      const elem = rootElement.getElementsByClassName(param.className)[0]; 
      if (typeof elem !== 'undefined') {
        elem.addEventListener('click', param.listener)
        param.setListener(param.Listener)
      }
    })
  }
  /**
   * attach callbacks to button
   */
  unbindButtons(rootElement) {
    const listenerParamss = [
      {
        clearListener: () => { delete this.incrementHandler },
        listener: this.incrementHandler,
        className: this.classMapping.incrementIndex
      },
      {
        clearListener: () => { delete this.decrementHandler },
        listener: this.decrementHandler,
        className: this.classMapping.decrementIndex
      }
    ]

    listenerParams.forEach(param => {
      const elem = rootElement.getElementsByClassName(param.className)[0]; 
      if (typeof elem !== 'undefined') {
        elem.removeEventListenr('click', param.listener)
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
  
    if (this.isInColorCircle(event.target, event.offsetX, event.offsetY)) {
      const canvas = event.target
      const pickerLoc = this.calcPickerLocationFromCanvasLocation(canvas,
        [event.offsetX, event.offsetY]) 
      if (typeof pickerLoc !== 'undefined') {
        this.pickerLocation = pickerLoc
      }
    }
  }

  /**
   * you get true if [x, y] is in color circle region
   */
  isInColorCircle(canvas, x, y) {
    const color = this.readColor(canvas, x, y)
    const result = typeof color !== 'undefined'
    return result
  }
  /**
   * read colorData
   */
  readColor(canvas, x, y) {
    const locRadius = this.getColorCircleLocRadius(canvas)
    const pickingMap = this.pickingMap
    const imageData = this.imageData
    let result = undefined 
    if (typeof locRadius !== 'undefined'
      && typeof pickingMap !== 'undefined'
      && typeof imageData !== 'undefined') {
      let inCircle = locRadius.loc[0] <= x
      if (inCircle) {
        inCircle = x <= locRadius.loc[0] + 2 * locRadius.radius 
      }
      if (inCircle) {
        inCircle = locRadius.loc[1] <= y
      }
      if (inCircle) {
        inCircle = y <= locRadius.loc[1] + 2 * locRadius.radius
      }
      if (inCircle) {
        const imageLoc = [x - locRadius.loc[0], y - locRadius.loc[1]]
        imageLoc[0] = Math.round(imageLoc[0])
        imageLoc[1] = Math.round(imageLoc[1])
        const imageIndex = imageLoc[1] * 2 * locRadius.radius + imageLoc[0]
        inCircle = pickingMap[imageIndex] != 0 
        if (inCircle) {
          result = [0, 0, 0, 0]
          for (let i = 0; i < result.length; i++) {
            result[i] = imageData.data[imageIndex * 4 + i]
          }
        }
      }
    }
    return result
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
      } else {
        delete this.imageData
        delete this.pickingMap
      }
    } else {
      delete this.imageData
      delete this.pickingMap
    }
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
      
    const pickingMap = new Int8Array(Math.pow(locRadius.radius * 2, 2))
   
    for (let rIndex = 0; rIndex < locRadius.radius * 2; rIndex++) {
      for (let cIndex = 0; cIndex < locRadius.radius * 2; cIndex++) {
        const x = cIndex - locRadius.radius
        const y = locRadius.radius - rIndex - 1
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
          pickingMap[rIndex * 2 * locRadius.radius + cIndex] = 1
        }
      }
    }
    ctx.putImageData(imageData, locRadius.loc[0], locRadius.loc[1])
    this.pickingMap = pickingMap
    this.imageData = imageData
  } 

  /**
   * update color circle
   */
  updateColorCircleProgress(ctx) {
    const locRadius = this.getColorCircleLocRadius(ctx.canvas)
    const indexValue = this.colorIndexValue
  
    const colorCircleState = RgbHs.createColorCircleProgress(
      locRadius.radius, indexValue, undefined);
      
    const pickingMap = new Int8Array(ctx.canvas.width * ctx.canvas.height)

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
          pickingMap[rowIndex * ctx.canvas.width + colIndex] = 1
        }
        ctx.putImageData(imageData, locRadius.loc[0], locRadius.loc[1])
      }

    }
    this.imageData = ctx.getImageData(
      locRadius.loc[0], locRadius.loc[1],
      ctx.canvas.width, ctx.canvas.height)
 
    this.pickingMap = pickingMap
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
      cartesian[1] *= Math.sin(pickerLocation.radian)
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
      pickerLoc[1] = cartesian[1] - center[1]
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
      result = {
        radius,
        radian
      }
    }
    return result
  }

  /**
   * handle index increment event
   */
  handleIndexIncrement(event) {
    this.indexValue += 0.1     
  }
  /**
   * handle index decrement event
   */
  handleIndexDecrement(event) {
    this.indexValue -= 0.1
  }
}

export { UI as default}
// vi: se ts=2 sw=2 et:
