// src/components/NoiseReportPDF.js
import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    lineHeight: 1.5,
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
    borderBottom: '1px solid #000',
    paddingBottom: 5,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
    flexWrap: 'wrap',
  },
  label: {
    width: '40%',
    fontWeight: 'bold',
  },
  value: {
    width: '60%',
  },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginTop: 10,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    marginBottom: 5,
    fontSize: 10,
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
  },
});

const NoiseReportPDF = ({ data }) => {
  if (!data) return null;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>NOISE LEVEL MONITORING REPORT</Text>
          <Text>Report No: {data.reportNo}</Text>
          <Text>Issued To: {data.issuedTo}</Text>
          <Text>Report Date: {data.reportDate}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PART A: MONITORING DETAILS</Text>
          
          <View style={styles.row}>
            <Text style={styles.label}>Monitoring Location:</Text>
            <Text style={styles.value}>{data.monitoringLocation}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Monitoring Date:</Text>
            <Text style={styles.value}>{data.monitoringDate}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Monitoring Period:</Text>
            <Text style={styles.value}>{data.startTime} to {data.endTime} ({data.monitoringDuration})</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Weather Condition:</Text>
            <Text style={styles.value}>{data.weatherCondition}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Temperature:</Text>
            <Text style={styles.value}>{data.temperature} °C</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Humidity:</Text>
            <Text style={styles.value}>{data.humidity}%</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Wind Speed:</Text>
            <Text style={styles.value}>{data.windSpeed} m/s</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Background Noise Level:</Text>
            <Text style={styles.value}>{data.backgroundNoise} dB(A)</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>NOISE LEVEL MEASUREMENTS (in dB(A))</Text>
          
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <View style={styles.tableCol}><Text style={styles.tableCell}>Time</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>LAeq</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>LMax</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>LMin</Text></View>
            </View>
            
            {data.noiseMeasurements && data.noiseMeasurements.map((measurement, index) => (
              <View key={index} style={styles.tableRow}>
                <View style={styles.tableCol}><Text style={styles.tableCell}>{measurement.time}</Text></View>
                <View style={styles.tableCol}><Text style={styles.tableCell}>{measurement.lAeq}</Text></View>
                <View style={styles.tableCol}><Text style={styles.tableCell}>{measurement.lMax}</Text></View>
                <View style={styles.tableCol}><Text style={styles.tableCell}>{measurement.lMin}</Text></View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>INTERPRETATION OF RESULTS</Text>
          <Text style={{marginBottom: 10}}>
            The noise levels were measured in accordance with standard procedures. The results indicate the noise levels 
            at the specified location during the monitoring period. Values are compared against the applicable 
            regulatory standards for the area.
          </Text>
          <Text style={{marginBottom: 5}}>Remarks: {data.remarks || 'No remarks provided.'}</Text>
        </View>

        <View style={{marginTop: 30, borderTop: '1px solid #000', paddingTop: 10}}>
          <View style={{textAlign: 'center'}}>
            <Text>For KEC International Limited</Text>
            <Text style={{marginTop: 30}}>________________________</Text>
            <Text>Authorized Signatory</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default NoiseReportPDF;
