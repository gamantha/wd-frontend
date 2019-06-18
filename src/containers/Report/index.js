import React, { Component } from 'react'
import { notification } from 'antd'

import ReportForm from '../../views/Report/ReportForm'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  fetchReport,
  addReport,
  updateReport,
  deleteReport,
  download,
} from '../../store/report/report.actions'
import { fetchReportTemplates } from '../../store/report_template/report_template.actions'
import ReportList from '../../views/Report/ReportList'

class Report extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showForm: false,
      itemData: null,
    }

    this.handleAddItem = this.handleAddItem.bind(this)
    this.handleEditItem = this.handleEditItem.bind(this)
    this.handleBack = this.handleBack.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDeleteItem = this.handleDeleteItem.bind(this)
  }

  onChangePage = (page, pageSize) => {
    this.props.refetch({ page, limit: pageSize }).then(res => {
      console.log(res, 'report: change page')
    })
  }

  handleAddItem() {
    this.setState({
      showForm: true,
      itemData: null,
    })
  }

  handleEditItem(itemData) {
    this.setState({
      showForm: true,
      itemData,
    })
  }

  handleSubmit(item) {
    if (!this.state.itemData) {
      this.props
        .onCreateItem(item)
        .then(() => {
          notification['success']({
            message: 'Success Message',
            description: 'Success to create record!',
            style: { top: '35px' },
          })
          this.props.refetch({ page: 1, limit: 10 }).then(() => {
            this.handleBack()
          })
        })
        .catch(res => {
          notification['warning']({
            message: 'Validation Message',
            description: res,
            style: { top: '35px' },
          })
        })
    } else {
      this.props
        .onUpdateItem(this.state.itemData.id, item)
        .then(() => {
          notification['success']({
            message: 'Success Message',
            description: 'Success to update record!',
            style: { top: '35px' },
          })
          this.props.refetch({ page: 1, limit: 10 }).then(() => {
            this.handleBack()
          })
        })
        .catch(res => {
          notification['warning']({
            message: 'Validation Message',
            description: res,
            style: { top: '35px' },
          })
        })
    }
  }

  handleDownload(id, type) {
    this.props
      .download(id, type)
      .then(() => {
        notification['success']({
          message: 'Success Message',
          description: `Success download file ${type}`,
          style: { top: '35px' },
        })
      })
      .catch(res => {
        notification['warning']({
          message: 'Validation Message',
          description: res,
          style: { top: '35px' },
        })
      })
  }

  handleDeleteItem(id) {
    this.props
      .onDeleteItem(id)
      .then(() => {
        notification['success']({
          message: 'Success Message',
          description: 'Success to delete record!',
          style: { top: '35px' },
        })
        this.props.refetch({ page: 1, limit: 10 }).then(() => {
          this.handleBack()
        })
      })
      .catch(res => {
        notification['warning']({
          message: 'Validation Message',
          description: res, //res.message.replace('GraphQL error: ValidationError: ', ''),
          style: { top: '35px' },
        })
      })
  }

  handleSort(sorts) {
    this.props
      .fetchReport({ page: 1, limit: 10, sort: sorts })
      .then(res => {
        console.log(res, 'report fetched')
      })
      .catch(err => {
        notification['warning']({
          message: 'Warning',
          description: 'There are some problem when fetching the data, please refresh your browser',
        })
      })
  }

  componentDidMount() {
    this.props
      .fetchReport({ page: 1, limit: 10, sort: 'created_at' })
      .then(res => {
        console.log(res, 'report fetched')
      })
      .catch(err => {
        notification['warning']({
          message: 'Warning',
          description: 'There are some problem when fetching the data, please refresh your browser',
        })
      })

    // Fetch Report Template
    this.props
      .fetchReportTemplates({ page: 1, limit: 10 })
      .then(res => {
        console.log(res, 'report template fetched')
      })
      .catch(err => {
        notification['warning']({
          message: 'Warning',
          description: 'There are some problem when fetching the data, please refresh your browser',
        })
      })
  }

  handleBack() {
    this.setState({
      showForm: false,
      itemData: null,
    })
  }

  render() {
    const { loading, error, refetch, report = [], report_templates = [] } = this.props

    return !this.state.showForm ? (
      <ReportList
        onDownload={(id, type) => this.handleDownload(id, type)}
        loading={loading}
        error={error}
        report={report}
        onRefresh={() => refetch({ page: 1, limit: 10 })}
        onSort={sort => this.handleSort(sort)}
        onAddItem={this.handleAddItem}
        onEditItem={this.handleEditItem}
        onDeleteItem={this.handleDeleteItem}
        onChangePage={this.onChangePage}
      />
    ) : (
      <ReportForm
        itemData={this.state.itemData}
        reportTemplates={report_templates}
        onBack={this.handleBack}
        onSubmitItem={itemData => this.handleSubmit(itemData)}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    report: state.report.report || [],
    report_templates: state.report_templates.report_templates || [],
  }
}

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(
      {
        fetchReport,
        download,
        fetchReportTemplates,
        onCreateItem: addReport,
        refetch: fetchReport,
        onUpdateItem: updateReport,
        onDeleteItem: deleteReport,
      },
      dispatch
    ),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Report)
