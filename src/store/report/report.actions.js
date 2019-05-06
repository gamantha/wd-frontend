import { REPORT_LOADING, REPORT_ERROR, REPORT_DATA } from './report.actionTypes'
import { getReport, createReport, patchReport, destroyReport } from '../../utils/api'

const loadingReport = () => ({
  type: REPORT_LOADING,
})

const errorReport = payload => ({
  type: REPORT_ERROR,
  payload,
})

const dataReport = payload => ({
  type: REPORT_DATA,
  payload,
})

export const fetchReport = payload => {
  return dispatch => {
    dispatch(loadingReport)
    try {
      const { page = 1, limit = 10 } = payload
      return new Promise((resolve, reject) => {
        getReport(page, limit)
          .then(res => {
            const { data } = res
            const { meta } = data
            if (meta.success !== true) {
              dispatch(errorReport(meta.message))
              reject(meta.message)
            } else {
              dispatch(dataReport(data))
              resolve(res)
            }
          })
          .catch(err => {
            dispatch(errorReport(err.mesage))
          })
      })
    } catch (error) {
      dispatch(errorReport(error.message))
    }
  }
}

export const addReport = payload => {
  return dispatch => {
    dispatch(loadingReport)
    try {
      return new Promise((resolve, reject) => {
        createReport(payload).then(result => {
          const { data } = result
          const { meta } = data
          if (meta.success !== true) {
            dispatch(errorReport(meta.message))
            reject(meta.message)
          } else {
            dispatch(dataReport(data))
            resolve(result)
          }
        })
      })
    } catch (error) {
      dispatch(errorReport(error.message))
    }
  }
}

export const updateReport = (id, payload) => {
  return dispatch => {
    dispatch(loadingReport)
    try {
      return new Promise((resolve, reject) => {
        patchReport(id, payload).then(result => {
          const { data } = result
          const { meta } = data
          if (meta.success !== true) {
            dispatch(errorReport(meta.message))
            reject(meta.message)
          } else {
            dispatch(dataReport(data))
            resolve(result)
          }
        })
      })
    } catch (error) {
      dispatch(errorReport(error.message))
    }
  }
}

export const deleteReport = id => {
  return dispatch => {
    dispatch(loadingReport)
    try {
      return new Promise((resolve, reject) => {
        destroyReport(id).then(result => {
          const { data } = result
          const { meta } = data
          if (meta.success !== true) {
            dispatch(errorReport(meta.message))
            reject(meta.message)
          } else {
            resolve(result)
          }
        })
      })
    } catch (error) {
      dispatch(errorReport(error.message))
    }
  }
}
