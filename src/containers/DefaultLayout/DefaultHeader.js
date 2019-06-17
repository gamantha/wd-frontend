import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DropdownItem, DropdownMenu, DropdownToggle, Nav } from 'reactstrap'
import { AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react'

import logo from '../../assets/img/brand/gamantha-logo.png'
import logoMini from '../../assets/img/brand/logo-mini.png'

import { AWS } from 'amazon-cognito-identity-js'
const propTypes = {
  children: PropTypes.node,
}

const defaultProps = {}

class DefaultHeader extends Component {
  constructor(props) {
    super(props)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout() {
    document.cookie.split(';').forEach(function(c) {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/')
    })

    window.location.reload()
  }

  render() {
    // eslint-disable-next-line
    // console.log('default header props:', this.props)
    const { profile } = this.props

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 75, height: '45px', alt: 'logo-full' }}
          minimized={{ src: logoMini, width: 45, height: 45, alt: 'logo-minized' }}
        />

        <Nav className="ml-auto" navbar>
          {/* <NavItem className="d-md-down-none">
            <NavLink href="#">
              <i className="icon-bell" />
              <Badge pill color="danger">
                5
              </Badge>
            </NavLink>
          </NavItem> */}
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img src={'assets/img/avatars/user.png'} className="img-avatar" alt="profile" />
              <span style={{ marginRight: '20px' }}>{profile && profile.username}</span>
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              {/* <DropdownItem>
                <i className="fa fa-wrench" /> Settings
              </DropdownItem> */}
              {/* <DropdownItem>
                <i className="fa fa-user" /> Profile
              </DropdownItem> */}
              <DropdownItem onClick={() => this.handleLogout()}>
                <i className="fa fa-lock" /> Logout
              </DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
      </React.Fragment>
    )
  }
}

DefaultHeader.propTypes = propTypes
DefaultHeader.defaultProps = defaultProps

export default DefaultHeader
