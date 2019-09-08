import React from 'react'
import Loadable from 'react-loadable'

import DefaultLayout from './containers/DefaultLayout'
import loading from './assets/img/brand/loading.gif'

function Loading() {
  return (
    <div className="text-center">
      <img src={loading} alt="loading" style={{ marginTop: '5%', height: '50%', width: '50%' }} />
    </div>
  )
}

const Login = Loadable({
  loader: () => import('./views/Login'),
  loading: Loading,
})

const Dashboard = Loadable({
  loader: () => import('./views/Dashboard'),
  loading: Loading,
})

const Admins = Loadable({
  loader: () => import('./containers/AccountLayout/Admins'),
  loading: Loading,
})

const Users = Loadable({
  loader: () => import('./containers/AccountLayout/Users'),
  loading: Loading,
})

const Indicators = Loadable({
  loader: () => import('./containers/Indicator'),
  loading: Loading,
})

const ReportTemplates = Loadable({
  loader: () => import('./containers/ReportTemplate'),
  loading: Loading,
})

const Report = Loadable({
  loader: () => import('./containers/Report'),
  loading: Loading,
})

const ReportIndicators = Loadable({
  loader: () => import('./containers/ReportIndicator'),
  loading: Loading,
})

const ReportLayout = Loadable({
  loader: () => import('./containers/ReportLayout'),
  loading: Loading,
})

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/login', exact: true, name: 'Login', component: Login },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/admins', exact: true, name: 'Admins', component: Admins },
  { path: '/users', exact: true, name: 'Users', component: Users },
  { path: '/indicators', exact: true, name: 'Indicators', component: Indicators },
  { path: '/report_templates', exact: true, name: 'ReportTemplates', component: ReportTemplates },
  { path: '/report', exact: true, name: 'Report', component: Report },
  { path: '/report/:id', exact: true, name: 'Indicators', component: ReportIndicators },
  { path: '/report/indicators/:id', exact: true, name: 'Indicators', component: ReportIndicators },
  { path: '/reportFile/:id', exact: true, name: 'ReportLayout', component: ReportLayout },
  // { path: '/users/:id', exact: true, name: 'User Details', component: User },
]

export default routes
