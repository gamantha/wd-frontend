import React, { Component } from 'react'
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CookieStorage,
} from 'amazon-cognito-identity-js'
import { HashRouter, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { notification } from 'antd'

import './App.css'
import '@coreui/icons/css/coreui-icons.min.css'
import 'flag-icon-css/css/flag-icon.min.css'
import 'font-awesome/css/font-awesome.min.css'
import 'simple-line-icons/css/simple-line-icons.css'
import './scss/style.css'

import store from './store'
import config from './config'
// Containers
import { DefaultLayout } from './containers'
import Login from './views/Login'

global.fetch = require('node-fetch')

// Views
const cookieStorage = new CookieStorage({
  domain: config.COOKIES_DOMAIN,
  secure: false,
})

const userPool = new CognitoUserPool({
  UserPoolId: config.COGNITO.USER_POOL_ID,
  ClientId: config.COGNITO.CLIENT_ID,
  Region: config.COGNITO.REGION,
  Storage: cookieStorage,
})

const curUser = userPool.getCurrentUser()

class App extends Component {
  constructor(props) {
    super(props)

    this.handleLogin = this.handleLogin.bind(this)
  }

  // Store logged in user data to cookies
  storeUserData() {}

  handleLogin(itemData) {
    const authenticationDetails = new AuthenticationDetails({
      Username: itemData.email,
      Password: itemData.password,
    })

    const userData = {
      Username: itemData.username,
      Pool: userPool,
      Storage: cookieStorage,
    }
    const cognitoUser = new CognitoUser(userData)
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function(result) {
        window.location.reload()
      },
      onFailure: function(err) {
        if (err.code === 'UserNotFoundException' || err.code === 'NotAuthorizedException') {
          notification['error']({
            message: 'Login Message',
            description: 'Fail to login, re-check your username / password',
            style: { top: '35px' },
          })
        } else {
          notification['error']({
            message: 'Login Message',
            description: 'Unknown error occurred during login, contact your administrator',
            style: { top: '35px' },
          })
        }
      },
    })
  }

  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <Switch>
            {/* NOTE: temp develop for getting token */}
            {curUser &&
            cookieStorage.getItem(`${curUser.keyPrefix}.${curUser.username}.accessToken`) ? (
              <DefaultLayout />
            ) : (
              <Login onSubmitLogin={this.handleLogin} />
            )}
          </Switch>
        </HashRouter>
      </Provider>
    )
  }
}

export default App
