import {
  REPORT_TEMPLATE_LOADING,
  REPORT_TEMPLATE_ERROR,
  REPORT_TEMPLATE_DATA,
} from './report_template.actionTypes'
import {
  getReportTemplates,
  createReportTemplate,
  patchReportTemplate,
  destroyReportTemplate,
} from '../../utils/api'

const loadingReportTemplate = () => ({
  type: REPORT_TEMPLATE_LOADING,
})

const errorReportTemplate = payload => ({
  type: REPORT_TEMPLATE_ERROR,
  payload,
})

const dataReportTemplate = payload => ({
  type: REPORT_TEMPLATE_DATA,
  payload,
})

export const fetchReportTemplates = payload => {
  return dispatch => {
    dispatch(loadingReportTemplate)
    try {
      const { page = 1, limit = 10 } = payload
      return new Promise((resolve, reject) => {
        getReportTemplates(page, limit)
          .then(res => {
            const { data } = res
            const { meta } = data
            if (meta.success !== true) {
              dispatch(errorReportTemplate(meta.message))
              reject(meta.message)
            } else {
              dispatch(dataReportTemplate(data))
              resolve(res)
            }
          })
          .catch(err => {
            dispatch(errorReportTemplate(err.mesage))
          })
      })
    } catch (error) {
      dispatch(errorReportTemplate(error.message))
    }
  }
}

export const addReportTemplate = payload => {
  return dispatch => {
    dispatch(loadingReportTemplate)
    try {
      return new Promise((resolve, reject) => {
        createReportTemplate(payload).then(result => {
          const { data } = result
          const { meta } = data
          if (meta.success !== true) {
            dispatch(errorReportTemplate(meta.message))
            reject(meta.message)
          } else {
            dispatch(dataReportTemplate(data))
            resolve(result)
          }
        })
      })
    } catch (error) {
      dispatch(errorReportTemplate(error.message))
    }
  }
}

export const updateReportTemplate = (id, payload) => {
  return dispatch => {
    dispatch(loadingReportTemplate)
    try {
      return new Promise((resolve, reject) => {
        patchReportTemplate(id, payload).then(result => {
          const { data } = result
          const { meta } = data
          if (meta.success !== true) {
            dispatch(errorReportTemplate(meta.message))
            reject(meta.message)
          } else {
            dispatch(dataReportTemplate(data))
            resolve(result)
          }
        })
      })
    } catch (error) {
      dispatch(errorReportTemplate(error.message))
    }
  }
}

export const deleteReportTemplate = id => {
  return dispatch => {
    dispatch(loadingReportTemplate)
    try {
      return new Promise((resolve, reject) => {
        destroyReportTemplate(id).then(result => {
          const { data } = result
          const { meta } = data
          if (meta.success !== true) {
            dispatch(errorReportTemplate(meta.message))
            reject(meta.message)
          } else {
            resolve(result)
          }
        })
      })
    } catch (error) {
      dispatch(errorReportTemplate(error.message))
    }
  }
}
