import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2'
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap'

//Random Numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

var elements = 27
var data1 = []
var data2 = []
var data3 = []

for (var i = 0; i <= elements; i++) {
  data1.push(random(50, 200))
  data2.push(random(80, 100))
  data3.push(65)
}

class Dashboard extends Component {
  state = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    datasets: [
      {
        label: 'Jumlah anak usia (0 - 12) bulan',
        backgroundColor: 'rgba(0,255,255,0.2)',
        borderColor: 'rgba(70,130,180,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(0,206,209,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [65, 59, 80, 81, 56, 55, 40],
      },
      {
        label: 'Anak menerima imunisasi BCG Hepatitis b, dpt, dan polio',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  }
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>Chart</CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12" md="12" xl="12">
                    <Row>
                      <Bar data={this.state} />
                    </Row>
                  </Col>
                </Row>
                <br />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Dashboard
