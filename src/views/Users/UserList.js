import React from 'react'
import { Card, Table, Alert, Pagination } from 'antd'

export default props => {
  const {
    loading,
    error,
    onRefresh,
    onAddItem,
    // onEditItem,
    // onDeleteItem,
    users = {},
    onChangePage,
  } = props
  // TODO: links for pagination : need some fix on backend to return total instead - andy-shi88
  const { data, links } = users
  const dataSource = users !== null && data ? data.map(user => ({ ...user, key: user.id })) : []

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
    },
    // {
    //   title: 'Action',
    //   render: record => (
    //     <span>
    //       <a href="#/users" onClick={() => onEditItem(record)}>
    //         <Icon type="edit" theme="outlined" /> Edit
    //       </a>
    //       <Divider type="vertical" />
    //       <Popconfirm
    //         title="Are you sure delete this record?"
    //         onConfirm={() => onDeleteItem(record._id)}
    //         okText="Yes"
    //         cancelText="No">
    //         <a href="#/users" className="ant-btn-danger ant-btn-background-ghost">
    //           <Icon type="delete" theme="outlined" /> Delete
    //         </a>
    //       </Popconfirm>
    //     </span>
    //   ),
    // },
  ]

  return (
    <div className="animated fadeIn">
      <Card
        title="Manage Users"
        extra={
          <span>
            <a
              href="#/users"
              onClick={() => onRefresh()}
              style={{ marginRight: '10px', color: '#A6A6A6' }}>
              <i className="fa fa-refresh" /> Refresh
            </a>
            <a href="#/users" onClick={() => onAddItem()}>
              <i className="fa fa-plus-square" /> Create New
            </a>
          </span>
        }>
        {error ? (
          <Alert message="Error" description={this.props.error.message} type="error" showIcon />
        ) : (
          <Table
            columns={columns}
            dataSource={dataSource}
            loading={loading}
            size={'small'}
            pagination={false}
          />
        )}
        <Pagination
          defaultCurrent={links ? (links.page ? links.page : 1) : 1}
          total={links ? (links.total ? links.total : 0) : 0}
          onChange={onChangePage}
        />
      </Card>
    </div>
  )
}
