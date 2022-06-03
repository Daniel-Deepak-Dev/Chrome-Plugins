console.log("Background Extention Go");

//chrome.browserAction.onClicked.addListener(buttonClicked);

chrome.browserAction.onClicked.addListener(function(tab) {
   chrome.tabs.executeScript(null, {file: "content.js"});
});

//function buttonClicked(tab){
	//let msg = {
		
		//txt : "Hello"
	//}
	
	//chrome.tabs.sendMessage(tab.id, msg);
//}