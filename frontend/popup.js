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


document.querySelector('#go-to-options').addEventListener("click", function() {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.open(chrome.runtime.getURL('options.html'));
    }
  });

  //Controls the actions of the buttons when pressed
document.querySelector("#HL1").addEventListener("click", function() {
  if(!isOneOpen){
  document.getElementById(headlineOne).style.backgroundColor = "#77bd51";
  document.getElementById(headlineOne).style.padding = "50px";
  isOneOpen = true;
  }
  else{
    document.getElementById(headlineOne).style.padding = "5px";
    document.getElementById(headlineOne).style.textAlign = "left";
    document.getElementById(headlineOne).style.borderRadius = "10px";
    document.getElementById(headlineOne).style.backgroundColor = "#3a506b00";
    isOneOpen = false;
  }
});

document.querySelector("#HL2").addEventListener("click", function() {
  if(!isTwoOpen){
  document.getElementById(headlineTwo).style.backgroundColor = "#77bd51";
  document.getElementById(headlineTwo).style.padding = "50px";
  isTwoOpen = true;
  }
  else{
    document.getElementById(headlineTwo).style.padding = "5px";
    document.getElementById(headlineTwo).style.textAlign = "left";
    document.getElementById(headlineTwo).style.borderRadius = "10px";
    document.getElementById(headlineTwo).style.backgroundColor = "#3a506b00";
    isTwoOpen = false;
  }
});
document.querySelector("#HL3").addEventListener("click", function() {
  if(!isThreeOpen){
  document.getElementById(headlineThree).style.backgroundColor = "#77bd51";
  document.getElementById(headlineThree).style.padding = "50px";
  isThreeOpen = true;
  }
  else{
    document.getElementById(headlineThree).style.padding = "5px";
    document.getElementById(headlineThree).style.textAlign = "left";
    document.getElementById(headlineThree).style.borderRadius = "10px";
    document.getElementById(headlineThree).style.backgroundColor = "#3a506b00";
    isThreeOpen = false;
  }
});
document.querySelector("#HL4").addEventListener("click", function() {
  if(!isFourOpen){
  document.getElementById(headlineFour).style.backgroundColor = "#77bd51";
  document.getElementById(headlineFour).style.padding = "50px";
  isFourOpen = true;
  }
  else{
    document.getElementById(headlineFour).style.padding = "5px";
    document.getElementById(headlineFour).style.textAlign = "left";
    document.getElementById(headlineFour).style.borderRadius = "10px";
    document.getElementById(headlineFour).style.backgroundColor = "#3a506b00";
    isFourOpen = false;
  }
});
document.querySelector("#HL5").addEventListener("click", function() {
  if(!isFiveOpen){
  document.getElementById(headlineFive).style.backgroundColor = "#77bd51";
  document.getElementById(headlineFive).style.padding = "50px";
  isFiveOpen = true;
  }
  else{
    document.getElementById(headlineFive).style.padding = "5px";
    document.getElementById(headlineFive).style.textAlign = "left";
    document.getElementById(headlineFive).style.borderRadius = "10px";
    document.getElementById(headlineFive).style.backgroundColor = "#3a506b00";
    isFiveOpen = false;
  }
});

