let optionsButton = document.getElementById("options");
optionsButton.addEventListener("click", () => {
  if(optionsButton.classList.contains("open")){
    optionsButton.classList.remove("open");
  }
  else{
    optionsButton.classList.add("open");
  }
})
