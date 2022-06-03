let SESSION_ID; 

function getSessionIds() {
    
    getCookies("https://orgcs.my.salesforce.com", "sid", function (cookie) {
        SESSION_ID = cookie.value;
    });
}

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
	document.getElementById("hidden_div").style.display ="none"; 
	document.getElementById("getView").addEventListener("change", function(){
		let view = document.getElementById("getView").value;
		console.log('View'+' '+view);
		if(view == 'CustomerComment')
		{
			document.getElementById("hidden_div").style.display = "block";
		}else{
			document.getElementById("hidden_div").style.display = "none";
		}
	});
	let getCases = document.getElementById("getCases");
    getCases.addEventListener("click", function () {
		document.getElementById("message").style.display = "inline-block";
		document.getElementById("message").innerHTML  ="Loading..."; 
		document.getElementById("myInput").style.display   ="none"; 
		document.getElementById("dvTable").style.display   ="none"; 
		getPendingCaseDetails();
		      
});
    
})
})

function getPendingCaseDetails() {
    let conn = new jsforce.Connection({
        serverUrl: "https://orgcs.my.salesforce.com",
        sessionId: SESSION_ID
    });     
    conn.identity(function(err, res) {
        if (err) { 
		
		document.getElementById("message").innerHTML  ="Session Invalid, Please refresh the Page"; 
		return console.error(err); }
		let strVar="OwnerId ='"+res.user_id+"' AND ";
		
		//let strVar="OwnerId ='0053y00000Ff20oAAB' AND ";
		let view=document.getElementById("getView").value;
		if(view!='TEview')
		{
			strVar=" ";
		}
		let selectdTime = document.getElementById("selectTime").value;
		
		let CurrentDate = new Date();
		let SelectedDateTime = new Date(CurrentDate.setHours(CurrentDate.getHours() - selectdTime)).toISOString();
		console.log('selected***'+' '+SelectedDateTime);
		let CommentCreators = " AND (CreatedById ='0050M00000EyVfnQAF'"+" OR "+"CreatedById ='0050M00000FFDGAQA5') AND "; //HTIR Integration User && HTIR Integration User 2
		let currentlyLoggedInUser = "Parent.OwnerId ='"+res.user_id+"' AND ";
		conn.identity(function(err, res) {
        if (err) { 
		
		document.getElementById("message").innerHTML  ="Session Invalid, Please refresh the Page"; 
		return console.error(err); }
	console.log('strVar:'+strVar);
         
		if(view!='CustomerComment')
		{
			var BusinessHrsMap = new Map();
			var records = [];
		//	var query = conn.query("Select Id, CaseNumber, (Select Id,CommentBody From CaseComments where CreatedDate=LAST_N_DAYS:2 AND (IsPublished=true OR CreatedById='0050M00000EyVfnQAF') order by CreatedDate desc) From Case  WHERE IsClosed=false AND General_Application_Area__c='Alerts - Core' AND Age_days__c>2  AND "+strVar+" reason='Proactive Monitoring' AND Owner.Alias!='jprom'")
		//	var query = conn.query("Select Id, CaseNumber, (Select Id,CommentBody From CaseComments where CreatedDate=LAST_N_DAYS:2 AND (IsPublished=true OR CreatedById='0050M00000EyVfnQAF') order by CreatedDate desc) From Case  WHERE IsClosed=false AND Age_days__c>2  AND "+strVar+" CaseRoutingTaxonomy__r.Name='Platform-Proactive Monitoring'")// id is used for htir integration user
			var query = conn.query("Select Id, CaseNumber, (Select Id,CommentBody From CaseComments where CreatedDate=LAST_N_DAYS:2 AND (IsPublished=true OR CreatedById='005Hx000001Q2FJIA0') order by CreatedDate desc) From Case  WHERE IsClosed=false AND Age_days__c>2  AND "+strVar+" CaseRoutingTaxonomy__r.Name='Platform-Proactive Monitoring'")// id is used for cc devil
			.on("record", function(record) {
				records.push(record);
			})
			.on("error", function(err) {
				console.error(err);
			})
			.on("end", function() {
				console.log("total in database : " + query.totalSize);
				console.log("total fetched : " + query.totalFetched);
					
				var CaseId="(";
				records.forEach(element => {
					if(element.CaseComments===null){
							CaseId+="'"+element.Id+"',";
						}
					
			    });
				
				if(CaseId.length>2)
				{
			    CaseId=CaseId.substring(0,CaseId.length-1);
			    CaseId+=")";
				console.log('CaseId--'+CaseId);
				conn.query(
           // "Select Id, CaseNumber, AccountId, (Select Id, CommentBody,CreatedDate From CaseComments where CreatedById='0050M00000EyVfnQAF' order by CreatedDate desc LIMIT 1) From Case  WHERE Id IN "+CaseId,function(err, result) {
           "Select Id, CaseNumber, AccountId, (Select Id, CommentBody,CreatedDate From CaseComments where CreatedById='005Hx000001Q2FJIA0' order by CreatedDate desc LIMIT 1) From Case  WHERE Id IN "+CaseId,function(err, result) { // id is used for cc devil
		   if (err) { return console.error('....error...'+err); }
				console.log('..result.records.'+result.records.length);
				var CaseId="(";
				var AccountId="(";
					result.records.forEach(element => {
						
						
						 if(element.CaseComments!=null  && element.CaseComments.totalSize==1 && (element.CaseComments.records[0].CommentBody.includes('Severity: OKAY') || element.CaseComments.records[0].CommentBody.includes('Severity: OK'))){

								var businessHrs = workingMinsBetweenDates(new Date(element.CaseComments.records[0].CreatedDate),new Date(),true);
								var noOfSaturdays = getMinsOfSpecificDays(new Date(element.CaseComments.records[0].CreatedDate),new Date(),'Sat')
								var noOfMondays = getMinsOfSpecificDays(new Date(element.CaseComments.records[0].CreatedDate),new Date(),'Mon');

								var actualTime = ((businessHrs+noOfSaturdays)-noOfMondays)/60;
								BusinessHrsMap.set(element.Id,actualTime.toFixed(2));
								if(actualTime > 36)
								{
								CaseId+="'"+element.Id+"',";
								AccountId+="'"+element.AccountId+"',";
								}
							}
						
					});
					console.log("case ID :" +CaseId);
					console.log("Account ID :" +AccountId);
					if(CaseId.length>2){
					CaseId=CaseId.substring(0,CaseId.length-1);
					CaseId+=")";
					console.log("case ID 1:" +CaseId);
					AccountId=AccountId.substring(0,AccountId.length-1);
					AccountId+=")";
					console.log("Account ID 1 :" +AccountId);
					
						
						conn.query("Select Id,   (Select Id, CreatedDate From CaseComments where  IsPublished=true  order by CreatedDate desc LIMIT 1 ) From Case  WHERE IsClosed=false AND Age_days__c>2 AND Id IN "+CaseId,function(err, result) {
							if (err) { return console.error(err); }
					
							var caseComMap=new Map();
							result.records.forEach(element => {
								
								if(element.CaseComments!=null){
									caseComMap.set(element.Id,new Date(element.CaseComments.records[0].CreatedDate));
								}
								
							});

							//console.log("element :" +element.CaseComments.records[0].CreatedDate);
						/*conn.query("Select Id, (select Id ,Name From Clicktools_Survey_Results__r  WHERE Case__r.reason='Proactive Monitoring' order by CreatedDate desc Limit 1  ) from Account where Id IN "+AccountId,function(err, result) {
							if (err) { return console.error(err); }
							//console.log('caseCSAT'+ JSON.stringify(result.records));
							var csatMap=new Map();
							result.records.forEach(element => {
								if(element.Clicktools_Survey_Results__r!=null){
									console.log('caseCSAT' );
									csatMap.set(element.Id,"<a href='https://orgcs.lightning.force.com/lightning/r/Clicktools_Survey_Results__c/"+element.Clicktools_Survey_Results__r.records[0].Id+"/view'>"+element.Clicktools_Survey_Results__r.records[0].Name+"</a>");
								}
								
							});*/
							
							conn.query("Select Id, AccountId, Owner.Name, CaseNumber,Age_days__c,Account.Name,Hotcase__c, FunctionalArea__c,(Select Id,  CreatedDate From CaseComments where  IsPublished=true AND (CreatedById='0050M00000FFDGAQA5' OR CreatedById='0050M00000EyVfnQAF') order by CreatedDate desc LIMIT 1 ) From Case  WHERE IsClosed=false AND Age_days__c>2 AND Id IN "+CaseId+"Order by Age_days__c desc",function(err, result) {
							if (err) { return console.error(err); }
							fetchParentCases(result.records,caseComMap,BusinessHrsMap);
						});
						});
						
						console.log("element :" +element);
					}
					else{
						
						document.getElementById("message").innerHTML  ="No cases Available";
					}
					
				});
			}else{
				
				document.getElementById("message").innerHTML  =" No cases Available";
			}
		})
			.run({ autoFetch : true});			
		 
		}else{
			var records = [];
			//			"SELECT Id, ParentId, CreatedDate, CommentBody, Parent.CaseNumber, Parent.Subject, Parent.FunctionalArea__c, Parent.Organization_Id__c, Parent.Account.Name, Parent.Owner.Name FROM  CaseComment WHERE CreatedDate >"+dateTime+" AND  CreatedById='"+comCreatedId+"' AND Parent.IsClosed=false AND Parent.Reason='Proactive Monitoring' AND  Parent.General_Application_Area__c='Alerts - Core'  Order by CreatedDate Desc LIMIT 9999 ",function(err, result) { 

var query = conn.query("SELECT Id, ParentId, CreatedDate, CommentBody, Parent.CaseNumber,  Parent.Subject, Parent.Status, Parent.FunctionalArea__c, Parent.Organization_Id__c, Parent.Account.Name, Parent.Owner.Name FROM  CaseComment WHERE CreatedDate > "+SelectedDateTime+CommentCreators+"Parent.IsClosed=false AND Parent.CaseRoutingTaxonomy__r.Name='Platform-Proactive Monitoring'  Order by CreatedDate Desc")			//"SELECT Id, ParentId, CreatedDate, CommentBody, Parent.CaseNumber, Parent.Subject, Parent.FunctionalArea__c, Parent.Organization_Id__c, Parent.Account.Name, Parent.Owner.Name FROM  CaseComment WHERE CreatedDate > "+SelectedDateTime+CommentCreators+currentlyLoggedInUser+"Parent.IsClosed=false AND Parent.Reason='Proactive Monitoring' AND  Parent.General_Application_Area__c='Alerts - Core'  Order by CreatedDate Desc"
			  .on("record", function(record) {
				records.push(record);
			  })
			  .on("end", function() {
				console.log('comments'+' '+JSON.stringify(records));
				fetchCustomerComments(records);
			  })
			  .on("error", function(err) {
				document.getElementById("message").innerHTML  =" No cases Available";
			  })
			  .run({ autoFetch : true});
		  }
		});
      });   
    
}



function fetchParentCases(caseData,caseComMap,BusinessHrsMap) {   
    var CaseList=[];
	
    CaseList.push(["Case Number", "Case Owner", "Account Name", "Alert Name", "Age (in hours)", "Age (in days)", "Closure Age (Since Last Cleared Alert (hrs))","Hot Case","Last Customer Comment Date","Last Public Comment Date Time"]);
	
    caseData.forEach(element => {
		let CustomerCommentDate='';
		let PublicCommentDate=caseComMap.get(element.Id)?caseComMap.get(element.Id): '';
		let BusinessHrs = BusinessHrsMap.get(element.Id)?BusinessHrsMap.get(element.Id):'';
		//let Csat=csatMap.get(element.AccountId)?csatMap.get(element.AccountId): '';
		
        if(element.CaseComments!=null){
			    CustomerCommentDate=new Date(element.CaseComments.records[0].CreatedDate);	
            }
		CaseList.push(["<a href='https://orgcs.lightning.force.com/lightning/r/Case/"+element.Id+"/view' target='_blank'>"+element.CaseNumber+"</a>",element.Owner.Name, element.Account.Name,element.FunctionalArea__c,(element.Age_days__c * 24),element.Age_days__c,BusinessHrs,element.Hotcase__c, CustomerCommentDate, PublicCommentDate]);
		CustomerCommentDate='';
		PublicCommentDate='';
		//Csat='';
   });
    
   GenerateCaseListTable(CaseList);
}

function fetchCustomerComments(CaseComments)
{
	var CommentsList=[];
	CommentsList.push(["Owner Name","Case Number","Account Name","Alert Name", "Case Status", "Customer Comment Date/Time"]);
	CaseComments.forEach(element => {
		CommentsList.push([element.Parent.Owner.Name,"<a href='https://orgcs.lightning.force.com/lightning/r/Case/"+element.ParentId+"/view' target='_blank'>"+element.Parent.CaseNumber+"</a>",element.Parent.Account.Name,element.Parent.FunctionalArea__c,element.Parent.Status,new Date(element.CreatedDate)]);
	});
	console.log('comm list'+''+CommentsList)
	GenerateCaseListTable(CommentsList);
}

function workingMinsBetweenDates(startDate, endDate,ExcludeWeekends) {
   
    var minutesWorked = 0;
    
  if (endDate < startDate) { return 0; }
    
    var current = startDate;
	
       while(current <= endDate){      
        var currentTime = current.getHours() + (current.getMinutes() / 60);
        if(ExcludeWeekends ? current.getDay() !== 0 && current.getDay() !== 6 : true){
              minutesWorked++;
		}
        current.setTime(current.getTime() + 1000 * 60);
    }

	
    return (minutesWorked);
}

function getMinsOfSpecificDays(date1, date2,dayToSearch)
{
	var stdate = new Date(date1);
	var dateObj1 = new Date(date1);
	var dateObj2 = new Date(date2);
	var satbolean = true; // To exclude Sat if alert is cleared on Saturday. 
	var Monbolean = true; // To exclude Mon if alert is cleared on Monday. 
	if(stdate.getDay()== 6)satbolean = false;
	if(stdate.getDay()== 1)Monbolean = false;

	var count = 0;
	var DiffMinsSat = 0;
	var DiffMinsMon = 0;
	var week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	
	var dayIndex = week.indexOf( dayToSearch );
	while ( dateObj1.getTime() <= dateObj2.getTime())
	{
	   if (dateObj1.getDay() == dayIndex && ((satbolean && dayToSearch == 'Sat') || (Monbolean && dayToSearch == 'Mon')))
	   { 
		  count++
	   }
	   satbolean = true;
	   Monbolean = true;
	   dateObj1.setDate(dateObj1.getDate() + 1);
	}
	
	if(stdate.getDay()== 6 && stdate.getHours() < 5 && stdate.getMinutes() < 30 && dayToSearch === "Sat")
	{
		var diff = Math.abs(new Date(stdate.getFullYear(),stdate.getMonth(),stdate.getDate(),5,30,00) - stdate)/1000;
		DiffMinsSat = diff /60;
	}
	
	if(stdate.getDay()== 1 && stdate.getHours() < 21 && stdate.getMinutes() < 30 && dayToSearch === "Mon")
	{
		var diff = Math.abs(new Date(stdate.getFullYear(),stdate.getMonth(),stdate.getDate(),21,30,00) - stdate)/1000;
		DiffMinsMon = diff / 60;
	}
	
	if(dayToSearch === "Sat")
	{
		count*=330; 
		count+=DiffMinsSat;
		
	}else if(dayToSearch === "Mon")
	{
		count*=1290;
		count-=DiffMinsMon;
	}

	return count;
}


function GenerateCaseListTable(CaseListData) {
    if(CaseListData.length>1){
	document.getElementById("thId").innerHTML="";
	document.getElementById("tbId").innerHTML="";
	var tablehead = document.getElementById("thId");
    
    var columnCount = CaseListData[0].length;

    var row = tablehead.insertRow(-1);
    for (var i = 0; i < columnCount; i++) {
        var headerCell = document.createElement("TH");
        headerCell.innerHTML = CaseListData[0][i];
        row.appendChild(headerCell);
    }
	var tablebody = document.getElementById("tbId");
    
    for (var i = 1; i < CaseListData.length; i++) {
        row = tablebody.insertRow(-1);
        for (var j = 0; j < columnCount; j++) {
            var cell = row.insertCell(-1);
            cell.innerHTML = CaseListData[i][j];
        }
    }

	document.getElementById("dvTable").style.display = "inline-block";
	document.getElementById("myInput").style.display = "inline-block";
    document.getElementById("message").innerHTML  = "";
    //dvTable.appendChild(table);

    }
    else{
       
		document.getElementById("message").innerHTML  =" No cases Available";
    }
}