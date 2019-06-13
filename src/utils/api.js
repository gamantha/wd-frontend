import axios from 'axios'
import jwt from 'jsonwebtoken'
import config from '../config'
import { getUserToken } from './cognito'

const api = axios.create({
  baseURL: config.BASE_API_URL,
  timeout: 2000,
  headers: { Authorization: `bearer ${getUserToken()}` },
})

const verifyJwtExpiration = async () => {
  const token = getUserToken()
  const decoded = jwt.decode(token)
  if (decoded && decoded.exp < Date.now() / 1000) {
    // try {
    //   const resp = await refreshToken()
    //   localStorage.setItem('wd-id-authorization', resp.data.data.Authorization)
    //   localStorage.setItem('wd-id-retoken', resp.data.data.refresh_token)
    //   Object.assign(api.defaults, {
    //     headers: { Authorization: `bearer ${localStorage.getItem('wd-id-authorization')}` },
    //   })
    // } catch (error) {
    // console.log('error refreshing token:', error)
    // localStorage.removeItem('wd-id-authorization')
    // localStorage.removeItem('wd-id-retoken')

    window.location = '/'
    // }
  }
}

// TODO:andy-shi88=clean up unused api call
// const refreshToken = () => {
//   const refreshToken = localStorage.getItem('wd-id-retoken')
//   return api.post('/auth/refreshToken', { refresh_token: refreshToken })
// }

// global rest api - get
export const apiGet = async (endpoint, page = 1, limit = 10) => {
  await verifyJwtExpiration()
  return api.get(`/${endpoint}?page=${page}&limit=${limit}`)
}

// global rest api - create
export const apiCreate = async (endpoint, payload) => {
  await verifyJwtExpiration()
  return api.post(endpoint, payload)
}

// global rest api - patch
export const apiPatch = async (endpoint, id, payload) => {
  await verifyJwtExpiration()
  return api.patch(`/${endpoint}/${id}`, payload)
}

// global rest api - delete
export const apiDestroy = async (endpoint, id) => {
  await verifyJwtExpiration()
  return api.delete(`/${endpoint}/${id}`)
}

export const getUsers = async (page = 1, limit = 10) => {
  await verifyJwtExpiration()
  return api.get(`/users?page=${page}&limit=${limit}`)
}

export const createUser = async (payload = {}) => {
  await verifyJwtExpiration()
  return api.post('/auth/register', { ...payload })
}

// Indicator endpoint
export const getIndicators = async (page = 1, limit = 10) => {
  await verifyJwtExpiration()
  return api.get(`/indicators?page=${page}&limit=${limit}`)
}

export const createIndicator = async (payload = {}) => {
  await verifyJwtExpiration()
  return api.post('/indicators', { ...payload })
}

export const patchIndicator = async (id, payload = {}) => {
  await verifyJwtExpiration()
  return api.patch(`/indicators/${id}`, { ...payload })
}

export const destroyIndicator = async id => {
  await verifyJwtExpiration()
  return api.delete(`/indicators/${id}`)
}

// Report Template endpoint
export const getReportTemplates = async (page = 1, limit = 10) => {
  await verifyJwtExpiration()
  return api.get(`/report_templates?page=${page}&limit=${limit}`)
}

export const getTemplateIndicators = async id => {
  await verifyJwtExpiration()
  return api.get(`/report_templates/${id}/indicators`)
}

export const createReportTemplate = async (payload = {}) => {
  await verifyJwtExpiration()
  return api.post('/report_templates', { ...payload })
}

export const patchReportTemplate = async (id, payload = {}) => {
  await verifyJwtExpiration()
  return api.patch(`/report_templates/${id}`, { ...payload })
}

export const destroyReportTemplate = async id => {
  await verifyJwtExpiration()
  return api.delete(`/report_templates/${id}`)
}

// Report endpoint
export const getReport = async (page = 1, limit = 10, $sort = 'id') => {
  await verifyJwtExpiration()
  return api.get(`/reports?page=${page}&limit=${limit}&sort=${$sort}`)
}

export const getReportById = async (id) => {
  await verifyJwtExpiration()
  return api.get(`/reports/${id}`)
}

export const createReport = async (payload = {}) => {
  await verifyJwtExpiration()
  return api.post('/reports', { ...payload })
}

export const patchReport = async (id, payload = {}) => {
  await verifyJwtExpiration()
  return api.patch(`/reports/${id}`, { ...payload })
}

export const destroyReport = async id => {
  await verifyJwtExpiration()
  return api.delete(`/reports/${id}`)
}

export const downloadCsv = async id => {
  await verifyJwtExpiration()
  return api.get(`/reports/${id}/export/csv`)
}

export const downloadPdf = async id => {
  await verifyJwtExpiration()
  return api.get(`/reports/${id}/export/pdf`)
}

export const createIndicatorValue = async (payload = {}) => {
  await verifyJwtExpiration()
  return api.post('/indicator_values', { ...payload })
}
