import { HOTEL_LOADING, HOTEL_ERROR, HOTEL_DATA } from './hotel.actionType'

const initialState = {
  loading: false,
  error: {
    status: false,
    message: null,
  },
  hotels: null,
}

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case HOTEL_LOADING:
      return {
        ...state,
        loading: true,
      }
    case HOTEL_ERROR:
      console.log('reducers HOTEL_ERROR:', action)
      return {
        ...state,
        loading: false,
        error: {
          status: true,
          message: action.payload,
        },
      }
    case HOTEL_DATA:
      console.log('reducers HOTEL_DATA:', action)
      return {
        ...state,
        loading: false,
        error: {
          status: false,
          message: null,
        },
        hotels: action.payload,
      }
    default:
      return state
  }
}

export default reducers
