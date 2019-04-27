import { HOTEL_LOADING, HOTEL_ERROR, HOTEL_DATA } from './hotel.actionType'
import { getHotels, createHotel, patchHotel, destroyHotel } from '../../utils/api'

const loadingHotel = () => ({
  type: HOTEL_LOADING,
})

const errorHotel = payload => ({
  type: HOTEL_ERROR,
  payload,
})

const dataHotel = payload => ({
  type: HOTEL_DATA,
  payload,
})

export const fetchHotel = payload => {
  return dispatch => {
    dispatch(loadingHotel)
    try {
      const { page = 1, limit = 10 } = payload
      return new Promise((resolve, reject) => {
        getHotels(page, limit)
          .then(res => {
            const { data } = res
            const { meta } = data
            if (meta.success !== true) {
              dispatch(errorHotel(meta.message))
              reject(meta.message)
            } else {
              dispatch(dataHotel(data))
              resolve(res)
            }
          })
          .catch(err => {
            dispatch(errorHotel(err.mesage))
          })
      })
    } catch (error) {
      dispatch(errorHotel(error.message))
    }
  }
}

export const addHotel = payload => {
  return dispatch => {
    dispatch(loadingHotel)
    try {
      return new Promise((resolve, reject) => {
        createHotel(payload).then(result => {
          const { data } = result
          const { meta } = data
          if (meta.success !== true) {
            dispatch(errorHotel(meta.message))
            reject(meta.message)
          } else {
            dispatch(dataHotel(data))
            resolve(result)
          }
        })
      })
    } catch (error) {
      dispatch(errorHotel(error.message))
    }
  }
}

export const updateHotel = (id, payload) => {
  return dispatch => {
    dispatch(loadingHotel)
    try {
      console.log('on update hotel', payload)
      return new Promise((resolve, reject) => {
        patchHotel(id, payload).then(result => {
          const { data } = result
          const { meta } = data
          if (meta.success !== true) {
            dispatch(errorHotel(meta.message))
            reject(meta.message)
          } else {
            dispatch(dataHotel(data))
            resolve(result)
          }
        })
      })
    } catch (error) {
      dispatch(errorHotel(error.message))
    }
  }
}

export const deleteHotel = id => {
  return dispatch => {
    dispatch(loadingHotel)
    try {
      return new Promise((resolve, reject) => {
        destroyHotel(id).then(result => {
          const { data } = result
          const { meta } = data
          if (meta.success !== true) {
            dispatch(errorHotel(meta.message))
            reject(meta.message)
          } else {
            resolve(result)
          }
        })
      })
    } catch (error) {
      dispatch(errorHotel(error.message))
    }
  }
}
