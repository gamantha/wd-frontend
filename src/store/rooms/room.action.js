import { ROOM_LOADING, ROOM_ERROR, ROOM_DATA } from './room.actionType'
import { getRooms, createRoom, patchRoom, destroyRoom } from '../../utils/api'

const loadingRoom = () => ({
  type: ROOM_LOADING,
})

const errorRoom = payload => ({
  type: ROOM_ERROR,
  payload,
})

const dataRoom = payload => ({
  type: ROOM_DATA,
  payload,
})

export const fetchRoom = (hotelId, payload) => {
  return dispatch => {
    dispatch(loadingRoom)
    try {
      return new Promise((resolve, reject) => {
        const { page = 1, limit = 10 } = payload
        getRooms(hotelId, page, limit).then(res => {
          const { data } = res
          const { meta } = data
          if (meta.success !== true) {
            dispatch(errorRoom(meta.message))
            reject(meta.message)
          } else {
            dispatch(dataRoom(data))
            resolve(res)
          }
        })
      })
    } catch (error) {
      dispatch(errorRoom(error.message))
    }
  }
}

export const addRoom = (hotelId, payload) => {
  return dispatch => {
    dispatch(loadingRoom)
    try {
      return new Promise((resolve, reject) => {
        createRoom(hotelId, payload).then(result => {
          const { data } = result
          const { meta } = data
          if (meta.success !== true) {
            dispatch(errorRoom(meta.message))
            reject(meta.message)
          } else {
            dispatch(dataRoom(data))
            resolve(result)
          }
        })
      })
    } catch (error) {
      dispatch(errorRoom(error.message))
    }
  }
}

export const updateRoom = (id, payload) => {
  return dispatch => {
    dispatch(loadingRoom)
    try {
      console.log('on update room', payload)
      return new Promise((resolve, reject) => {
        patchRoom(id, payload).then(result => {
          const { data } = result
          const { meta } = data
          if (meta.success !== true) {
            dispatch(errorRoom(meta.message))
            reject(meta.message)
          } else {
            dispatch(dataRoom(data))
            resolve(result)
          }
        })
      })
    } catch (error) {
      dispatch(errorRoom(error.message))
    }
  }
}

export const deleteRoom = id => {
  return dispatch => {
    dispatch(loadingRoom)
    try {
      console.log('on delete room', id)
      return new Promise((resolve, reject) => {
        destroyRoom(id).then(result => {
          const { data } = result
          const { meta } = data
          if (meta.success !== true) {
            dispatch(errorRoom(meta.message))
            reject(meta.message)
          } else {
            resolve(result)
          }
        })
      })
    } catch (error) {
      dispatch(errorRoom(error.message))
    }
  }
}
