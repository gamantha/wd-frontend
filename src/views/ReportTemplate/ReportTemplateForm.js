import React, { Component } from 'react'
import { Card, Col, Row, Form, Input, Button, Alert } from 'antd'

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

class ReportTemplateForm extends Component {
  constructor(props) {
    super(props)
    this.form = props.form
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    this.form.validateFieldsAndScroll((err, itemData) => {
      if (!err) {
        itemData.rule_json = JSON.stringify({ value: itemData.value })
        this.props.onSubmitItem(itemData)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { loading, error, onBack, itemData } = this.props
    return (
      <div className="animated fadeIn">
        <Card title={!itemData ? 'Create report template' : 'Edit report template'}>
          {error ? (
            <Alert message="Error" description={this.props.error.message} type="error" showIcon />
          ) : (
            <Form onSubmit={this.handleSubmit}>
              <Row>
                <Col span="12">
                  <Form.Item label="Name" {...formItemLayout}>
                    {getFieldDecorator('name', {
                      initialValue: itemData && itemData.name,
                      rules: [
                        {
                          required: true,
                          message: 'Please input report template name!',
                          whitespace: true,
                        },
                      ],
                    })(<Input placeholder="Input the report template name.." />)}
                  </Form.Item>
                  <Form.Item label="Label" {...formItemLayout}>
                    {getFieldDecorator('label', {
                      initialValue: itemData && itemData.label,
                      rules: [
                        {
                          required: true,
                          message: 'Please input the report template label',
                          whitespace: true,
                        },
                      ],
                    })(<Input placeholder="Input the report template label.." />)}
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

export default Form.create()(ReportTemplateForm)
