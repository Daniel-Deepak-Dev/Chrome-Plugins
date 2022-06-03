let ORGCS_SESSION_ID;
let dateTime;
let commentType;
let selectdTime;

//Helper function to get OrgCS SessionId's
function getSessionIds() {    
    getCookies("https://orgcs.my.salesforce.com", "sid", function (cookie) {
        ORGCS_SESSION_ID = cookie.value;
        console.log('ORGCS_SESSION_ID'+ORGCS_SESSION_ID);
    });
}

//Helper function to get cookies (used to get sessionID's)
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
		document.getElementById("caseListTable").style.display = 'none';
		document.getElementById("noCases").style.display = 'none';
		document.getElementById("errorArea").style.display = 'none';
		
		let getCasesButton = document.getElementById("getCases");
		getCasesButton.addEventListener("click", function () {
			document.getElementById("loader").style.display = 'block';
			selectdTime=document.getElementById("selectTime").value;
			commentType=document.getElementById("caseCommentType").value;
			var today = new Date();
			dateTime = new Date(today.getTime() - (1000*60*60*selectdTime)).toISOString();
			getCustomerCommentCases();
		});
	})
})

//Helper function to get Cases for which Customer comments/Gadget Alerts Recived in the last n hours
function getCustomerCommentCases(callback) {
    let conn = new jsforce.Connection({
        serverUrl: "https://orgcs.my.salesforce.com",
        sessionId: ORGCS_SESSION_ID
    });
	var comCreatedId;
	if(commentType == '005Hx000001Q2FJIA0 All'){
		comCreatedId = '005Hx000001Q2FJIA0';
	}else{
		comCreatedId=commentType;
	}
    conn.identity(function(err, res) {
        if (err) { 
			addError("Error! Session expired for OrgCS. Please Login again and refresh the page.", null);
			document.getElementById("loader").style.display = 'none';
		}
        console.log("user ID: " + res.user_id);
		var userId = res.user_id 
		if(commentType == '005Hx000001Q2FJIA0 All' || commentType == '005Hx000001Q2FJIA0'){
			return conn.query(
				"SELECT Id, ParentId, CreatedDate, CommentBody, Parent.CaseNumber, Parent.Subject, Parent.FunctionalArea__c, Parent.Case_Origin_OrgID__c, Parent.Account.Name FROM  CaseComment WHERE CreatedDate >"+dateTime+" AND  CreatedById='"+comCreatedId+"' AND Parent.IsClosed=false AND Parent.CaseRoutingTaxonomy__r.Name='Platform-Proactive Monitoring' AND (Parent.ownerId='"+userId+"') Order by CreatedDate Desc LIMIT 9999",function(err, result) { 

					if (err) { 
						addError(err);
						document.getElementById("loader").style.display = 'none';
					}     
					displayCases(result.records);
					//alert('The Fields are : '+result.records);
			});
		}else {
			return conn.query(
			"SELECT Id, ParentId, CreatedDate, CommentBody, Parent.CaseNumber, Parent.Subject, Parent.FunctionalArea__c, Parent.Case_Origin_OrgID__c, Parent.Account.Name FROM  CaseComment WHERE CreatedDate >"+dateTime+" AND ((CreatedById='005300000075tiNAAQ') OR (NOT CreatedBy.Email LIKE '%@salesforce.com%'))  AND Parent.IsClosed=false AND Parent.CaseRoutingTaxonomy__r.Name='Platform-Proactive Monitoring' AND (Parent.ownerId='"+userId+"') Order by CreatedDate Desc LIMIT 9999 ",function(err, result) { 

                if (err) { 
					addError(err);
			        document.getElementById("loader").style.display = 'none';
				}     
                displayCases(result.records);
        
			}); 
		}	   
	}); 
}
//Helper function to display cases 
function displayCases(caseData) {   
    var CaseNumbers=[];
	var caseList=[];
	
	if(commentType == '005Hx000001Q2FJIA0' || commentType == '005Hx000001Q2FJIA0 All'){
		caseList.push(["Case Number", "Alert Name", "Last Alert Received"]);
	}else{
		caseList.push(["Case Number", "Alert Name", "Last Comment Received"]);
	}
    caseData.forEach(element => {
		if(commentType == '005Hx000001Q2FJIA0'){
			if(!CaseNumbers.includes(element.Parent.CaseNumber.toString()) && !element.CommentBody.includes('Severity: OK') && !element.CommentBody.includes('Severity: INFO')){
			 CaseNumbers.push(element.Parent.CaseNumber.toString());
			 var alert= element.Parent.Account.Name+'-'+element.Parent.Organization_Id__c+'-'+element.Parent.FunctionalArea__c
			 caseList.push([element.Parent.CaseNumber,alert,element.CreatedDate.toString().replace('.000+0000', ' UTC') ]);
			}
		}
		else if (!CaseNumbers.includes(element.Parent.CaseNumber.toString())){
			CaseNumbers.push(element.Parent.CaseNumber.toString());
			var alert= element.Parent.Account.Name+'-'+element.Parent.Organization_Id__c+'-'+element.Parent.FunctionalArea__c
			caseList.push([element.Parent.CaseNumber,alert, element.CreatedDate.toString().replace('.000+0000', ' UTC')]);
		}
		
   });
    if(caseList.length > 1){
        var table = document.createElement("TABLE");
        table.border = "1";
    
        var columnCount = caseList[0].length;
    
        var row = table.insertRow(-1);
        for (var i = 0; i < columnCount; i++) {
            var headerCell = document.createElement("TH");
            headerCell.innerHTML = caseList[0][i];
            row.appendChild(headerCell);
        }
    
        for (var i = 1; i < caseList.length; i++) {
            row = table.insertRow(-1);
            for (var j = 0; j < columnCount; j++) {
                var cell = row.insertCell(-1);
                cell.innerHTML = caseList[i][j];
            }
        }
		document.getElementById("noCases").style.display = 'none';	
		document.getElementById("caseListTable").style.display = 'block';	
        var dvTable = document.getElementById("dvTable");
        dvTable.innerHTML = "";
        dvTable.appendChild(table);
    }else{
		document.getElementById("caseListTable").style.display = 'none';
		document.getElementById("noCases").style.display = 'block';	
		let commentTypeLabel;
		if (commentType == '005300000075tiNAAQ'){
			commentTypeLabel='customer comments';
		}else{
			commentTypeLabel='Gadget alerts';
		}			
	    document.getElementById("noCasesFound").innerHTML="No "+ commentTypeLabel + " for your cases from the last " + selectdTime + " Hour(s)" ;
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
