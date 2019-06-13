import {
  REPORT_TEMPLATE_LOADING,
  REPORT_TEMPLATE_ERROR,
  REPORT_TEMPLATE_DATA,
  REPORT_TEMPLATE_INDICATORS,
} from './report_template.actionTypes'

const initialState = {
  loading: false,
  error: {
    status: false,
    message: null,
  },
  report_templates: null,
  indicators: null,
}

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case REPORT_TEMPLATE_LOADING:
      return {
        ...state,
        loading: true,
      }
    case REPORT_TEMPLATE_ERROR:
      console.log('reducers REPORT_TEMPLATE_ERROR:', action)
      return {
        ...state,
        loading: false,
        error: {
          status: true,
          message: action.payload,
        },
      }
    case REPORT_TEMPLATE_DATA:
      console.log('reducers REPORT_TEMPLATE_DATA:', action)
      return {
        ...state,
        loading: false,
        error: {
          status: false,
          message: null,
        },
        report_templates: action.payload,
      }
    case REPORT_TEMPLATE_INDICATORS:
      console.log('reducers REPORT_TEMPLATE_INDICATORS:', action)
      return {
        ...state,
        loading: false,
        error: {
          status: false,
          message: null,
        },
        indicators: action.payload.data,
      }
    default:
      return state
  }
}

export default reducers
