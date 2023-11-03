// App Credentials
const client_id = '958979983394-ejrcpvpf7n081ed38l6n5pqmplttpnnq.apps.googleusercontent.com'; // Replace the vakue with your Google API Client ID
const api_key = 'AIzaSyBcQFE4rSY48ICP04QBdMflBf768Z2RDrU'; // Replace the vakue with your Google API key
 
// Discovery doc URL for APIs used by the quickstart
const DISCOVERY_DOC = 'https://sheets.googleapis.com/$discovery/rest?version=v4';
 
// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly';
 
let ClientToken;
// let GAPI_init = false;
// let GIS_init = false;
 
const dataSheetCard = document.getElementById('dataSheetCard')
const signin_btn = document.getElementById('signin_btn')
const signout_btn = document.getElementById('signout_btn')
 
signin_btn.style.display = 'none'
signout_btn.style.display = 'none'
dataSheetCard.style.display = 'none'
 
/**
* Callback after the API client is loaded. Loads the
* discovery doc to initialize the API.
*/
async function intializeGapiClient() {
    await gapi.client.init({
        apiKey: api_key,
        discoveryDocs: [DISCOVERY_DOC],
    });
    GAPI_init = true;
    enableButtons();
}
 
/**
    * Enables user interaction after all libraries are loaded.
    */
function enableButtons() {
    if (GAPI_init && GIS_init) {
        signin_btn.style.display = 'block'
    }
}
 
function GAPILoaded() {
    gapi.load('client', intializeGapiClient);
}
 
 
/**
    * Callback after Google Identity Services are loaded.
    */
function GSILoaded() {
    ClientToken = google.accounts.oauth2.initTokenClient({
        client_id: client_id,
        scope: SCOPES,
        callback: '', // defined later
    });
    GIS_init = true;
    enableButtons();
}
 
 
 
/**
    *  Sign in the user upon button click.
    */
function GAuth() {
    ClientToken.callback = async (resp) => {
        if (resp.error !== undefined) {
            throw (resp);
        }
        signout_btn.style.display = 'block';
        signin_btn.innerText = 'Refresh Authorization';
        dataSheetCard.style.display = 'block'
        // await listMajors();
        await displaySheetData();
    };
 
    if (gapi.client.getToken() === null) {
        // Prompt the user to select a Google Account and ask for consent to share their data
        // when establishing a new session.
        ClientToken.requestAccessToken({ prompt: 'consent' });
    } else {
        // Skip display of account chooser and consent dialog for an existing session.
        ClientToken.requestAccessToken({ prompt: '' });
    }
}
 
 
/**
    * Display some content of spreedsheet
    * https://docs.google.com/spreadsheets/d/1E3674wpJdfrCS1uEu7sHu3ALHciDnsBFQlEdx-XdknU/edit
    */
async function displaySheetData() {
    let response;
    try {
        // Fetch first 10 files
        response = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: '10IhfVAf5n_fVRMwJZ0xrwgrOvBpd-0gHXmuRJPT4AZA',
            range: 'Data Template!A1:E',
        });
    } catch (err) {
        console.log(err)
        document.getElementById('err_msg').innerText = err.message;
        document.getElementById('err_msg').style.display = 'block'
        return;
    }
    const range = response.result;
    if (!range || !range.values || range.values.length == 0) {
        document.getElementById('err_msg').innerText = 'No values found.';
        document.getElementById('err_msg').style.display = 'block'
        return;
    }
 
    document.getElementById('contentTable').innerHTML = '';
    var tr = document.createElement('tr')
    /**
        * Table Header
        */
    var thead = document.createElement('thead')
 
    if (!!range.values[0]) {
        var head_tr = tr.cloneNode(true)
        Object.keys(range.values[0]).map(k => {
            var column = range.values[0][k]
            head_tr.innerHTML += `<th>${column}</th>`;
        })
        thead.appendChild(head_tr)
        document.getElementById('contentTable').appendChild(thead)
    }
 
    /**
        * Table body
        */
    var tbody = document.createElement('tbody')
 
    Object.keys(range.values).map(k => {
        if (k != 0) {
            var body_tr = tr.cloneNode(true)
            var rows = range.values[k]
            rows.map(column => {
                body_tr.innerHTML += `<td>${column}</td>`;
            })
            tbody.appendChild(body_tr)
        }
    })
    document.getElementById('contentTable').appendChild(tbody)
 
}
 
 
/**
    * Reload Data Sheed
    */
 
function ReloadDataSheet(){
    displaySheetData();
}
 
 
/**
    *  Sign out the user upon button click.
    */
function GAuthSignout() {
    token = gapi.client.getToken();
    if (token !== null) {
        google.accounts.oauth2.revoke(token.access_token);
        gapi.client.setToken('');
        signin_btn.innerText = 'Sign In';
        signout_btn.style.display = 'none';
        dataSheetCard.style.display = 'none'
    }
}