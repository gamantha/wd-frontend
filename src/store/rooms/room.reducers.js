import { ROOM_LOADING, ROOM_ERROR, ROOM_DATA } from './room.actionType'

const initialState = {
  loading: false,
  error: {
    status: false,
    message: null,
  },
  rooms: null,
}

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case ROOM_LOADING:
      return {
        ...state,
        loading: true,
      }
    case ROOM_ERROR:
      console.log('reducers ROOM_ERROR:', action)
      return {
        ...state,
        loading: false,
        error: {
          status: true,
          message: action.payload,
        },
      }
    case ROOM_DATA:
      console.log('reducers ROOM_DATA:', action)
      return {
        ...state,
        loading: false,
        error: {
          status: false,
          message: null,
        },
        rooms: action.payload,
      }
    default:
      return state
  }
}

export default reducers
