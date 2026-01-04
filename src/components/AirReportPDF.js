// src/components/AirReportPDF.js
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
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    marginBottom: 5,
    fontSize: 9,
    padding: 2,
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
  },
});

const AirReportPDF = ({ data }) => {
  console.log('AirReportPDF received data:', data);
  
  // Debug: Log the data structure
  if (data) {
    console.log('AirReportPDF - Data structure:', {
      hasAirParameters: !!data.airParameters,
      airParametersType: typeof data.airParameters,
      airParametersLength: Array.isArray(data.airParameters) ? data.airParameters.length : 'not an array',
      keys: Object.keys(data)
    });
  }

  if (!data) {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={{ padding: 20 }}>
            <Text>Error: No data available for the air quality report.</Text>
          </View>
        </Page>
      </Document>
    );
  }

  // Ensure airParameters is an array
  const airParameters = Array.isArray(data.airParameters) 
    ? data.airParameters 
    : [];

  // Add default values if they don't exist
  const safeData = {
    reportNo: data.reportNo || 'N/A',
    issuedTo: data.issuedTo || 'Not specified',
    reportDate: data.reportDate || new Date().toISOString().split('T')[0],
    location: data.location || 'Not specified',
    samplingDate: data.samplingDate || 'Not specified',
    samplingDuration: data.samplingDuration || 'Not specified',
    weatherCondition: data.weatherCondition || 'Not specified',
    remarks: data.remarks || 'No remarks provided.',
    airParameters: airParameters
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>AIR QUALITY TEST REPORT</Text>
          <Text>Report No: {safeData.reportNo}</Text>
          <Text>Issued To: {safeData.issuedTo}</Text>
          <Text>Report Date: {safeData.reportDate}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SAMPLING INFORMATION</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Location:</Text>
            <Text style={styles.value}>{safeData.location}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Sampling Date:</Text>
            <Text style={styles.value}>{safeData.samplingDate}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Sampling Duration:</Text>
            <Text style={styles.value}>{safeData.samplingDuration}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Weather Condition:</Text>
            <Text style={styles.value}>{safeData.weatherCondition}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AIR QUALITY PARAMETERS</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <View style={styles.tableCol}><Text style={styles.tableCell}>Parameter</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>Method</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>Unit</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>Result</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>Standard Limit*</Text></View>
            </View>
            
            {safeData.airParameters.length > 0 ? (
              safeData.airParameters.map((param, index) => {
                if (!param) {
                  console.warn(`Air parameter at index ${index} is null or undefined`);
                  return null;
                }
                
                // Debug log for each parameter
                console.log(`Rendering air parameter ${index}:`, {
                  parameter: param.parameter,
                  method: param.method,
                  hasResult: 'result' in param,
                  hasUnit: 'unit' in param
                });
                
                return (
                  <View key={index} style={styles.tableRow}>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{String(param.parameter || '-')}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{String(param.method || '-')}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{String(param.unit || '-')}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{String('result' in param ? param.result : '-')}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{String(param.standardLimit || '-')}</Text>
                    </View>
                  </View>
                );
              })
            ) : (
              <View style={styles.tableRow}>
                <View style={{...styles.tableCol, width: '100%'}}>
                  <Text style={styles.tableCell}>
                    No air quality parameters available. 
                    {data.airParameters === undefined ? 'airParameters is undefined' : 
                     data.airParameters === null ? 'airParameters is null' : 
                     'airParameters is not an array'}
                  </Text>
                </View>
              </View>
            )}
          </View>
          <Text style={{fontSize: 8, marginTop: 5}}>* As per National Ambient Air Quality Standards (NAAQS)</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>INTERPRETATION OF RESULTS</Text>
          <Text style={{marginBottom: 10}}>
            The air quality monitoring was conducted in accordance with standard procedures. The results indicate the concentration 
            of various air pollutants at the sampling location. These values can be compared against the National Ambient Air 
            Quality Standards (NAAQS) for air quality assessment.
          </Text>
          <Text style={{marginBottom: 5}}>Remarks: {safeData.remarks}</Text>
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

export default AirReportPDF;
