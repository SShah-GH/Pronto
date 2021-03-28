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
  



////////////////////// URL Linking ///////////////////////////////////////////////////////////////

document.querySelector('#URL1').addEventListener("click", function() {
  //window.open(chrome.runtime.getURL(json.Articles[0].url));
  window.open(window.json1.Articles[0].url,'_blank');
});

document.querySelector('#URL2').addEventListener("click", function() {
  //window.open(chrome.runtime.getURL(json.Articles[0].url));
  window.open(window.json1.Articles[1].url,'_blank');
});

document.querySelector('#URL3').addEventListener("click", function() {
  //window.open(chrome.runtime.getURL(json.Articles[0].url));
  window.open(window.json1.Articles[2].url,'_blank');
});

document.querySelector('#URL4').addEventListener("click", function() {
  //window.open(chrome.runtime.getURL(json.Articles[0].url));
  window.open(window.json1.Articles[3].url,'_blank');
});

document.querySelector('#URL5').addEventListener("click", function() {
  //window.open(chrome.runtime.getURL(json.Articles[0].url));
  window.open(window.json1.Articles[4].url,'_blank');
});

//////////////////////////////////////////////////////////////////////////////////////////////////




/////////////////////////////////////// Server Integration and Settings Save and Refresh According To Time //////////////////////////////////////////////////
function logTime(){ //unused function for testing
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
  chrome.storage.sync.get({
    month: -1,
    day: -1,
    hour: -1,
    min: -1,
    headOne: "error",
    headTwo: "error",
    headThree: "error",
    headFour: "error",
    headFive: "error",
    sum1: "sum error",
    sum2: "sum error",
    sum3: "sum error",
    sum4: "sum error",
    sum5: "sum error",
    sent1: "sent error",
    sent2: "sent error",
    sent3: "sent error",
    sent4: "sent error",
    sent5: "sent error",
    rt1: "rt error",
    rt2: "rt error",
    rt3: "rt error",
    rt4: "rt error",
    rt5: "rt error",
    isUpdated: false

  }, function(items) {
    var needSave = false;
    var d = new Date();
    if(items.month == -1 ||items.day == -1 ||items.hour == -1 ||items.min == -1 || items.headOne == "error" ||items.headTwo == "error" ||items.headThree == "error" ||items.headFour == "error" ||items.headFive == "error" || items.sum1 == "sum error" ||items.sum2 == "sum error" ||items.sum3 == "sum error" ||items.sum4 == "sum error" ||items.sum5 == "sum error" || items.sent1 == "sent error" ||items.sent2 == "sent error" ||items.sent3 == "sent error" ||items.sent4 == "sent error" ||items.sent5 == "sent error" || items.rt1 == "rt error" ||items.rt2 == "rt error" ||items.rt3 == "rt error" ||items.rt4 == "rt error" ||items.rt5 == "rt error" || ((d.getMonth() - items.month) != 0) || ((d.getDay() - items.day) != 0) || ((d.getHours() - items.hour) != 0)){
      console.log("Loading because of not saved");
      loadContent(); //fix this to only check for headlines saved and have a loadContentHeadlines and loadContentAll :) (even later I can work on loading incrementaly rather than all at once for more)
    }
    else if(items.isUpdated){
      console.log("Loading Because of Settings Change");
      loadContent();
    }
    else if((d.getMinutes() - items.min) >= 20){
      console.log("Loading Because of Minutes");
      loadContent();
    }
    else{
      console.log("Saved headlines")
      document.getElementById("HL1").innerHTML = items.headOne;
      document.getElementById("HL2").innerHTML = items.headTwo;
      document.getElementById("HL3").innerHTML = items.headThree;
      document.getElementById("HL4").innerHTML = items.headFour;
      document.getElementById("HL5").innerHTML = items.headFive;
      document.getElementById("loading").style.display = "none";
      document.getElementById("flex-container").style.display = "flex";
      sentiment_categories = ['Extremely Negative', 'Extremely Negative', 'Very Negative', 'Negative', 'Neutral', 'Positive', 'Very Positive', 'Extremely Positive','Extremely Positive']
      sentiment_color      = ['#cc0000','#cc0000',  '#ff3333', '#ff8080', '#66b3ff', '#98e698', '#32cd32', '#28a428','#28a428']

      
      
      //Summary Display
      document.getElementById("sum1").innerHTML = items.sum1;
      document.getElementById("sum2").innerHTML = items.sum2;
      document.getElementById("sum3").innerHTML = items.sum3;
      document.getElementById("sum4").innerHTML = items.sum4;
      document.getElementById("sum5").innerHTML = items.sum5;

      //Sentiment Display
      document.getElementById("sent1").innerHTML = sentiment_categories[(items.sent1/0.5 + 4)];
      document.getElementById("sent01").style.backgroundColor = sentiment_color[(items.sent1/0.5 + 4)];
      document.getElementById("sent2").innerHTML = sentiment_categories[(items.sent2/0.5 + 4)];
      document.getElementById("sent02").style.backgroundColor = sentiment_color[(items.sent2/0.5 + 4)];
      document.getElementById("sent3").innerHTML = sentiment_categories[(items.sent3/0.5 + 4)];
      document.getElementById("sent03").style.backgroundColor = sentiment_color[(items.sent3/0.5 + 4)];
      document.getElementById("sent4").innerHTML = sentiment_categories[(items.sent4/0.5 + 4)];
      document.getElementById("sent04").style.backgroundColor = sentiment_color[(items.sent4/0.5 + 4)];
      document.getElementById("sent5").innerHTML = sentiment_categories[(items.sent5/0.5 + 4)];
      document.getElementById("sent05").style.backgroundColor = sentiment_color[(items.sent5/0.5 + 4)];
      

      //Reading Length Display
      document.getElementById("readTime1").innerHTML = items.rt1;
      document.getElementById("readTime2").innerHTML = items.rt2;
      document.getElementById("readTime3").innerHTML = items.rt3;
      document.getElementById("readTime4").innerHTML = items.rt4;
      document.getElementById("readTime5").innerHTML = items.rt5;

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
    
  });
    
}

function setTime(){
  var dateOfLoad = new Date();
  var hourOfLoad = dateOfLoad.getHours();
  var minOfLoad = dateOfLoad.getMinutes();
  var dayOfLoad = dateOfLoad.getDay();
  var monthOfLoad = dateOfLoad.getMonth();
  chrome.storage.sync.set({
    month: monthOfLoad,
    day: dayOfLoad,
    hour: hourOfLoad,
    min: minOfLoad
  }, function() {
    // Update status to let user know options were saved.
    console.log("Time saved")
  });

}

function setHeadlines(h1,h2,h3,h4,h5){
  chrome.storage.sync.set({
    headOne: h1,
    headTwo: h2,
    headThree: h3,
    headFour: h4,
    headFive: h5
  }, function(){
    console.log("Headlines Saved");
  });
}

function setSums(s1,s2,s3,s4,s5){
  chrome.storage.sync.set({
    sum1: s1,
    sum2: s2,
    sum3: s3,
    sum4: s4,
    sum5: s5
  }, function(){
    console.log("Summaries Saved");
  });
}
function setSents(s1,s2,s3,s4,s5){
  chrome.storage.sync.set({
    sent1: s1,
    sent2: s2,
    sent3: s3,
    sent4: s4,
    sent5: s5
  }, function(){
    console.log("Sentiments Saved");
  });
}
function setReadTimes(r1,r2,r3,r4,r5){
  chrome.storage.sync.set({
    rt1: r1,
    rt2: r2,
    rt3: r3,
    rt4: r4,
    rt5: r5
  }, function(){
    console.log("Read Times Saved");
  });
}
function setUpdate(){
  chrome.storage.sync.set({
    isUpdated: false
  },
  function(){
    console.log("Update Saved");
  });
}



///////////////////////////////////////////////////////////////////////////////////////////////////



function loadContent(){
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
      setHeadlines(json.Articles[0].title,json.Articles[1].title,json.Articles[2].title,json.Articles[3].title,json.Articles[4].title);
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
      sentiment_categories = ['Extremely Negative', 'Extremely Negative', 'Very Negative', 'Negative', 'Neutral', 'Positive', 'Very Positive', 'Extremely Positive','Extremely Positive']
      sentiment_color      = ['#cc0000','#cc0000',  '#ff3333', '#ff8080', '#66b3ff', '#98e698', '#32cd32', '#28a428','#28a428']

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
      setSums(isValidSummary(json.Articles[0].summary),isValidSummary(json.Articles[1].summary),isValidSummary(json.Articles[2].summary),isValidSummary(json.Articles[3].summary),isValidSummary(json.Articles[4].summary));

      //Sentiment Display
      document.getElementById("sent1").innerHTML = sentiment_categories[(json.Articles[0].sentiment/0.5 + 4)]
      document.getElementById("sent01").style.backgroundColor = sentiment_color[(json.Articles[0].sentiment/0.5 + 4)];
      document.getElementById("sent2").innerHTML = sentiment_categories[(json.Articles[1].sentiment/0.5 + 4)]
      document.getElementById("sent02").style.backgroundColor = sentiment_color[(json.Articles[1].sentiment/0.5 + 4)];
      document.getElementById("sent3").innerHTML = sentiment_categories[(json.Articles[2].sentiment/0.5 + 4)]
      document.getElementById("sent03").style.backgroundColor = sentiment_color[(json.Articles[2].sentiment/0.5 + 4)];
      document.getElementById("sent4").innerHTML = sentiment_categories[(json.Articles[3].sentiment/0.5 + 4)]
      document.getElementById("sent04").style.backgroundColor = sentiment_color[(json.Articles[3].sentiment/0.5 + 4)];
      document.getElementById("sent5").innerHTML = sentiment_categories[(json.Articles[4].sentiment/0.5 + 4)]
      document.getElementById("sent05").style.backgroundColor = sentiment_color[(json.Articles[4].sentiment/0.5 + 4)];
      setSents(json.Articles[0].sentiment,json.Articles[1].sentiment,json.Articles[2].sentiment,json.Articles[3].sentiment,json.Articles[4].sentiment);

      //Reading Length Display
      document.getElementById("readTime1").innerHTML = json.Articles[0].read_time;
      document.getElementById("readTime2").innerHTML = json.Articles[1].read_time;
      document.getElementById("readTime3").innerHTML = json.Articles[2].read_time;
      document.getElementById("readTime4").innerHTML = json.Articles[3].read_time;
      document.getElementById("readTime5").innerHTML = json.Articles[4].read_time;
      setReadTimes(json.Articles[0].read_time,json.Articles[1].read_time,json.Articles[2].read_time,json.Articles[3].read_time,json.Articles[4].read_time);

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
    setTime();
    setUpdate();
    console.log("All Saved, You're Good To Go");
  }
  
  http2.send();
  
});
}


document.addEventListener("DOMContentLoaded", function() {
  checkTime();
});