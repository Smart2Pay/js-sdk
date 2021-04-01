# js-sdk

Javascript API to obtain the `CreditCardToken`

## Installation

Import the following script that will make available `tokanizeCard()`:
```html
<script src="https://..../tokenizeCard.js" type="text/javascript"></script>
```

## Usage

Create a function where you handle the received credit card token:
```javascript
// usage:
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

Use `tokanizeCard()` to send required data and make `CreditCardToken` to 
<pre lang="javascript">
tokanizeCard({
    "apiKey": <<em>apikey string</em>>, 
    "environment": <*environment string*>,
    "cardDetails": <*card details object*>,
    "handleRequest": <*handleRequest callback*>,
    "handleError": <*handleError callback*>,
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