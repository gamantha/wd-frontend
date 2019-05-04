import { AUTH_LOADING, AUTH_ERROR, AUTH_SUCCESS } from './auth.actionType'

const initialState = {
  loading: false,
  error: false,
  token: null,
  user: null,
}

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOADING:
      return {
        ...state,
        loading: true,
      }
    case AUTH_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      }
    case AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}

export default reducers
