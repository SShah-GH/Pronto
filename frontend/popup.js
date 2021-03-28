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

//Activate if Options Cog is Clicked
document.querySelector('#go-to-options').addEventListener("click", function() {
  //Check if Page can be Accessed
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
  //Go to Settings Window
    window.open(chrome.runtime.getURL('options.html'));
  }
});

///////////////////  More Information Events /////////////////////////////////////////////


curr_display = 0;

///////////////////  Display Functions  ////////////////////////////////////////////////////
function display1(){

  //Record Current Display
  curr_display = 1;

  if(!isOneOpen){
    
    //Configure Settings For Current Window and Options Bar
    document.getElementById(displayOne).style.display = "";
    document.getElementById(displayOne).style.backgroundColor = "#3A506B";
    document.getElementById(displayOne).style.marginBottom = "0px";
    document.getElementById("options_bar").style.display = "flex";

    //Hide All Other Windows 
    document.getElementById(displayTwo).style.display = "none";
    document.getElementById(displayThree).style.display = "none";
    document.getElementById(displayFour).style.display = "none";
    document.getElementById(displayFive).style.display = "none";

    //Display Loading Icon if Information Hasn't Been Loaded
    if(isLoaded){
      document.getElementById('more1').style.display = "flex";
    }
    else{
      document.getElementById("loading1").style.display = "block";
    }
    isOneOpen = true;
  }

  else{
    //Reset Window Settings When Reactivated
    document.getElementById(displayOne).style.marginBottom = "";
    document.getElementById(displayOne).style.backgroundColor = "";
    document.getElementById('more1').style.display = "";
    document.getElementById("loading1").style.display = "none";

    //Show All Previously Hidden Windows
    document.getElementById(displayTwo).style.display = "";
    document.getElementById(displayThree).style.display = "";
    document.getElementById(displayFour).style.display = "";
    document.getElementById(displayFive).style.display = "";

    isOneOpen = false;
  }
}

function display2(){

  //Record Current Display
  curr_display = 2;

  if(!isTwoOpen){ 
    //Configure Settings For Current Window and Options Bar
    document.getElementById(displayTwo).style.display = ""; 
    document.getElementById(displayTwo).style.backgroundColor = "#3A506B";
    document.getElementById("options_bar").style.display = "flex";
    document.getElementById(displayTwo).style.marginBottom = "0px";
    
    //Display Loading Icon if Information Hasn't Been Loaded
    if(isLoaded){
      document.getElementById('more2').style.display = "flex";
    }
    else{
      document.getElementById("loading2").style.display = "block";
    }

    //Hide All Other Windows 
    document.getElementById(displayOne).style.display = "none";
    document.getElementById(displayThree).style.display = "none";
    document.getElementById(displayFour).style.display = "none";
    document.getElementById(displayFive).style.display = "none";

    isTwoOpen = true;
  }
  else{
    //Reset Window Settings When Reactivated
    document.getElementById(displayOne).style.marginBottom = "";
    document.getElementById(displayTwo).style.backgroundColor = "";
    document.getElementById('more2').style.display = "";
    document.getElementById("loading2").style.display = "none";

    //Show All Previously Hidden Windows
    document.getElementById(displayOne).style.display = "";
    document.getElementById(displayThree).style.display = "";
    document.getElementById(displayFour).style.display = "";
    document.getElementById(displayFive).style.display = "";

    isTwoOpen = false;
  }
}

function display3(){

  //Record Current Display
  curr_display = 3;

  if(!isThreeOpen){
    //Configure Settings For Current Window and Options Bar
    document.getElementById(displayThree).style.display = "";
    document.getElementById(displayThree).style.backgroundColor = "#3A506B";
    document.getElementById(displayThree).style.marginBottom = "0px";
    document.getElementById("options_bar").style.display = "flex";

    //Display Loading Icon if Information Hasn't Been Loaded
    if(isLoaded){
      document.getElementById('more3').style.display = "flex";
    }
    else{
      document.getElementById("loading3").style.display = "block";
    }

    //Hide All Other Windows 
    document.getElementById(displayTwo).style.display = "none";
    document.getElementById(displayOne).style.display = "none";
    document.getElementById(displayFour).style.display = "none";
    document.getElementById(displayFive).style.display = "none";

    isThreeOpen = true;
  }
  else{
    //Reset Window Settings When Reactivated
    document.getElementById(displayOne).style.marginBottom = "";
    document.getElementById(displayThree).style.backgroundColor = "";
    document.getElementById('more3').style.display = "";
    document.getElementById("loading3").style.display = "none";

    //Show All Previously Hidden Windows
    document.getElementById(displayTwo).style.display = "";
    document.getElementById(displayOne).style.display = "";
    document.getElementById(displayFour).style.display = "";
    document.getElementById(displayFive).style.display = "";

    isThreeOpen = false;
  }
}

function display4(){

  //Record Current Display
  curr_display = 4;

  if(!isFourOpen){
    //Configure Settings For Current Window and Options Bar
    document.getElementById(displayFour).style.display = "";
    document.getElementById(displayFour).style.backgroundColor = "#3A506B";
    document.getElementById(displayFour).style.marginBottom = "0px";
    document.getElementById("options_bar").style.display = "flex";

    //Display Loading Icon if Information Hasn't Been Loaded
    if(isLoaded){
      document.getElementById('more4').style.display = "flex";
    }
    else{
      document.getElementById("loading4").style.display = "block";
    }

    //Hide All Other Windows 
    document.getElementById(displayTwo).style.display = "none";
    document.getElementById(displayThree).style.display = "none";
    document.getElementById(displayOne).style.display = "none";
    document.getElementById(displayFive).style.display = "none";

    isFourOpen = true;
  }
  else{

    //Reset Window Settings When Reactivated
    document.getElementById(displayOne).style.marginBottom = "";
    document.getElementById('more4').style.display = "";
    document.getElementById(displayFour).style.backgroundColor = "";
    document.getElementById("loading4").style.display = "none";

    //Show All Previously Hidden Windows
    document.getElementById(displayTwo).style.display = "";
    document.getElementById(displayThree).style.display = "";
    document.getElementById(displayOne).style.display = "";
    document.getElementById(displayFive).style.display = "";

    isFourOpen = false;
  }
}

function display5(){
  curr_display = 5;
  console.log('Display 5 Called')
  if(!isFiveOpen){
    // document.getElementById("fa-chevron-right").style.visibility = "hidden";
    document.getElementById(displayFive).style.display = "";
    document.getElementById(displayFive).style.backgroundColor = "#3A506B";
    document.getElementById(displayFive).style.marginBottom = "0px";
    document.getElementById("options_bar").style.display = "flex";

    //Display Loading Icon if Information Hasn't Been Loaded
    if(isLoaded){
      document.getElementById('more5').style.display = "flex";
    }
    else{
      document.getElementById("loading5").style.display = "block";
    }

    //Hide All Other Windows 
    document.getElementById(displayTwo).style.display = "none";
    document.getElementById(displayThree).style.display = "none";
    document.getElementById(displayFour).style.display = "none";
    document.getElementById(displayOne).style.display = "none";

    isFiveOpen = true;
  }

  else{
    //Reset Window Settings When Reactivated
    document.getElementById(displayOne).style.marginBottom = "";
    document.getElementById('more5').style.display = "";
    document.getElementById(displayFive).style.backgroundColor = "";
    document.getElementById("loading5").style.display = "none";

    //Show All Previously Hidden Windows
    document.getElementById(displayTwo).style.display = "";
    document.getElementById(displayThree).style.display = "";
    document.getElementById(displayFour).style.display = "";
    document.getElementById(displayOne).style.display = "";

    isFiveOpen = false;
  }
}

//Display First Window if Article is Clicked
document.querySelector("#Display1").addEventListener("click", function() {
  curr_display = 1;
  display1();
  console.log(curr_display);
});

//Display Second Window if Article is Clicked
document.querySelector("#Display2").addEventListener("click", function() {
  curr_display = 2;
  display2();
  console.log(curr_display);
});

//Display Third Window if Article is Clicked
document.querySelector("#Display3").addEventListener("click", function() {
  curr_display = 3;
  display3();
  console.log(curr_display);
});

//Display Fourth Window if Article is Clicked
document.querySelector("#Display4").addEventListener("click", function() {
  curr_display = 4;
  display4();
  console.log(curr_display);
});

//Display Fifth Window if Article is Clicked
document.querySelector("#Display5").addEventListener("click", function() {
  curr_display = 5;
  display5();
  console.log(curr_display);
});

//Go to Next Article in Sequence if Forward Arrow is Clicked
document.querySelector("#go-forward").addEventListener("click", function() {

  //Log Display Change
  curr_display++;
  console.log(curr_display);

  //Close Current Window and Open Next Article
  if(curr_display == 2){
    display1();
    display2();
  }

  //Close Current Window and Open Next Article
  else if(curr_display == 3){
    display2();
    display3();
  }

  //Close Current Window and Open Next Article
  else if(curr_display == 4){
    display3();
    display4();
  }

  //Close Current Window and Open Next Article
  else if(curr_display == 5){
    display4();
    display5();
  }

  //Close Current Window and Open Next Article
  else if(curr_display == 6){
    display5();
    display1();
  }
});

//Go to Last Article in Sequence if Forward Arrow is Clicked
document.querySelector("#go-back").addEventListener("click", function() {

  //Log Display Change
  curr_display--;
  console.log(curr_display);

  //Close Current Window and Open Last Article
  if(curr_display == 0){
    display1();
    display5();
    curr_display 
  }

  //Close Current Window and Open Last Article
  else if(curr_display == 1){
    display2();
    display1();
  }

  //Close Current Window and Open Last Article
  else if(curr_display == 2){
    display3();
    display2();
  }

  //Close Current Window and Open Last Article
  else if(curr_display == 3){
    display4();
    display3();
  }

  //Close Current Window and Open Last Article
  else if(curr_display == 4){
    display5();
    display4();
  }
});

//Return to Main Article Page if Home Button is Clicked
document.querySelector("#go-home").addEventListener("click", function() {

  //Log Display Change
  console.log(curr_display);

  //Close Current Window and Hide Options Bar
  if(curr_display == 1){
    display1();
    document.getElementById("options_bar").style.display = "none";
  }

  //Close Current Window and Hide Options Bar
  else if(curr_display == 2){
    display2();
    document.getElementById("options_bar").style.display = "none";
  }

  //Close Current Window and Hide Options Bar
  else if(curr_display == 3){
    display3();
    document.getElementById("options_bar").style.display = "none";
  }

  //Close Current Window and Hide Options Bar
  else if(curr_display == 4){
    display4();
    document.getElementById("options_bar").style.display = "none";
  }

  //Close Current Window and Hide Options Bar
  else if(curr_display == 5){
    display5();
    document.getElementById("options_bar").style.display = "none";
  }
});
  
  


////////////////////// URL Linking ///////////////////////////////////////////////////////////////

//Go to Web Article if Url Icon is Selected
document.querySelector('#URL1').addEventListener("click", function() {
  window.open(window.json1.Articles[0].url,'_blank');
});

//Go to Web Article if Url Icon is Selected
document.querySelector('#URL2').addEventListener("click", function() {
  window.open(window.json1.Articles[1].url,'_blank');
});

//Go to Web Article if Url Icon is Selected
document.querySelector('#URL3').addEventListener("click", function() {
  window.open(window.json1.Articles[2].url,'_blank');
});

//Go to Web Article if Url Icon is Selected
document.querySelector('#URL4').addEventListener("click", function() {
  window.open(window.json1.Articles[3].url,'_blank');
});

//Go to Web Article if Url Icon is Selected
document.querySelector('#URL5').addEventListener("click", function() {
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
    url1: "https://www.error.info/",
    url2: "https://www.error.info/",
    url3: "https://www.error.info/",
    url4: "https://www.error.info/",
    url5: "https://www.error.info/",
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
      //Log Headline Saving
      console.log("Saved headlines")

      //Save Each Headline
      document.getElementById("HL1").innerHTML = items.headOne;
      document.getElementById("HL2").innerHTML = items.headTwo;
      document.getElementById("HL3").innerHTML = items.headThree;
      document.getElementById("HL4").innerHTML = items.headFour;
      document.getElementById("HL5").innerHTML = items.headFive;

      //Stop Loading Icon and Display Results Box
      document.getElementById("loading").style.display = "none";
      document.getElementById("flex-container").style.display = "flex";

      //Set Colors and Statements to Signify Sentiment
      sentiment_categories = ['Overwhelmingly Negative', 'Overwhelmingly Negative', 'Extremely Negative', 'Extremely Negative', 'Very Negative', 'Negative', 'Neutral', 'Positive', 'Very Positive', 'Extremely Positive','Extremely Positive', 'Overwhelmingly Positive', 'Overwhelmingly Positive',]
      sentiment_color      = ['#d36582','#d36582','#cc0000','#cc0000',  '#ff3333', '#ff8080', '#66b3ff', '#98e698', '#32cd32', '#28a428','#28a428', '#003300', '#003300']

      
      
      //Summary Display
      document.getElementById("sum1").innerHTML = items.sum1;
      document.getElementById("sum2").innerHTML = items.sum2;
      document.getElementById("sum3").innerHTML = items.sum3;
      document.getElementById("sum4").innerHTML = items.sum4;
      document.getElementById("sum5").innerHTML = items.sum5;

      //Sentiment Display
      document.getElementById("sent1").innerHTML = sentiment_categories[(items.sent1/0.5 + 6)];
      document.getElementById("sent01").style.backgroundColor = sentiment_color[(items.sent1/0.5 + 6)];
      document.getElementById("sent2").innerHTML = sentiment_categories[(items.sent2/0.5 + 6)];
      document.getElementById("sent02").style.backgroundColor = sentiment_color[(items.sent2/0.5 + 6)];
      document.getElementById("sent3").innerHTML = sentiment_categories[(items.sent3/0.5 + 6)];
      document.getElementById("sent03").style.backgroundColor = sentiment_color[(items.sent3/0.5 + 6)];
      document.getElementById("sent4").innerHTML = sentiment_categories[(items.sent4/0.5 + 6)];
      document.getElementById("sent04").style.backgroundColor = sentiment_color[(items.sent4/0.5 + 6)];
      document.getElementById("sent5").innerHTML = sentiment_categories[(items.sent5/0.5 + 6)];
      document.getElementById("sent05").style.backgroundColor = sentiment_color[(items.sent5/0.5 + 6)];
      

      //Reading Length Display
      document.getElementById("readTime1").innerHTML = items.rt1;
      document.getElementById("readTime2").innerHTML = items.rt2;
      document.getElementById("readTime3").innerHTML = items.rt3;
      document.getElementById("readTime4").innerHTML = items.rt4;
      document.getElementById("readTime5").innerHTML = items.rt5;

      //Hide Loading Symbols For Each Article
      document.getElementById("loading1").style.display = "none";
      document.getElementById("loading2").style.display = "none";
      document.getElementById("loading3").style.display = "none";
      document.getElementById("loading4").style.display = "none";
      document.getElementById("loading5").style.display = "none";

      //Display Data for Every Successfully Analysed Article
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

    //Create Placeholder URLs
    var u1 = {
      url: "https://updatefaker.com/w98/index.html"
    };
    var u2 = {
      url: "https://updatefaker.com/xp/index.html"
    };
    var u3 = {
      url: "https://updatefaker.com/osx/index.html"
    };
    var u4 = {
      url: "https://updatefaker.com/windows10/index.html"
    };
    var u5 = {
      url: "https://updatefaker.com/w98/index.html"
    };

    //Create Placeholder json
    var json = {
      Articles: [u1,u2,u3,u4,u5]
    };

    //Assign Stored URLs to JSON
    window.json1 = json;
    window.json1.Articles[0].url = items.url1;
    window.json1.Articles[1].url = items.url2;
    window.json1.Articles[2].url = items.url3;
    window.json1.Articles[3].url = items.url4;
    window.json1.Articles[4].url = items.url5;
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
function setURLs(u1,u2,u3,u4,u5){
  chrome.storage.sync.set({
    url1: u1,
    url2: u2,
    url3: u3,
    url4: u4,
    url5: u5
  },
  function(){
    console.log("URLs Saved");
  });
}


/////////////////////////////////////////////////////////// Calls To Backend ////////////////////////////////////////////////////////////////



function loadContent(){
  //Create New HTTPS Request
  const http = new XMLHttpRequest();

  //Create Base URL
  var url = 'https://us-west2-python-test-308204.cloudfunctions.net/getNews?categories='; 
  
  //Get Saved Categories From Storage
  chrome.storage.sync.get(['business','entertainment','health','science','sports','technology'],

  //Append Categories to HTTPS Call to Backend
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

  //Create Full URL for Backend Call
  var len = String.length;
  var finalString = String.slice(0,len-1);
  url = url + finalString;

  //Set URL to General if no Categories are Selected
  if(!items.business && !items.entertainment && !items.health && !items.science && !items.sports && !items.technology){
    url = 'https://us-west2-python-test-308204.cloudfunctions.net/getNews';
  }

  //Create Preliminary Backend Request
  http.open("GET", url, true);

  //Wait for Return Call
  http.onreadystatechange = function() {
    //If Successfully Returned from Backend
    if (this.readyState == 4 && this.status == 200) {

      //Parse and Log JSON from Backend Call
      var json = JSON.parse(http.responseText); 
      window.json1 = json;
      console.log(url);
      console.log(json); 

      //Set Titles for Preliminary Articles
      document.getElementById("HL1").innerHTML = json.Articles[0].title;
      document.getElementById("HL2").innerHTML = json.Articles[1].title;
      document.getElementById("HL3").innerHTML = json.Articles[2].title;
      document.getElementById("HL4").innerHTML = json.Articles[3].title;
      document.getElementById("HL5").innerHTML = json.Articles[4].title;

      //Hide Loading Icon and Dispkay Titles
      document.getElementById("loading").style.display = "none";
      document.getElementById("flex-container").style.display = "flex";
    }
  };

  //Send Requests to Frontend
  http.send(); 

  //Create Secondary Background Request
  const http2 = new XMLHttpRequest();

  //Create URL for Secondary Backend Call
  url = 'https://us-west2-python-test-308204.cloudfunctions.net/getAll?categories=';
  url = url + finalString;

  //Set Base URL if no Categories Chosen
  if(!items.business && !items.entertainment && !items.health && !items.science && !items.sports && !items.technology){
    url = 'https://us-west2-python-test-308204.cloudfunctions.net/getAll';
  }

  //Secondary Call to Backend
  http2.open("GET", url, true);

  //Wait for Response from Backend
  http2.onreadystatechange = function() {
    //If Backend Call Successful
    if (this.readyState == 4 && this.status == 200) {

      //Parse and Log JSON Object
      var json = JSON.parse(http2.responseText); 
      window.json2 = json;
      console.log(url);
      console.log(json); 

      //Set Color and Text for Sentiment
      sentiment_categories = ['Overwhelmingly Negative', 'Overwhelmingly Negative', 'Extremely Negative', 'Extremely Negative', 'Very Negative', 'Negative', 'Neutral', 'Positive', 'Very Positive', 'Extremely Positive','Extremely Positive', 'Overwhelmingly Positive', 'Overwhelmingly Positive',]
      sentiment_color      = ['#d36582','#d36582','#cc0000','#cc0000',  '#ff3333', '#ff8080', '#66b3ff', '#98e698', '#32cd32', '#28a428','#28a428', '#003300', '#003300']

      //Check for Valid Summary
      function isValidSummary(summary){
        if(summary.length < 100 ){
          return 'Summary is Blocked by Website';
        }
        else if(summary.length > 7000){
          return 'Article Too Long To Summarize';
        }
        return summary;
      }
      //Summary Display
      document.getElementById("sum1").innerHTML = isValidSummary(json.Articles[0].summary);
      document.getElementById("sum2").innerHTML = isValidSummary(json.Articles[1].summary);
      document.getElementById("sum3").innerHTML = isValidSummary(json.Articles[2].summary);
      document.getElementById("sum4").innerHTML = isValidSummary(json.Articles[3].summary);
      document.getElementById("sum5").innerHTML = isValidSummary(json.Articles[4].summary);

      //Record Summaries
      setSums(isValidSummary(json.Articles[0].summary),isValidSummary(json.Articles[1].summary),isValidSummary(json.Articles[2].summary),isValidSummary(json.Articles[3].summary),isValidSummary(json.Articles[4].summary));

      //Sentiment Display
      document.getElementById("sent1").innerHTML = sentiment_categories[(json.Articles[0].sentiment/0.5 + 6)]
      document.getElementById("sent01").style.backgroundColor = sentiment_color[(json.Articles[0].sentiment/0.5 + 6)];
      document.getElementById("sent2").innerHTML = sentiment_categories[(json.Articles[1].sentiment/0.5 + 6)]
      document.getElementById("sent02").style.backgroundColor = sentiment_color[(json.Articles[1].sentiment/0.5 + 6)];
      document.getElementById("sent3").innerHTML = sentiment_categories[(json.Articles[2].sentiment/0.5 + 6)]
      document.getElementById("sent03").style.backgroundColor = sentiment_color[(json.Articles[2].sentiment/0.5 + 6)];
      document.getElementById("sent4").innerHTML = sentiment_categories[(json.Articles[3].sentiment/0.5 + 6)]
      document.getElementById("sent04").style.backgroundColor = sentiment_color[(json.Articles[3].sentiment/0.5 + 6)];
      document.getElementById("sent5").innerHTML = sentiment_categories[(json.Articles[4].sentiment/0.5 + 6)]
      document.getElementById("sent05").style.backgroundColor = sentiment_color[(json.Articles[4].sentiment/0.5 + 6)];

      //Record Sentiments
      setSents(json.Articles[0].sentiment,json.Articles[1].sentiment,json.Articles[2].sentiment,json.Articles[3].sentiment,json.Articles[4].sentiment);

      //Reading Length Display
      document.getElementById("readTime1").innerHTML = json.Articles[0].read_time;
      document.getElementById("readTime2").innerHTML = json.Articles[1].read_time;
      document.getElementById("readTime3").innerHTML = json.Articles[2].read_time;
      document.getElementById("readTime4").innerHTML = json.Articles[3].read_time;
      document.getElementById("readTime5").innerHTML = json.Articles[4].read_time;

      //Record Lengths
      setReadTimes(json.Articles[0].read_time,json.Articles[1].read_time,json.Articles[2].read_time,json.Articles[3].read_time,json.Articles[4].read_time);

      //Hide Loading Icons
      document.getElementById("loading1").style.display = "none";
      document.getElementById("loading2").style.display = "none";
      document.getElementById("loading3").style.display = "none";
      document.getElementById("loading4").style.display = "none";
      document.getElementById("loading5").style.display = "none";

      //Update Article URLs
      window.json1.Articles[0].url = window.json2.Articles[0].url;
      window.json1.Articles[1].url = window.json2.Articles[1].url;
      window.json1.Articles[2].url = window.json2.Articles[2].url;
      window.json1.Articles[3].url = window.json2.Articles[3].url;
      window.json1.Articles[4].url = window.json2.Articles[4].url;

      //Update Article Headlines
      document.getElementById("HL1").innerHTML = json.Articles[0].title;
      document.getElementById("HL2").innerHTML = json.Articles[1].title;
      document.getElementById("HL3").innerHTML = json.Articles[2].title;
      document.getElementById("HL4").innerHTML = json.Articles[3].title;
      document.getElementById("HL5").innerHTML = json.Articles[4].title;

      //Stop Loading Icon and Display Analysis
      document.getElementById("loading").style.display = "none";
      document.getElementById("flex-container").style.display = "flex";

      //Record New Headlines
      setHeadlines(json.Articles[0].title,json.Articles[1].title,json.Articles[2].title,json.Articles[3].title,json.Articles[4].title);

      //Display Analysis for All Articles
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

    //Record URLS
    setURLs(window.json1.Articles[0].url,window.json1.Articles[1].url,window.json1.Articles[2].url,window.json1.Articles[3].url,window.json1.Articles[4].url);
    //Process Updates
    setUpdate();
    setTime();
    console.log("All Saved, You're Good To Go");
  }
  
  //Send Data to Frontend
  http2.send();
  
});
}

//Check Time and Update Every 2 Minutes
document.addEventListener("DOMContentLoaded", function() {
  checkTime();
});