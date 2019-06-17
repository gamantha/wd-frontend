import React from 'react'
import { ApolloConsumer } from 'react-apollo'

const SignOutButton = () => (
  <ApolloConsumer>
    {client => (
      <button type="button" onClick={() => logout(client)}>
        Sign Out
      </button>
    )}
  </ApolloConsumer>
)

const logout = client => {}

export { logout }

export default SignOutButton
