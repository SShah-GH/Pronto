/*
Javascript for the extension main popup, Version 1.0.1
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
var catString;
var isLoaded = false;

//////////////////////////  Settings ////////////////////////////////

document.querySelector('#go-to-options').addEventListener("click", function() {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('options.html'));
  }
});

///////////////////  More Information Events /////////////////////////////////////////////

document.querySelector("#Display1").addEventListener("click", function() {
  if(!isOneOpen){
    document.getElementById(displayOne).style.backgroundColor = "#3A506B";

    document.getElementById(displayTwo).style.display = "none";
    document.getElementById(displayThree).style.display = "none";
    document.getElementById(displayFour).style.display = "none";
    document.getElementById(displayFive).style.display = "none";

    if(isLoaded){
      document.getElementById('more1').style.display = "flex";
    }
    else{
      document.getElementById("loading1").style.display = "block";
    }
    isOneOpen = true;
  }
  else{
    document.getElementById(displayOne).style.backgroundColor = "";
    document.getElementById('more1').style.display = "";
    document.getElementById("loading1").style.display = "none";

    document.getElementById(displayTwo).style.display = "";
    document.getElementById(displayThree).style.display = "";
    document.getElementById(displayFour).style.display = "";
    document.getElementById(displayFive).style.display = "";

    isOneOpen = false;
  }
});

document.querySelector("#Display2").addEventListener("click", function() {
  if(!isTwoOpen){  
    document.getElementById(displayTwo).style.backgroundColor = "#3A506B";
    if(isLoaded){
      document.getElementById('more2').style.display = "flex";
    }
    else{
      document.getElementById("loading2").style.display = "block";
    }

    document.getElementById(displayOne).style.display = "none";
    document.getElementById(displayThree).style.display = "none";
    document.getElementById(displayFour).style.display = "none";
    document.getElementById(displayFive).style.display = "none";

    isTwoOpen = true;
  }
  else{
    document.getElementById(displayTwo).style.backgroundColor = "";
    document.getElementById('more2').style.display = "";
    document.getElementById("loading2").style.display = "none";

    document.getElementById(displayOne).style.display = "";
    document.getElementById(displayThree).style.display = "";
    document.getElementById(displayFour).style.display = "";
    document.getElementById(displayFive).style.display = "";

    isTwoOpen = false;
  }
});

document.querySelector("#Display3").addEventListener("click", function() {
  if(!isThreeOpen){
    document.getElementById(displayThree).style.backgroundColor = "#3A506B";
    if(isLoaded){
      document.getElementById('more3').style.display = "flex";
    }
    else{
      document.getElementById("loading3").style.display = "block";
    }

    document.getElementById(displayTwo).style.display = "none";
    document.getElementById(displayOne).style.display = "none";
    document.getElementById(displayFour).style.display = "none";
    document.getElementById(displayFive).style.display = "none";

    isThreeOpen = true;
  }
  else{
    document.getElementById(displayThree).style.backgroundColor = "";
    document.getElementById('more3').style.display = "";
    document.getElementById("loading3").style.display = "none";

    document.getElementById(displayTwo).style.display = "";
    document.getElementById(displayOne).style.display = "";
    document.getElementById(displayFour).style.display = "";
    document.getElementById(displayFive).style.display = "";

    isThreeOpen = false;
  }
});
document.querySelector("#Display4").addEventListener("click", function() {
  if(!isFourOpen){
    document.getElementById(displayFour).style.backgroundColor = "#3A506B";
    if(isLoaded){
      document.getElementById('more4').style.display = "flex";
    }
    else{
      document.getElementById("loading4").style.display = "block";
    }

    document.getElementById(displayTwo).style.display = "none";
    document.getElementById(displayThree).style.display = "none";
    document.getElementById(displayOne).style.display = "none";
    document.getElementById(displayFive).style.display = "none";

    isFourOpen = true;
  }
  else{
    document.getElementById('more4').style.display = "";
    document.getElementById(displayFour).style.backgroundColor = "";
    document.getElementById("loading4").style.display = "none";

    document.getElementById(displayTwo).style.display = "";
    document.getElementById(displayThree).style.display = "";
    document.getElementById(displayOne).style.display = "";
    document.getElementById(displayFive).style.display = "";

    isFourOpen = false;
  }
});
document.querySelector("#Display5").addEventListener("click", function() {
  if(!isFiveOpen){
    document.getElementById(displayFive).style.backgroundColor = "#3A506B";
    if(isLoaded){
      document.getElementById('more5').style.display = "flex";
    }
    else{
      document.getElementById("loading5").style.display = "block";
    }

    document.getElementById(displayTwo).style.display = "none";
    document.getElementById(displayThree).style.display = "none";
    document.getElementById(displayFour).style.display = "none";
    document.getElementById(displayOne).style.display = "none";

    isFiveOpen = true;
  }
  else{
    document.getElementById('more5').style.display = "";
    document.getElementById(displayFive).style.backgroundColor = "";
    document.getElementById("loading5").style.display = "none";

    document.getElementById(displayTwo).style.display = "";
    document.getElementById(displayThree).style.display = "";
    document.getElementById(displayFour).style.display = "";
    document.getElementById(displayOne).style.display = "";

    isFiveOpen = false;
  }
});
  



///////////////////////// Server Integration ////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", function() {
  getTime();
  const http = new XMLHttpRequest();
  var url = 'https://us-west2-python-test-308204.cloudfunctions.net/getNews?categories='; //change //tochange to the categories based on what we saved--probably in another function
  // var url = 'https://us-west2-python-test-308204.cloudfunctions.net/getNews'; //change //tochange to the categories based on what we saved--probably in another function

  chrome.storage.sync.get(['business','entertainment','health','science','sports','technology'],
  function(items){
    var String = '';
  if(items.business){
    String += 'business-';
  }
  if(items.entertainment){
    String += 'entertainment-';
  }
  if(items.health){
    String += 'health-';
  }
  if(items.science){
    String += 'science-';
  }
  if(items.sports){
    String += 'sports-';
  }
  if(items.technology){
    String += 'technology-';
  }
  var len = String.length;
  var finalString = String.slice(0,len-1);
  url = url + finalString;
  if(!items.business && !items.entertainment && !items.health && !items.science && !items.sports && !items.technology){
    url = 'https://us-west2-python-test-308204.cloudfunctions.net/getNews';
  }
  http.open("GET", url, true);
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var json = JSON.parse(http.responseText); 
      window.json1 = json;
      console.log(url);
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

  //Implementing function in order to get all results in the background
  const http2 = new XMLHttpRequest();
  url = 'https://us-west2-python-test-308204.cloudfunctions.net/getAll?categories=';
  url = url + finalString;
  if(!items.business && !items.entertainment && !items.health && !items.science && !items.sports && !items.technology){
    url = 'https://us-west2-python-test-308204.cloudfunctions.net/getAll';
  }

  http2.open("GET", url, true);
  http2.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var json = JSON.parse(http2.responseText); 
      window.json1 = json;
      console.log(url);
      console.log(json); //remove this later, its only here for debugging purposes
      sentiment_categories = ['Extremely Negative', 'Very Negative', 'Negative', 'Neutral', 'Positive', 'Very Positive', 'Extremely Positive']
      sentiment_color      = ['#cc0000',  '#ff3333', '#ff8080', '#66b3ff', '#98e698', '#32cd32', '#28a428']

      function isValidSummary(summary){
        if(summary.length < 100 || summary.length > 3500)
          return 'Summary is Blocked by Website';
        return summary;
      }
      //Summary Display
      document.getElementById("sum1").innerHTML = isValidSummary(json.Articles[0].summary);
      document.getElementById("sum2").innerHTML = isValidSummary(json.Articles[1].summary);
      document.getElementById("sum3").innerHTML = isValidSummary(json.Articles[2].summary);
      document.getElementById("sum4").innerHTML = isValidSummary(json.Articles[3].summary);
      document.getElementById("sum5").innerHTML = isValidSummary(json.Articles[4].summary);

      //Sentiment Display
      document.getElementById("sent1").innerHTML = sentiment_categories[(json.Articles[0].sentiment/0.5 + 3)]
      document.getElementById("sent1").style.backgroundColor = sentiment_color[(json.Articles[0].sentiment/0.5 + 3)];
      document.getElementById("sent2").innerHTML = sentiment_categories[(json.Articles[1].sentiment/0.5 + 3)]
      document.getElementById("sent2").style.backgroundColor = sentiment_color[(json.Articles[1].sentiment/0.5 + 3)];
      document.getElementById("sent3").innerHTML = sentiment_categories[(json.Articles[2].sentiment/0.5 + 3)]
      document.getElementById("sent3").style.backgroundColor = sentiment_color[(json.Articles[2].sentiment/0.5 + 3)];
      document.getElementById("sent4").innerHTML = sentiment_categories[(json.Articles[3].sentiment/0.5 + 3)]
      document.getElementById("sent4").style.backgroundColor = sentiment_color[(json.Articles[3].sentiment/0.5 + 3)];
      document.getElementById("sent5").innerHTML = sentiment_categories[(json.Articles[4].sentiment/0.5 + 3)]
      document.getElementById("sent5").style.backgroundColor = sentiment_color[(json.Articles[4].sentiment/0.5 + 3)];
      

      //Reading Length Display
      document.getElementById("readTime1").innerHTML = json.Articles[0].read_time;
      document.getElementById("readTime2").innerHTML = json.Articles[1].read_time;
      document.getElementById("readTime3").innerHTML = json.Articles[2].read_time;
      document.getElementById("readTime4").innerHTML = json.Articles[3].read_time;
      document.getElementById("readTime5").innerHTML = json.Articles[4].read_time;

      document.getElementById("loading1").style.display = "none";
      document.getElementById("loading2").style.display = "none";
      document.getElementById("loading3").style.display = "none";
      document.getElementById("loading4").style.display = "none";
      document.getElementById("loading5").style.display = "none";

      isLoaded = true;
      if(isOneOpen){
        document.getElementById('more1').style.display = "flex";
      }
      if(isTwoOpen){
        document.getElementById('more2').style.display = "flex";
      }
      if(isThreeOpen){
        document.getElementById('more3').style.display = "flex";
      }
      if(isFourOpen){
        document.getElementById('more4').style.display = "flex";
      }
      if(isFiveOpen){
        document.getElementById('more5').style.display = "flex";
      }
    }

  }
  
  http2.send();
});
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




/////////////////////////////////////// Time Data //////////////////////////////////////////////////
function getTime(){
  var dateOfLoad = new Date();
  var hourOfLoad = dateOfLoad.getHours();
  var minOfLoad = dateOfLoad.getMinutes();
  var dayOfLoad = dateOfLoad.getDay();
  var monthOfLoad = dateOfLoad.getMonth();
  console.log(hourOfLoad);
  console.log(minOfLoad);
  console.log(dayOfLoad);
  console.log(monthOfLoad);
}

function checkTime(){

}


///////////////////////////////////////////////////////////////////////////////////////////////////