import React, { Component } from 'react'
import { PDFViewer } from '@react-pdf/renderer'

// Used react-pdf for generating client side pdf report
// see: https://react-pdf.org/components
const ReportFile = (ReportContent, data) => {
  return class extends Component {
    render() {
      console.log('data', data)
      return (
        <PDFViewer>
          <ReportContent data={data} />
        </PDFViewer>
      )
    }
  }
}

export default ReportFile
