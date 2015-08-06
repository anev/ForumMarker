// Saves options to chrome.storage.sync.
function save_options() {
  var mode = document.getElementById('mode').value;
  chrome.storage.sync.set({
    mode: mode
  }, function() {
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function restore_options() {
  chrome.storage.sync.get({
    mode: 'shadow'
  }, function(items) {
    document.getElementById('mode').value = items.mode;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);