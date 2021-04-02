async function tokenizeCard_fetch(paramsObj) {
    const apiKey = paramsObj.apiKey;
    const postData = JSON.stringify(paramsObj.cardDetails);

    const url = (env => {
        switch (env) {
            case 'DEBUG': return 'https://httpbin.org/post';
            case 'DEV': return 'http://localhost/v1/card/authenticate';
            case 'LIVE': return 'https://secure.smart2pay.com/v1/card/authenticate';
            case 'TEST':
            default: return 'https://securetest.smart2pay.com/v1/card/authenticate';
        }
    })(paramsObj.environment);

    const request = new Request(url, {
        method: 'POST',
        mode: 'cors', //https://developer.mozilla.org/en-US/docs/Web/API/Request/mode
        cache: 'no-cache',
        credentials: 'same-origin', //https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': 'Basic ' + apiKey
        },
        body: postData
    });

    const CreditCardTokenPromise = await fetch(request)
        .then(response => {
            if (!response.ok) {
                return Promise.reject({ status: response.status, statusText: response.statusText });
            }
            return response.json();
        })
        .then(responseJson => {
            try {
                const token = responseJson.CardAuthentication.CreditCardToken.Value;
                if (!token)
                    return Promise.reject({ status: 500, statusText: 'Token not found inside response object' });
                else
                    return token;
            }
            catch {
                return Promise.reject({ status: 500, statusText: 'Reponse object not ok' });
            }
        });

    return CreditCardTokenPromise;
}