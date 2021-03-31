# js-sdk

| Parameter         | Mandatory         | Type      | Possible Values                       | Description               |
| :---              |    :----:         | :---:     | :---                                  |                           |
| `environment`     | **yes**           | strign    | **'DEV'** \| **'TEST'** \| **'LIVE'** | select the environment <br /><ul><li>**DEV** - `http://localhost/v1/card/authenticate`</li><li>**TEST** - `https://securetest.smart2pay.com/v1/card/authenticate`</li><li>**LIVE** - `https://secure.smart2pay.com/v1/card/authenticate`</li></ul>    |


```json
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
```