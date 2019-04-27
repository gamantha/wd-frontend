import { PROFILE_LOADING, PROFILE_ERROR, PROFILE_DATA } from './profile.actionType'

const initialState = {
  loading: false,
  error: {
    status: false,
    message: null,
  },
  profile: null,
}

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true,
      }
    case PROFILE_ERROR:
      console.log('reducers PROFILE_ERROR:', action)
      return {
        ...state,
        loading: false,
        error: {
          status: true,
          message: action.payload,
        },
      }
    case PROFILE_DATA:
      console.log('reducers PROFILE_DATA:', action)
      return {
        ...state,
        loading: false,
        error: {
          status: false,
          message: null,
        },
        profile: action.payload,
      }
    default:
      return state
  }
}

export default reducers
