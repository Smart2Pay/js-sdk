function tokenizeCard_promise(paramsObj) {
    "use strict";
    const apiKey = paramsObj.apiKey;
    const postData = JSON.stringify(paramsObj.cardDetails);
    const url = (env => {
        switch (env) {
            case 'DEV': return 'http://localhost/v1/card/authenticate';
            case 'LIVE': return 'https://secure.smart2pay.com/v1/card/authenticate';
            case 'TEST':
            default: return 'https://securetest.smart2pay.com/v1/card/authenticate';
        }
    })(paramsObj.environment);

    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Authorization', 'Basic ' + apiKey);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        xhr.onload = function () {
            if ([200, 201].indexOf(xhr.status) === -1) {
                reject({ status: xhr.status, statusText: xhr.statusText });
            }

            try {
                const token = JSON.parse(xhr.responseText).CardAuthentication.CreditCardToken.Value;
                if (!token)
                    reject({ status: 500, statusText: 'Token not found inside response object' });
                else
                    resolve(token);
            }
            catch {
                reject({ status: 500, statusText: 'Reponse object not ok' });
            }
        };
        xhr.onerror = function () {
            reject({ status: xhr.status, statusText: xhr.statusText });
        };
        xhr.send(postData);
    });
}