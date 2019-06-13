import {
  REPORT_LOADING,
  REPORT_ERROR,
  REPORT_DATA,
  REPORT_ID,
  DONWLOAD_ERROR,
  REPORT_DOWNLOAD,
  IS_DOWNLOAD,
} from './report.actionTypes'
import {
  getReport,
  createReport,
  patchReport,
  destroyReport,
  getReportById,
  downloadCsv,
  downloadPdf,
  createIndicatorValue,
} from '../../utils/api'
import moment from 'moment'

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

const reportId = payload => ({
  type: REPORT_ID,
  payload,
})

const downloadError = payload => ({
  type: DONWLOAD_ERROR,
  payload,
})

const reportDownload = payload => ({
  type: REPORT_DOWNLOAD,
  payload,
})

const isDownload = payload => ({
  type: IS_DOWNLOAD,
  payload,
})

export const fetchReport = payload => {
  return dispatch => {
    dispatch(loadingReport)
    try {
      const { page = 1, limit = 10, sort = 'id' } = payload
      return new Promise((resolve, reject) => {
        getReport(page, limit, sort)
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

export const download = (id, file) => {
  return dispatch => {
    dispatch(isDownload(true))
    try {
      return new Promise((resolve, reject) => {
        if (file === 'csv') {
          downloadCsv(id)
            .then(res => {
              console.log('RES', res)
              const { data } = res
              const { meta } = data
              if (meta.success !== true) {
                dispatch(downloadError(meta.message))
                dispatch(isDownload(false))
                reject(meta.message)
              } else {
                dispatch(isDownload(false))
                dispatch(reportDownload(data))
                resolve(res)
              }
            })
            .catch(err => {
              dispatch(isDownload(false))
              dispatch(downloadError(err.mesage))
            })
        } else {
          downloadPdf(id)
            .then(res => {
              console.log('RES', res)
              const { data } = res
              const { meta } = data
              if (meta.success !== true) {
                dispatch(downloadError(meta.message))
                dispatch(isDownload(false))
                reject(meta.message)
              } else {
                dispatch(isDownload(false))
                dispatch(reportDownload(data))
                resolve(res)
              }
            })
            .catch(err => {
              dispatch(isDownload(false))
              dispatch(downloadError(err.mesage))
            })
        }
      })
    } catch (error) {
      dispatch(isDownload(false))
      dispatch(downloadError(error.message))
    }
  }
}

export const fetchReportById = id => {
  return dispatch => {
    dispatch(loadingReport)
    try {
      return new Promise((resolve, reject) => {
        getReportById(id)
          .then(res => {
            const { data } = res
            const { meta } = data
            if (meta.success !== true) {
              dispatch(errorReport(meta.message))
              reject(meta.message)
            } else {
              dispatch(reportId(data))
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
    const { report_date, report_template_id, status } = payload
    const date = moment(report_date).format('YYYY:MM:DD h:mm:ss', 'LL')
    const data = {
      report_date: date,
      report_template_id,
      status,
    }
    try {
      return new Promise((resolve, reject) => {
        createReport(data).then(result => {
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
    const { report_date, report_template_id, status } = payload
    const date = moment(report_date).format('YYYY:MM:DD h:mm:ss')
    const data = {
      report_date: date,
      report_template_id,
      status,
    }
    try {
      return new Promise((resolve, reject) => {
        patchReport(id, data).then(result => {
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

export const addIndicatorValue = payload => {
  return dispatch => {
    try {
      return new Promise((resolve, reject) => {
        createIndicatorValue(payload).then(result => {
          console.log("RESULT", result);
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
      console.log("RESULT", error);
      dispatch(errorReport(error.message))
    }
  }
}
