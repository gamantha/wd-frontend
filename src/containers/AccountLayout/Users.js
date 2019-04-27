import React, { Component } from 'react'
import { notification } from 'antd'

import UserList from '../../views/Users/UserList'
import UserForm from '../../views/Users/UserForm'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser, addUser } from '../../store/users/users.action'

class Users extends Component {
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
    this.props.fetchUser({ page: 1, limit: 10 })
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

  onChangePage = (page, pageSize) => {
    this.props.refetch({ page, limit: pageSize }).then(res => {
      console.log(res, 'hotel: change page')
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
            description: res, //res.message.replace('GraphQL error: ValidationError: ', ''),
            style: { top: '35px' },
          })
        })
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
    // console.log('users props: ', this.props)
    const { loading, error, refetch, users = [] } = this.props

    return !this.state.showForm ? (
      <UserList
        loading={loading}
        error={error}
        users={users}
        onRefresh={() => refetch({ page: 1 })}
        onAddItem={this.handleAddItem}
        onEditItem={this.handleEditItem}
        onChangePage={this.onChangePage}
        onDeleteItem={this.handleDeleteItem}
      />
    ) : (
      <UserForm
        itemData={this.state.itemData}
        onBack={this.handleBack}
        onSubmitItem={itemData => this.handleSubmit(itemData)}
      />
    )
  }
}

const mapStateToProps = state => ({
  users: state.users.users || [],
})

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(
      {
        fetchUser,
        refetch: fetchUser,
        onCreateItem: addUser,
      },
      dispatch
    ),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users)
