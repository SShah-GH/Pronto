document.querySelector('#go-to-options').addEventListener("click", function() {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.open(chrome.runtime.getURL('options.html'));
    }
  });

  function setColor() {
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