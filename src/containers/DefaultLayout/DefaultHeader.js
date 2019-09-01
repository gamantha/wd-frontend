import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DropdownItem, Nav } from 'reactstrap'
import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react'

import logo from '../../assets/img/brand/gamantha-logo.png'
import logoMini from '../../assets/img/brand/logo-mini.png'

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
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 75, height: '45px', alt: 'logo-full' }}
          minimized={{ src: logoMini, width: 45, height: 45, alt: 'logo-minized' }}
        />

        <Nav className="ml-auto" navbar>
          <DropdownItem onClick={() => this.handleLogout()}>
            <i className="fa fa-lock" /> Logout
          </DropdownItem>
        </Nav>
      </React.Fragment>
    )
  }
}

DefaultHeader.propTypes = propTypes
DefaultHeader.defaultProps = defaultProps

export default DefaultHeader
