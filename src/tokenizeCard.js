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
            url = 'https://httpbin.org/post';
            break;
        case 'DEV':
            url = 'http://localhost/v1/card/authenticate';
            break;
        case 'LIVE':
            url = 'https://secure.smart2pay.com/v1/card/authenticate';
            break;
        case 'TEST':
        default:
            url = 'https://securetest.smart2pay.com/v1/card/authenticate';
            break;
    }

    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Authorization', 'Basic ' + apiKey);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;

        if ([200, 201].indexOf(xhr.status) === -1) {
            errCallback(xhr.status, 'HTTP error... ' + xhr.statusText);
            return;
        }

        try {
            var token = JSON.parse(xhr.responseText).CardAuthentication.CreditCardToken.Value;
            callback(token);
        }
        catch {
            errCallback(500, 'reponse object not ok');
        }
    }
    if (xhr.readyState === XMLHttpRequest.DONE) return;
    xhr.send(postData);
};


// USAGE:

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