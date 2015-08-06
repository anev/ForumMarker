chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.sendMessage(tab.id, {
      command: "change_title",
      title: "hoge"
    },
    function(msg) {
      console.log("result message:", msg);
    });
});

chrome.runtime.onMessage.addListener(function(request, sender, callback) {
    
    if (request.action == "xhttp") {
        
        var xhttp = new XMLHttpRequest();
        var method = request.method ? request.method.toUpperCase() : 'GET';

        xhttp.onload = function() {
            callback(xhttp.responseText);
        };
        xhttp.onerror = function() {
            callback();
        };
        xhttp.open(method, request.url, true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send(request.data);
        return true; // prevents the callback from being called too early on return
    }
});