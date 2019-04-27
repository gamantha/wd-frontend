import { combineReducers } from 'redux'

import profile from './profile/profile.reducers'
import users from './users/users.reducers'
import hotels from './hotels/hotel.reducers'
import rooms from './rooms/room.reducers'
import hotel_books from './hotel_books/hotel_book.reducers'
import hotel_price_rules from './hotel_price_rules/hotel_price_rule.reducers'
import eventCategories from './events/category.reducers'
import eventPolicies from './events/policy.reducers'
import events from './events/event.reducers'

const reducers = combineReducers({
  profile,
  users,
  hotels,
  rooms,
  hotel_books,
  hotel_price_rules,
  eventCategories,
  eventPolicies,
  events,
})

export default reducers
