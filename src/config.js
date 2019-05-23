const dev = {
  BASE_API_URL: process.env.REACT_APP_API_BASE_URL,
  COGNITO: {
    CLIENT_ID: process.env.REACT_APP_COGNITO_CLIENT_ID,
    USER_POOL_ID: process.env.REACT_APP_COGNITO_USER_POOL_ID,
    REGION: process.env.REACT_APP_COGNITO_REGION,
  },
  LOCAL_STORAGE_SECRET: process.env.REACT_APP_LOCAL_STORAGE_SECRET,
}

const prod = {
  BASE_API_URL: process.env.REACT_APP_API_BASE_URL,
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
