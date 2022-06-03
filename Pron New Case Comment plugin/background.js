chrome.runtime.onInstalled.addListener(() => {
  console.log('onInstalled...');
  // create alarm after extension is installed / upgraded
  chrome.alarms.create('refresh', { periodInMinutes: 3 });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  console.log(alarm.name); // refresh
  document.getElementById("case-create-button").click();
});

let SESSION_ID;

//Helper function to get SessionId's
function getSessionIds() {
    
    getCookies("https://orgcs.my.salesforce.com", "sid", function (cookie) {
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
	var comCreatedId = '005Hx000001Q2FJIA0'; //API internal userId in OrgCS
	var today = new Date();
   let dateTime = new Date(today.getTime() - (1000*60*5)).toISOString();
    let conn = new jsforce.Connection({
        serverUrl: "https://orgcs.my.salesforce.com",
        sessionId: SESSION_ID
    });     
    conn.identity(function(err, res) {
        if (err) {return console.error('erororo---'+err);}
        return conn.query(
            "SELECT Id, ParentId, CreatedDate, CommentBody, Parent.CaseNumber, Parent.Subject, Parent.FunctionalArea__c, Parent.Case_Origin_OrgID__c, Parent.Account.Name FROM  CaseComment WHERE CreatedDate >"+dateTime+" AND CreatedById='"+comCreatedId+"' AND Parent.IsClosed=false AND Parent.CaseRoutingTaxonomy__r.Name='Platform-Proactive Monitoring' AND Parent.ownerId='"+res.user_id+"' Order by CreatedDate Desc LIMIT 9999",function(err, result) { 
                if (err) { return console.error(err); }
					var listRec = "";
					var myNumber = 1;
					if((result.records).length > 0){
						
						var audio = new Audio( 
						'https://media.geeksforgeeks.org/wp-content/uploads/20190531135120/beep.mp3'); 
						audio.play();
						
						for(x in result.records){
							if(!result.records[x].CommentBody.includes('Severity: OK') && !result.records[x].CommentBody.includes('Severity: INFO')){
							listRec = listRec + myNumber+') CaseNumber :'+result.records[x].Parent.CaseNumber + '\n' + 'Subject :' + result.records[x].Parent.Subject + "\n";
									  if(result.records[x].CommentBody.includes('Severity: WARNING')){
										  listRec = listRec+'Severity :WARNING';
									  }
									  else if(result.records[x].CommentBody.includes('Severity: CRITICAL')){
										   listRec = listRec+'Severity :CRITICAL';
									  }
							myNumber ++;
							}
						}
						myNumber = 1;
					}	
					if(listRec.length > 0){
						setTimeout(function(){
							if (window.confirm(listRec))
                 {
					 for(x in result.records){
						 if(!result.records[x].CommentBody.includes('Severity: OK') && !result.records[x].CommentBody.includes('Severity: INFO')){
   							window.open('https://orgcs.lightning.force.com/lightning/r/Case/'+result.records[x].ParentId+'/view', '_blank');
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
		document.write('<button id="case-create-button" class="slds-button slds-button_success">Get SHI</button>');
		let taskCloseButton = document.getElementById("case-create-button");
		taskCloseButton.addEventListener("click", function () {
			
			getCaseDetails(); 
		});
	})
})
