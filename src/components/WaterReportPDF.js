// src/components/WaterReportPDF.js
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
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
  },
  tableHeaderCell: {
    fontSize: 8,
    padding: 5,
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    textAlign: "center",
    borderColor: '#000',
  },
  tableCell: {
    fontSize: 8,
    padding: 5,
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    textAlign: "center",
    borderColor: '#ddd',
  },
  tableRowEven: {
    backgroundColor: '#f9f9f9'
  }
});

const WaterReportPDF = ({ data }) => {
  if (!data) return null;

  // Helper function to render a field
  const renderField = (label, value) => (
    <View style={styles.row}>
      <Text style={styles.label}>{label}:</Text>
      <Text style={styles.value}>{value || 'N/A'}</Text>
    </View>
  );

  // Helper function to render a section title
  const renderSectionTitle = (title) => (
    <Text style={styles.sectionTitle}>{title}</Text>
  );

  // Helper function to render a table
  const renderTable = (title, columns, items) => (
    <View style={styles.section}>
      {renderSectionTitle(title)}
      <View style={styles.table}>
        {/* Table Header */}
        <View style={[styles.tableRow, styles.tableHeader]}>
          {columns.map((col, idx) => (
            <Text key={idx} style={[styles.tableHeaderCell, { width: col.width }]}>
              {col.header}
            </Text>
          ))}
        </View>
        
        {/* Table Rows */}
        {items && items.map((item, rowIndex) => (
          <View key={rowIndex} style={[styles.tableRow, rowIndex % 2 === 0 && styles.tableRowEven]}>
            {columns.map((col, colIndex) => (
              <Text key={colIndex} style={[styles.tableCell, { width: col.width }]}>
                {item[col.field] || 'N/A'}
              </Text>
            ))}
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>WATER QUALITY TEST REPORT</Text>
        </View>

        {/* Header Information */}
        <View style={styles.section}>
          {renderSectionTitle('Header Information')}
          {renderField('Issued To', data.issuedTo)}
          {renderField('Sample Reg. No.', data.sampleRegNo)}
          {renderField('Sample Reg. Date', data.sampleRegDate)}
          {renderField('Report Date', data.reportDate)}
          {renderField('Report No.', data.reportNo)}
          {renderField('Customer Ref. No.', data.customerRefNo)}
        </View>

        {/* Sample Details */}
        <View style={styles.section}>
          {renderSectionTitle('PART A: PARTICULARS OF SAMPLE SUBMITTED')}
          {renderField('Nature of Sample', data.natureOfSample)}
          {renderField('Sample Condition', data.sampleCondition)}
          {renderField('Grade/Variety', data.gradeVariety)}
          {renderField('Brand Name', data.brandName)}
          {renderField('Sample Quantity', data.sampleQuantity)}
          {renderField('Batch Size/Location', data.batchSizeLocation)}
          {renderField('Mode of Packing', data.modeOfPacking)}
          {renderField('Report Date', data.dateOfReceipt)}
          {renderField('Date of Start', data.dateOfStart)}
          {renderField('Date of Completion', data.dateOfCompletion)}
          {renderField('Seal Status', data.sealStatus)}
          {renderField('Test Request Submitted By', data.testRequestSubmittedBy)}
        </View>

        {/* Organoleptic Parameters Table */}
        {data.organolepticParameters && data.organolepticParameters.length > 0 && (
          renderTable(
            'ORGANOLEPTIC & PHYSICAL PARAMETERS',
            [
              { header: 'Parameter', field: 'parameter', width: '22%' },
              { header: 'Instrument', field: 'instrument', width: '15%' },
              { header: 'Method', field: 'method', width: '20%' },
              { header: 'Acceptable Limit', field: 'acceptableLimit', width: '13%' },
              { header: 'Permissible Limit', field: 'permissibleLimit', width: '13%' },
              { header: 'Result', field: 'result', width: '17%' },
            ],
            data.organolepticParameters
          )
        )}
      </Page>
    </Document>
  );
};

export default WaterReportPDF;