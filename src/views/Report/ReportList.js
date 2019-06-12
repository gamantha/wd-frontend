import React from 'react'
import {
  Card,
  Table,
  Divider,
  Icon,
  Popconfirm,
  Alert,
  Pagination,
  Button,
  Input,
  Row,
  Col,
  Dropdown,
  Menu,
} from 'antd'
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
    onSort,
  } = props
  const { data, links } = report
  const dataSource =
    report !== null && data ? data.map(report => ({ ...report, key: report.id })) : []

  const formatTime = dateTime => {
    var actionTime = moment(dateTime + '+07:00', 'YYYY-MM-DD HH:mm:ssZ')
    var timeAgo = actionTime.fromNow()
    return timeAgo
  }

  const formatStatus = status => {
    return status === 1 ? 'Open' : 'Finish'
  }

  const formatTemplates = template => {
    return template && template.name
  }
  const handleMenuClick = e => {
    onSort(e.key)
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="updated_at">Updated At A-Z</Menu.Item>
      <Menu.Item key="-updated_at">Updated At Z-A</Menu.Item>
    </Menu>
  )

  const columns = [
    {
      title: 'Report Type',
      dataIndex: 'template',
      render: template => formatTemplates(template),
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
      title: 'Author',
      dataIndex: 'author_id',
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
      render: record => {
        console.log("record", record)
        return (
          <span>
            <a href={`#/report-indicators/${record.id}`} onClick={() => onEditItem(record)}>
              <Button type="primary" icon="container">
                Detail
              </Button>
              {/* <Icon type="edit" theme="outlined" /> Detail */}
            </a>
            <Divider type="vertical" />
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
        )
      },
    },
  ]
  return (
    <div className="animated fadeIn">
      <Card
        title="Manage report"
        extra={
          <div>
            <Row>
              <Col span={8}>
                <Input className="mr-2" placeholder="Search" />
              </Col>
              <Col span={4}>
                <Dropdown overlay={menu} className="ml-2">
                  <Button>
                    Sort <Icon type="down" />
                  </Button>
                </Dropdown>
              </Col>
              <Col span={6}>
                <a className="mr-2" href="#/report" onClick={() => onRefresh()}>
                  <Button icon="sync">Refresh</Button>
                </a>
              </Col>
              <Col span={6}>
                <a href="#/report" onClick={() => onAddItem()}>
                  <Button type="primary" icon="plus">
                    Create New
                  </Button>
                </a>
              </Col>
            </Row>
          </div>
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
        <br />
        <Pagination
          defaultCurrent={links ? (links.page ? links.page : 1) : 1}
          total={links ? (links.total ? links.total : 0) : 0}
          onChange={onChangePage}
        />
      </Card>
    </div>
  )
}
