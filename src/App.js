// src/App.js
import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box, Button, Typography } from '@mui/material';
import Home from './components/Home';
import WaterReport from './components/reports/WaterReport';
import AirReport from './components/reports/AirReport';
import NoiseReport from './components/reports/NoiseReport';
import SoilReport from './components/reports/SoilReport';
import WaterReportPDF from './components/WaterReportPDF';
import NoiseReportPDF from './components/NoiseReportPDF';
import SoilReportPDF from './components/SoilReportPDF';
import AirReportPDF from './components/AirReportPDF';
import { PDFViewer } from '@react-pdf/renderer';
import SampleCollection from './components/SampleCollection';

const theme = createTheme();

function App() {
  const [reportData, setReportData] = useState(null);

  const location = useLocation();
  
  const handleFormSubmit = (values) => {
    const reportType = location.pathname.split('/').pop();
    const reportPrefix = reportType.toUpperCase().charAt(0);
    
    const formattedValues = {
      ...values,
      reportDate: new Date().toISOString().split('T')[0],
      reportType: reportType,
      reportNo: `${reportPrefix}-RPT-${Date.now()}`,
      issuedTo: values.issuedTo || 'Client Name'  // Fallback to 'Client Name' if not provided
    };
    
    console.log('Form submitted with values:', formattedValues);
    console.log('Air parameters data:', values.airParameters); // Debug air parameters
    
    // Ensure airParameters exists and is an array
    if (!formattedValues.airParameters || !Array.isArray(formattedValues.airParameters)) {
      console.warn('No airParameters array found in form data');
      formattedValues.airParameters = [];
    }
    
    setReportData(formattedValues);
  };

  const handleBackToForm = () => {
    setReportData(null);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ p: 2 }}>
        {reportData ? (
          <Box>
            <Box mb={2} display="flex" gap={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleBackToForm}
              >
                Back to Form
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handlePrint}
              >
                Print Report
              </Button>
            </Box>
            <Box
              style={{
                height: 'calc(100vh - 100px)',
                border: '1px solid #ccc',
                borderRadius: '4px',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {console.log('Rendering PDF with data:', reportData)}
              <PDFViewer 
                width="100%" 
                height="100%"
                onError={(error) => {
                  console.error('PDF Viewer Error:', error);
                  alert('Error loading PDF. Please check console for details.');
                }}
              >
                {reportData.reportType === 'water' && <WaterReportPDF data={reportData} />}
                {reportData.reportType === 'noise' && <NoiseReportPDF data={reportData} />}
                {reportData.reportType === 'soil' && <SoilReportPDF data={reportData} />}
                {reportData.reportType === 'air' && <AirReportPDF data={reportData} />}
              </PDFViewer>
              {!reportData && (
                <Box 
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    zIndex: 1,
                  }}
                >
                  <Typography variant="h6" color="error">
                    No report data available. Please check console for errors.
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sample-collection" element={<SampleCollection />} />
            <Route 
              path="/report/water" 
              element={<WaterReport onSubmit={handleFormSubmit} />} 
            />
            <Route 
              path="/report/air" 
              element={<AirReport onSubmit={handleFormSubmit} />} 
            />
            <Route 
              path="/report/noise" 
              element={<NoiseReport onSubmit={handleFormSubmit} />} 
            />
            <Route 
              path="/report/soil" 
              element={<SoilReport onSubmit={handleFormSubmit} />} 
            />
          </Routes>
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;