chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log('The color is green.');
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {urlContains: '/UI/'},
      })
      ],
          actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});
var value = "test value";

document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('SaveButton');
    // onClick's logic below:
    link.addEventListener('click', function() {
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			alert("test");
		});
		value = document.getElementById("loginName").value;
		chrome.storage.sync.set({key: value}, function() {
		  console.log('Value is set to ' + value);
		});
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('getButton');
	alert("get clicked");
    // onClick's logic below:
    link.addEventListener('click', function() {
        chrome.storage.sync.get(['key'], function(result) {
			alert('Value currently is ' + result.key);
		});
    });
});

