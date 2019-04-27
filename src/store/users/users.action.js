import { USER_LOADING, USER_ERROR, USER_DATA } from './users.actionType'
import { getUsers, createUser } from '../../utils/api'

const loadingUser = () => ({
  type: USER_LOADING,
})

const errorUser = payload => ({
  type: USER_ERROR,
  payload,
})

const dataUser = payload => ({
  type: USER_DATA,
  payload,
})

export const fetchUser = payload => {
  return dispatch => {
    dispatch(loadingUser)
    try {
      const { page = 1, limit = 10 } = payload
      return new Promise((resolve, reject) => {
        getUsers(page, limit)
          .then(res => {
            const { data } = res
            const { meta } = data
            if (meta.success !== true) {
              dispatch(errorUser(meta.message))
              reject(meta.message)
            } else {
              dispatch(dataUser(data))
              resolve(res)
            }
          })
          .catch(err => {
            dispatch(errorUser(err.mesage))
          })
      })
    } catch (error) {
      dispatch(errorUser(error.message))
    }
  }
}

export const addUser = payload => {
  return dispatch => {
    dispatch(loadingUser)
    try {
      return new Promise((resolve, reject) => {
        createUser(payload).then(result => {
          const { data } = result
          const { meta } = data
          if (meta.success !== true) {
            dispatch(errorUser(meta.message))
            reject(meta.message)
          } else {
            dispatch(dataUser(data))
            resolve(result)
          }
        })
      })
    } catch (error) {
      dispatch(errorUser, error.message)
    }
  }
}
