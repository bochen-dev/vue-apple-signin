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
  color="black"
  :border="true"
  type="sign in"
></vue-apple-signin>
```

## Properties
|name|type|default|value|
|---|---|---|---|
|color|`String`|`black`|`black` / `white`|
|border|`Boolean`|`true`|`true` / `false`|
|type|`String`|`sign in`|`sign in` / `sign up` / `apple` / `continue`,|

## Known issues
`<!DOCTYPE html>` in the `html` file may causes button style to be messed up,
commented it should fix.
If there's way to fix it, please let me know.