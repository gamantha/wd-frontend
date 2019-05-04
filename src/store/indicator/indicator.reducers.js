import { INDICATOR_LOADING, INDICATOR_ERROR, INDICATOR_DATA } from './indicator.actionType'

const initialState = {
  loading: false,
  error: {
    status: false,
    message: null,
  },
  indicators: null,
}

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case INDICATOR_LOADING:
      return {
        ...state,
        loading: true,
      }
    case INDICATOR_ERROR:
      console.log('reducers INDICATOR_ERROR:', action)
      return {
        ...state,
        loading: false,
        error: {
          status: true,
          message: action.payload,
        },
      }
    case INDICATOR_DATA:
      console.log('reducers INDICATOR_DATA:', action)
      return {
        ...state,
        loading: false,
        error: {
          status: false,
          message: null,
        },
        indicators: action.payload,
      }
    default:
      return state
  }
}

export default reducers
