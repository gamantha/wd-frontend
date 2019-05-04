import { combineReducers } from 'redux'

import profile from './profile/profile.reducers'
import users from './users/users.reducers'
import indicators from './indicator/indicator.reducers'

const reducers = combineReducers({
  profile,
  users,
  indicators,
})

export default reducers
