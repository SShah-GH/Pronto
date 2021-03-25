function wasClicked(){
    document.getElementById("HL1").innerHTML = "It worked!";
}

function getNews() {
    const http = new XMLHttpRequest();
    const url = 'https://us-central1-python-test-308204.cloudfunctions.net/getNewsStories';
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var json = JSON.parse(http.responseText)
            // Add json usage
        }
    };
    http.open("POST", url);
    http.send(); // Add settings like ("categories=technology-health")
}

