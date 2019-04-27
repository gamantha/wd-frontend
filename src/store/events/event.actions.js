import { apiGet, apiCreate, apiPatch, apiDestroy } from '../../utils/api'
import {
  EVENT_LOADING,
  EVENT_ERROR,
  EVENT_DATA,
  EVENT_OF_POLICY_LOADING,
  EVENT_OF_POLICY_ERROR,
  EVENT_OF_POLICY_DATA,
  EVENT_TICKET_LOADING,
  EVENT_TICKET_ERROR,
  EVENT_TICKET_DATA,
} from './event.actionType'

// event
const loadingEvent = () => ({
  type: EVENT_LOADING,
})

const errorEvent = payload => ({
  type: EVENT_ERROR,
  payload,
})

const dataEvent = payload => ({
  type: EVENT_DATA,
  payload,
})

export const createEvent = payload => {
  return dispatch => {
    dispatch(loadingEvent())
    try {
      return apiCreate('events', payload)
        .then(resp => {
          const { data } = resp
          const { meta } = data

          if (meta.success) {
            dispatch(dataEvent([data]))
            return Promise.resolve(resp)
          } else {
            dispatch(errorEvent(meta))
            return Promise.reject(meta)
          }
        })
        .catch(err => {
          dispatch(errorEvent(err.message))
          return Promise.reject(err.message)
        })
    } catch (error) {
      console.log('error', error)
      dispatch(errorEvent(error.message))
      return Promise.reject(error.message)
    }
  }
}

export const fetchEvent = payload => {
  return dispatch => {
    dispatch(loadingEvent())
    try {
      const { page = 1, limit = 10 } = payload

      return apiGet('events', page, limit)
        .then(resp => {
          const { data } = resp
          const { meta } = data

          if (meta.success) {
            dispatch(dataEvent(data))
            return Promise.resolve(resp)
          } else {
            dispatch(errorEvent(meta))
            return Promise.reject(meta)
          }
        })
        .catch(err => {
          dispatch(errorEvent(err.message))
          return Promise.reject(err.message)
        })
    } catch (error) {
      dispatch(errorEvent(error.message))
      return Promise.reject(error.message)
    }
  }
}

export const updateEvent = (id, payload) => {
  return dispatch => {
    dispatch(loadingEvent())
    try {
      return apiPatch('events', id, payload)
        .then(resp => {
          const { data } = resp
          const { meta } = data

          if (meta.success) {
            dispatch(dataEvent([data]))
            return Promise.resolve(meta)
          } else {
            dispatch(errorEvent(meta))
            return Promise.reject(meta)
          }
        })
        .catch(err => {
          dispatch(errorEvent(err.message))
          return Promise.reject(err.message)
        })
    } catch (error) {
      dispatch(errorEvent(error.message))
      return Promise.reject(error.message)
    }
  }
}

export const deleteEvent = id => {
  return dispatch => {
    dispatch(loadingEvent())
    try {
      return apiDestroy('events', id)
        .then(resp => {
          const { data } = resp
          const { meta } = data

          if (meta.success) {
            dispatch(dataEvent([data]))
            return Promise.resolve(meta)
          } else {
            dispatch(errorEvent(meta))
            return Promise.reject(meta)
          }
        })
        .catch(err => {
          dispatch(errorEvent(err))
          return Promise.reject(err)
        })
    } catch (error) {
      dispatch(errorEvent(error))
      return Promise.reject(error)
    }
  }
}

// event policy
const loadingEventPolicy = () => ({
  type: EVENT_OF_POLICY_LOADING,
})

const errorEventPolicy = payload => ({
  type: EVENT_OF_POLICY_ERROR,
  payload,
})

const dataEventPolicy = payload => ({
  type: EVENT_OF_POLICY_DATA,
  payload,
})

export const createEventPolicy = payload => {
  return dispatch => {
    dispatch(loadingEventPolicy())
    try {
      return apiCreate('event_policies', payload)
        .then(resp => {
          const { data } = resp
          const { meta } = data

          if (meta.success) {
            dispatch(dataEventPolicy([data]))
            return Promise.resolve(resp)
          } else {
            dispatch(errorEventPolicy(meta))
            return Promise.reject(meta)
          }
        })
        .catch(err => {
          dispatch(errorEventPolicy(err.message))
          return Promise.reject(err.message)
        })
    } catch (error) {
      console.log('error', error)
      dispatch(errorEventPolicy(error.message))
      return Promise.reject(error.message)
    }
  }
}

export const fetchEventPolicy = payload => {
  return dispatch => {
    dispatch(loadingEventPolicy())
    try {
      const { page = 1, limit = 10 } = payload

      return apiGet('event_policies', page, limit)
        .then(resp => {
          const { data } = resp
          const { meta } = data

          if (meta.success) {
            dispatch(dataEventPolicy(data))
            return Promise.resolve(resp)
          } else {
            dispatch(errorEventPolicy(meta))
            return Promise.reject(meta)
          }
        })
        .catch(err => {
          dispatch(errorEventPolicy(err.message))
          return Promise.reject(err.message)
        })
    } catch (error) {
      dispatch(errorEventPolicy(error.message))
      return Promise.reject(error.message)
    }
  }
}

export const updateEventPolicy = (id, payload) => {
  return dispatch => {
    dispatch(loadingEventPolicy())
    try {
      return apiPatch('event_policies', id, payload)
        .then(resp => {
          const { data } = resp
          const { meta } = data

          if (meta.success) {
            dispatch(dataEventPolicy([data]))
            return Promise.resolve(meta)
          } else {
            dispatch(errorEventPolicy(meta))
            return Promise.reject(meta)
          }
        })
        .catch(err => {
          dispatch(errorEventPolicy(err.message))
          return Promise.reject(err.message)
        })
    } catch (error) {
      dispatch(errorEventPolicy(error.message))
      return Promise.reject(error.message)
    }
  }
}

export const deleteEventPolicy = id => {
  return dispatch => {
    dispatch(loadingEventPolicy())
    try {
      return apiDestroy('event_policies', id)
        .then(resp => {
          const { data } = resp
          const { meta } = data

          if (meta.success) {
            dispatch(dataEventPolicy([data]))
            return Promise.resolve(meta)
          } else {
            dispatch(errorEventPolicy(meta))
            return Promise.reject(meta)
          }
        })
        .catch(err => {
          dispatch(errorEventPolicy(err))
          return Promise.reject(err)
        })
    } catch (error) {
      dispatch(errorEventPolicy(error))
      return Promise.reject(error)
    }
  }
}

// event ticket
const loadingEventTicket = () => ({
  type: EVENT_TICKET_LOADING,
})

const errorEventTicket = payload => ({
  type: EVENT_TICKET_ERROR,
  payload,
})

const dataEventTciket = payload => ({
  type: EVENT_TICKET_DATA,
  payload,
})

export const createEventTicket = payload => {
  return dispatch => {
    dispatch(loadingEventTicket())
    try {
      return apiCreate(`events/${payload.bulk[0].event_id}/ticket`, payload)
        .then(resp => {
          const { data } = resp
          const { meta } = data

          if (meta.success) {
            dispatch(dataEventTciket([data]))
            return Promise.resolve(resp)
          } else {
            dispatch(errorEventTicket(meta))
            return Promise.reject(meta)
          }
        })
        .catch(err => {
          dispatch(errorEventTicket(err.message))
          return Promise.reject(err.message)
        })
    } catch (error) {
      console.log('error', error)
      dispatch(errorEventTicket(error.message))
      return Promise.reject(error.message)
    }
  }
}

export const fetchEventTicket = payload => {
  return dispatch => {
    dispatch(loadingEventTicket())
    try {
      const { page = 1, limit = 10 } = payload

      return apiGet('events', page, limit)
        .then(resp => {
          const { data } = resp
          const { meta } = data

          if (meta.success) {
            dispatch(dataEventTciket(data))
            return Promise.resolve(resp)
          } else {
            dispatch(errorEventTicket(meta))
            return Promise.reject(meta)
          }
        })
        .catch(err => {
          dispatch(errorEventTicket(err.message))
          return Promise.reject(err.message)
        })
    } catch (error) {
      dispatch(errorEventTicket(error.message))
      return Promise.reject(error.message)
    }
  }
}

export const updateEventTicket = (id, payload) => {
  return dispatch => {
    dispatch(loadingEventTicket())
    try {
      return apiPatch('events', id, payload)
        .then(resp => {
          const { data } = resp
          const { meta } = data

          if (meta.success) {
            dispatch(dataEventTciket([data]))
            return Promise.resolve(meta)
          } else {
            dispatch(errorEventTicket(meta))
            return Promise.reject(meta)
          }
        })
        .catch(err => {
          dispatch(errorEventTicket(err.message))
          return Promise.reject(err.message)
        })
    } catch (error) {
      dispatch(errorEventTicket(error.message))
      return Promise.reject(error.message)
    }
  }
}

export const deleteEventTicket = id => {
  return dispatch => {
    dispatch(loadingEventTicket())
    try {
      return apiDestroy('events', id)
        .then(resp => {
          const { data } = resp
          const { meta } = data

          if (meta.success) {
            dispatch(dataEventTciket([data]))
            return Promise.resolve(meta)
          } else {
            dispatch(errorEventTicket(meta))
            return Promise.reject(meta)
          }
        })
        .catch(err => {
          dispatch(errorEventTicket(err))
          return Promise.reject(err)
        })
    } catch (error) {
      dispatch(errorEventTicket(error))
      return Promise.reject(error)
    }
  }
}
