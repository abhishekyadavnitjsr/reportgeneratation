// src/components/SoilReportPDF.js
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

const SoilReportPDF = ({ data }) => {
  console.log('SoilReportPDF received data:', data);
  
  if (!data) {
    console.error('SoilReportPDF: No data provided');
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={{ padding: 20 }}>
            <Text>Error: No data available for the soil report.</Text>
          </View>
        </Page>
      </Document>
    );
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>SOIL ANALYSIS REPORT</Text>
          <Text>Report No: {data.reportNo}</Text>
          <Text>Issued To: {data.issuedTo}</Text>
          <Text>Report Date: {data.reportDate}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PART A: SAMPLE DETAILS</Text>
          
          <View style={styles.row}>
            <Text style={styles.label}>Nature of Sample:</Text>
            <Text style={styles.value}>{data.natureOfSample}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Sample Condition:</Text>
            <Text style={styles.value}>{data.sampleCondition}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Sample Source:</Text>
            <Text style={styles.value}>{data.sampleSource}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Sample Depth:</Text>
            <Text style={styles.value}>{data.sampleDepth}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Sample Quantity:</Text>
            <Text style={styles.value}>{data.sampleQuantity}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Location:</Text>
            <Text style={styles.value}>{data.location}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>GPS Coordinates:</Text>
            <Text style={styles.value}>{data.gpsCoordinates}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Date of Collection:</Text>
            <Text style={styles.value}>{data.dateOfCollection}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Date of Receipt:</Text>
            <Text style={styles.value}>{data.dateOfReceipt}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Date of Analysis:</Text>
            <Text style={styles.value}>{data.dateOfAnalysis}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SOIL ANALYSIS RESULTS</Text>
          
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <View style={styles.tableCol}><Text style={styles.tableCell}>Parameter</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>Method</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>Unit</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>Result</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>Standard Limit*</Text></View>
            </View>
            
            {data.soilParameters && data.soilParameters.length > 0 ? (
              data.soilParameters.map((param, index) => {
                // Debug log for each parameter
                console.log(`Parameter ${index}:`, param);
                return (
                  <View key={index} style={styles.tableRow}>
                    <View style={styles.tableCol}><Text style={styles.tableCell}>{String(param?.parameter || '-')}</Text></View>
                    <View style={styles.tableCol}><Text style={styles.tableCell}>{String(param?.method || '-')}</Text></View>
                    <View style={styles.tableCol}><Text style={styles.tableCell}>{String(param?.unit || '-')}</Text></View>
                    <View style={styles.tableCol}><Text style={styles.tableCell}>{String(param?.result ?? '-')}</Text></View>
                    <View style={styles.tableCol}><Text style={styles.tableCell}>{String(param?.standardLimit || '-')}</Text></View>
                  </View>
                );
              })
            ) : (
              <View style={styles.tableRow}>
                <View style={{...styles.tableCol, width: '100%'}}>
                  <Text style={styles.tableCell}>No soil parameters available. Data: {JSON.stringify(data.soilParameters)}</Text>
                </View>
              </View>
            )}
          </View>
          <Text style={{fontSize: 8, marginTop: 5}}>* As per applicable standards and guidelines</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>INTERPRETATION OF RESULTS</Text>
          <Text style={{marginBottom: 10}}>
            The soil analysis was conducted in accordance with standard procedures. The results indicate the concentration 
            of various parameters in the soil sample. These values can be compared against the relevant agricultural 
            or environmental standards for soil quality assessment.
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

export default SoilReportPDF;
