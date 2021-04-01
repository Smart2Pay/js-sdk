# js-sdk

Javascript API to obtain the `CreditCardToken`

- [ES5](#es5-implementation)
- [Promises](#promises-implementation)
<br />

## ES5 implementation

### Installation

Import the following script that will make available `tokanizeCard()`:
```html
<script src="https://..../tokenizeCard.js" type="text/javascript"></script>
```

### Usage

Create a function where you handle the received `CreditCardToken`:
```javascript
function handleRequest(CreditCardToken) {
    // use received 'CreditCardToken'
    console.log(CreditCardToken);
}
```

Create a function to handle any received errors:
```javascript
function handleError(HttpStatusCode, errorText) {
    // handle error
    console.log(HttpStatusCode, errorText);
}
```

Use `tokanizeCard()` to send the required data and handlers:
<pre lang="javascript">
tokanizeCard({
    apiKey: '&lt;𝘢𝘱𝘪𝘬𝘦𝘺 𝘴𝘵𝘳𝘪𝘯𝘨&gt;', 
    environment: '&lt;𝘦𝘯𝘷𝘪𝘳𝘰𝘯𝘮𝘦𝘯𝘵 𝘴𝘵𝘳𝘪𝘯𝘨&gt;',
    cardDetails: '&lt;𝘤𝘢𝘳𝘥𝘋𝘦𝘵𝘢𝘪𝘭𝘴 𝘰𝘣𝘫𝘦𝘤𝘵&gt;',
    handleRequest: '&lt;𝘩𝘢𝘯𝘥𝘭𝘦𝘙𝘦𝘲𝘶𝘦𝘴𝘵 𝘤𝘢𝘭𝘭𝘣𝘢𝘤𝘬&gt;',
    handleError: '&lt;𝘩𝘢𝘯𝘥𝘭𝘦𝘌𝘳𝘳𝘰𝘳 𝘤𝘢𝘭𝘭𝘣𝘢𝘤𝘬&gt;'
});
</pre>

| Parameter         | Type          | Possible Values                       | Description                                   |
| :---              | :---:         | :---                                  | :---                                          |
| `apiKey`          | string        |                                       | API key previously obtained from S2P server   |
| `environment`     | string        | **'DEBUG'**<br />**'DEV'**<br />**'TEST'**<br />**'LIVE'** | select the environment <br /><ul><li>DEV <br />`http://localhost/v1/card/authenticate`</li><li>TEST <br />`https://securetest.smart2pay.com/v1/card/authenticate`</li><li>LIVE <br />`https://secure.smart2pay.com/v1/card/authenticate`</li></ul>    |
| `cardDetails`     | JSON object   | check sample bellow  | card authentication details in JSON format |
| `handleRequest`   | JavaScript function   |   | a Javascript function that will receive `CreditCardToken` as a parameter |
| `handleError`     | JavaScript function   |   | a Javascript function that will receive an error code: `HttpStatusCode` and `errorText` parameters |

Sample card details object:
```json
{
    "CardAuthentication": {
        "Customer": {
            "FirstName": "John",
            "LastName": "Doe",
            "Email": "testing2@test.com",
            "SocialSecurityNumber": "00003456789"
        },
        "BillingAddress": {
            "Country": "BR"
        },
        "Card": {
            "HolderName": "John Doe",
            "Number": "4111111111111111",
            "ExpirationMonth": "02",
            "ExpirationYear": "2029",
            "SecurityCode": "312"
        }
    }
}
```

<br />

## Promises Implementation

***< to do >***
