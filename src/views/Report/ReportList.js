import React from 'react'
import { Card, Table, Divider, Icon, Popconfirm, Alert, Pagination } from 'antd'
import moment from 'moment'
export default props => {
  const {
    loading,
    error,
    onRefresh,
    onAddItem,
    onEditItem,
    report = {},
    onChangePage,
    onDeleteItem,
  } = props
  const { data, links } = report
  const dataSource =
    report !== null && data ? data.map(report => ({ ...report, key: report.id })) : []

  const formatTime = dateTime => {
    return moment(dateTime).fromNow()
  }

  const formatStatus = status => {
    return status === 1 ? 'Active' : 'Inactive'
  }

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
    },
    {
      title: 'Report Template',
      dataIndex: 'report_template_id',
    },
    {
      title: 'Report Date',
      dataIndex: 'report_date',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: status => formatStatus(status),
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      render: dateTime => formatTime(dateTime),
    },
    {
      title: 'Updated At',
      dataIndex: 'updated_at',
      render: dateTime => formatTime(dateTime),
    },
    {
      title: 'Action',
      render: record => (
        <span>
          <a href="#/report" onClick={() => onEditItem(record)}>
            <Icon type="edit" theme="outlined" /> Edit
          </a>
          <Divider type="vertical" />
          <Popconfirm
            title="Are you sure delete this record?"
            onConfirm={() => onDeleteItem(record.id)}
            okText="Yes"
            cancelText="No">
            <a href="#/report" className="ant-btn-danger ant-btn-background-ghost">
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
        title="Manage report"
        extra={
          <span>
            <a
              href="#/report"
              onClick={() => onRefresh()}
              style={{ marginRight: '10px', color: '#A6A6A6' }}>
              <i className="fa fa-refresh" /> Refresh
            </a>
            <a href="#/report" onClick={() => onAddItem()}>
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
