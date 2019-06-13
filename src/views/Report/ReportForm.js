import React, { Component } from 'react'
import { Card, Col, Row, Form, Input, Button, Alert, Select, DatePicker } from 'antd'
import moment from 'moment'

const Option = Select.Option

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
    const { loading, error, onBack, itemData, reportTemplates } = this.props
    const { data } = reportTemplates

    return (
      <div className="animated fadeIn">
        <Card title={!itemData ? 'Create report' : 'Edit report'}>
          {error ? (
            <Alert message="Error" description={this.props.error.message} type="error" showIcon />
          ) : (
            <Form onSubmit={this.handleSubmit}>
              <Row>
                <Col span="12">
                  <Form.Item label="Report Template" {...formItemLayout}>
                    {getFieldDecorator('report_template_id', {
                      initialValue: itemData && itemData.report_template_id,
                      rules: [
                        {
                          type: 'number',
                          required: true,
                          message: 'Please input report template!',
                          whitespace: true,
                        },
                      ],
                    })(
                      <Select initialValue={itemData && itemData.report_template_id}>
                        {data &&
                          data.map(item => {
                            return (
                              <Option key={item.id} value={item.id}>
                                {item.name}
                              </Option>
                            )
                          })}
                      </Select>
                    )}
                  </Form.Item>
                  <Form.Item label="Report Date" {...formItemLayout}>
                    {getFieldDecorator('report_date', {
                      initialValue: itemData && moment(itemData.report_date, 'YYYY-MM-DD'),
                      rules: [
                        {
                          type: 'object',
                          required: true,
                          message: 'Please input the report date',
                          whitespace: true,
                        },
                      ],
                    })(
                      <DatePicker
                        // showTime
                        format="YYYY-MM-DD"
                        utcOffset={moment().utcOffset()}
                        initialValue={
                          (moment(itemData && itemData.report_date), 'YYYY-MM-DD')
                        }
                      />
                    )}
                  </Form.Item>
                  {/* <Form.Item label="Status" {...formItemLayout}>
                    {getFieldDecorator('status', {
                      initialValue: itemData && itemData.status,
                      rules: [
                        {
                          required: true,
                          message: 'Please input the report status',
                          whitespace: true,
                        },
                      ],
                    })(
                      <Select initialValue={itemData && itemData.status}>
                        <Option value="1">Active</Option>
                        <Option value="0">InActive</Option>
                      </Select>
                    )}
                  </Form.Item> */}
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

export default Form.create()(ReportForm)
