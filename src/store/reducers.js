import { combineReducers } from 'redux'

import profile from './profile/profile.reducers'
import users from './users/users.reducers'
import indicators from './indicator/indicator.reducers'
import report_templates from './report_template/report_template.reducers'
import report from './report/report.reducers'

const reducers = combineReducers({
  profile,
  users,
  indicators,
  report_templates,
  report,
})

export default reducers
