import React, { Component } from 'react'
import { Card, Col, Row, Form, Input, Button, Select, Alert } from 'antd'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 10 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
}

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 19,
      offset: 5,
    },
  },
}

class UserForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fileObjs: [],
    }

    this.form = props.form
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()

    this.form.validateFieldsAndScroll((err, itemData) => {
      if (!err) {
        this.props.onSubmitItem(itemData)
      }
    })
  }

  handleImageAdd(acceptedFiles, rejectedFiles) {
    this.setState(prevState => {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/File
      return {
        fileObjs: [...prevState.fileObjs, ...acceptedFiles],
      }
    })
  }

  handleImageClear() {
    this.setState({ fileObjs: [] })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { loading, error, onBack, itemData } = this.props

    return (
      <div className="animated fadeIn">
        <Card title={!itemData ? 'Create User' : 'Edit User'}>
          {error ? (
            <Alert message="Error" description={this.props.error.message} type="error" showIcon />
          ) : (
            <Form onSubmit={this.handleSubmit}>
              <Row>
                <Col span="12">
                  <Form.Item label="Username" {...formItemLayout}>
                    {getFieldDecorator('username', {
                      initialValue: itemData && itemData.username,
                      rules: [
                        { required: true, message: 'Please input username!', whitespace: true },
                      ],
                    })(<Input placeholder="Input your username.." />)}
                  </Form.Item>
                  <Form.Item label="Email" {...formItemLayout}>
                    {getFieldDecorator('email', {
                      initialValue: itemData && itemData.username,
                      rules: [{ required: true, message: 'Please input email!', whitespace: true }],
                    })(<Input placeholder="Input your username.." />)}
                  </Form.Item>
                  {!itemData && (
                    <Form.Item label="Password" {...formItemLayout}>
                      {getFieldDecorator('password', {
                        initialValue: itemData && itemData.password,
                        rules: [
                          { required: true, message: 'Please input password!', whitespace: true },
                        ],
                      })(<Input type="password" placeholder="Input your password.." />)}
                    </Form.Item>
                  )}
                  <Form.Item label="Role" {...formItemLayout}>
                    {getFieldDecorator('role', {
                      initialValue: itemData && itemData.role,
                      rules: [{ required: true, message: 'Please choose role!' }],
                    })(
                      <Select placeholder="Please select role.." style={{ width: '100%' }}>
                        <Select.Option value="admin">Admin</Select.Option>
                        <Select.Option value="user">Reguler user</Select.Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item {...tailFormItemLayout}>
                <Button loading={loading} type="primary" htmlType="submit">
                  {itemData === null ? 'Submit' : 'Update'}
                </Button>
                <Button
                  onClick={() => onBack()}
                  disabled={loading || error}
                  type="default"
                  style={{ marginLeft: '8px' }}>
                  Cancel
                </Button>
              </Form.Item>
            </Form>
          )}
        </Card>
      </div>
    )
  }
}

export default Form.create()(UserForm)
