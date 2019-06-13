import React, { Component } from 'react'
import { notification } from 'antd'

import ReportForm from '../../views/Report/ReportIndicatorsForm'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchReportById, addIndicatorValue } from '../../store/report/report.actions'

class Report extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showForm: false,
      itemData: null,
    }

    this.handleBack = this.handleBack.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(item) {
    this.props
      .addIndicatorValue(item)
      .then(() => {
        notification['success']({
          message: 'Success Message',
          description: 'Success to save data!',
          style: { top: '35px' },
        })
        const {
          match: { params },
        } = this.props
        this.props.fetchReportById(params.id)
      })
      .catch(res => {
        notification['warning']({
          message: 'Validation Message',
          description: res,
          style: { top: '35px' },
        })
      })
  }

  handleBack() {
    this.setState({
      showForm: false,
      itemData: null,
    })
  }

  componentDidMount() {
    // Fetch Report indicators
    const {
      match: { params },
    } = this.props
    this.props
      .fetchReportById(params.id)
      .then(res => {
        console.log(res, 'report indicators fetched')
      })
      .catch(err => {
        notification['warning']({
          message: 'Warning',
          description: 'There are some problem when fetching the data, please refresh your browser',
        })
      })
  }

  render() {
    const {
      indicators: { data },
    } = this.props

    console.log('indicators', data)
    return (
      <ReportForm
        itemData={data}
        onBack={this.handleBack}
        onSubmitItem={itemData => this.handleSubmit(itemData)}
      />
    )
  }
}

const mapStateToProps = state => {
  console.log('STATE', state)
  return {
    indicators: state.report.reportId || [],
  }
}

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(
      {
        fetchReportById,
        addIndicatorValue,
      },
      dispatch
    ),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Report)
