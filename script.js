function openNav() {
  //if the window is too small we want to just overlay the menu without pushing the content to the left, since this makes the text go off screen.
  if(window.innerWidth < 1000){
    document.getElementById("mySidenav").style.width = "200px";
  }
  else{
    document.getElementById("mySidenav").style.width = "200px";
    document.getElementById("main").style.marginLeft = "200px";  
  }
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}
