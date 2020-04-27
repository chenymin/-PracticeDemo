
setInterval(function() {
  decrementBubbles();
}, 1000);

window.totalBubbles = 0;
window.rellaxes = [];

generateBubble();

function generateBubble() {
  var bubbleWidth = Math.floor(Math.random() * 200) + 40;
  var bubbleLifespan = Math.floor(Math.random() * 10) + 2;
  var scrollTop = $(window).scrollTop();
  var windowHeight = window.innerHeight;
  var windowWidth = window.innerWidth;
  var bubbleTop = Math.floor(Math.random() * windowHeight) + scrollTop;
  var bubbleLeft =  Math.floor(Math.random() * windowWidth) - bubbleWidth;
  if (bubbleLeft < 0) bubbleLeft += bubbleWidth / 2;

  // Generate a z-index for the bubble for use with rellax
  var bubbleDepth = Math.floor(Math.random() * 20) - 10;


  var bubbleContainer = $('<div class="bubble-container"></div>')
  var newBubbleHTML = $('<div class="bubble-rellax-container"><div class="ball bubble"></div></div>');
  
  $(bubbleContainer).append(newBubbleHTML);
  $(bubbleContainer).css({
    height: bubbleWidth + 'px',
    width: bubbleWidth + 'px',
    top: bubbleTop + 'px',
    left: bubbleLeft + 'px'
  });

  // Make the background bubbles sit behind content
  if (bubbleDepth < 1) {
    $(bubbleContainer).addClass('behind');
  }

  $(bubbleContainer).attr('data-lifespan', bubbleLifespan);
  $(bubbleContainer).find('.bubble-rellax-container').attr('data-rellax-speed', bubbleDepth);

  var thisRellaxClass = 'rellax' + window.totalBubbles;

  $(bubbleContainer).find('.bubble-rellax-container').addClass(thisRellaxClass);
  $(bubbleContainer).find('.bubble-rellax-container').attr('data-rellax-id', window.totalBubbles);
  
  // Append the generated bubble to the page
  $('body').append(bubbleContainer);
  window.totalBubbles++;

  // Instantiate a new "rellax123" class for this bubble (otherwise all bubbles would be re-calculated)
  var newRellax = new Rellax('.' + thisRellaxClass, { center: true });
  
  // Set a random delay before generating another
  setTimeout(function() {
    generateBubble();
  }, Math.floor(Math.random() * 2000) + 200);
  
}



function decrementBubbles() {
  $('body').find('.bubble-container').each(function(index, bubble) {
    var lifespan = $(bubble).attr('data-lifespan');
    var rellaxId = $(bubble).find('.bubble-rellax-container').attr('data-rellax-id');
    if (lifespan < 1) {
      $(bubble).remove();
    } else {
      $(bubble).attr('data-lifespan', lifespan - 1)
    }
  });
}