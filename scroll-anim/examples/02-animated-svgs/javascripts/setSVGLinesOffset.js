function setSVGLinesOffset(target) {
  $(target).each(function(index, path) {
    if (path.getTotalLength) {
      var length = path.getTotalLength();
      $(path).css(
        {
          strokeDasharray: length + ", " + length,
          strokeDashoffset: length
        }
      );
    }
  });
}

$('.svg-to-animate').each(function(index, svg) {
  setSVGLinesOffset(svg);
});