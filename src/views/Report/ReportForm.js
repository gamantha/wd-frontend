import React, { Component } from 'react'
import { Card, Col, Row, Form, Button, Alert, Select, DatePicker, Input } from 'antd'
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
  state = {
    reportType: 'none',
  }
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

  handleReportType(type) {
    this.setState({ reportType: type })
  }

  formatReportTemplates(id = '') {
    const { reportTemplates } = this.props
    const { data } = reportTemplates || {}
    const { reportType } = this.state

    let filterTemplate
    if (!id) {
      filterTemplate = data && data.filter(item => item.report_type === reportType)
    } else {
      filterTemplate = data && data.filter(item => item.id === id)
    }

    return (
      filterTemplate &&
      filterTemplate.map(item => {
        return (
          <Option key={item.id} value={item.id}>
            {item.name}
          </Option>
        )
      })
    )
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { loading, error, onBack, itemData } = this.props
    console.log('itemdata', this.props)
    return (
      <div className="animated fadeIn">
        <Card title={!itemData ? 'Create report' : 'Edit report'}>
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
                          message: 'Please input report name!',
                          whitespace: true,
                        },
                      ],
                    })(<Input placeholder="Input the report name.." />)}
                  </Form.Item>
                  <Form.Item label="Report Type" {...formItemLayout}>
                    {getFieldDecorator('report_type', {
                      initialValue: itemData && itemData.template.report_type,
                      rules: [
                        {
                          required: true,
                          message: 'Please input report type!',
                          whitespace: true,
                        },
                      ],
                    })(
                      <section>
                        <Select
                          onChange={type => this.handleReportType(type)}
                          initialValue={itemData && itemData.template.report_type}
                          disabled={itemData}>
                          <Option value="monthly">Monthly</Option>
                          <Option value="quarterly">Quarterly</Option>
                          <Option value="annually">Annually</Option>
                          <Option value="other">Other</Option>
                        </Select>
                      </section>
                    )}
                  </Form.Item>
                  <Form.Item label="Report Template" {...formItemLayout}>
                    {getFieldDecorator('report_template_id', {
                      initialValue: itemData && itemData.template.id,
                      rules: [
                        {
                          required: true,
                          type: 'number',
                          message: 'Please input report template!',
                          whitespace: true,
                        },
                      ],
                    })(
                      <Select initialValue={itemData && itemData.template.id} disabled={itemData}>
                        {!itemData
                          ? this.formatReportTemplates()
                          : this.formatReportTemplates(itemData.template.id)}
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
                        initialValue={(moment(itemData && itemData.report_date), 'YYYY-MM-DD')}
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
