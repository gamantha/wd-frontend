import { EVENT_POLICY_LOADING, EVENT_POLICY_ERROR, EVENT_POLICY_DATA } from './event.actionType'
import { apiGet, apiCreate, apiPatch, apiDestroy } from '../../utils/api'

const loadingPolicy = () => ({
  type: EVENT_POLICY_LOADING,
})

const errorPolicy = payload => ({
  type: EVENT_POLICY_ERROR,
  payload,
})

const dataPolicy = payload => ({
  type: EVENT_POLICY_DATA,
  payload,
})

export const createPolicy = payload => {
  return dispatch => {
    dispatch(loadingPolicy())
    try {
      return apiCreate('event_policy', payload)
        .then(resp => {
          const { data } = resp
          const { meta } = data

          if (meta.success) {
            dispatch(dataPolicy([data]))
            return Promise.resolve(meta)
          } else {
            dispatch(errorPolicy(meta))
            return Promise.reject(meta)
          }
        })
        .catch(err => {
          // const { meta } = err
          // console.log('err======', meta)
          dispatch(errorPolicy(err.message))
          return Promise.reject(err.message)
        })
    } catch (error) {
      // console.log('error', error)
      dispatch(errorPolicy(error.message))
      return Promise.reject(error.message)
    }
  }
}

export const fetchPolicy = payload => {
  return dispatch => {
    dispatch(loadingPolicy())
    try {
      const { page = 1, limit = 10 } = payload

      return apiGet('event_policy', page, limit)
        .then(resp => {
          const { data } = resp
          const { meta } = data

          if (meta.success) {
            dispatch(dataPolicy(data))
            return Promise.resolve(resp)
          } else {
            dispatch(errorPolicy(meta))
            return Promise.reject(meta)
          }
        })
        .catch(err => {
          dispatch(errorPolicy(err.message))
          return Promise.reject(err.message)
        })
    } catch (error) {
      dispatch(errorPolicy(error.message))
      return Promise.reject(error.message)
    }
  }
}

export const updatePolicy = (id, payload) => {
  return dispatch => {
    dispatch(loadingPolicy())
    try {
      return apiPatch('event_policy', id, payload)
        .then(resp => {
          const { data } = resp
          const { meta } = data

          if (meta.success) {
            dispatch(dataPolicy([data]))
            return Promise.resolve(meta)
          } else {
            dispatch(errorPolicy(meta))
            return Promise.reject(meta)
          }
        })
        .catch(err => {
          dispatch(errorPolicy(err.message))
          return Promise.reject(err.message)
        })
    } catch (error) {
      dispatch(errorPolicy(error.message))
      return Promise.reject(error.message)
    }
  }
}

export const deletePolicy = id => {
  return dispatch => {
    dispatch(loadingPolicy())
    try {
      return apiDestroy('event_policy', id)
        .then(resp => {
          const { data } = resp
          const { meta } = data

          if (meta.success) {
            dispatch(dataPolicy([data]))
            return Promise.resolve(meta)
          } else {
            dispatch(errorPolicy(meta))
            return Promise.reject(meta)
          }
        })
        .catch(err => {
          dispatch(errorPolicy(err.message))
          return Promise.reject(err.message)
        })
    } catch (error) {
      dispatch(errorPolicy(error.message))
      return Promise.reject(error.message)
    }
  }
}
