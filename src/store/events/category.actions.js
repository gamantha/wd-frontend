import {
  EVENT_CATEGORY_LOADING,
  EVENT_CATEGORY_ERROR,
  EVENT_CATEGORY_DATA,
} from './event.actionType'
import { apiGet, apiCreate, apiPatch, apiDestroy } from '../../utils/api'

const loadingCategory = () => ({
  type: EVENT_CATEGORY_LOADING,
})

const errorCategory = payload => ({
  type: EVENT_CATEGORY_ERROR,
  payload,
})

const dataCategory = payload => ({
  type: EVENT_CATEGORY_DATA,
  payload,
})

export const createCategory = payload => {
  return dispatch => {
    dispatch(loadingCategory())
    try {
      return apiCreate('event_category', payload)
        .then(resp => {
          const { data } = resp
          const { meta } = data

          if (meta.success) {
            dispatch(dataCategory([data]))
            return Promise.resolve(meta)
          } else {
            // console.log('masuukkk')
            dispatch(errorCategory(meta))
            return Promise.reject(meta)
          }
        })
        .catch(err => {
          // const { meta } = err
          // console.log('err======', meta)
          dispatch(errorCategory(err.message))
          return Promise.reject(err.message)
        })
    } catch (error) {
      // console.log('error', error)
      dispatch(errorCategory(error.message))
      return Promise.reject(error.message)
    }
  }
}

export const fetchCategory = payload => {
  return dispatch => {
    dispatch(loadingCategory())
    try {
      const { page = 1, limit = 10 } = payload

      return apiGet('event_category', page, limit)
        .then(resp => {
          const { data } = resp
          const { meta } = data

          if (meta.success) {
            dispatch(dataCategory(data))
            return Promise.resolve(resp)
          } else {
            dispatch(errorCategory(meta))
            return Promise.reject(meta)
          }
        })
        .catch(err => {
          dispatch(errorCategory(err.message))
          return Promise.reject(err.message)
        })
    } catch (error) {
      dispatch(errorCategory(error.message))
      return Promise.reject(error.message)
    }
  }
}

export const updateCategory = (id, payload) => {
  return dispatch => {
    dispatch(loadingCategory())
    try {
      return apiPatch('event_category', id, payload)
        .then(resp => {
          const { data } = resp
          const { meta } = data

          if (meta.success) {
            dispatch(dataCategory([data]))
            return Promise.resolve(meta)
          } else {
            dispatch(errorCategory(meta))
            return Promise.reject(meta)
          }
        })
        .catch(err => {
          dispatch(errorCategory(err.message))
          return Promise.reject(err.message)
        })
    } catch (error) {
      dispatch(errorCategory(error.message))
      return Promise.reject(error.message)
    }
  }
}

export const deleteCategory = id => {
  return dispatch => {
    dispatch(loadingCategory())
    try {
      return apiDestroy('event_category', id)
        .then(resp => {
          const { data } = resp
          const { meta } = data

          if (meta.success) {
            dispatch(dataCategory([data]))
            return Promise.resolve(meta)
          } else {
            dispatch(errorCategory(meta))
            return Promise.reject(meta)
          }
        })
        .catch(err => {
          dispatch(errorCategory(err.message))
          return Promise.reject(err.message)
        })
    } catch (error) {
      dispatch(errorCategory(error.message))
      return Promise.reject(error.message)
    }
  }
}
