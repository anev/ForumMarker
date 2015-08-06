window.addEventListener ("load", getData, false);

function getData(){
	chrome.runtime.sendMessage(
		{
		    method: 'GET',
		    action: 'xhttp',
		    url: 'http://46.101.226.132:5984/us/_design/postNumsByUrl/_view/postNumsByUrl?key=' + this.pageHashCode(),
		    data: ''
		}, 
		function(responseText) {
			var postIds = JSON.parse(responseText).rows.map(function(el){
				return el.value;
			})
		    myMain(postIds);
		}
	);
}

function postData(postNum){
	var data = {
		url: this.pageHashCode(),
		postNum: postNum
	};

	chrome.runtime.sendMessage(
		{
		    method: 'POST',
		    action: 'xhttp',
		    url: 'http://46.101.226.132:5984/us/',
		    data: JSON.stringify(data)
		}, 
		function(responseText) {
			var resp = JSON.parse(responseText);
			if(resp.ok){
				alert("Помечено успешно!");
			} else {
				alert("Не удалось пометить");
			}
		}
	);
}

function myMain (rows) {
    
    console.log("Starting...");

    var a = document.querySelectorAll("div.postdetails>div.userinfo");
    for(var i = 0; i < a.length; i++){
    	
    	var el = a[i];

    	if(rows.indexOf(i) != -1 ){
    		el.appendChild(newLabel(newA(i)));
    	} else {
    		hideElement(el.parentNode);
			el.appendChild(newA(i));
    	}
    }
    console.log("done.");
}

function hideElement(el) {
	console.log(el);
  chrome.storage.sync.get({
    mode: 'shadow'
  }, function(items) {
  	if(items.mode == 'shadow'){
  		el.style.opacity = "0.5"
  	}
  });
}

function newA(i){
	var the = this;
	var newA = document.createElement('a');
	var newImg = document.createElement('img');
	newImg.src = chrome.extension.getURL('add.png');
	
	newA.dataset.urlHash = this.pageHashCode();
	newA.dataset.postNum = i;
	newA.onclick = function () { 
		the.postData(parseInt(this.dataset.postNum));
	};
	newA.appendChild(newImg);
	return newA;
}

function newLabel(i){
	var newA = document.createElement('img');
	newA.className = 'my-class';
	newA.src = chrome.extension.getURL('thumb.png');
	return newA;
}

function pageHashCode() {
	return this.hashCode(document.URL);
}

function hashCode(str){
    var hash = 0;
    if (str.length == 0) return hash;
    for (i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash;
    }
    return hash;
}