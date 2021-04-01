function tokenizeCard(paramsObj) {
    "use strict";

    var apiKey = paramsObj.apiKey;
    var environment = paramsObj.environment;
    var postData = JSON.stringify(paramsObj.cardDetails);
    var callback = paramsObj.handleRequest;
    var errCallback = paramsObj.handleError;

    var url = '';
    switch (environment) {
        case 'DEBUG':
        case 'debug':
            url = 'https://jsonplaceholder.typicode.com/posts/1';
            break;
        case 'DEV':
        case 'dev':
            url = 'http://localhost/v1/card/authenticate';
            break;
        case 'LIVE':
        case 'live':
            url = 'https://secure.smart2pay.com/v1/card/authenticate';
            break;
        case 'TEST':
        case 'test':
        default:
            url = 'https://securetest.smart2pay.com/v1/card/authenticate';
            break;
    }

    var req = new XMLHttpRequest();
    if (!req) {
        errCallback(400, 'XMLHttpRequest() object missing! Is JavaScript enabled?');
        return;
    }
    req.open('POST', url, true);
    req.setRequestHeader('Authorization', 'Basic ' + apiKey);
    if (postData)
        req.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    req.onreadystatechange = function () {
        if (req.readyState != XMLHttpRequest.DONE) return;

        if ([200, 201].indexOf(req.status) === -1) {
            errCallback(req.status, 'HTTP error...');
            return;
        }

        callback(JSON.parse(req.responseText).CardAuthentication.CreditCardToken.Value);
    }
    if (req.readyState == 4) return;
    req.send(postData);
};


// usage:
function handleRequest(CreditCardToken) {
    // use received 'CreditCardToken'
    console.log(CreditCardToken);
}

function handleError(HttpStatusCode, errorText) {
    // handle error
    console.log(HttpStatusCode, errorText);
}

tokenizeCard({
    "apiKey": apiKey, 
    "environment": environment,
    "cardDetails": cardDetails,
    "handleRequest": handleRequest,
    "handleError": handleError,
});