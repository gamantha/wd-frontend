import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Container } from 'reactstrap'
import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react'
// sidebar nav config
import { getRoutes } from '../../_nav'
// routes config
import routes from '../../routes'
import DefaultAside from './DefaultAside'
import DefaultFooter from './DefaultFooter'
import DefaultHeader from './DefaultHeader'

import { getUserProfile } from '../../utils/cognito'

class DefaultLayout extends Component {
  constructor(props) {
    super(props)

    this.state = {
      profile: null,
      permissions: null,
      navGroup: {
        items: [],
      },
    }
  }

  componentDidMount() {
    const userProfile = getUserProfile()
    const permissions = userProfile['custom:permissions']
    if (permissions) {
      this.setState({
        profile: userProfile,
        navGroup: {
          items: [...getRoutes(permissions)],
        },
      })
    }
  }

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <DefaultHeader profile={this.state.profile} />
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <AppSidebarNav navConfig={this.state.navGroup} {...this.props} />
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes} />
            <Container fluid>
              <Switch>
                {routes.map((route, idx) => {
                  return route.component ? (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={props => <route.component {...props} />}
                    />
                  ) : null
                })}
                <Redirect from="/" to="/dashboard" />
              </Switch>
            </Container>
          </main>
          <AppAside fixed hidden>
            <DefaultAside />
          </AppAside>
        </div>
        <AppFooter>
          <DefaultFooter />
        </AppFooter>
      </div>
    )
  }
}

export default DefaultLayout
