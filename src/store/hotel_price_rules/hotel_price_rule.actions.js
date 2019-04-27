import {
  HOTEL_PRICE_RULE_LOADING,
  HOTEL_PRICE_RULE_ERROR,
  HOTEL_PRICE_RULE_DATA,
} from './hotel_price_rule.actionType'
import {
  getHotelPriceRules,
  createHotelPriceRule,
  patchHotelPriceRule,
  destroyHotelPriceRule,
} from '../../utils/api'

const loadingHotelPriceRule = () => ({
  type: HOTEL_PRICE_RULE_LOADING,
})

const errorHotelPriceRule = payload => ({
  type: HOTEL_PRICE_RULE_ERROR,
  payload,
})

const dataHotelPriceRule = payload => ({
  type: HOTEL_PRICE_RULE_DATA,
  payload,
})

export const fetchHotelPriceRule = payload => {
  return dispatch => {
    dispatch(loadingHotelPriceRule)
    try {
      const { page = 1, limit = 10 } = payload
      return new Promise((resolve, reject) => {
        getHotelPriceRules(page, limit)
          .then(res => {
            const { data } = res
            const { meta } = data
            if (meta.success !== true) {
              dispatch(errorHotelPriceRule(meta.message))
              reject(meta.message)
            } else {
              dispatch(dataHotelPriceRule(data))
              resolve(res)
            }
          })
          .catch(err => {
            dispatch(errorHotelPriceRule(err.mesage))
          })
      })
    } catch (error) {
      dispatch(errorHotelPriceRule(error.message))
    }
  }
}

export const addHotelPriceRule = payload => {
  return dispatch => {
    dispatch(loadingHotelPriceRule)
    try {
      return new Promise((resolve, reject) => {
        createHotelPriceRule(payload).then(result => {
          const { data } = result
          const { meta } = data
          if (meta.success !== true) {
            dispatch(errorHotelPriceRule(meta.message))
            reject(meta.message)
          } else {
            dispatch(dataHotelPriceRule(data))
            resolve(result)
          }
        })
      })
    } catch (error) {
      dispatch(errorHotelPriceRule(error.message))
    }
  }
}

export const updateHotelPriceRule = (id, payload) => {
  return dispatch => {
    dispatch(loadingHotelPriceRule)
    try {
      console.log('on update hotel price rule', payload)
      return new Promise((resolve, reject) => {
        patchHotelPriceRule(id, payload).then(result => {
          const { data } = result
          const { meta } = data
          if (meta.success !== true) {
            dispatch(errorHotelPriceRule(meta.message))
            reject(meta.message)
          } else {
            dispatch(dataHotelPriceRule(data))
            resolve(result)
          }
        })
      })
    } catch (error) {
      dispatch(errorHotelPriceRule(error.message))
    }
  }
}

export const deleteHotelPriceRule = id => {
  return dispatch => {
    dispatch(loadingHotelPriceRule)
    try {
      return new Promise((resolve, reject) => {
        destroyHotelPriceRule(id).then(result => {
          const { data } = result
          const { meta } = data
          if (meta.success !== true) {
            dispatch(errorHotelPriceRule(meta.message))
            reject(meta.message)
          } else {
            resolve(result)
          }
        })
      })
    } catch (error) {
      dispatch(errorHotelPriceRule(error.message))
    }
  }
}
