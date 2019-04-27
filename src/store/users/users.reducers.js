import { USER_LOADING, USER_ERROR, USER_DATA } from './users.actionType'
const initialState = {
  loading: false,
  error: {
    status: false,
    message: null,
  },
  users: null,
}

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      }
    case USER_ERROR:
      // console.log('reducers USER_ERROR:', action)
      return {
        ...state,
        loading: false,
        error: {
          status: true,
          message: action.payload,
        },
      }
    case USER_DATA:
      // console.log('reducers USER_DATA:', action)
      return {
        ...state,
        loading: false,
        error: {
          status: false,
          message: null,
        },
        users: action.payload,
      }
    default:
      return state
  }
}

export default reducers
