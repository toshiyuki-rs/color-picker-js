import { UI } from './ui.ts'

if (typeof window !== 'undefined') {
  const ui = new UI();
  const savedLoad = window.onload
  const logColor = (e) => {
    const color = e.target.markColor 
    const colorStr = [
      color[0].toString(16), 
      color[1].toString(16), 
      color[2].toString(16)]
    console.log(colorStr)
  }
  const handleUnload = () => {
    ui.removeEventListener('pickerLocation', logColor)
    ui.unbind()
  }
  const initialSetting = ()=> {
    // ui.markColor = [0x38, 0xbb, 0xda, 0xff]
    // ui.markColor = [0xda, 0x0, 0x0, 0xff]
    ui.markColor = [0x0, 0xda, 0x0, 0xff]
    // ui.markColor = [218, 0, 0, 0xff]
  }
  const handleLoad = () => {
    if (typeof savedLoad === 'function') {
      savedLoad();
    }
    
    ui.bind(document.body.getElementsByClassName('main')[0]);
    ui.addEventListener('pickerLocation', logColor)
    setTimeout(initialSetting)
    window.addEventListener('onunload', handleUnload)
  }
  window.onload = handleLoad
}

// vi: se ts=2 sw=2 et:
