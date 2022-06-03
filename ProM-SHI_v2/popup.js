let ORG62_SESSION_ID;
let MCSORG_SESSION_ID;
let orgId;
let alertType;
let alertsLabelAPIMap = new Map();


//Helper function to get Org62 SessionId's
function getSessionIds() {
    
    getCookies("https://org62.my.salesforce.com", "sid", function (cookie) {
        ORG62_SESSION_ID = cookie.value;
        console.log('ORG62_SESSION_ID'+ORG62_SESSION_ID);
    });
	getCookies("https://mcsorg.my.salesforce.com", "sid", function (cookie) {
        MCSORG_SESSION_ID = cookie.value;
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
				document.getElementById("shiArea").style.display = 'none';
				document.getElementById("formFooter").style.display = 'none';
				document.getElementById("formHeader").style.display = 'none';
				document.getElementById("BlacklistHeader").style.display = 'none';
				document.getElementById("errorArea").style.display = 'none';
				document.getElementById("noSHI").style.display = 'none';
				document.getElementById("blacklistItems").style.display = 'none';
				document.getElementById("noBlacklistItems").style.display = 'none';
				document.getElementById("noBlacklistItems").style.display = 'none';
				document.getElementById("loader").style.display = 'none';
		if( url.indexOf('https://prom-gadgetui2-1-xrd.eng.sfdc.net:8443/diagnostics')==-1 && url.indexOf('https://prom-gadget.eng.sfdc.net/diagnostics')==-1 ){    
			document.getElementById("loaderIcon").style.display = 'none';
			addError("Invalid page! This extension only works on gadget diagnostics page. ", null);
			return;
		}
		let googleSheetLink = document.getElementById("googleSheetLink");
		googleSheetLink.addEventListener("click", function () {		
					window.open("https://docs.google.com/spreadsheets/d/1thwl7-LdWS2sBrnsuzqzWIaRvTCLEkHrX7knndPWSYY/edit?usp=sharing");
				  
		});
		
		chrome.tabs.executeScript(tabs[0].id, {
				code: 'document.querySelector("#counter-Organization-ID").value'
			}, getOrgId);
			chrome.tabs.executeScript(tabs[0].id, {
				code: 'document.querySelector("#counter-Workflow").value'
			}, getAlertType);

			setTimeout(function(){ 
				if(orgId== '' || alertType==''){
					document.getElementById("loaderIcon").style.display = 'none';
					addError("Unable to fetch OrgId/Alert Name from the Gadget Page .Please check the Alert Type ", null);
				}else{
					getSHI();
				}
			}, 100);
	})
})
function getOrgId (results){
	orgId=results;
}
function getAlertType (results){	
	alertType=results.toString().replace(" - ProM", "");
}

//Helper function to get SHI from Org62s
function getSHI(callback){
		
	let conn = new jsforce.Connection({
        serverUrl: "https://org62.my.salesforce.com",
        sessionId: ORG62_SESSION_ID
    }); 
		
	conn.identity(function(err, res) {
		if (err) { 
            addError("Error! Session expired for Org62. Please Login again and refresh the gadget page.", null);
			document.getElementById("loaderIcon").style.display = 'none';
		}
	return conn.query("SELECT Id,CaseHandling__c From Special_Handling_Instruction__c WHERE Status__c ='Review Complete - Approved' AND AssociatedAccount__r.OrgId='"+orgId+"' LIMIT 1",function(err, result) {
                if (err) {
					addError("Error! Session expired for Org62. Please Login again and refresh the gadget page.", null);
					document.getElementById("loaderIcon").style.display = 'none';
				}	
				displaySHI(result.records);
              });
		
	 });
} 
//Helper function to display SHI 
function displaySHI(shiData) {
    let conn = new jsforce.Connection({
        serverUrl: "https://org62.my.salesforce.com",
        sessionId: ORG62_SESSION_ID
    });
	
	document.getElementById("formHeader").style.display = 'block';		
	document.getElementById("formFooter").style.display = 'block';
    if(shiData== '' ){
		let noSHI=document.getElementById("noSHI");
		noSHI.style.display = 'block';				
	    document.getElementById("noSHIFound").innerHTML='No SHI Avilable in Org62. Please check Google Sheet if any!!';
		
	}else{	
		document.getElementById("shiArea").style.display = 'block';	
		shiData.forEach(element => {			
		document.getElementById("shi").innerHTML=element.CaseHandling__c;			
	   });   
	}
	document.getElementById("loaderIcon").style.display = 'none';
	document.getElementById("BlacklistHeader").style.display = 'block';
	document.getElementById("loader").style.display = 'block';
	getAlertAPILabelNames().then(function (result) {
				
		if(result.fields.length >0 ){			
			for (var i=0; i<result.fields.length; i++) {
				var field = result.fields[i];
			
				if(field.name == 'petprod__Alert__c'){
					var PicklistVals = field.picklistValues;
					for (var b=0; b<PicklistVals.length; b++) { 
						//console.log(PicklistVals[b].value);
						alertsLabelAPIMap.set(PicklistVals[b].label,PicklistVals[b].value);
					}
				}
			}
			if(alertsLabelAPIMap.has(alertType)== false){
				document.getElementById("noBlacklistItems").style.display = 'block';			
				document.getElementById("noBlacklistItemsFound").innerHTML='alert not configured in MCS org';		
				document.getElementById("loader").style.display = 'none';
			}else{
				
				alertType=alertsLabelAPIMap.get(alertType.toString());
				getBlacklistItems();
				
			}
		}
	})
	
   return;
}
//Helper function to get Alerts API Name/Label from MCS org
function getAlertAPILabelNames(callback){
	let conn = new jsforce.Connection({
        serverUrl: "https://mcsorg.my.salesforce.com",
        sessionId: MCSORG_SESSION_ID
    });
	conn.identity(function(err, res) {
		if (err) { 
            addError("Error! Session expired for MCS org. Please Login again and refresh the gadget page.", null);
			document.getElementById("loader").style.display = 'none';
		}		
	});
	
	return conn.describeSObject("petprod__Alert_Configuration__c");
}
 
//Helper function to get blacklist details from MCS org
function getBlacklistItems(callback){
		
	let conn = new jsforce.Connection({
        serverUrl: "https://mcsorg.my.salesforce.com",
        sessionId: MCSORG_SESSION_ID
    }); 
		
	conn.identity(function(err, res) {
		if (err) { 
            addError("Error! Session expired for MCS org. Please Login again and refresh the gadget page.", null);
			document.getElementById("loaderIcon").style.display = 'none';
		}

	return conn.query("SELECT Id, petprod__Attribute_Name__c, petprod__Attribute_Value__c From petprod__Additional_Detail__c WHERE  petprod__Alert_Configuration__r.petprod__Alert__c ='"+alertType+"' AND petprod__Alert_Configuration__r.petprod__Account__r.orgId__c='"+orgId+"' ",function(err, result) {
                if (err) {
					addError("Error! Session expired for MCS org. Please Login again and refresh the gadget page.", null);
					document.getElementById("loaderIcon").style.display = 'none';
				}	
				displayBlacklistItems(result.records);
              });
		
	 });
} 
//Helper function to display Blacklist Elements 
function displayBlacklistItems(blacklistDetails) {   
    var blacklistItems=[];
	
    blacklistItems.push(["Attribute Name", "Attribute Value"]);
    blacklistDetails.forEach(element => {
        blacklistItems.push([element.petprod__Attribute_Name__c,element.petprod__Attribute_Value__c]);
            
   });
   
   if(blacklistItems.length>1){
        var table = document.createElement("TABLE");
        table.border = "1";
    
        var columnCount = blacklistItems[0].length;
    
        var row = table.insertRow(-1);
        for (var i = 0; i < columnCount; i++) {
            var headerCell = document.createElement("TH");
            headerCell.innerHTML = blacklistItems[0][i];
            row.appendChild(headerCell);
        }
    
        for (var i = 1; i < blacklistItems.length; i++) {
            row = table.insertRow(-1);
            for (var j = 0; j < columnCount; j++) {
                var cell = row.insertCell(-1);
                cell.innerHTML = blacklistItems[i][j];
            }
        }
		document.getElementById("blacklistItems").style.display = 'block';
        var blacklistElement = document.getElementById("blacklistElement");
        blacklistElement.innerHTML = "";

        blacklistElement.appendChild(table);
    }
    else{
		document.getElementById("noBlacklistItems").style.display = 'block';		
	    document.getElementById("noBlacklistItemsFound").innerHTML='No Blacklist items avilable in MCS org.';
    }
	document.getElementById("loader").style.display = 'none';
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
}
