//Declare globals
var isOneOpen = false;
var isTwoOpen = false;
var isThreeOpen = false;
var isFourOpen = false;
var isFiveOpen = false;
var headlineOne = "HL1";
var headlineTwo = "HL2";
var headlineThree = "HL3";
var headlineFour = "HL4";
var headlineFive = "HL5";
var id = null;

//Options Page Button
document.querySelector('#go-to-options').addEventListener("click", function() {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('options.html'));
  }
});

function setColor() { //sets color circle based upon settings, just for proof of concept
  var favColor;
  var doesLikeColor;
  chrome.storage.sync.get([
    'favoriteColor','likesColor'
  ],
    function(items){
    favColor = items.favoriteColor;
    doesLikeColor = items.likesColor;

    if(doesLikeColor){
      if(favColor == 'red'){
        document.getElementById('circle').style.backgroundColor = 'red';
      }
      else if(favColor == 'blue'){
        document.getElementById('circle').style.backgroundColor = 'blue';
      }
      else if(favColor == 'green'){
        document.getElementById('circle').style.backgroundColor = 'green';
      }
      else if(favColor == 'yellow'){
        document.getElementById('circle').style.backgroundColor = 'yellow';
      }  
    }
    else{
      document.getElementById('circle').style.backgroundColor = 'transparent';
    }
    
  });

  
}

document.addEventListener('DOMContentLoaded',setColor); 




function expandDown(elemId){
  var elem = document.getElementById(elemId);
  var pad = 5;
  clearInterval(id);
  id = setInterval(frame,3);
  function frame(){
    if(pad==50){
      clearInterval(id);
    }
    else{
      pad = pad + 0.5;
      elem.style.paddingBottom = pad + "px";
    }
  }
}

  //Controls the actions of the buttons when pressed
document.querySelector("#HL1").addEventListener("click", function() {
  if(!isOneOpen){
  document.getElementById(headlineOne).style.backgroundColor = "#3A506B";
  expandDown(headlineOne);
  isOneOpen = true;
  }
  else{
    document.getElementById(headlineOne).style.padding = "5px";
    document.getElementById(headlineOne).style.textAlign = "left";
    document.getElementById(headlineOne).style.borderRadius = "10px";
    document.getElementById(headlineOne).style.backgroundColor = "";
    isOneOpen = false;
  }
});

document.querySelector("#HL2").addEventListener("click", function() {
  if(!isTwoOpen){
  document.getElementById(headlineTwo).style.backgroundColor = "#3A506B";
  expandDown(headlineTwo);
  isTwoOpen = true;
  }
  else{
    document.getElementById(headlineTwo).style.padding = "5px";
    document.getElementById(headlineTwo).style.textAlign = "left";
    document.getElementById(headlineTwo).style.borderRadius = "10px";
    document.getElementById(headlineTwo).style.backgroundColor = "";
    isTwoOpen = false;
  }
});
document.querySelector("#HL3").addEventListener("click", function() {
  if(!isThreeOpen){
  document.getElementById(headlineThree).style.backgroundColor = "#3A506B";
  expandDown(headlineThree);
  isThreeOpen = true;
  }
  else{
    document.getElementById(headlineThree).style.padding = "5px";
    document.getElementById(headlineThree).style.textAlign = "left";
    document.getElementById(headlineThree).style.borderRadius = "10px";
    document.getElementById(headlineThree).style.backgroundColor = "";
    isThreeOpen = false;
  }
});
document.querySelector("#HL4").addEventListener("click", function() {
  if(!isFourOpen){
  document.getElementById(headlineFour).style.backgroundColor = "#3A506B";
  expandDown(headlineFour);
  isFourOpen = true;
  }
  else{
    document.getElementById(headlineFour).style.padding = "5px";
    document.getElementById(headlineFour).style.textAlign = "left";
    document.getElementById(headlineFour).style.borderRadius = "10px";
    document.getElementById(headlineFour).style.backgroundColor = "";
    isFourOpen = false;
  }
});
document.querySelector("#HL5").addEventListener("click", function() {
  if(!isFiveOpen){
  document.getElementById(headlineFive).style.backgroundColor = "#3A506B";
  expandDown(headlineFive);
  isFiveOpen = true;
  }
  else{
    document.getElementById(headlineFive).style.padding = "5px";
    document.getElementById(headlineFive).style.textAlign = "left";
    document.getElementById(headlineFive).style.borderRadius = "10px";
    document.getElementById(headlineFive).style.backgroundColor = "";
    isFiveOpen = false;
  }
});
