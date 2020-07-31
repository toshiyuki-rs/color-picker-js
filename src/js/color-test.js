import RgbHs from './rgb-hs';

/**
 * color circle test
 */
class ColorCircleTest {

  /**
   * bind test node
   */
  bind() {
    const colorCanvas = document.getElementById('color-circle');
    const ctx = colorCanvas.getContext('2d');
    const radius = 50;
    const indexValue = {
      value:1,
      type:'value'
    };
    const colorCircleState = RgbHs.createColorCircleProgress(
      radius, indexValue, undefined);
      
    const colorCircleProgress = function(state, lastProcessedIndex) {
      const imageData = ctx.getImageData(10, 10, state.col, state.row);
    
      for (var index = lastProcessedIndex[0]; 
        index < lastProcessedIndex[1]; index++) {
        const rowColumnIndex = state.calcRowColumnIndex(index);
        const rowIndex = rowColumnIndex.row;
        const colIndex = rowColumnIndex.column;
        const rgbHex = state.rgb[rowIndex][colIndex];
        if (typeof rgbHex !== 'undefined') {
          const rgb = RgbHs.hexToRgb(rgbHex);
          for (let i = 0; i < 3; i++) {
            imageData.data[(rowIndex * state.col + colIndex) * 4 + i] = rgb[i];
          }
          imageData.data[(rowIndex * state.col + colIndex) * 4 + 3] = 255;
        } else {
          for (var i = 0; i < 4; i++) {
            imageData.data[(rowIndex * state.col + colIndex) * 4 + i] = 255;
          }
        }
        ctx.putImageData(imageData, 10, 10);
      }
    };
    const promise = colorCircleState.start(colorCircleProgress);
  }
}

if (typeof window !== 'undefined') {
  const savedLoad = window.onload;
  window.onload = () => {
    if (typeof savedLoad === 'function') {
      savedLoad();
    }
    (new ColorCircleTest()).bind();
  };
}

export { ColorCircleTest as default };

// vi: se ts=2 sw=2 et:
