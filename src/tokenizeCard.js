function tokenizeCard(paramsObj) {
    "use strict";

    var apiKey = paramsObj.apiKey;
    var postData = JSON.stringify(paramsObj.cardDetails);
    var callback = paramsObj.handleRequest;
    var errCallback = paramsObj.handleError;
    const url = (function (env) {
        switch (env) {
            case 'DEV': return 'http://localhost/v1/card/authenticate';
            case 'LIVE': return 'https://secure.smart2pay.com/v1/card/authenticate';
            case 'TEST':
            default: return 'https://securetest.smart2pay.com/v1/card/authenticate';
        }
    })(paramsObj.environment);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Authorization', 'Basic ' + apiKey);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;

        if ([200, 201].indexOf(xhr.status) === -1) {
            errCallback(xhr.status, xhr.statusText);
            return;
        }

        try {
            var token = JSON.parse(xhr.responseText).CardAuthentication.CreditCardToken.Value;
            if (!token)
                errCallback(500, 'Token not found inside response');
            else
                callback(token);
        }
        catch {
            errCallback(500, 'Reponse object not ok');
        }
    }
    if (xhr.readyState === XMLHttpRequest.DONE) return;
    xhr.send(postData);
};