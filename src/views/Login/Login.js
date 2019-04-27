import React, { Component } from 'react'

import { Container, Row, Col, CardGroup, Card, CardBody } from 'reactstrap'
import { Form, Input, Button } from 'antd'

import logo from '../../assets/img/brand/logo.png'

class Login extends Component {
  constructor(props) {
    super(props)

    this.form = props.form
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()

    this.form.validateFieldsAndScroll((err, itemData) => {
      if (!err) {
        this.props.onSubmitLogin(itemData)
      }
    })
  }

  render() {
    // console.log('login props: ', this.props)
    const { getFieldDecorator } = this.props.form

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                      <Form.Item>
                        {getFieldDecorator('username', {
                          initialValue: '',
                          rules: [{ required: true, message: 'Please input username!' }],
                        })(
                          <Input
                            prefix={
                              <i className="fa fa-envelope" style={{ color: 'rgba(0,0,0,.25)' }} />
                            }
                            placeholder="username.."
                          />
                        )}
                      </Form.Item>
                      <Form.Item>
                        {getFieldDecorator('password', {
                          initialValue: '',
                          rules: [{ required: true, message: 'Please input password!' }],
                        })(
                          <Input
                            type="password"
                            prefix={
                              <i className="fa fa-key" style={{ color: 'rgba(0,0,0,.25)' }} />
                            }
                            placeholder="Password.."
                          />
                        )}
                      </Form.Item>
                      <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                          Log in
                        </Button>
                      </Form.Item>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-info d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <img src={logo} alt="wd-logo" width="300px" />
                    <p>
                      <strong>WD Management</strong>
                    </p>
                    <p>
                      address here
                      <br />
                      street no xx, street, City
                      <br />
                      City, Province PostalCode
                    </p>
                    <p>Telp. (0361) xxxxx</p>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default Form.create()(Login)
