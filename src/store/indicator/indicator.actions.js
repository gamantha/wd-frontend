import { INDICATOR_LOADING, INDICATOR_ERROR, INDICATOR_DATA } from './indicator.actionType'
import { getIndicators, createIndicator, patchIndicator, destroyIndicator } from '../../utils/api'

const loadingIndicator = () => ({
  type: INDICATOR_LOADING,
})

const errorIndicator = payload => ({
  type: INDICATOR_ERROR,
  payload,
})

const dataIndicator = payload => ({
  type: INDICATOR_DATA,
  payload,
})

export const fetchIndicators = payload => {
  return dispatch => {
    dispatch(loadingIndicator)
    try {
      const { page = 1, limit = 10 } = payload
      return new Promise((resolve, reject) => {
        getIndicators(page, limit)
          .then(res => {
            const { data } = res
            const { meta } = data
            if (meta.success !== true) {
              dispatch(errorIndicator(meta.message))
              reject(meta.message)
            } else {
              dispatch(dataIndicator(data))
              resolve(res)
            }
          })
          .catch(err => {
            dispatch(errorIndicator(err.mesage))
          })
      })
    } catch (error) {
      dispatch(errorIndicator(error.message))
    }
  }
}

export const addIndicator = payload => {
  return dispatch => {
    dispatch(loadingIndicator)
    try {
      return new Promise((resolve, reject) => {
        createIndicator(payload).then(result => {
          const { data } = result
          const { meta } = data
          if (meta.success !== true) {
            dispatch(errorIndicator(meta.message))
            reject(meta.message)
          } else {
            dispatch(dataIndicator(data))
            resolve(result)
          }
        })
      })
    } catch (error) {
      dispatch(errorIndicator(error.message))
    }
  }
}

export const updateIndicator = (id, payload) => {
  return dispatch => {
    dispatch(loadingIndicator)
    try {
      return new Promise((resolve, reject) => {
        patchIndicator(id, payload).then(result => {
          const { data } = result
          const { meta } = data
          if (meta.success !== true) {
            dispatch(errorIndicator(meta.message))
            reject(meta.message)
          } else {
            dispatch(dataIndicator(data))
            resolve(result)
          }
        })
      })
    } catch (error) {
      dispatch(errorIndicator(error.message))
    }
  }
}

export const deleteIndicator = id => {
  return dispatch => {
    dispatch(loadingIndicator)
    try {
      return new Promise((resolve, reject) => {
        destroyIndicator(id).then(result => {
          const { data } = result
          const { meta } = data
          if (meta.success !== true) {
            dispatch(errorIndicator(meta.message))
            reject(meta.message)
          } else {
            resolve(result)
          }
        })
      })
    } catch (error) {
      dispatch(errorIndicator(error.message))
    }
  }
}
