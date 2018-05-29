self.addEventListener('message', function(e) {
  var data = e.data;
  switch (data.cmd) {
    case 'average':
      var result = calculateAverage(data.data); // Some function that calculates the average from the numeric array.
      self.postMessage(result);
      break;
    default:
      self.postMessage('Unknown command');
  }
}, false);

function calculateAverage(numbers) {
    var len = numbers.length,
        sum = 0,
        i;

    if (len === 0) {
        return 0;
    } 
    
    for (i = 0; i < len; i++) {
        sum += numbers[i];
    }
   
    return sum / len;
}