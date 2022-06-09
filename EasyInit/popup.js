let orgcs_SESSION_ID;

//Helper function to get orgcs SessionId
function getSessionIds () {
  getCookies ('https://orgcs.my.salesforce.com', 'sid', function (cookie) {
    orgcs_SESSION_ID = cookie.value;
    //console.log("orgcs_SESSION_ID" + orgcs_SESSION_ID);
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

//Step 1 -> establish and check the session
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

    let result = url.slice (51, 69);

    //console.log(result);

    document
      .getElementById ('generateComment')
      .addEventListener ('click', () => {
        document.getElementById ('spinner').style.display = 'block';
        getLatestComments (result);
      });
  });
});

//Step 2 -> fetch the latest 3 comments on the case
function getLatestComments (parentId) {
  let conn = new jsforce.Connection ({
    serverUrl: 'https://orgcs.my.salesforce.com',
    sessionId: orgcs_SESSION_ID,
  });

  conn.identity ((err, res) => {
    if (err) {
      addError (
        'Error! Session expired for orgcs. Please Login again and refresh the page.',
        null
      );
      document.getElementById ('loader').style.display = 'none';
    }
    //org62 id was -> 0050M00000C8XLnQAN
    conn.query (
      "SELECT Parent.CaseNumber, Parent.CaseReportingTaxonomy__c , CommentBody,CreatedDate FROM  CaseComment WHERE ParentId = '" +
        parentId +
        "' AND CreatedById ='005Hx000001Q2FJIA0' AND Parent.IsClosed=false AND Parent.Cloud__c = 'Platform-Proactive Monitoring' ORDER BY CreatedDate DESC LIMIT 3",
      (err, res) => {
        if (err) {
          console.log (err);
        }

        console.log (res);
        //received response, now extract the info from it

        let commentsInfo = [];
        let commentText = '';

        //createing and populating the commentInfo obj with the data received from response
        res.records.forEach (element => {
          commentsInfo.push ({
            AlertType: element.Parent.CaseReportingTaxonomy__c,
            CommentBody: element.CommentBody,
            EvaluatedAt: null,
            Severity: null,
            orgId: null,
            gadgetURL: null,
          });
        });

        // fetching the name field from CaseReportingTaxonomy__c to populated the alert name, setting values of other fields also
        commentsInfo.forEach (comment => {
          conn
            .sobject ('CaseReportingTaxonomy__c')
            .retrieve (comment.AlertType, (err, data) => {
              if (err) return console.error (err);
              comment.AlertType = data.Name;
              commentData = comment.CommentBody.split (' ');
              severityIndex = commentData.indexOf ('Alert\n\nSeverity:');
              evaluatedAtIndex = commentData.indexOf ('At:');
              trimIndex = commentData[severityIndex + 1].indexOf ('\n');
              comment.orgId = commentData[1].substring (0, 15);
              comment.Severity = commentData[severityIndex + 1].substring (
                0,
                trimIndex
              );
              comment.EvaluatedAt =
                commentData[evaluatedAtIndex + 1] +
                ' ' +
                commentData[evaluatedAtIndex + 2] +
                ' ' +
                ' UTC';
              gadgetURLIndex = commentData.indexOf ('Details:');
              comment.gadgetURL = commentData[gadgetURLIndex + 1].substring (
                0,
                commentData[gadgetURLIndex + 1].indexOf ('\n')
              );
              console.log (commentsInfo);

              //info extraction complete and captured in commentsInfo, now apply logic to determine severity and generate automated comment

              commentText = generateAutomatedComment (commentsInfo);

              console.log (commentText);

              // populate the textarea in html with the generated comment, user will have the option to edit the text if they want
              document.getElementById ('automatedComment').innerHTML =
                '' + commentText.text + '';
              document.getElementById ('spinner').style.display = 'none';

              // post comment on the case on button click
              document
                .getElementById ('postComment')
                .addEventListener ('click', () => {
                  document.getElementById ('spinner').style.display = 'block';
                  postCommentOnCase ({
                    gadgetURL: commentText.gadgetURL,
                    text: document.getElementById ('automatedComment').value,
                  });
                });
            });
        });
      }
    );
  });
}

//Step 3 -> grab the 3 dynamic parameters from the CaseComment -> 1. Alert Name 2. Severity 3. EvaluationTime 4. Org Id
function extractInformation (res) {
  commentsInfo = [];
  res.records.forEach (element => {
    commentsInfo.push ({
      AlertType: element.Parent.CaseReportingTaxonomy__c,
      CommentBody: element.CommentBody,
      EvaluatedAt: null,
      Severity: null,
      orgId: null,
      gadgetURL: null,
    });
  });
  //console.log (commentsInfo);

  commentsInfo.forEach (comment => {
    let con = new jsforce.Connection ({
      serverUrl: 'https://orgcs.my.salesforce.com',
      sessionId: orgcs_SESSION_ID,
    });
    con.identity ((err, res) => {
      if (err) return console.error (err);
      con
        .sobject ('CaseReportingTaxonomy__c')
        .retrieve (comment.AlertType, (err, data) => {
          if (err) return console.error (err);
          comment.AlertType = data.Name;
          commentData = comment.CommentBody.split (' ');
          severityIndex = commentData.indexOf ('Alert\n\nSeverity:');
          evaluatedAtIndex = commentData.indexOf ('At:');
          trimIndex = commentData[severityIndex + 1].indexOf ('\n');
          comment.orgId = commentData[1].substring (0, 15);
          comment.Severity = commentData[severityIndex + 1].substring (
            0,
            trimIndex
          );
          comment.EvaluatedAt =
            commentData[evaluatedAtIndex + 1] +
            ' ' +
            commentData[evaluatedAtIndex + 2] +
            ' ' +
            ' UTC';
          gadgetURLIndex = commentData.indexOf ('Details:');
          comment.gadgetURL = commentData[gadgetURLIndex + 1].substring (
            0,
            commentData[gadgetURLIndex + 1].indexOf ('\n')
          );
        });
    });
  });

  return commentsInfo;
}

//Step 4 -> generate the automated comment
function generateAutomatedComment (alerts) {
  alertToBeUpdated = {};

  alerts.forEach (alert => {
    if (alert.Severity.toLowerCase () == 'exhausted') {
      alertToBeUpdated = alert;
    } else if (alert.Severity.toLowerCase () == 'critical') {
      if (
        alertToBeUpdated.EvaluatedAt == undefined ||
        alertToBeUpdated.EvaluatedAt < alert.EvaluatedAt
      ) {
        alertToBeUpdated = alert;
      }
    } else if (alert.Severity.toLowerCase () == 'warning') {
      if (
        alertToBeUpdated.EvaluatedAt == undefined ||
        alertToBeUpdated.EvaluatedAt < alert.EvaluatedAt
      ) {
        alertToBeUpdated = alert;
      }
    }
  });

  commentText = {
    gadgetURL: alertToBeUpdated.gadgetURL,
    text: null,
  };

  if (document.getElementById ('newCaseCheckbox').checked) {
    commentText.text =
      'Hi Team,\n\n' +
      'THIS IS A NEW PROACTIVE MONITORING CASE\n\n' +
      'We have received a ' +
      alertToBeUpdated.AlertType +
      ' alert which is a ' +
      alertToBeUpdated.Severity +
      ' alert for your org: ' +
      alertToBeUpdated.orgId +
      ' Evaluated At: ' +
      alertToBeUpdated.EvaluatedAt +
      '\n\n' +
      'We are investigating the details and will update you shortly.\n\n' +
      'Regards,\n' +
      'Proactive Monitoring Team | Salesforce';
  } else {
    commentText.text =
      'Hi Team,\n\n' +
      'We have received a ' +
      alertToBeUpdated.AlertType +
      ' alert which is a ' +
      alertToBeUpdated.Severity +
      ' alert for your org: ' +
      alertToBeUpdated.orgId +
      ' Evaluated At: ' +
      alertToBeUpdated.EvaluatedAt +
      '\n\n' +
      'We are investigating the details and will update you shortly.\n\n' +
      'Regards,\n' +
      'Proactive Monitoring Team | Salesforce';
  }

  return commentText;
}

//Step 5 -> post the automated public comment on the case
function postCommentOnCase (commentText) {
  chrome.tabs.query ({active: true, currentWindow: true}, function (tabs) {
    var url = tabs[0].url;

    let caseId = url.slice (51, 69);

    let conn = new jsforce.Connection ({
      serverUrl: 'https://orgcs.my.salesforce.com',
      sessionId: orgcs_SESSION_ID,
    });

    conn.identity ((err, res) => {
      if (err) {
        addError (
          'Error! Session expired for orgcs. Please Login again and refresh the page.',
          null
        );
      }
      conn.sobject ('CaseComment').create ({
        ParentId: caseId,
        CommentBody: commentText.text,
        IsPublished: true,
      }, (err, res) => {
        if (err) {
          addError ('Error! Unable to add comment.', err);
        }
        console.log (res);
        document.getElementById ('sldsSuccess').style.display = 'block';
        document.getElementById ('successText').innerText = 'Case updated ';
        document.getElementById ('spinner').style.display = 'none';
        if (document.getElementById ('openGadgetCheckbox').checked) {
          chrome.tabs.create ({url: commentText.gadgetURL});
        }
        window.setTimeout (window.close (), 2000);
      });
    });
  });
}

//util function to fetch the case product feature
function getProductFeature (alertTypeId) {
  var productFeature = '';
  let con = new jsforce.Connection ({
    serverUrl: 'https://orgcs.my.salesforce.com',
    sessionId: orgcs_SESSION_ID,
  });
  con.identity ((err, res) => {
    if (err) return console.error (err);
    con
      .sobject ('CaseReportingTaxonomy__c')
      .retrieve (alertTypeId, (err, data) => {
        if (err) return console.error (err);
        console.log (data.Name);
        return data.Name;
      });
  });
}
