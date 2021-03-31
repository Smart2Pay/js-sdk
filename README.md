# js-sdk

```
// usage:
function handleRequest(CreditCardToken) {
    console.log(CreditCardToken);
}

tokanizeCard(apiKey, environment, cardDetails, handleRequest);
```

| Parameter         | Type      | Possible Values                       | Description               |
| :---              | :---:     | :---                                  | :---                      |
| `apiKey`          | string    |                                       | API key previously obtained from S2P server |
| `cardDetails`     | JSON object | e.g.: ```json {"CardAuthentication":{"Customer":{"FirstName":"John","LastName":"Doe","Email":"testing2@test.com","SocialSecurityNumber":"00003456789"},"BillingAddress":{"Country":"BR"},"Card":{"HolderName":"John Doe","Number":"4111111111111111","ExpirationMonth":"02","ExpirationYear":"2029","SecurityCode":"312"}}}``` | card authentication details in JSON format |
| `environment`     | string    | **'DEV'**<br />**'TEST'**<br />**'LIVE'** | select the environment <br /><ul><li>DEV <br />`http://localhost/v1/card/authenticate`</li><li>TEST <br />`https://securetest.smart2pay.com/v1/card/authenticate`</li><li>LIVE <br />`https://secure.smart2pay.com/v1/card/authenticate`</li></ul>    |


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