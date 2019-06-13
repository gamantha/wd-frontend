import React, { Component } from 'react'
import { Card, Col, Row, Form, Input, Button, Alert, Select, Empty } from 'antd'
import moment from 'moment'

const Option = Select.Option

const formItemLayout = {}

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 19,
      offset: 0,
    },
  },
}

class ReportForm extends Component {
  constructor(props) {
    super(props)
    this.form = props.form
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    this.form.validateFieldsAndScroll((err, itemData) => {
      if (!err) {
        itemData.rule_json = JSON.stringify({ value: itemData })
        this.props.onSubmitItem(itemData)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { loading, error, onBack, itemData } = this.props
    const { indicators } = itemData || []
    console.log('ITEM', indicators)
    return (
      <div className="animated fadeIn">
        <Card title="Form Report">
          {error ? (
            <Alert message="Error" description={this.props.error.message} type="error" showIcon />
          ) : (
            <div>
              {indicators && indicators.length > 0 ? (
                <Form onSubmit={this.handleSubmit}>
                  {indicators &&
                    indicators.map(item => {
                      return (
                        <Row key={item.id}>
                          <Col span={12}>
                            <Form.Item label={item.name} {...formItemLayout}>
                              {getFieldDecorator(item.name, {
                                initialValue: item && item.indicator_value.value,
                                rules: [
                                  {
                                    message: 'Please input report template name!',
                                    whitespace: true,
                                  },
                                ],
                              })(<Input placeholder="0" />)}
                            </Form.Item>
                          </Col>
                        </Row>
                      )
                    })}

                  <Form.Item {...tailFormItemLayout}>
                    <Button loading={loading} type="primary" htmlType="submit">
                      Save
                    </Button>
                    <Button
                      loading={loading}
                      type="danger"
                      htmlType="submit"
                      style={{ marginLeft: '8px' }}>
                      Finish
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
              ) : (
                <Row>
                  <Col span={12} offset={8}>
                    <Empty
                      description={
                        <span>
                          Tidak ada indicator di laporan ini
                        </span>
                      }
                    />
                  </Col>
                </Row>
              )}
            </div>
          )}
        </Card>
      </div>
    )
  }
}

export default Form.create()(ReportForm)