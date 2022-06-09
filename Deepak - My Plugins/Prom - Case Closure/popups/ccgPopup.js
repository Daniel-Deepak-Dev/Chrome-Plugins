const ORGCS_URL = 'https://orgcs.my.salesforce.com';

let orgcsSessionId;
let currentPageCaseId;



//get orgcs SessionId
function setSessionID() {
    return new Promise(resolve => {
        let cookieDetails = { url: ORGCS_URL, name: 'sid' };
        chrome.cookies.get(cookieDetails, async (cookie) => {
            console.log(cookie.value);
            orgcsSessionId = cookie.value
            debugger;
            resolve();
        });
    });
}

//get Current Page Case Id from url
function setCurrentPageCaseId() {
    return new Promise(resolve => {
        let queryOptions = { active: true, currentWindow: true };
        chrome.tabs.query(queryOptions, tabs => {
            debugger;
            let url = tabs[0].url;
            url = new URL(url);
            let directories = url.pathname.split('/');
            currentPageCaseId = directories.find(dir => dir.startsWith('500'));
            resolve();
        });
    });
}

//get latest okay comment
function getLastOkayComments(currentPageCaseId) {
    return new Promise(resolve => {
        let connection = new jsforce.Connection({
            serverUrl: ORGCS_URL,
            sessionId: orgcsSessionId,
        });

        connection.identity((error, response) => {
            debugger;
        });
    });
}

(async () => {
    await setSessionID();
    await setCurrentPageCaseId();
    await getLastOkayComments(currentPageCaseId);
})();



//get first comment

// @sourceURL=popup.js