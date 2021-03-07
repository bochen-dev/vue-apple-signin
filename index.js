/* eslint-disable no-console */
function err (msg) {
  if (typeof console !== 'undefined') {
    console.error(`[vue-apple-signin] ${msg}`)
  }
}

export default {
  install (Vue, options) {
    Vue.component('vue-apple-signin', {
      name: 'VueAppleSignin',
      props: {
        mode: {
          type: String,
          default: 'center-align',
          validator (value) {
            return [
              'center-align',
              'left-align',
              'logo-only',
            ].indexOf(value) > -1
          }
        },
        type: {
          type: String,
          default: 'sign in',
          validator (value) {
            return [
              'sign in',
              'sign up',
              'apple',
              'continue'
            ].indexOf(value) > -1
          }
        },
        color: {
          type: String,
          default: 'black',
          validator (value) {
            return [
              'white',
              'black'
            ].indexOf(value) > -1
          }
        },
        border: {
          type: Boolean,
          default: true
        },
        radius: {
          type: Number,
          default: 15,
          validator (value) {
            return value>=0 && value <=50
          }
        },
        width: {
          type: String,
          default: '100%',
        },
        height: {
          type: String,
          default: '100%',
        },
        logoSize: {
          type: String,
          default: 'medium',
          validator (value) {
            return [
              'small',
              'medium',
              'large'
            ].indexOf(value) > -1
          }
        },
        logoPosition: {
          type: Number,
          default: 0
        },
        labelPosition: {
          type: Number,
          default: 0
        },
        className: {
          type: String,
          default: 'vue-apple-signin'
        },
        onSuccess: {
          type: Function,
          default: null
        },
        onFailure: {
          type: Function,
          default: null
        },
      },
      computed: {
        dataBorder () {
          return this.border.toString()
        }
      },
      mounted () {
        if (!window.AppleID) {
          err('"https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js" needs to be included as a <script>')
          return;
        }

        const {
          clientId,
          scope = '',
          redirectURI,
          state,
          usePopup
        } = options

        if (!clientId) {
          err('options.clientId must be specified.')
          return;
        }

        if (!redirectURI) {
          err('options.redirectURI must be specified.')
          return;
        }

        if (!state) {
          err('options.state must be specified.')
          return;
        }

        window.AppleID.auth.init({
          clientId,
          scope,
          redirectURI,
          state,
          usePopup
        })

        const self = this;
        document.addEventListener('AppleIDSignInOnSuccess', (data) => {
          if(self.onSuccess){
            const appleUserData = self.getAppleDataFromToken(data.detail.authorization.id_token);
            self.onSuccess({authorization: data.detail.authorization, userData: appleUserData});
          }
        });
        document.addEventListener('AppleIDSignInOnFailure', (error) => {
          if(self.onFailure) {
            self.onFailure(error);
          }
        });
      },
      methods:{
        getAppleDataFromToken(token){
          var base64Url = token.split('.')[1];
          var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));
          return JSON.parse(jsonPayload);
        },
      },
      render (createElement) {
        return createElement(
            'div', {
              attrs: {
                id: 'appleid-signin',
                'data-mode': this.mode,
                'data-type': this.type,
                'data-color': this.color,
                'data-border': this.dataBorder,
                'data-radius': this.radius,
                'data-width': this.width,
                'data-height': this.height,
                'data-logo-size': this.logoSize,
                'data-logo-position': this.logoPosition,
                'data-label-position': this.labelPosition,
                'class': this.className
              }
            },
        )
      }
    })
  }
}
