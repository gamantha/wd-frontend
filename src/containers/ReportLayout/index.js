import React, { Component } from 'react'
import ReportFile from '../../views/ReportFile'
import { ReportFileLB1 } from '../../views/ReportFile/reportContent'

export default class ReportContainer extends Component {
  constructor(props) {
    // destructure the props passed
    super(props)
  }

  componentDidMount() {
    // fetch data
    // data fetch set state
  }

  render() {
    // start rendering report
    // todo: switch case based on type of report, change ReportFileLB1 if needed
    const ReportFileLB = ReportFile(ReportFileLB1, { name: 'Buahaha' })
    return (
      <div>
        <ReportFileLB></ReportFileLB>
      </div>
    )
  }
}
