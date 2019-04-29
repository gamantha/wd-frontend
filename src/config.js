const dev = {
  BASE_API_URL: 'http://127.0.0.1:8081/api/v1',
  COGNITO: {
    CLIENT_ID: process.env.REACT_APP_COGNITO_CLIENT_ID,
    USER_POOL_ID: process.env.REACT_APP_COGNITO_USER_POOL_ID,
    REGION: process.env.REACT_APP_COGNITO_REGION,
  },
  LOCAL_STORAGE_SECRET: process.env.REACT_APP_LOCAL_STORAGE_SECRET,
}

const prod = {
  BASE_API_URL: 'http://127.0.0.1:3030/api/v1',
  COGNITO: {
    CLIENT_ID: process.env.REACT_APP_COGNITO_CLIENT_ID,
    USER_POOL_ID: process.env.REACT_APP_COGNITO_USER_POOL_ID,
    REGION: process.env.REACT_APP_COGNITO_REGION,
  },
  LOCAL_STORAGE_SECRET: process.env.REACT_APP_LOCAL_STORAGE_SECRET,
}

export default {
  ...(process.env.REACT_APP_STAGE === 'prod' ? prod : dev), // Default to dev if not set
}
