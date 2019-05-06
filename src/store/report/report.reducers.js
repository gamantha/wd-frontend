import {
  REPORT_LOADING,
  REPORT_ERROR,
  REPORT_DATA,
} from './report.actionTypes'

const initialState = {
  loading: false,
  error: {
    status: false,
    message: null,
  },
  report: null,
}

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case REPORT_LOADING:
      return {
        ...state,
        loading: true,
      }
    case REPORT_ERROR:
      return {
        ...state,
        loading: false,
        error: {
          status: true,
          message: action.payload,
        },
      }
    case REPORT_DATA:
      return {
        ...state,
        loading: false,
        error: {
          status: false,
          message: null,
        },
        report: action.payload,
      }
    default:
      return state
  }
}

export default reducers
