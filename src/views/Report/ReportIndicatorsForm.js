import React, { Component } from 'react'
import { Card, Col, Row, Form, Input, Button, Alert } from 'antd'

import Loading from '../Loading'

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
  state = {
    buttonClick: '1',
  }

  constructor(props) {
    super(props)
    this.form = props.form
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleButtonClick(button) {
    const status = button === 'save' ? 1 : 2
    this.setState({ buttonClick: status })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.form.validateFieldsAndScroll((err, data) => {
      const { itemData } = this.props
      const { id } = itemData || []
      const reportId = id
      const reportValue = []
      for (var key in data) {
        const indicatorId = key
        const indicatorValue = data[key] ? data[key] : '0'
        reportValue.push({ indicator_id: indicatorId, indicator_value: indicatorValue })
      }
      if (!err) {
        const dataReport = {
          report_id: reportId,
          report_values: reportValue,
          status: this.state.buttonClick,
        }
        this.props.onSubmitItem(dataReport)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { loading, error, itemData } = this.props
    const { indicators, status } = itemData || []
    const statusReport = status === 1 ? false : true

    if (!error && loading && indicators && indicators.length === 0) {
      return (
        <Row>
          <Col span={12} offset={8}>
            <span>Tidak ada indicator di laporan ini</span>
          </Col>
        </Row>
      )
    }

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
                            <Form.Item label={item.label} {...formItemLayout}>
                              {getFieldDecorator(item.id.toString(), {
                                initialValue:
                                  item && item.indicator_value && item.indicator_value.value,
                                rules: [
                                  {
                                    whitespace: true,
                                  },
                                ],
                              })(<Input placeholder="0" disabled={statusReport} />)}
                            </Form.Item>
                          </Col>
                        </Row>
                      )
                    })}

                  <Form.Item {...tailFormItemLayout}>
                    <Button
                      disabled={statusReport}
                      loading={loading}
                      type="primary"
                      htmlType="submit"
                      onClick={() => this.handleButtonClick('save')}>
                      Save
                    </Button>
                    <Button
                      disabled={statusReport}
                      loading={loading}
                      type="danger"
                      htmlType="submit"
                      style={{ marginLeft: '8px', marginRight: '8px' }}
                      onClick={() => this.handleButtonClick('finish')}>
                      Finish
                    </Button>
                    <a href="#/report">
                      <Button type="default">Cancel</Button>
                    </a>
                  </Form.Item>
                </Form>
              ) : (
                <Row>
                  <Col span={12} offset={8}>
                    <span>Menyiapkan data...</span>
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
