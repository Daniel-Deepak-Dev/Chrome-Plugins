chrome.runtime.onInstalled.addListener(() => {
  console.log('onInstalled...');
  // create alarm after extension is installed / upgraded
  chrome.alarms.create('refresh', { periodInMinutes: 1 });
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
	//var caseNumber = '26712041';
    let conn = new jsforce.Connection({
        serverUrl: "https://orgcs.my.salesforce.com",
        sessionId: SESSION_ID
    });     
    conn.identity(function(err, res) {
        if (err) {return console.error('erororo---'+err);}
        return conn.query(
            "SELECT Id,CaseNumber,Subject,Account_Support_SBR_Category__c FROM case WHERE status='New' AND CaseRoutingTaxonomy__r.Name='Platform-Proactive Monitoring' AND owner.Name='Working in Org62' AND Account_Support_SBR_Category__c NOT IN ('MCS-GOVT','MCS - US only - GOVT')",function(err, result) { 
                if (err) { alert('Your query has failed');
                    return console.error(err);
                    }
					var listRec = "";
					var myNumber = 1;
					if((result.records).length > 0){
						
						var audio = new Audio( 
						'https://media.geeksforgeeks.org/wp-content/uploads/20190531135120/beep.mp3'); 
						audio.play();
						
						for(x in result.records){
							listRec = listRec + myNumber+') Subject : '+result.records[x].Subject + '\n' + 'Record Id : ' + result.records[x].Id + "\n" + 'Case Number : ' + result.records[x].CaseNumber + "\n" + 'Account SBR Category : ' + result.records[x].Account_Support_SBR_Category__c + "\n"+"\n";
							myNumber ++;
						}
						myNumber = 1;
					}	
					if(listRec.length > 0){
						setTimeout(function(){
						alert(listRec);
						}, 1000);
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
