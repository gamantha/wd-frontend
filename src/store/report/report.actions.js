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

const loadingReport = status => ({
  type: REPORT_LOADING,
  status,
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
    dispatch(loadingReport(true))
    try {
      const { page = 1, limit = 10, sort = 'id' } = payload
      return new Promise((resolve, reject) => {
        getReport(page, limit, sort)
          .then(res => {
            dispatch(loadingReport(false))

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
            dispatch(loadingReport(false))
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
    const today = new Date()
    const dd = String(today.getDate()).padStart(2, '0')
    const mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
    const yyyy = today.getFullYear()
    dispatch(isDownload(true))
    try {
      return new Promise((resolve, reject) => {
        if (file === 'csv') {
          downloadCsv(id)
            .then(res => {
              const url = window.URL.createObjectURL(new Blob([res.data]))
              const link = document.createElement('a')
              link.href = url
              link.setAttribute('download', `Laporan-${id}-${dd}-${mm}-${yyyy}.csv`)
              document.body.appendChild(link)
              link.click()
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
              const url = window.URL.createObjectURL(new Blob([res.data]))
              const link = document.createElement('a')
              link.href = url
              link.setAttribute('download', `Laporan-${id}-${dd}-${mm}-${yyyy}.pdf`)
              document.body.appendChild(link)
              link.click()
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
    dispatch(loadingReport(true))
    try {
      return new Promise((resolve, reject) => {
        getReportById(id)
          .then(res => {
            dispatch(loadingReport(false))

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
            dispatch(loadingReport(false))
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
    dispatch(loadingReport(true))
    const { report_date, report_template_id, name } = payload
    const date = moment(report_date).format('YYYY:MM:DD h:mm:ss', 'LL')
    const data = {
      report_date: date,
      report_template_id,
      name,
    }
    try {
      return new Promise((resolve, reject) => {
        createReport(data).then(result => {
          dispatch(loadingReport(false))
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
      dispatch(loadingReport(false))
      dispatch(errorReport(error.message))
    }
  }
}

export const updateReport = (id, payload) => {
  return dispatch => {
    dispatch(loadingReport(true))
    const { report_date, report_template_id, name } = payload
    const date = moment(report_date).format('YYYY:MM:DD h:mm:ss')
    const data = {
      report_date: date,
      report_template_id,
      status: 1,
      name,
    }
    try {
      return new Promise((resolve, reject) => {
        patchReport(id, data).then(result => {
          dispatch(loadingReport(false))
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
      dispatch(loadingReport(false))
      dispatch(errorReport(error.message))
    }
  }
}

export const deleteReport = id => {
  return dispatch => {
    dispatch(loadingReport(true))
    try {
      return new Promise((resolve, reject) => {
        destroyReport(id).then(result => {
          dispatch(loadingReport(false))
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
      dispatch(loadingReport(false))
      dispatch(errorReport(error.message))
    }
  }
}

export const addIndicatorValue = payload => {
  return dispatch => {
    dispatch(loadingReport(true))
    try {
      return new Promise((resolve, reject) => {
        createIndicatorValue(payload).then(result => {
          dispatch(loadingReport(false))
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
      dispatch(loadingReport(false))
      dispatch(errorReport(error.message))
    }
  }
}
