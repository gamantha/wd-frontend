import {
  HOTEL_PRICE_RULE_LOADING,
  HOTEL_PRICE_RULE_ERROR,
  HOTEL_PRICE_RULE_DATA,
} from './hotel_price_rule.actionType'

const initialState = {
  loading: false,
  error: {
    status: false,
    message: null,
  },
  hotel_price_rules: null,
}

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case HOTEL_PRICE_RULE_LOADING:
      return {
        ...state,
        loading: true,
      }
    case HOTEL_PRICE_RULE_ERROR:
      console.log('reducers HOTEL_PRICE_RULE_ERROR:', action)
      return {
        ...state,
        loading: false,
        error: {
          status: true,
          message: action.payload,
        },
      }
    case HOTEL_PRICE_RULE_DATA:
      console.log('reducers HOTEL_PRICE_RULE_DATA:', action)
      return {
        ...state,
        loading: false,
        error: {
          status: false,
          message: null,
        },
        hotel_price_rules: action.payload,
      }
    default:
      return state
  }
}

export default reducers
