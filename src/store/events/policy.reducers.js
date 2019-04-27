import {
  EVENT_POLICY_LOADING,
  EVENT_POLICY_ERROR,
  EVENT_POLICY_DATA,
} from './event.actionType'

const initialState = {
  loading: false,
  policies: [],
  error: {
    status: false,
    message: null,
  },
}

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case EVENT_POLICY_LOADING:
      return {
        ...state,
        loading: true,
        error: {
          status: false,
          message: null,
        },
      }
    case EVENT_POLICY_ERROR:
      return {
        ...state,
        loading: false,
        error: {
          status: true,
          message: action.payload,
        },
      }
    case EVENT_POLICY_DATA:
      return {
        ...state,
        loading: false,
        policies: action.payload,
        error: {
          status: false,
          message: null,
        },
      }
    default:
      return state
  }
}

export default reducers
