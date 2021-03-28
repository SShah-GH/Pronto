// //THIS IS THE SAMPLE GIVEN BY CHROME DEV DOCS


// Saves options to chrome.storage
function save_options() {
    var business = document.getElementById('biz').checked;
    var entertainment = document.getElementById('ent').checked;
    var health = document.getElementById('health').checked;
    var science = document.getElementById('sci').checked;
    var sports = document.getElementById('sports').checked;
    var technology = document.getElementById('tech').checked;
    console.log("it ran");
    chrome.storage.sync.set({
      business: business,
      entertainment: entertainment,
      health: health,
      science: science,
      sports: sports,
      technology: technology,
      isUpdated: true
    }, function() {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(function() {
        status.textContent = '';
      }, 750);
    });
  }
  
  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  function restore_options() {
    chrome.storage.sync.get({
      isUpdated: false,
      business: false,
      entertainment: false,
      health: false,
      science: false,
      sports: false,
      technology: false
    }, function(items) {
      document.getElementById('biz').checked = items.business;
      document.getElementById('ent').checked = items.entertainment;
      document.getElementById('health').checked = items.health;
      document.getElementById('sci').checked = items.science;
      document.getElementById('sports').checked = items.sports;
      document.getElementById('tech').checked = items.technology;
    });
  }
  document.addEventListener('DOMContentLoaded', restore_options);
  document.querySelector('#save').addEventListener('click', save_options);
  
