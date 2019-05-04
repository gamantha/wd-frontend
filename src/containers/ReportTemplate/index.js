import React, { Component } from 'react'
import { notification } from 'antd'

import ReportTemplateForm from '../../views/ReportTemplate/ReportTemplateForm'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  fetchReportTemplates,
  addReportTemplate,
  updateReportTemplate,
  deleteReportTemplate,
} from '../../store/report_template/report_template.actions'
import ReportTemplateList from '../../views/ReportTemplate/ReportTemplateList'

class ReportTemplate extends Component {
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

  componentDidMount() {
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

  handleAddItem() {
    this.setState({
      showForm: true,
      itemData: null,
    })
  }

  onChangePage = (page, pageSize) => {
    this.props.refetch({ page, limit: pageSize }).then(res => {
      console.log(res, 'report template: change page')
    })
  }

  handleEditItem(itemData) {
    this.setState({
      showForm: true,
      itemData,
    })
  }

  handleBack() {
    this.setState({
      showForm: false,
      itemData: null,
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

  render() {
    const { loading, error, refetch, report_templates = [] } = this.props

    return !this.state.showForm ? (
      <ReportTemplateList
        loading={loading}
        error={error}
        report_templates={report_templates}
        onRefresh={() => refetch({ page: 1 })}
        onAddItem={this.handleAddItem}
        onEditItem={this.handleEditItem}
        onDeleteItem={this.handleDeleteItem}
        onChangePage={this.onChangePage}
      />
    ) : (
      <ReportTemplateForm
        itemData={this.state.itemData}
        onBack={this.handleBack}
        onSubmitItem={itemData => this.handleSubmit(itemData)}
      />
    )
  }
}

const mapStateToProps = state => {
  console.log('state', state)
  return {
    report_templates: state.report_templates.report_templates || [],
  }
}

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(
      {
        fetchReportTemplates,
        onCreateItem: addReportTemplate,
        refetch: fetchReportTemplates,
        onUpdateItem: updateReportTemplate,
        onDeleteItem: deleteReportTemplate,
      },
      dispatch
    ),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportTemplate)
