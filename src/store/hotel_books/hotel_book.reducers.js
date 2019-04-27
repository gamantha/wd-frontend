import { HOTEL_BOOK_LOADING, HOTEL_BOOK_ERROR, HOTEL_BOOK_DATA } from './hotel_book.actionType'

const initialState = {
  loading: false,
  error: {
    status: false,
    message: null,
  },
  hotel_books: null,
}

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case HOTEL_BOOK_LOADING:
      return {
        ...state,
        loading: true,
      }
    case HOTEL_BOOK_ERROR:
      console.log('reducers HOTEL_BOOK_ERROR:', action)
      return {
        ...state,
        loading: false,
        error: {
          status: true,
          message: action.payload,
        },
      }
    case HOTEL_BOOK_DATA:
      console.log('reducers HOTEL_BOOK_DATA:', action)
      return {
        ...state,
        loading: false,
        error: {
          status: false,
          message: null,
        },
        hotel_books: action.payload,
      }
    default:
      return state
  }
}

export default reducers
