import UI from './ui.js'

if (typeof window !== 'undefined') {
  const ui = new UI();
  const savedLoad = window.onload
  const handleUnload = () => {
    ui.unbind()
  }
  const handleLoad = () => {
    if (typeof savedLoad === 'function') {
      savedLoad();
    }
    
    ui.bind(document.body.getElementsByClassName('main')[0]);
    window.addEventListener('onunload', handleUnload)
  }
  window.onload = handleLoad
}

// vi: se ts=2 sw=2 et:
