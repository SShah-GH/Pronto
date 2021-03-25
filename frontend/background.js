document.addEventListener("DOMContentLoaded", function() {
    const http = new XMLHttpRequest();
    const url = 'https://us-central1-python-test-308204.cloudfunctions.net/getNewsStories';
    http.open("GET", url, true);
    http.onreadystatechange = function() {
        if (this.readyState == 4) {
            var json = JSON.parse(http.responseText);
            document.getElementById("HL1").innerHTML = json[0].title;
            document.getElementById("HL2").innerHTML = json[1].title;
            document.getElementById("HL3").innerHTML = json[2].title;
            document.getElementById("HL4").innerHTML = json[3].title;
            document.getElementById("HL5").innerHTML = json[4].title;
        }
    };
    http.send(); // Add settings like ("categories=technology-health")
  });

/*
document.addEventListener("DOMContentLoaded", function() {
    const http = new XMLHttpRequest();
    const url = 'https://us-central1-python-test-308204.cloudfunctions.net/getNewsStories';
    http.open("GET", url, true);
    http.onreadystatechange = function() {
        if (this.readyState == 4) {
            var json = JSON.parse(http.responseText);
            document.getElementById("HL1").innerHTML = json[0].title;
            document.getElementById("HL2").innerHTML = json[1].title;
            document.getElementById("HL3").innerHTML = json[2].title;
            document.getElementById("HL4").innerHTML = json[3].title;
            document.getElementById("HL5").innerHTML = json[4].title;
        }
    };
    http.send(); // Add settings like ("categories=technology-health")
  });
  */