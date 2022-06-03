console.log("Chrome Extention Go");

// Used to get the values of Alert Name, OrgId,Instance ,StartTime and EndTime from DOM elemnts of the gadget page.
	var alertNme = document.getElementById('counter-Workflow').value;
	var OrgId = document.getElementById('counter-Organization-ID').value;
	var Instance = document.getElementById('counter-Instance').value;
	var StartTime = document.getElementById('evluation-date-from-DR').value;
	var EndTime = document.getElementById('evluation-date-until-DR').value;
    var severity = document.getElementById('counter-Severity').value;
    var descLimit = (document.getElementsByClassName('tabsContainerTabContent')[0].innerText).split('Current').pop().split('From')[0];
	var workflow = (document.getElementsByClassName('tabsContainerTabContent')[0].innerText).split('At current').pop().split('2022-')[0];
	var datetime1 = (document.getElementsByClassName('tabsContainerTabContent')[0].innerText).split('reset at ').pop().split('Z.')[0];
	var datetime1 = (document.getElementsByClassName('tabsContainerTabContent')[0].innerText).split('reset at ').pop().split('Z.')[0];
    var now = datetime1.replace('T', ' ');
	var singleemail = (document.getElementsByClassName('tabsContainerTabContent')[0].innerText).split('At current').pop().split('2022-')[0];

// Get gadget page URL for internal comment template
	var gadgetUrl = window.location.pathname.toString();
	console.log("the gadgetUrlPath pathName is " + gadgetUrl);

	
// Converting the datetime format to SplunkQuery understandable format. (06/29/2020 02:34:11 - 06/29/2020:02:34:11)

	dt1 = StartTime.replace(" ", ":");
	dt2 = EndTime.replace(" ", ":");
	
// Getting the value of Datetime to use as a parameter in splunk dashboards.(06/16/2020 06:44:36 - 1592289876).
	var date = new Date(StartTime+'Z');
	var date1 = new Date(EndTime+'Z');
	//alert(date+"'"+date1);
	var st = date.valueOf();	
	st = st.toString();
	st = st.slice(0, -3);
	var et = date1.valueOf();	
	et = et.toString();
	et = et.slice(0, -3);
	//console.log(dt1,dt2,st,et);
	
// Used to set the starttime values to 00:00 UTC for daily limit alerts.	
	String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
	}
	var dt0 = StartTime.replaceAt(10, ":00:00:00");
	console.log(StartTime,dt0);
	
	date2 = dt0.replace(":", " ");
	
	var st01 = new Date(date2+'Z');
	var st0 = st01.valueOf();
	st0 = st0.toString();
	st0 = st0.slice(0, -3);
	
	
//********* Redirecting to splunk based on alert name with dynamic parameters (OrgId,Instance ,StartTime and EndTime)from the gadget page.

	//<== ******** Performance Alerts related Splunk **********==>//
	if (alertNme === "Apex Future Performance - ProM") {
		window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/publicSharing/prom__apex_future_performance_dashboard_v2?earliest="+st+"&latest="+et+"&form.instance="+Instance+"&form.organizationId="+OrgId+"&form.entityType=*&form.verb=*&form.span=1h&severity="+severity+"&gadgetUrl="+gadgetUrl);
	}
	if (alertNme === "Apex Queueable Performance - ProM") {
		window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/publicSharing/prom__apex_queueable_performance_dashboard_v2?earliest="+st+"&latest="+et+"&form.instance="+Instance+"&form.organizationId="+OrgId+"&form.entityType=*&form.verb=*&form.span=1h&severity="+severity+"&gadgetUrl="+gadgetUrl);
    }
	if (alertNme === "Dashboard Performance - ProM") {
		//window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/search/search?q=search%20index%3D"+Instance+"%20organizationId%3DCASE("+OrgId+")%20%60logRecordType(D)%60%20earliest%3D"+dt1+"%20latest%3D"+dt2+"%20%7C%20stats%20count%2C%20count(eval(runTime%20%3E%202000))%20as%20infoThresholdCount%2C%20count(eval(runTime%20*%201%20%3E%202000))%20as%20warnThresholdCount%2C%20count(eval(runTime%20*%201%20*%201%20%3E%205000))%20as%20errorThresholdCount%2C%20avg(runTime)%20as%20averageRunTime%2C%20max(runTime)%20as%20maxRunTime%2C%20avg(cpuTime)%20as%20averageCpuTime%2C%20max(cpuTime)%20as%20maxCpuTime%2C%20avg(waitTime)%20as%20averageWaitTime%2C%20max(waitTime)%20as%20maxWaitTime%20by%20dashboardId%2C%20userId&sid=1591687579.51143_15EC059F-E464-4A31-B134-B7081045AD82&display.page.search.mode=verbose&dispatch.sample_ratio=1&earliest=-15m&latest=now&display.page.search.tab=statistics&display.general.type=statistics");
		//  window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/publicSharing/support__dashboard_performance_sourav_kedia?earliest="+st+"&latest="+et+"&form.instance="+Instance+"&form.organizationId="+OrgId+"&form.userId=*&form.entityType=*&form.verb=*&form.span=1h&severity="+severity);	
		 window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/publicSharing/prom__dashboard_performance__v2?earliest="+st+"&latest="+et+"&form.instance="+Instance+"&form.organizationId="+OrgId+"&form.userId=*&form.entityType=*&form.verb=*&form.span=1h&severity="+severity+"&gadgetUrl="+gadgetUrl);	
	}
	if (alertNme === "Bulk API Performance - ProM") {
		//window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/publicSharing/publicotherdash_bulk_data_load_jobs?earliest="+st+"&latest="+et+"&form.bulkvers=v1&form.instance="+Instance+"&form.organizationId="+OrgId+"&form.userId=*&form.entityType=*&form.verb=*&form.span=1h");
		window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is//en-US/app/publicSharing/prom__bulk_api_performance_dashboard_v2?earliest="+st+"&latest="+et+"&form.instance="+Instance+"&form.organizationId="+OrgId+"&form.userId=*&form.entityType=*&form.verb=*&form.span=1h&severity="+severity+"&gadgetUrl="+gadgetUrl);
	}
	if (alertNme === "Average Synchronous Callout Time - ProM" || alertNme === "Synchronous Callout Failures - ProM") {
		window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/publicSharing/publicotherdash_support__Callouts?form.instance="+Instance+"&form.organizationId="+OrgId+"&form.userId=*&form.url=*&form.statusCode=*&form.entryPoint=*&earliest="+st+"&latest="+et+"&form.span=15m");
		//window.open("https://docs.google.com/spreadsheets/d/1kN2cnHVtoUjXeYKV8dPUfzs37RkaMk_08t2qqNpmkn8/edit#gid=0");
	}
	if (alertNme === "Org Average Page Time (APT) - ProM") {
		//window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/search/search?q=search%20index%3D"+Instance+"%20organizationId%3DCASE("+OrgId+")%20(%60logRecordType(U%2CV%2CA%2Ca%2Caprst%2Capars%2Cvfrmt%2CR%2Capblk)%60%20OR%20%60logRecordType(aarun%2Cmblog%2Crslog%2CL)%60)starttime%3D"+dt1+"%20endtime%3D"+dt2+"%20isAsyncOrInternal%3D0%20%7C%20stats%20avg(runTime)%20as%20averageRunTime%20sum(runTime)%20as%20totalRunTime%20by%20logRecordType%2C%20userId%2C%20logName&sid=1591892520.5115_0A9FE866-1978-49A6-A934-1894E0A7A1F8&display.page.search.mode=verbose&dispatch.sample_ratio=1&earliest=-15m&latest=now");
		window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/publicSharing/prom__org_average_page_time_apt__v2?earliest="+st+"&latest="+et+"&form.instance="+Instance+"&form.organizationId="+OrgId+"&form.userId=*&form.entityType=*&form.verb=*&form.span=1h&severity="+severity+"&gadgetUrl="+gadgetUrl);
		
	}
	if (alertNme === "Database CPU Consumption Time - ProM") {
	    window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-GB/app/publicSharing/org_db_cpu_time_dashboard_v2?form.instance="+Instance+"&form.organizationId="+OrgId+"&earliest="+st+"&latest="+et+"&form.span=1m&severity="+severity+"&gadgetUrl="+gadgetUrl);
	}
	if(alertNme ==="Org Request Rate Percentage - ProM"){
		//window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/search/search?q=search%20index%3D%20"+Instance+"%20organizationId%3D%20CASE(%22"+OrgId+"%22)%20%60logRecordType(U%2CV%2CA%2Ca%2Caprst%2Capars%2Cvfrmt%2CR)%60%20runTime%3D*%20starttime%3D"+dt1+"%20endtime%3D"+dt2+"%20isAsyncOrInternal%3D0%20%7C%20eventstats%20count%20as%20globalCount%20avg(runTime)%20as%20globalAverageRunTime%20sum(runTime)%20as%20globalTotalRunTime%20%7C%20where%20%5Bsearch%20index%3D%20"+Instance+"%20organizationId%3DCASE(%22"+OrgId+"%22)%20%60logRecordType(U%2CV%2CA%2Ca%2Caprst%2Capars%2Cvfrmt%2CR)%60%20starttime%3D"+dt1+"%20endtime%3D"+dt2+"%20isAsyncOrInternal%3D0%20%7C%20stats%20sum(runTime)%20as%20totalRunTime%20by%20userId%20%7C%20sort%20-totalRunTime%20%7C%20head%2020%20%7C%20fields%20userId%5D%20%7C%20eventstats%20avg(runTime)%20as%20rootAverageRunTime%20by%20userId%20%7C%20stats%20min(globalCount)%20as%20globalCount%20min(globalAverageRunTime)%20as%20globalAverageRunTime%20min(globalTotalRunTime)%20as%20globalTotalRunTime%20count%20min(rootAverageRunTime)%20as%20averageRunTime%20sum(runTime)%20as%20totalRunTime%20by%20logRecordType%2C%20userId%2C%20logName&display.statistics.sortColumn=count&display.statistics.sortDirection=desc&sid=1593153710.23151_E7B8DF5E-0F09-4F68-AE18-1ED2FA990AD4&display.page.search.mode=verbose&dispatch.sample_ratio=1&earliest=-15m&latest=now&display.page.search.tab=statistics&display.general.type=statistics");
		//window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/search/search?q=search%20index%3D%20"+Instance+"%20organizationId%3D%20CASE(%22"+OrgId+"%22)%20%60logRecordType(U%2CV%2CA%2Ca%2Caprst%2Capars%2Cvfrmt%2CR)%60%20runTime%3D*%20starttime%3D"+dt1+"%20endtime%3D"+dt2+"%20isAsyncOrInternal%3D0%20%7C%20stats%20count%20by%20logRecordType%2C%20userId%2C%20logName&display.page.search.mode=verbose&dispatch.sample_ratio=1&earliest=-15m&latest=now&display.page.search.tab=statistics&display.general.type=statistics&display.statistics.sortColumn=count&display.statistics.sortDirection=desc&sid=1625724524.21850_CDFC85F0-9F8F-4B08-B78A-23854E75DEE7");
		//window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/publicSharing/dashboard__org_request_rate?form.field1.earliest="+st+"&form.field1.latest="+et+"&form.orgId="+OrgId+"&form.instance="+Instance+"&form.instance_select="+Instance+"&form.organizationId="+OrgId+"&earliest="+st+"&latest="+et+"&form.time.earliest="+st+"&form.time.latest="+et+"");
		window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is//en-US/app/publicSharing/prom__org_request_rate_dashboard__v2?earliest="+st+"&latest="+et+"&form.instance="+Instance+"&form.organizationId="+OrgId+"&form.userId=*&form.entityType=*&form.verb=*&form.span=1h&severity="+severity+"&gadgetUrl="+gadgetUrl);

		
	}
	if(alertNme ==="Apex Queueable Dequeue Latency - ProM"){
		window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/search/search?q=search%20index%3D"+Instance+"%20organizationId%3DCASE("+OrgId+")%20%60logRecordType(axapx)%60%20quiddity%3DQ%20earliest%3D"+dt1+"%20latest%3D"+dt2+"%20%7C%20fields%20requestId%20entryPoint%20userId%20%7C%20join%20requestId%20type%3Dinner%20%5Bsearch%20index%3D"+Instance+"%20OrganizationId%3DCASE("+OrgId+")%20%60logRecordType(mqfrm)%60%20earliest%3D"+dt1+"%20latest%3D"+dt2+"%20MessageTypeName%3D%22APEX_QUEUEABLE%22%20%7C%20where%20DequeueLatency%20%3E%201200000%20%7C%20sort%2050000%20-DequeueLatency%5D%20%7C%20stats%20avg(DequeueLatency)%20as%20averageDequeueLatency%2C%20max(DequeueLatency)%20as%20maxDequeueLatency%2C%20count(requestId)%20as%20count%2C%20count(eval(DequeueLatency%20%3E%20600000))%20as%20infoThresholdCount%2C%20count(eval(DequeueLatency%20*%201%20%3E%201200000))%20as%20warnThresholdCount%20by%20entryPoint%2C%20userId%20%7C%20sort%2010000%20-averageDequeueLatency&display.page.search.mode=verbose&dispatch.sample_ratio=1&earliest=-15m&latest=now&display.page.search.tab=statistics&display.general.type=statistics&sid=1592528866.62314_144BF8E4-7451-419A-8BEB-1154239AB2F8");
	}
	if(alertNme ==="Concurrent UI Limit Errors - ProM"){
		window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/publicSharing/prom_concurrent_ui_dashboard_v2?earliest="+st+"&latest="+et+"&form.instance="+Instance+"&form.organizationId="+OrgId+"&form.span=1m&severity="+severity+"&gadgetUrl="+gadgetUrl);
	}
	if (alertNme === "Batch Apex Performance - ProM") {
		//window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/search/search?q=search%20index%3D"+Instance+"%20organizationId%3DCASE("+OrgId+")%20%60logRecordType(axapx)%60%20quiddity%20IN%20(A%2CS)%20earliest%3D"+dt1+"%20latest%3D"+dt2+"%20%7C%20stats%20count%2C%20count(eval(cpuTime%20*%201%20*%201%20%3E%2060000))%20as%20errorThresholdCount%2C%20avg(runTime)%20as%20averageRunTime%2C%20max(runTime)%20as%20maxRunTime%2C%20avg(cpuTime)%20as%20averageCpuTime%2C%20max(cpuTime)%20as%20maxCpuTime%2C%20avg(dbTime)%20as%20averageDbTotalTime%2C%20max(dbTime)%20as%20maxDbTotalTime%20%2C%20avg(calloutTime)%20as%20averageCalloutTime%2C%20max(calloutTime)%20as%20maxCalloutTime%20by%20entryPoint%2C%20userId&earliest=-15m&latest=now&display.page.search.mode=verbose&dispatch.sample_ratio=1&display.page.search.tab=statistics&display.general.type=statistics&display.statistics.sortColumn=averageRunTime&display.statistics.sortDirection=desc&sid=1625716915.20659_CDFC85F0-9F8F-4B08-B78A-23854E75DEE7");
		window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/publicSharing/prombatch_apex_performance_v2?form.instance="+Instance+"&form.organizationId="+OrgId+"&form.userId=*&form.url=*&form.statusCode=*&form.entryPoint=*&form.span=1m&earliest="+st+"&latest="+et+"&severity="+severity+"&gadgetUrl="+gadgetUrl);

	}        
	if (alertNme === "EPT Monitoring Workflow") {
		window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/search/search?q=search%20index%3D"+Instance+"%20organizationId%3DCASE("+OrgId+")%20%60logRecordType(ailtn)%60%20earliest%3D"+dt1+"%20latest%3D"+dt2+"%20appName%3D%22one%3Aone%22%20schemaId%3D%22com.salesforce.instrumentation.schema.avro.LightningPageView%22%7C%20eval%20context%3Dspath(payload%2C%20%22page.context%22)%20%7C%20search%20(context%3D%22one%3ArecordHomeFlexipage%22)%20%7C%20eval%20page%3Dspath(payload%2C%20%22page%22)%20%7C%20eval%20entityType%3Dspath(payload%2C%20%22page.entityType%22)%20%7C%20eval%20appName%3Dspath(payload%2C%20%22page.attributes.app.appName%22)%20%7C%20eval%20appType%3Dspath(payload%2C%20%22page.attributes.app.appType%22)%20%7C%20eval%20url%3Dspath(payload%2C%20%22page.attributes.url%22)%7C%20eval%20defaultCmp%3Dspath(payload%2C%20%22attributes.defaultCmp%7B%7D%22)%20%7C%20eval%20entitytype%3Dcase(searchmatch(%22entityType%3D*__c%22)%2C%20%22Custom%22%2C%20searchmatch(%22entityType%3D*__x%22)%2C%20%22External%22%2C%20searchmatch(%22entityType%3D*__kav%22)%2C%20%22KnowledgeArticle%22%2C%20true()%2C%20entityType)%7C%20eval%20eptDeviation%3Dspath(payload%2C%20%22attributes.eptDeviation%22)%20%7C%20eval%20eptDeviationReason%3Dspath(payload%2C%20%22attributes.eptDeviationReason%22)%20%7C%20eval%20ept%3Dspath(payload%2C%20%22ept%22)%20%7C%20eval%20ept%3Dept%2F1000000%20%7C%20iplocation%20clientIP%7C%20stats%20count%20avg(ept)%20as%20averageRunTime%20by%20userId%20browserName%20browserVersion%20clientGEO%20url%7C%20where%20averageRunTime%20%3E%201&display.page.search.mode=verbose&dispatch.sample_ratio=1&earliest=-15m&latest=now&display.page.search.tab=events&display.general.type=events&sid=1625722641.21707_CDFC85F0-9F8F-4B08-B78A-23854E75DEE7");
	}
	
	//<== ******** Error Alerts related Splunk **********==>//
	if ( alertNme === "Asynchronous Callout Failures - ProM") {
		window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/publicSharing/publicotherdash_support__Callouts_continuation?form.instance="+Instance+"&form.organizationId="+OrgId+"&form.userId=*&form.url=*&form.status=*&form.completed=*&form.entryPoint=*&form.ContinuationMethod=*&earliest="+st+"&latest="+et+"&form.span=1m&form.field1.earliest="+st+"&form.field1.latest="+et);
	}
	if (alertNme === "Concurrent Apex Errors - ProM" || alertNme === "Connection Pool Errors - ProM" ) {
		window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/publicSharing/publicotherdash_support__concurrent_apex_dashboard?earliest="+st+"&latest="+et+"&form.instance="+Instance+"&form.organizationId="+OrgId+"&form.span=1m");
		if(alertNme === "Connection Pool Errors - ProM"){
			window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/publicSharing/PublicCoreDash_dbconnectionpool_212?form.time_tok.earliest="+st+"&form.time_tok.latest="+et+"&form.pod="+Instance+"&form.host=*-app*");
			window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/publicSharing/support__prom_connnection_pool_dashboard?earliest="+st+"&latest="+et+"&form.instance="+Instance+"&form.organizationId="+OrgId+"&form.span=1m&form.host=*-app*");
		}
	}
	
	if (alertNme === "Concurrent API Limit Errors - ProM") {
		window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/search/search?q=search%20index%3D"+Instance+"%20CASE("+OrgId+")%20%60logRecordType(gs*%2Cgg*)%60%20%22ConcurrentRequests%20Request%20Limit%22%20earliest%3D"+dt1+"%20latest%3D"+dt2+"&display.page.search.mode=verbose&dispatch.sample_ratio=1&earliest=-15m&latest=now&display.page.search.tab=statistics&display.general.type=statistics&sid=1625721382.21677_CDFC85F0-9F8F-4B08-B78A-23854E75DEE7");
		//window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/search/search?q=search%20index%3D"+Instance+"%20organizationId%3DCASE("+OrgId+")%20earliest%3D"+dt1+"%20latest%3D"+dt2+"%20%60logRecordType(A%2Caprst%2Ca%2Capars)%60%20isAsyncOrInternal%3D0%20runTime%3E20000%20%7C%20stats%20count%20by%20logName%2C%20entityName%2C%20method%2C%20userId&display.page.search.mode=verbose&dispatch.sample_ratio=1&earliest=-15m&latest=now&display.page.search.tab=events&display.general.type=events&sid=1625721531.21682_CDFC85F0-9F8F-4B08-B78A-23854E75DEE7");
		window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/search/search?q=search%20index%3D"+Instance+"%20organizationId%3DCASE("+OrgId+")%20earliest%3D"+dt1+"%20latest%3D"+dt2+"%20%60logRecordType(A%2Caprst%2Ca%2Capars)%60%20isAsyncOrInternal%3D0%20runTime%3E20000%20%7C%20table%20requestId%20logName%20runTime&display.page.search.mode=verbose&dispatch.sample_ratio=1&earliest=-15m&latest=now&display.page.search.tab=statistics&display.general.type=statistics&display.statistics.sortColumn=runTime&display.statistics.sortDirection=desc&sid=1626317243.28983_CF828D85-3F14-44F4-BC87-48566A8DA2AE");
	}
	
	if (alertNme === "Login Success Rate - ProM") {
		//window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/search/search?q=search%20index%3D"+Instance+"%20organizationId%3DCASE("+OrgId+")%20%60logRecordType(L)%60%20earliest%3D"+dt1+"%20latest%3D"+dt2+"%20resultCode!%3D0%20%7C%20eval%20delegatedAuthFailure%3D%20if(delegatedAuth%3D%3D%22S%22%20OR%20delegatedAuth%3D%3D%22D%22%20OR%20delegatedAuth%3D%3D%22O%22%2C%201%2C%200)%20%7C%20stats%20count%20by%20userId%2C%20resultCode%2C%20sourceIp%2C%20loginType%2C%20delegatedAuthFailure%2C%20logRecordType%2C%20delegatedAuth&display.page.search.mode=verbose&dispatch.sample_ratio=1&earliest=-15m&latest=now&display.page.search.tab=statistics&display.general.type=statistics");
		//window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is//en-US/app/publicSharing/prom__login_success_rate_alert_dashboard_clone?earliest="+st+"&latest="+et+"&form.instance="+Instance+"&form.organizationId="+OrgId+"&form.userId=*&form.entityType=*&form.verb=*&form.span=1h&severity="+severity+"&gadgetUrl="+gadgetUrl);
		window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is//en-US/app/publicSharing/prom__login_success_rate_alert_dashboard_v2?earliest="+st+"&latest="+et+"&form.instance="+Instance+"&form.organizationId="+OrgId+"&form.userId=*&form.entityType=*&form.verb=*&form.span=1h&severity="+severity+"&gadgetUrl="+gadgetUrl);
	}
	if (alertNme === "Login Success Volume - ProM") {
		window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/search/search?q=search%20index%3D"+Instance+"%20organizationId%3DCASE("+OrgId+")%20%60logRecordType(L)%60%20earliest%3D"+dt1+"%20latest%3D"+dt2+"%20resultCode%3D0%20%7C%20timechart%20span%3D1m%20count");
	}
	if (alertNme === "Login Failures - ProM") {
		//window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/search/search?q=search%20index%3D"+Instance+"%20organizationId%3DCASE("+OrgId+")%20%60logRecordType(L)%60%20earliest%3D"+dt1+"%20latest%3D"+dt2+"%20resultCode!%3D0%20%7C%20eval%20delegatedAuthFailure%3D%20if(delegatedAuth%3D%3D%22S%22%20OR%20delegatedAuth%3D%3D%22D%22%20OR%20delegatedAuth%3D%3D%22O%22%2C%201%2C%200)%20%7C%20stats%20count%20by%20userId%2C%20resultCode%2C%20sourceIp%2C%20loginType%2C%20delegatedAuthFailure%2C%20logRecordType%2C%20delegatedAuth&display.page.search.mode=verbose&dispatch.sample_ratio=1&earliest=-15m&latest=now&display.page.search.tab=statistics&display.general.type=statistics&sid=1591894378.5500_0A9FE866-1978-49A6-A934-1894E0A7A1F8");
		//window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is//en-US/app/publicSharing/prom__login_failure_dashboard_v1?earliest="+st+"&latest="+et+"&form.instance="+Instance+"&form.organizationId="+OrgId+"&form.userId=*&form.entityType=*&form.verb=*&form.span=1h&severity="+severity);
		window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is//en-US/app/publicSharing/prom__login_failure_dashboard_v2?earliest="+st+"&latest="+et+"&form.instance="+Instance+"&form.organizationId="+OrgId+"&form.userId=*&form.entityType=*&form.verb=*&form.span=1h&severity="+severity+"&gadgetUrl="+gadgetUrl);
	}
	if(alertNme ==="Rowlock Timeout Errors - ProM"){
		window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/publicSharing/publicotherdash_support_row_lock_overview?form.instance="+Instance+"&form.organizationId="+OrgId+"&earliest="+st+"&latest="+et+"&form.logName=*&form.span=1m&form.excludeNetwork=NOT(0DB*%20OR%20ORA-00	054)");
	}
	if (alertNme === "Batch Apex Failure Workflow - ProM") {
		window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/search/search?q=search%20index%3D"+Instance+"%20organizationId%3DCASE("+OrgId+")%20%60logRecordType(axbmg)%60%20earliest%3D"+dt1+"%20latest%3D"+dt2+"%20messageSuccessful%3D0%20%7C%20stats%20count%20by%20batchClassId%2C%20parentJobId&earliest=-15m&latest=now&display.page.search.mode=verbose&dispatch.sample_ratio=1&display.page.search.tab=statistics&display.general.type=statistics&sid=1625717614.20698_CDFC85F0-9F8F-4B08-B78A-23854E75DEE7");
	}
	
	//<== ******** Limit Alerts related Splunk **********==>//
	/*if (alertNme === "Bulk API Batch Limit - ProM") {
		window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/publicSharing/publicotherdash_support_bulk_data_load_jobs2?earliest=-24h%40h&latest=now&form.instance="+Instance+"&form.organizationId="+OrgId+"&form.userId=*&form.entityType=*&form.verb=*&form.span=1h");
		window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/search/search?q=search%20index%3D"+Instance+"%20organizationId%3D"+OrgId+"%20%60logRecordType(apaaa%2Capblc)%60%20%7C%20eval%20batchCount%20%3D%20if%20(operation%3D%3D%22CREATE_BATCH%22%2C1%2C0)%20%7C%20timechart%20span%3D1h%20sum(batchCount)%20as%20batchCount%20%7C%20addcoltotals&display.page.search.mode=verbose&dispatch.sample_ratio=1&earliest=-24h%40h&latest=now&display.page.search.tab=statistics&display.general.type=statistics&display.statistics.sortColumn=_time&display.statistics.sortDirection=desc&sid=1592279615.1341_6CA4D03D-7FBC-465E-BCDC-4BC7072190CF");
	}	*/
    if (alertNme === "Bulk API Batch Limit - ProM") {
		window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/publicSharing/prom__bulk_api_batch_limit_dashboard_v2?earliest=-24h%40h&latest=now&form.instance="+Instance+"&form.organizationId="+OrgId+"&form.userId=*&form.entityType=*&form.verb=*&form.span=1&descLimit="+descLimit+"&Sev="+severity+"&startTime="+StartTime+"&endTime="+EndTime+""+"&gadgetUrl="+gadgetUrl);
	}		
	if (alertNme === "Async Apex Executions Limit - ProM") {
		window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/search/search?q=search%20index%3D"+Instance+"%20organizationId%3DCASE("+OrgId+")%20%60logRecordType(axapx)%60%20(quiddity%3DA%20OR%20quiddity%3DS%20OR%20quiddity%3DF%20OR%20quiddity%3DQ%20OR%20quiddity%3DBA)%20%7C%20stats%20count%20by%20userId%2C%20quiddity%2C%20entryPoint&display.page.search.mode=verbose&dispatch.sample_ratio=1&earliest=-24h%40h&latest=now&display.page.search.tab=statistics&display.general.type=statistics&sid=1591892876.5159_0A9FE866-1978-49A6-A934-1894E0A7A1F8");
	
	}
	if (alertNme === "Async Apex Executions Limit - ProM") {

		window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/publicSharing/publicotherdash_support__async_apex?earliest="+st+"&latest="+et+"&form.instance="+Instance+"&form.organizationId="+OrgId+"&form.userId=*&form.entityType=*&form.verb=*&form.span=1h&severity="+severity);	
	}
	/*if (alertNme === "Daily Single Email Limit - ProM") {
		window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/search/search?q=search%20index%3D"+Instance+"%20organizationId%3DCASE("+OrgId+")%20earliest%3D"+dt0+"%20latest%3D"+dt2+"%20%60logRecordType(emout)%60%20category%3DapiSingleMail%20%7C%20stats%20count%20sum(recipientCount)%20as%20recipients%20by%20userId%2C%20category&display.page.search.mode=verbose&dispatch.sample_ratio=1&earliest=-15m&latest=now&display.page.search.tab=statistics&display.general.type=statistics&sid=1591893929.5374_0A9FE866-1978-49A6-A934-1894E0A7A1F8");
		window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/publicSharing/prom_daily_single_limit_dashboard_E_v1?form.email=single&form.instance="+Instance+"&form.orgId="+OrgId+"&form.cat=NONUSER&form.to=*&form.span=1h&form.field1.earliest="+st0+"&form.field1.latest="+et+"&severity="+severity+"&gadgetUrl="+gadgetUrl); 
	}*/

	if (alertNme ==="Daily Single Email Limit - ProM" & (severity==="Critical" || severity==="Warning" )) {
        window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/publicSharing/prom_daily_single_limit_dashboard_v1?form.email=single+&form.instance="+Instance+"&form.orgId="+OrgId+"&form.span=1m&singleemail="+singleemail+"&severity="+severity+"&form.field1.earliest="+st0+"&form.field1.latest="+et+"&gadgetUrl="+gadgetUrl);
	
    }
    if (alertNme ==="Daily Single Email Limit - ProM" & severity==="Exhausted") {
        window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/publicSharing/prom_daily_single_limit_dashboard_E_v1?form.email=single+&form.instance="+Instance+"&form.orgId="+OrgId+"&form.span=1m&singleemail="+singleemail+"&severity="+severity+"&form.field1.earliest="+st0+"&form.field1.latest="+et+"&gadgetUrl="+gadgetUrl);
	}

	if(alertNme ==="Hourly Time Based Workflow Limit - ProM" & severity==="Exhausted"){
		//window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/search/search?q=search%20index%3D"+Instance+"%20organizationId%3DCASE("+OrgId+")%20earliest%3D"+dt0+"%20latest%3D"+dt2+"%20%60logRecordType(wftqm)%60%20type%3D%22PROC%22&display.page.search.mode=verbose&dispatch.sample_ratio=1&earliest=-15m&latest=now&display.page.search.tab=statistics&display.general.type=statistics&sid=1591894494.5530_0A9FE866-1978-49A6-A934-1894E0A7A1F8");
		window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/publicSharing/prom_hourly_time_based_workflow_limit_E_v2?earliest="+st+"&latest="+et+"&form.instance="+Instance+"&form.organizationId="+OrgId+"&form.span=1m&workflow="+workflow+"&severity="+severity+"&gadgetUrl="+gadgetUrl);
		
	}	
    else if (alertNme ==="Hourly Time Based Workflow Limit - ProM" & (severity==="Critical" || severity==="Warning" )) {
		window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/publicSharing/prom_hourly_time_based_workflow_limit_WC_v2?earliest="+st+"&latest="+et+"&form.instance="+Instance+"&form.organizationId="+OrgId+"&form.span=1m&workflow="+workflow+"&severity="+severity+"&now="+now+"&gadgetUrl="+gadgetUrl);
	}

	if(alertNme ==="API Request Limit - ProM"){
		window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/search/search?q=search%20index%3D"+Instance+"%20organizationId%3DCASE("+OrgId+")%20%60logRecordType(A%2Ca%2Capars%2Caprst%2Capaaa)%60%20%7C%20stats%20count%20sum(runTime)%20as%20sumRunTime%20by%20userId%2C%20logRecordType&display.page.search.mode=verbose&dispatch.sample_ratio=1&earliest=-24h%40h&latest=now&display.page.search.tab=statistics&display.general.type=statistics&sid=1592530530.68472_15EC059F-E464-4A31-B134-B7081045AD82");
	}
	if(alertNme ==="Streaming API Limit - ProM"){
		window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/publicSharing/support_streaming_api?form.instance="+Instance+"&form.organizationId="+OrgId+"&earliest=-24h%40h&latest=now&form.span=1h");
	}
	if(alertNme ==="Durable Streaming API Limit - ProM"){
		window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/search/search?q=search%20index%3D"+Instance+"%20%60logRecordType(mxdel)%60%20organizationId%3DCASE("+OrgId+")%20earliest%3D-24h%20%7C%20timechart%20span%3D1h%20sum(numDelivered)%20%7C%20addColTotals&earliest=-24h%40h&latest=now&display.page.search.mode=verbose&dispatch.sample_ratio=1&display.page.search.tab=statistics&display.general.type=statistics&sid=1596175313.19423_15EC059F-E464-4A31-B134-B7081045AD82");
	}
	if(alertNme ==="Daily Mass Email Limit - ProM"){
		window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/search/search?q=search%20index%3D"+Instance+"%20organizationId%3DCASE("+OrgId+")%20earliest%3D"+dt0+"%20latest%3D"+dt2+"%20%60logRecordType(m)%60&display.page.search.mode=verbose&dispatch.sample_ratio=1&earliest=-15m&latest=now&display.page.search.tab=events&display.general.type=events&sid=1592535944.69126_15EC059F-E464-4A31-B134-B7081045AD82");
		window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/publicSharing/publicotherdash_apex_email?form.email=mass&form.instance="+Instance+"&form.orgId="+OrgId+"&form.cat=NONUSER&form.to=*&form.span=1h&form.field1.earliest="+st0+"&form.field1.latest="+et+"");
	}
	if(alertNme ==="Hourly OData XDS Callouts Limit - ProM"){
		window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/search/search?q=search%20index%3D"+Instance+"%20organizationId%3DCASE("+OrgId+")%20%60logRecordType(xdodq)%60%20earliest%3D"+dt1+"%20latest%3D"+dt2+"%20%7C%20stats%20count%20avg(totalMs)%20as%20avgTotalMs%20by%20entity%2C%20userId&sid=1596172666.18701_15EC059F-E464-4A31-B134-B7081045AD82&display.page.search.mode=verbose&dispatch.sample_ratio=1&earliest=-15m&latest=now&display.page.search.tab=statistics&display.general.type=statistics");
	}
	if(alertNme ==="Daily Workflow Email Limit - ProM"){
		window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/search/search?q=search%20index%3D"+Instance+"%20organizationId%3DCASE("+OrgId+")%20earliest%3D"+dt0+"%20latest%3D"+dt2+"%20%60logRecordType(wfemm)%60%20%7C%20stats%20count%20by%20refId");
		window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/publicSharing/publicotherdash_apex_email?form.email=wf&form.instance="+Instance+"&form.orgId="+OrgId+"&form.cat=NONUSER&form.to=*&form.span=1h&form.field1.earliest="+st0+"&form.field1.latest="+et+"");
	} 
	if(alertNme ===""){
		//window.open();
	}
	
	
	//<== ******** LanguageLine  Alerts related Splunk **********==>//
	if (alertNme === "MCS LanguageLine Workflow") {
		var PrimaryInstance = document.getElementById('counter-Instance').value;
		var PrimaryOrgId = document.getElementById('counter-Organization-ID').value;
		//var SecondaryInstance = document.getElementById('secondary-instance').value;
		window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/publicSharing/publicotherdash_support__concurrent_apex_dashboard?earliest="+st+"&latest="+et+"&form.instance="+PrimaryInstance+"%20&form.organizationId="+PrimaryOrgId+"&form.span=1m");
		window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/publicSharing/language_line_class_performance?form.field2.earliest="+st+"&form.field2.latest="+et+"&form.field3.earliest="+st+"&form.field3.latest="+et+"");
	}

	if (alertNme === "Apex CPU Timeout Exception Errors - ProM") {

		window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/publicSharing/prom_apex_cpu_timeout_exception_clone?earliest="+st+"&latest="+et+"&form.instance="+Instance+"&form.organizationId="+OrgId+"&form.userId=*&form.entityType=*&form.verb=*&form.span=1h&severity="+severity+"&gadgetUrl="+gadgetUrl);	
	}
	
	
	/*console.log(alertNme);
	console.log(OrgId);
	console.log(Instance);
	console.log(StartTime);
	console.log(EndTime);
	console.log(name);
	console.log(dt1,dt2);
	alert(alertNme);*/
	
//******************************************END***************************************//