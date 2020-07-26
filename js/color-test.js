$(function() {
      var colorCanvas;
      colorCanvas = $('#colorCircle')[0];
      var ctx;
      ctx = colorCanvas.getContext('2d');
      var radius;
      radius = 50;
      var indexValue = {
	  value:1,
	  type:'value'
      };
      var colorCircleState;
      colorCircleState = $.rgbHs.createColorCircleProgress
      (radius, indexValue, undefined);
      
      var colorCircleProgress = function(state, lastProcessedIndex) {
	  var imageData;
	  imageData = ctx.getImageData(10, 10, state.col, state.row);
	  
	  for (var index = lastProcessedIndex[0]; 
	       index < lastProcessedIndex[1]; index++) {
	      var rowColumnIndex;
	      rowColumnIndex = state.calcRowColumnIndex(index);
	      var rowIndex;
	      var colIndex;
	      rowIndex = rowColumnIndex.row;
	      colIndex = rowColumnIndex.column;
	      var rgbHex;
	      rgbHex = state.rgb[rowIndex][colIndex];
    	      if (rgbHex) {
		  var rgb;
		  rgb = $.rgbHs.hexToRgb(rgbHex);
		  for (var i = 0; i < 3; i++) {
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
      var promise;
      promise = colorCircleState.start();
      promise.progress(colorCircleProgress);

});