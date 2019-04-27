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

const initialState = {
  loadingEvent: false,
  loadingEventPolicy: false,
  loadingEventTicket: false,
  events: [],
  eventPolicies: [],
  eventTickets: [],
  errorEvent: {
    status: false,
    message: null,
  },
  errorEventPolicy: {
    status: false,
    message: null,
  },
  errorEventTicket: {
    status: false,
    message: null,
  },
}

const reducers = (state = initialState, action) => {
  switch (action.type) {
    // event
    case EVENT_LOADING:
      return {
        ...state,
        loadingEvent: true,
        errorEvent: {
          status: false,
          message: null,
        },
      }
    case EVENT_ERROR:
      return {
        ...state,
        loadingEvent: false,
        errorEvent: {
          status: true,
          message: action.payload,
        },
      }
    case EVENT_DATA:
      return {
        ...state,
        loadingEvent: false,
        events: action.payload,
        errorEvent: {
          status: false,
          message: null,
        },
      }

    // event policy
    case EVENT_OF_POLICY_LOADING:
      return {
        ...state,
        loadingEventPolicy: true,
        errorEventPolicy: {
          status: false,
          message: null,
        },
      }
    case EVENT_OF_POLICY_ERROR:
      return {
        ...state,
        loadingEventPolicy: false,
        errorEventPolicy: {
          status: true,
          message: action.payload,
        },
      }
    case EVENT_OF_POLICY_DATA:
      return {
        ...state,
        loadingEventPolicy: false,
        events: action.payload,
        errorEventPolicy: {
          status: false,
          message: null,
        },
      }

    // event ticket
    case EVENT_TICKET_LOADING:
      return {
        ...state,
        loadingEventTicket: true,
        errorEventTicket: {
          status: false,
          message: null,
        },
      }
    case EVENT_TICKET_ERROR:
      return {
        ...state,
        loadingEventTicket: false,
        errorEventTicket: {
          status: true,
          message: action.payload,
        },
      }
    case EVENT_TICKET_DATA:
      return {
        ...state,
        loadingEventTicket: false,
        events: action.payload,
        errorEventTicket: {
          status: false,
          message: null,
        },
      }
    default:
      return state
  }
}

export default reducers
