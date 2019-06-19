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
import moment from 'moment-timezone'
// import
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
    onDownload,
  } = props
  const { data, links } = report
  const dataSource =
    report !== null && data ? data.map(report => ({ ...report, key: report.id })) : []

  const formatTime = dateTime => {
    // construct a moment object with UTC-based input
    let m = moment.utc(dateTime)
    // convert using the TZDB identifier for US Central time
    m.tz('Asia/Jakarta')
    // format output however you desire
    return m.format('YYYY-MM-DD HH:mm:ss')
  }

  const formatStatus = status => {
    return status === 1 ? 'Open' : 'Finish'
  }

  const formatTemplatesName = template => {
    return template && template.template.name
  }

  // const formatTemplatesType = template => {
  //   return template && template.template.report_type.toUpperCase()
  // }

  const handleMenuClick = e => {
    onSort(e.key)
  }

  const handleDownload = e => {
    const { key } = e
    const item = key.split('-')
    const id = item[0]
    const downloadType = item[1]
    onDownload(id, downloadType)
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="updated_at">Updated At A-Z</Menu.Item>
      <Menu.Item key="-updated_at">Updated At Z-A</Menu.Item>
    </Menu>
  )

  const download = id => {
    return (
      <Menu onClick={handleDownload}>
        <Menu.Item key={id + '-csv'}>Download CSV</Menu.Item>
        <Menu.Item key={id + '-pdf'}>Download PDF</Menu.Item>
      </Menu>
    )
  }

  const columns = [
    {
      title: 'Report Name',
      dataIndex: 'name',
    },
    {
      title: 'Report Template',
      render: template => formatTemplatesName(template),
    },
    // {
    //   title: 'Report Type',
    //   render: template => formatTemplatesType(template),
    // },
    {
      title: 'Report Date',
      dataIndex: 'report_date',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: status => formatStatus(status),
    },
    // {
    //   title: 'Author',
    //   dataIndex: 'author_id',
    // },
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
        return (
          <span>
            <a href={`#/report/${record.id}`} onClick={() => onEditItem(record)}>
              <Button type="primary" icon="container">
                {/* Detail */}
              </Button>
              {/* <Icon type="edit" theme="outlined" /> Detail */}
            </a>
            <Divider type="vertical" />
            <a href="#/report" onClick={() => onEditItem(record)}>
              <Icon type="edit" theme="outlined" />
            </a>
            <Divider type="vertical" />
            <Popconfirm
              title="Are you sure delete this record?"
              onConfirm={() => onDeleteItem(record.id)}
              okText="Yes"
              cancelText="No">
              <a href="#/report" className="ant-btn-danger ant-btn-background-ghost">
                <Icon type="delete" theme="outlined" />
              </a>
            </Popconfirm>
            <Divider type="vertical" />
            <Dropdown overlay={download(record.id)} className="ml-2">
              <Button>
                <Icon type="download" />
              </Button>
            </Dropdown>
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
