let orgcs_SESSION_ID;
let dateTime;
let noOfCasesForGho = 0;
let noOfCasesTotal = 0;
let noOfCasesCommented = 0;
let ownersAllCases;
let ownersCommentedCases;
let eligibleCases = new Set ();

const caseIds = new Set ();

//Helper function to get orgcs SessionId
function getSessionIds () {
  getCookies ('https://orgcs.my.salesforce.com', 'sid', function (cookie) {
    orgcs_SESSION_ID = cookie.value;
    console.log ('orgcs_SESSION_ID' + orgcs_SESSION_ID);
  });
}

//Helper function to get cookies (used to get sessionID's
function getCookies (domain, name, callback) {
  chrome.cookies.get ({url: domain, name: name}, function (cookie) {
    if (cookie) {
      if (callback) {
        callback (cookie);
      }
    }
  });
}

document.addEventListener ('DOMContentLoaded', function () {
  getSessionIds ();

  chrome.tabs.query ({active: true, currentWindow: true}, function (tabs) {
    var url = tabs[0].url;
    document.getElementById ('loader').style.display = 'none';
    document.getElementById ('caseListTable').style.display = 'none';
    document.getElementById ('noCases').style.display = 'none';
    document.getElementById ('errorArea').style.display = 'none';
    document.getElementById ('sldsSuccess').style.display = 'none';
    document.getElementById ('spinner').style.display = 'none';
    document.getElementById ('errorBox').style.display = 'none';
    document.getElementById ('errorMsg').style.display = 'none';
    document.getElementById ('ghoInfo').style.display = 'none';

    n = new Date ();
    y = n.getFullYear ();
    m = n.getMonth () + 1;
    d = n.getDate ();
    document.getElementById ('date3').innerHTML = m + '/' + d + '/' + y;

    let getCasesButton = document.getElementById ('getCases');
    getCasesButton.addEventListener ('click', function () {
      getEligibleCases ();
      document.getElementById ('spinner').style.display = 'block';
    });

    //console.log(genericText);
    document.getElementById ('addGHO').addEventListener ('click', () => {
      document.getElementById ('spinner').style.display = 'block';
      addGHO (eligibleCases);
    });
  });
});

//function to get Case Details of Cases eligible for Default GHO (Cases were user HASNOT commented during the shift)
function getEligibleCases () {
  let conn = new jsforce.Connection ({
    serverUrl: 'https://orgcs.my.salesforce.com',
    sessionId: orgcs_SESSION_ID,
  });

  conn.identity (function (err, res) {
    if (err) {
      addError (
        'Error! Session expired for orgcs. Please Login again and refresh the page.',
        null
      );
      document.getElementById ('loader').style.display = 'none';
    }

    //fetching all PROM cases of curent owner
    var userId = res.user_id;
    return conn
      .query (
        "SELECT ID FROM CASE WHERE OwnerId='" +
          userId +
          "'" +
          " AND IsClosed=false AND Reason='Proactive Monitoring' AND  General_Application_Area__c='Alerts - Core' Order by CreatedDate Desc LIMIT 9999 ",
        (err, res) => {
          if (err) {
            addError (err);
            document.getElementById ('loader').style.display = 'none';
          }

          ownersAllCases = res.records;
        }
      )
      .then (() => {
        var today = new Date ();
        dateTime = new Date (
          today.getTime () - 1000 * 60 * 60 * 8
        ).toISOString ();

        conn
          .query (
            'SELECT ParentId, Parent.CaseNumber FROM  CaseComment WHERE CreatedDate >' +
              dateTime +
              " AND  ( CreatedById ='" +
              userId +
              "') AND Parent.IsClosed=false AND Parent.Reason='Proactive Monitoring' AND  Parent.General_Application_Area__c='Alerts - Core'  AND (Parent.ownerId='" +
              userId +
              "') Order by CreatedDate Desc LIMIT 9999 ",
            (err, res) => {
              if (err) {
                addError (err);
                document.getElementById ('loader').style.display = 'none';
              }

              ownersCommentedCases = res.records;
            }
          )
          .then (() => {
            let eligibleCount = 0;

            let caseIdFromAllCaseList = [];
            let caseIdFromCommentedCaseList = [];
            let caseCommentSet = new Set ();
            let caseNumSet = new Set ();

            ownersAllCases.forEach (element => {
              caseIdFromAllCaseList.push (element.Id);
            });
            ownersCommentedCases.forEach (element => {
              caseIdFromCommentedCaseList.push (element.ParentId);
              caseCommentSet.add (element.ParentId);
              caseNumSet.add (element.Parent.CaseNumber);
            });

            //console.log(caseNumSet);
            document.getElementById (
              'commentedCaseNumbers'
            ).innerText = new Array (...caseNumSet).join (' ');

            noOfCasesTotal = caseIdFromAllCaseList.length;
            noOfCasesCommented = caseCommentSet.size;
            document.getElementById (
              'noOfCasesTotal'
            ).innerText = noOfCasesTotal;
            document.getElementById (
              'noOfCasesCommented'
            ).innerText = noOfCasesCommented;
            noOfCasesForGho = noOfCasesTotal - noOfCasesCommented;
            document.getElementById (
              'noOfCasesForGho'
            ).innerText = noOfCasesForGho;
            document.getElementById ('ghoInfo').style.display = 'block';
            document.getElementById ('ghoInfo').innerText =
              'Note: GHO template will be added to ' +
              noOfCasesForGho +
              ' cases';

            caseIdFromAllCaseList.forEach (c => {
              if (!caseIdFromCommentedCaseList.includes (c)) {
                eligibleCount++;
                eligibleCases.add (c);
              }
            });
            document.getElementById ('spinner').style.display = 'none';
          });
      });
  });
}

//helper function to add generic GHO comment to cases -
function addGHO (caseIds) {
  let conn = new jsforce.Connection ({
    serverUrl: 'https://orgcs.my.salesforce.com',
    sessionId: orgcs_SESSION_ID,
  });
  let caseIdArray = new Array (...caseIds);
  let updateCount = 0;
  let errorCount = 0;
  conn.identity ((err, res) => {
    if (err) {
      addError (
        'Error! Session expired for orgcs. Please Login again and refresh the page.',
        null
      );
    }

    if (
      document.getElementById ('addGHOTemplateText') != null &&
      document.getElementById ('addGHOTemplateText').value.length > 0
    ) {
      genericText = document.getElementById ('addGHOTemplateText').value;
    } else {
      console.log ('Inside else');
      document.getElementById ('errorBox').style.display = 'block';
      document.getElementById ('errorMsg').innerText =
        'Please add a GHO template or message.';
      document.getElementById ('spinner').style.display = 'none';
      return;
    }

    //console.log(caseIdArray);

    let obj = [];

    caseIdArray.forEach (element => {
      let a = {};
      a['ParentId'] = element;
      a['CommentBody'] = genericText;
      obj.push (a);
    });
    //console.log(obj);

    // make a rest api call to CaseComment to post generic comment
    conn
      .sobject ('CaseComment')
      .create (obj, {allowRecursive: true}, function (err, rets) {
        if (err) {
          errorCount++;
          return console.error (err);
        }
        for (var i = 0; i < rets.length; i++) {
          if (rets[i].success) {
            updateCount++;
            //console.log("Created record id : " + rets[i].id);
          }
        }
        document.getElementById ('sldsSuccess').style.display = 'block';
        document.getElementById ('successText').innerText =
          'Cases updated ' +
          updateCount +
          '. Cases Failed to update:' +
          errorCount;
        document.getElementById ('spinner').style.display = 'none';
      });
  });
}

//function to add errors
function addError (errorString, error) {
  let errorHeader = document.getElementById ('errorHeader');
  document.getElementById ('errorArea').style.display = 'block';

  if (error) {
    errorHeader.innerHTML = errorString + '\n' + 'Error: ' + error.toString ();
  } else {
    errorHeader.innerHTML = errorString;
  }
}
