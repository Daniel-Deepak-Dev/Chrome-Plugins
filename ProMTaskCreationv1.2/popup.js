let ORG62_SESSION_ID;
let caseId;
let dateTime;
let comments;
let time;
let subject;
let isSenior = new Boolean(false);
//Helper function to get Org62 SessionId's
function getSessionIds() {
    
    getCookies("https://org62.my.salesforce.com", "sid", function (cookie) {
        ORG62_SESSION_ID = cookie.value;
        console.log('ORG62_SESSION_ID'+ORG62_SESSION_ID);
    });
}

//Helper function to get cookies (used to get sessionID's
function getCookies(domain, name, callback) {
    chrome.cookies.get({ url: domain, name: name }, function (cookie) {
        if (cookie) {
            if (callback) {
                callback(cookie);
            }
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
	getSessionIds();
	
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		
		var url = tabs[0].url;
		document.getElementById("loader").style.display = 'none';
		document.getElementById("displayMessage").style.display = 'none';
		document.getElementById("errorArea").style.display = 'none';
		
		if( url.indexOf('https://org62.lightning.force.com/lightning/r/Case/')==-1){    
			document.getElementById("loader").style.display = 'none';
			addError("Invalid page! This extension only works on case detailled Page ", null);
			return;
		}
		caseId = url.toString().slice(51, 69);
		let createTaskButton = document.getElementById("createTask");
		createTaskButton.addEventListener("click", function () {
			comments=document.getElementById("comments").value;
			time=document.getElementById("time").value;
			subject=document.getElementById("taskSubjectType").value
			var today = new Date();
			dateTime = new Date(today.getTime() - (1000*60*60*8)).toISOString();
			getExistingTasks();
			document.getElementById("loader").style.display = 'block';	
	
		});
	})
})

//Helper function to create task
function createTask(existingTask) {
    let conn = new jsforce.Connection({
        serverUrl: "https://org62.my.salesforce.com",
        sessionId: ORG62_SESSION_ID
    });

	if(existingTask== '' ){
		if(comments.trim() =='' || time==0){
				addError("Please enter comments/Time ", null);
		}else{
			document.getElementById("errorArea").style.display = 'none';
			var confirmWindow = new Boolean(false);			
			confirmWindow=confirm("Are you sure! do you want to create a task");
			document.getElementById("loader").style.display = 'none';
			if(confirmWindow){
				var x ={
				Priority:"Normal",
				Subject:subject,
				Status:"Completed",
				WhatId: caseId,
				//RecordTypeId : "01230000001GebBAAS",--Support Action Tracking
				RecordTypeId : "0123000000001KaAAI",
				Description: comments,
				Duration__c:time
				};

			document.getElementById("displayMessage").style.display = 'block';
				conn.sobject("Task").create(x,function(err, rets){

					if (err) { //document.getElementById("message").innerHTML="There is internal error. Please reach out to Jyothi"; 
						addError(err, null);
					return }else{

						document.getElementById("message").innerHTML="Task created successfully for the case" ;
						document.getElementById("loader").style.display = 'none';
						document.getElementById("comments").readOnly = true; 
						document.getElementById("comments").disabled = true;
						document.getElementById("time").readOnly = true;
						document.getElementById("createTask").disabled = true;
					}
				})
			}
		}
	}else{
		var message='You have already created ' +'"' + subject + '"'+ 'task  for the case in the last 8 hours';
		addError(message,null);
	}
   
   return;
}
//Helper function to check existing task
function getExistingTasks(callback){		
	let conn = new jsforce.Connection({
        serverUrl: "https://org62.my.salesforce.com",
        sessionId: ORG62_SESSION_ID
    });
	conn.identity(function(err, res) {		
		if (err) { 
            addError("Error! Session expired for org62 org. Please Login again and refresh the  page.", null);
		}
		if(subject == 'ProM GUS investigation Review' || subject == 'ProM DDA Review' ){
			conn.query("SELECT Id From User WHERE (Title='Senior Proactive Monitoring Engineer' OR Title='Senior Proactive Monitor Engineer' OR Title='Principal Proactive Monitoring Engineer') AND Id='"+res.user_id+"' LIMIT 1 ",function(err2, result2) {
				if (err2) {
					addError(err2,null);
				}else{
					if (result2.records == ''){
						var message='Only Senior and above TEs can create '+ '"' + subject + '"'+ ' task' ;
						addError(message,null);
						isSenior = false;
					}else{
						isSenior = true;
					}
				}						
			});
		}
		
		setTimeout(function(){ 
		
		if (isSenior == true || subject == 'ProM Case Consultation' || subject == 'ProM PSE Consultation'){
			return conn.query("SELECT Id From Task WHERE  CreatedDate >"+dateTime+" AND ownerId='"+res.user_id+"' AND Subject='"+subject+"'  AND WhatId='"+caseId+"'  LIMIT 1 ",function(err, result) {
				if (err) {
					addError(err,null);
				}else{
					createTask(result.records);
				}						
			});
		}
			}, 1000);
	});
}

//Helper function to add errors
function addError(errorString, error) {
    let errorHeader = document.getElementById("errorHeader");
    document.getElementById("errorArea").style.display = 'block';
    
    if (error) {
        errorHeader.innerHTML = errorString + "\n" + "Error: " + error.toString();
    } else {
        errorHeader.innerHTML = errorString
    }
	document.getElementById("loader").style.display = 'none';
}
