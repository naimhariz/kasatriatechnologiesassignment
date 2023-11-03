let API_KEY = 'AIzaSyBcQFE4rSY48ICP04QBdMflBf768Z2RDrU';

function handleClientLoad() {
    const apiKey = API_KEY;  // Please set your API key.
    
    return new Promise((resolve, reject) => {
        gapi.load('client', () => {
            gapi.client.setApiKey(apiKey);
        });
    });
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
    document.location.href="index.html";    
}

