/*

Javascript for the extension main popup, Version 1.0.0
Developed by Preston Rooker and Spencer Stice (and a little bit by Jacob Sandler)

*/



////////////Global Variables/////////////
var isOneOpen = false;
var isTwoOpen = false;
var isThreeOpen = false;
var isFourOpen = false;
var isFiveOpen = false;
var isStoryOpen = false;
var headlineOne = "HL1";
var headlineTwo = "HL2";
var headlineThree = "HL3";
var headlineFour = "HL4";
var headlineFive = "HL5";
var displayOne = "Display1";
var displayTwo = "Display2";
var displayThree = "Display3";
var displayFour = "Display4";
var displayFive = "Display5";
var id = null;


//////////////////////////  Settings ////////////////////////////////

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



///////////////////  Animations /////////////////////////////////////////////


function expandDown(elemId){
  var elem = document.getElementById(elemId);
  var pad = 5;
  clearInterval(id);
  id = setInterval(frame,5);
  function frame(){
    if(pad==50){
      clearInterval(id);
    }
    else{
      pad = pad + 1;
      elem.style.paddingBottom = pad + "px";
    }
  }
}
function expandUp(elemId){
  var elem = document.getElementById(elemId);
  var pad = 50;
  clearInterval(id);
  id = setInterval(frame,3);
  function frame(){
    if(pad==5){
      clearInterval(id);
    }
    else{
      pad = pad - 1;
      elem.style.paddingBottom = pad + "px";
    }
  }
}

  //Controls the actions of the buttons when pressed
document.querySelector("#Display1").addEventListener("click", function() {
  if(!isOneOpen){
  document.getElementById(displayOne).style.backgroundColor = "#3A506B";
  expandDown(displayOne);
  isOneOpen = true;
  }
  else{
    expandUp(displayOne);
    document.getElementById(displayOne).style.backgroundColor = "";
    isOneOpen = false;
  }
});

document.querySelector("#Display2").addEventListener("click", function() {
  if(!isTwoOpen){
  document.getElementById(displayTwo).style.backgroundColor = "#3A506B";
  expandDown(displayTwo);
  isTwoOpen = true;

  }
  else{
    expandUp(displayTwo);
    document.getElementById(displayTwo).style.backgroundColor = "";
    isTwoOpen = false;
  }
});
document.querySelector("#Display3").addEventListener("click", function() {
  if(!isThreeOpen){
  document.getElementById(displayThree).style.backgroundColor = "#3A506B";
  expandDown(displayThree);
  isThreeOpen = true;
  }
  else{
    expandUp(displayThree);
    document.getElementById(displayThree).style.backgroundColor = "";
    isThreeOpen = false;
  }
});
document.querySelector("#Display4").addEventListener("click", function() {
  if(!isFourOpen){
  document.getElementById(displayFour).style.backgroundColor = "#3A506B";
  expandDown(displayFour);
  isFourOpen = true;
  }
  else{
    expandUp(displayFour);
    document.getElementById(displayFour).style.backgroundColor = "";
    isFourOpen = false;
  }
});
document.querySelector("#Display5").addEventListener("click", function() {
  if(!isFiveOpen){
  document.getElementById(displayFive).style.backgroundColor = "#3A506B";
  expandDown(displayFive);
  isFiveOpen = true;
  }
  else{
    expandUp(displayFive);
    document.getElementById(displayFive).style.backgroundColor = "";
    isFiveOpen = false;
  }
});
//Get current tab


///////////////////////// Server Integration ////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", function() {
  const http = new XMLHttpRequest();
  const url = 'https://us-west2-python-test-308204.cloudfunctions.net/getNews'; //change //tochange to the categories based on what we saved--probably in another function
  http.open("GET", url, true);
  http.onreadystatechange = function() {
    if (this.readyState == 4) {
      var json = JSON.parse(http.responseText); 
      window.json1 = json;
      console.log(json); //remove this later, its only here for debugging purposes
      document.getElementById("HL1").innerHTML = json.Articles[0].title;
      document.getElementById("HL2").innerHTML = json.Articles[1].title;
      document.getElementById("HL3").innerHTML = json.Articles[2].title;
      document.getElementById("HL4").innerHTML = json.Articles[3].title;
      document.getElementById("HL5").innerHTML = json.Articles[4].title;
      document.getElementById("loading").style.display = "none";
      document.getElementById("flex-container").style.display = "flex";
    }
  };
  http.send(); // Add settings like ("categories=technology-health")
});

///////////////////////////////////////////////////////////////////////////////////////////////////



////////////////////// URL Linking ///////////////////////////////////////////////////////////////

document.querySelector('#URL1').addEventListener("click", function() {
  //window.open(chrome.runtime.getURL(json.Articles[0].url));
  window.open(window.json1.Articles[0].url,'_blank');
  console.log(window.json1);
  console.log(window.json1.Articles[0].url)
});

document.querySelector('#URL2').addEventListener("click", function() {
  //window.open(chrome.runtime.getURL(json.Articles[0].url));
  window.open(window.json1.Articles[1].url,'_blank');
  console.log(window.json1);
  console.log(window.json1.Articles[1].url)
});

document.querySelector('#URL3').addEventListener("click", function() {
  //window.open(chrome.runtime.getURL(json.Articles[0].url));
  window.open(window.json1.Articles[2].url,'_blank');
  console.log(window.json1);
  console.log(window.json1.Articles[2].url)
});

document.querySelector('#URL4').addEventListener("click", function() {
  //window.open(chrome.runtime.getURL(json.Articles[0].url));
  window.open(window.json1.Articles[3].url,'_blank');
  console.log(window.json1);
  console.log(window.json1.Articles[3].url)
});

document.querySelector('#URL5').addEventListener("click", function() {
  //window.open(chrome.runtime.getURL(json.Articles[0].url));
  window.open(window.json1.Articles[4].url,'_blank');
  console.log(window.json1);
  console.log(window.json1.Articles[4].url)
});




//////////////////////////////////////////////////////////////////////////////////////////////////