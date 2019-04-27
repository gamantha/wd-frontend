import { PROFILE_LOADING, PROFILE_ERROR, PROFILE_DATA } from './profile.actionType'

const loadingProfile = () => ({
  type: PROFILE_LOADING,
})

const errorProfile = payload => ({
  type: PROFILE_ERROR,
  payload,
})

const dataProfile = payload => ({
  type: PROFILE_DATA,
  payload,
})

export const postProfile = payload => {
  console.log('actions postProfile:', payload)
  return dispatch => {
    dispatch(loadingProfile)
    try {
      dispatch(dataProfile(payload))
    } catch (error) {
      dispatch(errorProfile(error.message))
    }
  }
}
