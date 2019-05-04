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

class IndicatorForm extends Component {
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
        <Card title={!itemData ? 'Create Indicator' : 'Edit Indicator'}>
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
                          message: 'Please input indicator name!',
                          whitespace: true,
                        },
                      ],
                    })(<Input placeholder="Input the indicator name.." />)}
                  </Form.Item>
                  <Form.Item label="Label" {...formItemLayout}>
                    {getFieldDecorator('label', {
                      initialValue: itemData && itemData.label,
                      rules: [
                        {
                          required: true,
                          message: 'Please input the indicator label',
                          whitespace: true,
                        },
                      ],
                    })(<Input placeholder="Input the indicator label.." />)}
                  </Form.Item>
                  <Form.Item label="Unit Label" {...formItemLayout}>
                    {getFieldDecorator('unit_label', {
                      initialValue: itemData && itemData.unit_label,
                      rules: [
                        {
                          required: true,
                          message: 'Please input the indicator unit label',
                          whitespace: true,
                        },
                      ],
                    })(<Input placeholder="Input the indicator unit label.." />)}
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

export default Form.create()(IndicatorForm)
