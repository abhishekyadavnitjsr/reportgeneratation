// src/components/reports/AirReport.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AirReportForm from './AirReportForm';
import { Paper } from '@mui/material';

const AirReport = ({ onSubmit }) => {
  const navigate = useNavigate();

  const initialValues = {
    // Header Information
    issuedTo: 'KEC International Limited, 9th Floor, DLF 9, DLF Cyber City, Phase III, Gurugram, Haryana - 122002',
    sampleRegNo: `AIR-${Date.now().toString().slice(-6)}`,
    sampleRegDate: new Date().toISOString().split('T')[0],
    reportNo: `AIR-RPT-${Date.now()}`,
    customerRefNo: '',
    
    // Sampling Information
    location: '',
    samplingDate: new Date().toISOString().split('T')[0],
    samplingDuration: '24 hours',
    weatherCondition: 'Clear',
    temperature: '',
    humidity: '',
    windSpeed: '',
    
    // Air Quality Parameters
    airParameters: [
      {
        parameter: 'Particulate Matter (PM2.5)',
        method: 'Beta Attenuation Monitor',
        unit: 'µg/m³',
        result: '',
        standardLimit: '60',
      },
      {
        parameter: 'Particulate Matter (PM10)',
        method: 'Beta Attenuation Monitor',
        unit: 'µg/m³',
        result: '',
        standardLimit: '100',
      },
      {
        parameter: 'Nitrogen Dioxide (NO₂)',
        method: 'Chemiluminescence',
        unit: 'ppb',
        result: '',
        standardLimit: '80',
      },
      {
        parameter: 'Sulfur Dioxide (SO₂)',
        method: 'UV Fluorescence',
        unit: 'ppb',
        result: '',
        standardLimit: '80',
      },
      {
        parameter: 'Carbon Monoxide (CO)',
        method: 'Non-Dispersive Infrared',
        unit: 'ppm',
        result: '',
        standardLimit: '4',
      },
      {
        parameter: 'Ozone (O₃)',
        method: 'UV Photometric',
        unit: 'ppb',
        result: '',
        standardLimit: '100',
      },
    ],
    
    // Other
    remarks: '',
  };

  const validationSchema = Yup.object().shape({
    issuedTo: Yup.string().required('Required'),
    sampleRegNo: Yup.string().required('Required'),
    sampleRegDate: Yup.date().required('Required'),
    reportNo: Yup.string().required('Required'),
    location: Yup.string().required('Required'),
    samplingDate: Yup.string().required('Required'),
    samplingDuration: Yup.string().required('Required'),
    weatherCondition: Yup.string().required('Required'),
    airParameters: Yup.array().of(
      Yup.object().shape({
        result: Yup.number().required('Required'),
      })
    ),
  });

  const handleBack = () => {
    navigate('/');
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleBack}
        >
          Back to Home
        </Button>
      </Box>
      <Typography variant="h4" gutterBottom align="center">
        AIR QUALITY TEST REPORT
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formikProps) => (
          <form onSubmit={formikProps.handleSubmit}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <AirReportForm {...formikProps} />
              <Box mt={3} display="flex" justifyContent="flex-end">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={formikProps.isSubmitting}
                  size="large"
                >
                  Generate Air Quality Report
                </Button>
              </Box>
            </Paper>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AirReport;