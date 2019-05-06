import { Permissions } from './utils/permissions'

const routes = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
  },
  {
    name: 'Manage Admins',
    url: '/admins',
    icon: 'fa fa-user-secret',
    group: 'SystemAdmin',
    location: '59cedfba9ae80d05757f54e9',
  },

  {
    divider: true,
  },
  {
    name: 'Manage Users',
    url: '/users',
    icon: 'fa fa-users',
    group: 'SystemAdmin',
    location: '59cedfba9ae80d05757f54e9',
  },
  {
    name: 'Manage Indicators',
    url: '/indicators',
    icon: 'fa fa-users',
    group: 'SystemAdmin',
    location: '59cedfba9ae80d05757f54e9',
  },
  {
    name: 'Manage Report Template',
    url: '/report_templates',
    icon: 'fa fa-users',
    group: 'SystemAdmin',
    location: '59cedfba9ae80d05757f54e9',
  },
  {
    name: 'Manage Report',
    url: '/report',
    icon: 'fa fa-list-alt',
    group: 'SystemAdmin',
    location: '59cedfba9ae80d05757f54e9',
  },
  // {
  //   title: true,
  //   name: 'Management API Hotel',
  // },
  // {
  //   name: 'Hotel Management',
  //   url: '/hotels',
  //   icon: 'fa fa-list-alt',
  // },
  // {
  //   name: 'Hotel Bookings',
  //   url: '/hotels/books',
  //   icon: 'fa fa-list-alt',
  // },
  // {
  //   title: true,
  //   name: 'Management API Events',
  // },
  // {
  //   name: 'Event Category',
  //   url: '/event-categories',
  //   icon: 'fa fa-calendar',
  // },
  // {
  //   name: 'Event Policy',
  //   url: '/event-policies',
  //   icon: 'fa fa-calendar',
  // },
  // {
  //   name: 'Event',
  //   url: '/events',
  //   icon: 'fa fa-calendar',
  // },
  // {
  //   divider: true,
  // },
  // {
  //   title: true,
  //   name: 'Reporting',
  // },
  // {
  //   name: 'Payment Report',
  //   url: '/theme/colors',
  //   icon: 'fa fa-list-alt',
  // },
]

/**
 * getRoutes by providing permissionJson from cognito
 * @param permissionJson String
 * @return array of routes
 */
export const getRoutes = permissionJson => {
  const permission = new Permissions(permissionJson)
  const items = routes.filter(item => permission.hasRole(item.group, item.location))
  return items
}
