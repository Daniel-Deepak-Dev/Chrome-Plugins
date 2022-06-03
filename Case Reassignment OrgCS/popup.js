let SESSION_ID;
let userId;
//Helper function to get SessionId's
function getSessionIds() { 
    getCookies("https://orgcs.my.salesforce.com", "sid", function (cookie) {
        SESSION_ID = cookie.value;
        console.log('SESSION_ID'+JSON.stringify(cookie));
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
		var url = tabs[0].url
		getPromUsers();		
	})
})
// This function is used to fetch TE list
function getPromUsers(callback){
	setTimeout(function(){ 
	let conn = new jsforce.Connection({
        serverUrl: "https://orgcs.my.salesforce.com",
        sessionId: SESSION_ID
    }); 
	conn.identity(function(err, res) {
		if (err) { 
			alert(err);
		}
		//, '0050M00000EvTvm','00530000004weJtAAI','0053y00000GZY5eAAH','0053y00000GNa4eAAD'
	var d = new Date();
	document.getElementById("userName").innerHTML = res.user_name + ' - ' + d;
	//Needs to add Shravant's id and removed Cost_Center__c='2064-Proactive Monitoring'
	return conn.query("SELECT Id,Name,Support_Region__c FROM user WHERE isActive=true AND ManagerId IN ('005Hx000000EB8UIAW', '005Hx000000EB8WIAW','0050M00000DcCK4QAN','005Hx000000EB8TIAW','005Hx000000EB8VIAW','005Hx000001PMSzIAO') order by Support_Region__c desc",function(err, result) {
                if (err) {
					alert(err);
				}	
				displayUsers(result.records);
              });
	 });
	}, 100);
}
//This function is used to append TE names to select option
function displayUsers(result) {
	for(var val in result){
		$('#displayTab').append($('<option value="'+result[val].Id+'">'+result[val].Name+'</option>'));
		$('#displayTab').bootstrapDualListbox('refresh')                                                                    
	 }
   return;
}
$(function () {   
$('#displayTab')                                                                           
	   .bootstrapDualListbox({
		bootstrap2Compatible: false,
		moveAllLabel: 'MOVE ALL',
		removeAllLabel: 'REMOVE ALL',
		moveSelectedLabel: 'MOVE SELECTED',
		removeSelectedLabel: 'REMOVE SELECTED',
		filterPlaceHolder: 'FILTER',
		filterSelected: '2',
		filterNonSelected: '1',
		moveOnSelect: false,
		preserveSelectionOnMove: 'all',
		helperSelectNamePostfix: '_myhelper',
		selectedListLabel: 'Selected Engineers',
		nonSelectedListLabel: 'Unselected Engineers'
	})                                                   
		.bootstrapDualListbox('setMoveAllLabel', 'Move all teh elementz!!!')
		.bootstrapDualListbox('setRemoveAllLabel', 'Remove them all!')
		.bootstrapDualListbox('setSelectedFilter', undefined)
		.bootstrapDualListbox('setNonSelectedFilter', undefined)                                 
		.bootstrapDualListbox('refresh')                                    
});
//Onclcik assign fetch cases realted to loggedin user
$("#demoform").click(function() { 
	//var teList = $('[name="myselect_myhelper2"]').val();
	var teList = $('#bootstrap-duallistbox-selected-list_myselect').val();
	console.log('teList-----------'+teList);
	let conn = new jsforce.Connection({
        serverUrl: "https://orgcs.my.salesforce.com",
        sessionId: SESSION_ID
    }); 
	conn.identity(function(err, res) {
		if (err) { 
			alert(err);
		}
		userId = res.user_id;
		console.log(userId);
		//userId = '005Hx000000EEsjIAG';
		// changes made to the below query AND AND Reason='Proactive Monitoring'(remove)
	return conn.query("SELECT Id FROM case WHERE ownerId='"+userId+"' AND IsClosed =false AND CaseRoutingTaxonomy__r.Name='Platform-Proactive Monitoring' Order by CreatedDate ASC LIMIT 9999",function(err, result) {
                if (err) {
					alert(err);
					document.getElementById("message").innerHTML="<center><p style='background-color: red;font-size: 15px;font-weight: bold;'>something went wrong please contact Imran Shaik</p></center>";
				}
				//alert('--Data---'+JSON.stringify(result.records));
				if(result.records != '' && result.records != undefined &&  result.records != null){
					console.log('Total records retrived  '+result.records.length);
					assignCases(result.records,teList);
				}else{
					document.getElementById("message").innerHTML="<center><p style='background-color: red;font-size: 15px;font-weight: bold;'>Cases not found with logged in user </p></center>";
				}
			   });
	 });
	return false;
});
//Assign cases to selcted users based on round robin 
function assignCases(result,teList) {
	var i = 0;
	var teListSize = teList.length;
	var updateCase=[];
	for(var a in result){
		//result[a].ownerId = teList[i];
		 var x ={           
            ownerId:teList[i],
            Id: result[a].Id,           
         };
        updateCase.push(x);  
		if(i < (teListSize-1))
			i++;
		else
			i=0;
	}
	if(updateCase.length > 0){
		let conn = new jsforce.Connection({
			serverUrl: "https://orgcs.my.salesforce.com",
			sessionId: SESSION_ID
		});
		var size = 40;
		var finalary = [];
		for (var i=0; i<updateCase.length; i+=size) {
			 finalary.push(updateCase.slice(i,i+size));
		}
		document.getElementById("demoform").disabled=true;
		console.log('final array size'+' '+finalary.length);
		document.getElementById("spinner").classList.add("loader");
		for(i=0;i<finalary.length;i++)
		{
			console.log('arry list'+' '+ finalary[i]);
			conn.sobject("case").update(finalary[i],{headers:{"Sforce-Auto-Assign":false}},function(err, rets){
				if (err) { 
				console.log('err'+' '+ err)
					document.getElementById("message").innerHTML="There is internal error. Please reach out to Imran Shaik---"+err; 
					return 
				}
				if (rets[i].success) {
					document.getElementById("message").innerHTML="<center><p style='background-color: greenyellow;font-size: 15px;font-weight: bold;'>Cases Assigned Successfully</p></center>";
					document.getElementById("spinner").classList.remove("loader");
				}
			})
		}
	}	
}			