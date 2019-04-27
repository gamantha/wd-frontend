import React, { Component } from 'react'
// import { notification } from 'antd'

import AdminList from '../../views/Admins/AdminList'
import AdminForm from '../../views/Admins/AdminForm'

class Admins extends Component {
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

  handleBack() {
    this.setState({
      showForm: false,
      itemData: null,
    })
  }

  handleSubmit(item) {
    if (!this.state.itemData) {
      // this.props
      //   .onCreateItem(item)
      //   .then(() => {
      //     notification['success']({
      //       message: 'Success Message',
      //       description: 'Success to create record!',
      //       style: { top: '35px' },
      //     })
      //     this.props.refetch()
      //     this.handleBack()
      //   })
      //   .catch(res => {
      //     notification['warning']({
      //       message: 'Validation Message',
      //       description: message(res.message), //res.message.replace('GraphQL error: ValidationError: ', ''),
      //       style: { top: '35px' },
      //     })
      //   })
    } else {
      // this.props
      //   .onUpdateItem(this.state.itemData._id, item)
      //   .then(() => {
      //     notification['success']({
      //       message: 'Success Message',
      //       description: 'Success to update record!',
      //       style: { top: '35px' },
      //     })
      //     this.props.refetch()
      //     this.handleBack()
      //   })
      //   .catch(res => {
      //     notification['warning']({
      //       message: 'Validation Message',
      //       description: message(res.message), //res.message.replace('GraphQL error: ValidationError: ', ''),
      //       style: { top: '35px' },
      //     })
      //   })
    }
  }

  handleDeleteItem(id) {
    // this.props
    //   .onDeleteItem(id)
    //   .then(() => {
    //     notification['success']({
    //       message: 'Success Message',
    //       description: 'Success to delete record!',
    //       style: { top: '35px' },
    //     })
    //     this.props.refetch()
    //     this.handleBack()
    //   })
    //   .catch(res => {
    //     notification['warning']({
    //       message: 'Validation Message',
    //       description: message(res.message), //res.message.replace('GraphQL error: ValidationError: ', ''),
    //       style: { top: '35px' },
    //     })
    //   })
  }

  render() {
    // console.log('admins props: ', this.props)
    const { loading, error, refetch, admins = [] } = this.props

    return !this.state.showForm ? (
      <AdminList
        loading={loading}
        error={error}
        admins={admins}
        onRefresh={() => refetch()}
        onAddItem={this.handleAddItem}
        onEditItem={this.handleEditItem}
        onDeleteItem={this.handleDeleteItem}
      />
    ) : (
      <AdminForm
        itemData={this.state.itemData}
        onBack={this.handleBack}
        onSubmitItem={itemData => this.handleSubmit(itemData)}
      />
    )
  }
}

export default Admins
