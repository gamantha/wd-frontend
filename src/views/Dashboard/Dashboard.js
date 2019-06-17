import React, { Component } from 'react'
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
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this)

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
    }
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    })
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    })
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>Selamat Datang</CardHeader>
              <CardBody>
                <h4>Selamat datang di Apps WD integration management system</h4>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Dashboard
