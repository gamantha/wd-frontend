import React from 'react'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
})

// Create Document Component
export const ReportFileLB1 = props => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/** report content should be mapped here, create different structure for different report */}
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
      <View>
        <Text>Name: {props.data.name}</Text>
      </View>
    </Page>
  </Document>
)
