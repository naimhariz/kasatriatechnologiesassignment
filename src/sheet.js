let SHEET_ID = '10IhfVAf5n_fVRMwJZ0xrwgrOvBpd-0gHXmuRJPT4AZA';
let SHEET_TITLE = 'Data Template';
let SHEET_RANGE = 'A2:F';
let API_KEY = 'AIzaSyBcQFE4rSY48ICP04QBdMflBf768Z2RDrU';

export function googlesheet() {
    const apiKey = API_KEY;  // Please set your API key.
    return new Promise((resolve, reject) => {
        gapi.load('client', () => {
            gapi.client.setApiKey(apiKey);
            gapi.client.load('sheets', 'v4', () => {
                gapi.client.sheets.spreadsheets.values.get({
                spreadsheetId: SHEET_ID,
                range: 'A2:F',
                }).then(res => {
                    const value1 = res.result.values;
                    resolve(value1);
                }).catch(err => {
                    reject(err);
                });
            });
        });
    });
}