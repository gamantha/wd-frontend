import React from 'react'
import { Card, Table, Divider, Icon, Popconfirm, Alert, Pagination } from 'antd'

export default props => {
  const {
    loading,
    error,
    onRefresh,
    onAddItem,
    onEditItem,
    indicators = {},
    onChangePage,
    onDeleteItem,
  } = props
  // TODO: links for pagination : need some fix on backend to return total instead - andy-shi88
  const { data, links } = indicators
  const dataSource =
    indicators !== null && data ? data.map(hotel => ({ ...hotel, key: hotel.id })) : []

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
    },
    {
      title: 'Name',
      render: record => (
        <span>
          <a href={'#/indicators/' + record.id + '/rooms'}>{record.name}</a>
        </span>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Label',
      dataIndex: 'label',
    },
    {
      title: 'Unit Label',
      dataIndex: 'unit_label',
    },
    {
      title: 'Action',
      render: record => (
        <span>
          <a href="#/indicators" onClick={() => onEditItem(record)}>
            <Icon type="edit" theme="outlined" /> Edit
          </a>
          <Divider type="vertical" />
          <Popconfirm
            title="Are you sure delete this record?"
            onConfirm={() => onDeleteItem(record.id)}
            okText="Yes"
            cancelText="No">
            <a href="#/hotel" className="ant-btn-danger ant-btn-background-ghost">
              <Icon type="delete" theme="outlined" /> Delete
            </a>
          </Popconfirm>
        </span>
      ),
    },
  ]
  return (
    <div className="animated fadeIn">
      <Card
        title="Manage indicators"
        extra={
          <span>
            <a
              href="#/indicators"
              onClick={() => onRefresh()}
              style={{ marginRight: '10px', color: '#A6A6A6' }}>
              <i className="fa fa-refresh" /> Refresh
            </a>
            <a href="#/indicators" onClick={() => onAddItem()}>
              <i className="fa fa-plus-square" /> Create New
            </a>
          </span>
        }>
        {error ? (
          <Alert message="Error" description={this.props.error.message} type="error" showIcon />
        ) : (
          <div>
            <Table
              columns={columns}
              dataSource={dataSource}
              loading={loading}
              size={'small'}
              pagination={false}
            />
          </div>
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
