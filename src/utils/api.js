import axios from 'axios'
import config from '../config'
import jwt from 'jsonwebtoken'

const api = axios.create({
  baseURL: config.BASE_API_URL,
  timeout: 1000,
  headers: { Authorization: `bearer ${localStorage.getItem('wd-id-authorization')}` },
})

const verifyJwtExpiration = async () => {
  const token = localStorage.getItem('wd-id-authorization')
  const decoded = jwt.decode(token)
  if (decoded && decoded.exp < Date.now() / 1000) {
    try {
      const resp = await refreshToken()
      localStorage.setItem('wd-id-authorization', resp.data.data.access_token)
      localStorage.setItem('wd-id-retoken', resp.data.data.refresh_token)
      Object.assign(api.defaults, {
        headers: { Authorization: `bearer ${localStorage.getItem('wd-id-authorization')}` },
      })
    } catch (error) {
      console.log('error refreshing token:', error)
      localStorage.removeItem('wd-id-authorization')
      localStorage.removeItem('wd-id-retoken')
      window.location = '/'
    }
  }
}

// TODO:andy-shi88=clean up unused api call
const refreshToken = () => {
  const refreshToken = localStorage.getItem('wd-id-retoken')
  return api.post('/auth/refreshToken', { refresh_token: refreshToken })
}

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

// Hotel endpoint
export const getHotels = async (page = 1, limit = 10) => {
  await verifyJwtExpiration()
  return api.get(`/hotels?page=${page}&limit=${limit}`)
}

export const createHotel = async (payload = {}) => {
  await verifyJwtExpiration()
  return api.post('/hotels', { ...payload })
}

export const patchHotel = async (id, payload = {}) => {
  await verifyJwtExpiration()
  return api.patch(`/hotels/${id}`, { ...payload })
}

export const destroyHotel = async id => {
  await verifyJwtExpiration()
  return api.delete(`/hotels/${id}`)
}

// Room endpoint
export const getRooms = async (hotelId, page = 1, limit = 10) => {
  await verifyJwtExpiration()
  return api.get(`/hotels/${hotelId}/rooms?page=${page}&limit=${limit}`)
}

export const createRoom = async (hotelId, payload = {}) => {
  await verifyJwtExpiration()
  return api.post(`/hotels/${hotelId}/rooms`, { ...payload })
}

export const patchRoom = async (id, payload = {}) => {
  await verifyJwtExpiration()
  return api.patch(`/rooms/${id}`, { ...payload })
}

export const destroyRoom = async id => {
  await verifyJwtExpiration()
  return api.delete(`/rooms/${id}`)
}

// Hotel Booking endpoint
export const getHotelBooks = async (page = 1, limit = 10) => {
  await verifyJwtExpiration()
  return api.get(`/hotel_books?page=${page}&limit=${limit}`)
}

export const patchHotelBook = async (id, status = 'pending') => {
  await verifyJwtExpiration()
  return api.patch(`/hotel_books/${id}`, { status })
}

// Hotel Price Rule endpoint
export const getHotelPriceRules = async (page = 1, limit = 10) => {
  await verifyJwtExpiration()
  return api.get(`/hotel/rules?page=${page}&limit=${limit}`)
}

export const createHotelPriceRule = async (payload = {}) => {
  await verifyJwtExpiration()
  return api.post('/hotel/rules', { ...payload })
}

export const patchHotelPriceRule = async (id, payload = {}) => {
  await verifyJwtExpiration()
  return api.patch(`/hotel/rules/${id}`, { ...payload })
}

export const destroyHotelPriceRule = async id => {
  await verifyJwtExpiration()
  return api.delete(`/hotel/rules/${id}`)
}
