chrome.runtime.onInstalled.addListener(() => {
  console.log('onInstalled...');
  // create alarm after extension is installed / upgraded
  chrome.alarms.create('refresh', { periodInMinutes:15});
});

chrome.alarms.onAlarm.addListener((alarm) => {
  console.log(alarm.name); // refresh
  document.getElementById("case-create-button").click();
});

let SESSION_ID;

//Helper function to get SessionId's
function getSessionIds() {
    
    getCookies("https://org62.my.salesforce.com", "sid", function (cookie) {
        SESSION_ID = cookie.value;
        console.log('SESSION_ID'+SESSION_ID);
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

function getCaseDetails(callback) {
	var comCreatedId = '0050M00000C8XLnQAN';
	var today = new Date();
    var orgIds="'00D0b000000GaMp', '00Dj0000000HyWJ', '00D70000000JrBz', '00D6g000000GNab', '00D300000006urq'";
   let dateTime = new Date(today.getTime() - (1000*60*15)).toISOString();
    let conn = new jsforce.Connection({
        serverUrl: "https://org62.my.salesforce.com",
        sessionId: SESSION_ID
    });     
	//alert('new alert');
    conn.identity(function(err, res) {
        if (err) {return console.error('erororo---'+err);}
        return conn.query(
            "SELECT Id, ParentId, CreatedDate, CommentBody, Parent.CaseNumber, Parent.Subject, Parent.FunctionalArea__c, Parent.Organization_Id__c, Parent.Account.Name FROM  CaseComment WHERE CreatedDate >"+dateTime+" AND CreatedById='"+comCreatedId+"' AND Parent.IsClosed=false AND Parent.Reason='Proactive Monitoring' AND  (Parent.General_Application_Area__c='Alerts - Core' OR Parent.General_Application_Area__c='Alerts - Core Administration') AND Parent.Organization_Id__c IN ("+orgIds+") Order by CreatedDate Desc LIMIT 9999",function(err, result) { 
                if (err) { return console.error(err); }
					var listRec = "";
					var myNumber = 1;
					//alert((result.records).length);
					if((result.records).length > 0){
						
						
						for(x in result.records){
							
							if(!result.records[x].CommentBody.includes('Severity: OK') && !result.records[x].CommentBody.includes('Severity: INFO') && !result.records[x].CommentBody.includes('Severity: WARNING')){
							listRec = listRec + myNumber+') CaseNumber :'+result.records[x].Parent.CaseNumber + '\n' + 'Subject :' + result.records[x].Parent.Subject + "\n";
									  if(result.records[x].CommentBody.includes('Severity: Exhausted')){
										  listRec = listRec+'Severity :Exhausted'+'\n' ;
									  }
									  else if(result.records[x].CommentBody.includes('Severity: CRIT') || result.records[x].CommentBody.includes('Severity: CRITICAL')){
										   listRec = listRec+'Severity :CRITICAL'+'\n';
									  }
							myNumber ++;
							}
						}
						myNumber = 1;
					}	
					if(listRec.length > 0){
						var audio = new Audio( 
						'https://media.geeksforgeeks.org/wp-content/uploads/20190531135120/beep.mp3'); 
						audio.play();
						
						setTimeout(function(){
							if (window.confirm(listRec))
                 {
					 for(x in result.records){
						 if(!result.records[x].CommentBody.includes('Severity: OK') && !result.records[x].CommentBody.includes('Severity: INFO') && !result.records[x].CommentBody.includes('Severity: WARNING')){
   window.open('https://org62.lightning.force.com/lightning/r/Case/'+result.records[x].ParentId+'/view', '_blank');
						 }
					 }
   };
						
						},1000);
					}
              });
        
      });   
    
}
document.addEventListener("DOMContentLoaded", function () {
	getSessionIds();
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		var url = tabs[0].url;
		document.write('<button id="case-create-button" class="slds-button slds-button_success">Get Case Details</button>');
		let taskCloseButton = document.getElementById("case-create-button");
		taskCloseButton.addEventListener("click", function () {
			
			getCaseDetails(); 
		});
	})
	
})
