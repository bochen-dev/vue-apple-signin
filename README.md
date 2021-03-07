# vue-apple-signin
> A simple [Vue](https://vuejs.org) plugin to include an [Apple sign-in button](https://developer.apple.com/documentation/signinwithapplejs) into your web app.

<img src="https://github.com/chenpion/vue-apple-signin/raw/master/screenshot.png" width="400" alt="Screenshot">

## Install
```
npm install vue-apple-signin
```

## Usage

index.html
``` html
<script type="text/javascript" src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"></script>
```

main.js
``` js
import VueAppleSignin from 'vue-apple-signin';

Vue.use(VueAppleSignin, {
  clientId: 'CLIENT_ID',
  scope: 'SCOPE',
  redirectURI: 'REDIRECT_URI',
  state: 'STATE',
  usePopup: true,
});
```
Now you have a `vue-apple-signin` global component, ready for use.

## Example
### Simple
``` html
<vue-apple-signin></vue-apple-signin>
```

### Advanced
``` html
<vue-apple-signin
  mode="center-align"
  type="sign in"
  color="black"
  :border="true"
  :radius="15"
  width="100%"
  height="100%"
  logoSize="medium"
  :logoPosition="0"
  :labelPosition="0"
  className="vue-apple-signin"
  :onSuccess="callSuccess"
  :onFailure="callFail"
></vue-apple-signin>
```
`:onSuccess` can be used as callback function to retrieve Apple user data and code to run a 
validation check with the server.
`:onFailure` will be called when authentication failed.
**Make sure `usePopup` is set to `true` for callback to work.**

On a succesfull login you we get the following data
```json
{
  "authorization": {
    "code": "[code to verify user with apple server]",
    "id_token": "[json base64 encode user data]",
    "state": "[random unique number]"
  },
  "userData": {
      "aud": "com.example.signin", 
      "auth_time": 1615125205, 
      "c_hash": "",
      "exp": 1615211605,
      "iat": 1615125205,
      "iss": "https://appleid.apple.com",
      "nonce_supported": true,
      "sub": "[Unique user ID]"
  }
}
```

## Properties
|name|type|default|value|
|---|---|---|---|
|color|`String`|`black`|`black` / `white`|
|border|`Boolean`|`true`|`true` / `false`|
|type|`String`|`sign in`|`sign in` / `sign up` / `apple` / `continue`|

For more information on styling visit: https://developer.apple.com/documentation/sign_in_with_apple/sign_in_with_apple_js/displaying_sign_in_with_apple_buttons

## Known issues
`<!DOCTYPE html>` in the `html` file may causes button style to be messed up,
commented it should fix.
If there's way to fix it, please let me know.
