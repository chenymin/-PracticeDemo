;(function() {

  var myMenu = document.querySelector(".menu");
  var appMenu = document.querySelector(".app-menu");
  var oppMenu = document.querySelector(".menu-icon");
  var loginOutNode = document.querySelector(".main-button");

  myMenu.addEventListener("transitionend", OnTransitionEnd, false);
  oppMenu.addEventListener("click", toggleClassMenu, false);
  myMenu.addEventListener("click", toggleClassMenu, false);

  loginOutNode.addEventListener('click', loginOut, false)

  function toggleClassMenu(e) {
    myMenu.classList.add("menu--animatable");	
    if(!myMenu.classList.contains("menu--visible")) {		
      myMenu.classList.add("menu--visible");
    } else {
      myMenu.classList.remove('menu--visible');		
    }
  }
  
  function OnTransitionEnd() {
    myMenu.classList.remove("menu--animatable");
  }

  function loginOut (e) {
    console.log('---->loginOut')
    e.stopPropagation();
  }

})()