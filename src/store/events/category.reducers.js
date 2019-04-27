import {
  EVENT_CATEGORY_LOADING,
  EVENT_CATEGORY_ERROR,
  EVENT_CATEGORY_DATA,
} from './event.actionType'

const initialState = {
  loading: false,
  categories: [],
  error: {
    status: false,
    message: null,
  },
}

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case EVENT_CATEGORY_LOADING:
      return {
        ...state,
        loading: true,
        error: {
          status: false,
          message: null,
        },
      }
    case EVENT_CATEGORY_ERROR:
      return {
        ...state,
        loading: false,
        error: {
          status: true,
          message: action.payload,
        },
      }
    case EVENT_CATEGORY_DATA:
      return {
        ...state,
        loading: false,
        categories: action.payload,
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
