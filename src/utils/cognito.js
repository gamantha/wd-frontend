import jwt from 'jsonwebtoken'
import { CognitoUserPool, CookieStorage } from 'amazon-cognito-identity-js'
import config from '../config'

const cookieStorage = new CookieStorage({ domain: config.COOKIES_DOMAIN, secure: false })

const userPool = new CognitoUserPool({
  UserPoolId: config.COGNITO.USER_POOL_ID,
  ClientId: config.COGNITO.CLIENT_ID,
  Region: config.COGNITO.REGION,
  Storage: cookieStorage,
})

const curUser = userPool.getCurrentUser()

export const getUserToken = () => {
  return curUser && getCookieField('accessToken')
}

export const getUserProfile = () => {
  if (curUser) {
    const idToken = getCookieField('idToken')
    const decodedIdToken = jwt.decode(idToken)
    return decodedIdToken
  }
  return null
}

const getCookieField = key => {
  return cookieStorage.getItem(`${curUser.keyPrefix}.${curUser.username}.${key}`)
}
