import { HOTEL_BOOK_LOADING, HOTEL_BOOK_ERROR, HOTEL_BOOK_DATA } from './hotel_book.actionType'
import { getHotelBooks, patchHotelBook } from '../../utils/api'

const loadingHotelBook = () => ({
  type: HOTEL_BOOK_LOADING,
})

const errorHotelBook = payload => ({
  type: HOTEL_BOOK_ERROR,
  payload,
})

const dataHotelBook = payload => ({
  type: HOTEL_BOOK_DATA,
  payload,
})

export const fetchHotelBook = payload => {
  return dispatch => {
    dispatch(loadingHotelBook)
    try {
      const { page = 1, limit = 10 } = payload
      return new Promise((resolve, reject) => {
        getHotelBooks(page, limit)
          .then(res => {
            const { data } = res
            const { meta } = data
            if (meta.success !== true) {
              dispatch(errorHotelBook(meta.message))
              reject(meta.message)
            } else {
              dispatch(dataHotelBook(data))
              resolve(res)
            }
          })
          .catch(err => {
            dispatch(errorHotelBook(err.message))
          })
      })
    } catch (error) {
      dispatch(errorHotelBook(error.message))
    }
  }
}

export const updateHotelBook = id => {
  return dispatch => {
    dispatch(loadingHotelBook)
    try {
      console.log('on update hotel book with id: ', id)
      return new Promise((resolve, reject) => {
        patchHotelBook(id, 'paid').then(result => {
          const { data } = result
          const { meta } = data
          if (meta.success !== true) {
            dispatch(errorHotelBook(meta.message))
            reject(meta.message)
          } else {
            resolve(result)
          }
        })
      })
    } catch (error) {
      dispatch(errorHotelBook(error.message))
    }
  }
}
