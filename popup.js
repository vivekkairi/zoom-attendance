document.addEventListener("DOMContentLoaded", function() {
    var resultsButton = document.getElementById("myResults");
    resultsButton.addEventListener('click', getResults);
    document.getElementById('stopResults').addEventListener('click', stopResults)
});

function getResults(){

	var tablink
	chrome.tabs.getSelected(null,function(tab) {
	    var tablink = tab.url;
	});

	datas = {
		'profile':tablink,
		'msg' : 'start'
	}

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, datas);
    });
}

function stopResults(){

	var tablink
	chrome.tabs.getSelected(null,function(tab) {
	    var tablink = tab.url;
	});

	datas = {
		'profile':tablink,
		'msg' : 'stop'
	}

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, datas);
    });
}


chrome.runtime.onMessage.addListener(godmsg);

function godmsg(msg, sender, sendResponse){
    console.log(msg.title);
    stringz = "<ul>"
    for (i of msg.title.users){
    	stringz = stringz + "<li>" + i.username + "&nbsp" + i.profile + "</li>"
    }
    stringz = stringz + "</ul>"
    console.log(stringz)
}


