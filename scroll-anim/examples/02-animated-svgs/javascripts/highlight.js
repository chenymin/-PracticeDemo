$(function() {

  $('.option').hover(
    function() {
      $('.option').removeClass('highlighted');
      $(this).addClass('highlighted');
    },
    function() {
      $(this).removeClass('highlighted');
      setTimeout(function() {
        if (!$('.option.highlighted').length) {
          $('.option.featured').addClass('highlighted');
        }
      }, 500);
    }
  ); 
  
});