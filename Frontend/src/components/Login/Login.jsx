import React from 'react'
import Form from './Form'

const Login = () => {
  return (
    <Form route="api/token/obtain/" method="Login" />
  )
}

export default Login