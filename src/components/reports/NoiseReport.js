// src/components/reports/NoiseReport.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Box,
  Typography,
  Grid,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const MuiTextField = (props) => (
  <TextField
    {...props}
    variant="outlined"
    size="small"
    fullWidth
    sx={{
      '& .MuiOutlinedInput-root': {
        backgroundColor: '#ffffff',
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: '#1976d2',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#1976d2',
          borderWidth: '1px',
        },
      },
      '& .MuiOutlinedInput-input': {
        padding: '10px 14px',
      },
      '& .MuiInputLabel-root': {
        color: 'rgba(0, 0, 0, 0.6)',
        '&.Mui-focused': {
          color: '#1976d2',
        },
      },
      ...props.sx,
    }}
  />
);

const NoiseReport = ({ onSubmit }) => {
  const navigate = useNavigate();
  
  const initialValues = {
    // Header Information
    issuedTo: 'KEC International Limited, 9th Floor, DLF 9, DLF Cyber City, Phase III, Gurugram, Haryana - 122002',
    sampleRegNo: `NOISE-${Date.now().toString().slice(-6)}`,
    sampleRegDate: new Date().toISOString().split('T')[0],
    reportDate: new Date().toISOString().split('T')[0],
    reportNo: `NOISE-RPT-${Date.now()}`,
    customerRefNo: '',
    
    // Part A: Particulars of Sample Submitted
    monitoringLocation: '',
    monitoringDate: new Date().toISOString().split('T')[0],
    startTime: '09:00',
    endTime: '17:00',
    monitoringDuration: '8 hours',
    weatherCondition: 'Clear',
    temperature: '',
    humidity: '',
    windSpeed: '',
    backgroundNoise: '',
    testRequestSubmittedBy: 'KEC International Private Limited',
    
    // Noise Level Measurements
    noiseMeasurements: [
      { 
        time: '09:00', 
        lAeq: '', 
        lMax: '', 
        lMin: '',
        location: '',
        backgroundNoise: ''
      },
      { 
        time: '10:00', 
        lAeq: '', 
        lMax: '', 
        lMin: '',
        location: '',
        backgroundNoise: ''
      },
      { 
        time: '11:00', 
        lAeq: '', 
        lMax: '', 
        lMin: '',
        location: '',
        backgroundNoise: ''
      },
      { time: '12:00', lAeq: '', lMax: '', lMin: '' },
      { time: '13:00', lAeq: '', lMax: '', lMin: '' },
      { time: '14:00', lAeq: '', lMax: '', lMin: '' },
      { time: '15:00', lAeq: '', lMax: '', lMin: '' },
      { time: '16:00', lAeq: '', lMax: '', lMin: '' },
    ],
    
    // Other
    remarks: '',
  };

  const validationSchema = Yup.object().shape({
    issuedTo: Yup.string().required('Required'),
    sampleRegNo: Yup.string().required('Required'),
    sampleRegDate: Yup.date().required('Required'),
    reportDate: Yup.date().required('Required'),
    reportNo: Yup.string().required('Required'),
    customerRefNo: Yup.string().required('Required'),
    monitoringLocation: Yup.string().required('Required'),
    monitoringDate: Yup.date().required('Required'),
    startTime: Yup.string().required('Required'),
    endTime: Yup.string().required('Required'),
    monitoringDuration: Yup.string().required('Required'),
    weatherCondition: Yup.string().required('Required'),
    testRequestSubmittedBy: Yup.string().required('Required'),
    noiseMeasurements: Yup.array().of(
      Yup.object().shape({
        lAeq: Yup.number().required('Required'),
        lMax: Yup.number().required('Required'),
        lMin: Yup.number().required('Required')
      })
    )
  });

  const handleBack = () => {
    navigate('/');
  };

  // Handler for measurement changes
  const handleMeasurementChange = (index, field, value, setFieldValue, values) => {
    const updatedMeasurements = [...values.noiseMeasurements];
    updatedMeasurements[index] = {
      ...updatedMeasurements[index],
      [field]: value
    };
    setFieldValue('noiseMeasurements', updatedMeasurements);
  };

  // Handler for adding a new measurement
  const handleAddMeasurement = (setFieldValue, values) => {
    const newMeasurement = { 
      time: '', 
      lAeq: '', 
      lMax: '', 
      lMin: '',
      location: '',
      backgroundNoise: ''
    };
    setFieldValue('noiseMeasurements', [...values.noiseMeasurements, newMeasurement]);
  };

  // Handler for removing a measurement
  const handleRemoveMeasurement = (index, setFieldValue, values) => {
    if (values.noiseMeasurements.length > 1) {
      const updatedMeasurements = [...values.noiseMeasurements];
      updatedMeasurements.splice(index, 1);
      setFieldValue('noiseMeasurements', updatedMeasurements);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '30px', margin: '20px' }}>
      <Box mb={4}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleBack}
          style={{ marginBottom: '20px' }}
        >
          Back to Home
        </Button>
        
        <Typography variant="h4" gutterBottom align="center" style={{ marginBottom: '30px' }}>
          NOISE LEVEL MONITORING REPORT
        </Typography>
      </Box>
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          if (onSubmit) {
            const reportData = {
              ...values,
              noiseMeasurements: values.noiseMeasurements || []
            };
            onSubmit(reportData);
          }
          setSubmitting(false);
        }}
      >
        {({ values, handleChange, isSubmitting, setFieldValue, setFieldTouched, submitForm }) => (
          <Form>
            {/* Header Information */}
            <Box mb={4} p={3} sx={{ border: '1px solid #e0e0e0', borderRadius: 1, backgroundColor: '#f9f9f9' }}>
              <Typography variant="h6" gutterBottom style={{ marginBottom: '20px', color: '#1976d2' }}>
                Header Information
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} style={{ display: 'flex', flexDirection: 'column' }}>
                  <Field
                    as={MuiTextField}
                    fullWidth
                    name="issuedTo"
                    label="Issued To"
                    margin="normal"
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                      style: { borderBottom: 'none' }
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6} style={{ display: 'flex', flexDirection: 'column' }}>
                  <Field
                    as={MuiTextField}
                    fullWidth
                    name="sampleRegNo"
                    label="Sample Reg. No."
                    margin="normal"
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                      style: { borderBottom: 'none' }
                    }}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} md={6} style={{ display: 'flex', flexDirection: 'column' }}>
                  <Field
                    as={MuiTextField}
                    fullWidth
                    name="sampleRegDate"
                    label="Sample Reg. Date"
                    margin="normal"
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                      style: { borderBottom: 'none' }
                    }}
                    type="date"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} md={6} style={{ display: 'flex', flexDirection: 'column' }}>
                  <Field
                    as={MuiTextField}
                    fullWidth
                    name="reportDate"
                    label="Report Date"
                    margin="normal"
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                      style: { borderBottom: 'none' }
                    }}
                    type="date"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} md={6} style={{ display: 'flex', flexDirection: 'column' }}>
                  <Field
                    as={MuiTextField}
                    fullWidth
                    name="reportNo"
                    label="Report No."
                    margin="normal"
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                      style: { borderBottom: 'none' }
                    }}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} md={6} style={{ display: 'flex', flexDirection: 'column' }}>
                  <Field
                    as={MuiTextField}
                    fullWidth
                    name="customerRefNo"
                    label="Customer Ref. No. & Date"
                    margin="normal"
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                      style: { borderBottom: 'none' }
                    }}
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Monitoring Information */}
            <Box mb={4} p={3} sx={{ border: '1px solid #e0e0e0', borderRadius: 1, backgroundColor: '#f9f9f9', marginTop: '30px' }}>
              <Typography variant="h6" gutterBottom style={{ marginBottom: '20px', color: '#1976d2' }}>
                Monitoring Information
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} style={{ display: 'flex', flexDirection: 'column' }}>
                  <Field
                    as={MuiTextField}
                    fullWidth
                    name="monitoringLocation"
                    label="Monitoring Location"
                    margin="normal"
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                      style: { borderBottom: 'none' }
                    }}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6} style={{ display: 'flex', flexDirection: 'column' }}>
                  <Field
                    as={MuiTextField}
                    fullWidth
                    name="monitoringDate"
                    label="Monitoring Date"
                    margin="normal"
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                      style: { borderBottom: 'none' }
                    }}
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Field
                    as={MuiTextField}
                    fullWidth
                    name="startTime"
                    label="Start Time"
                    margin="normal"
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                      style: { borderBottom: 'none' }
                    }}
                    type="time"
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Field
                    as={MuiTextField}
                    fullWidth
                    name="endTime"
                    label="End Time"
                    margin="normal"
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                      style: { borderBottom: 'none' }
                    }}
                    type="time"
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Field
                    as={MuiTextField}
                    fullWidth
                    name="monitoringDuration"
                    label="Monitoring Duration"
                    margin="normal"
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                      style: { borderBottom: 'none' }
                    }}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Field
                    as={MuiTextField}
                    fullWidth
                    name="weatherCondition"
                    label="Weather Condition"
                    margin="normal"
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                      style: { borderBottom: 'none' }
                    }}
                    select
                    SelectProps={{ native: true }}
                    required
                  >
                    <option value="">Select weather condition</option>
                    <option value="Clear">Clear</option>
                    <option value="Cloudy">Cloudy</option>
                    <option value="Rainy">Rainy</option>
                    <option value="Windy">Windy</option>
                  </Field>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Field
                    as={MuiTextField}
                    fullWidth
                    name="temperature"
                    label="Temperature (°C)"
                    margin="normal"
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                      style: { borderBottom: 'none' }
                    }}
                    type="number"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Field
                    as={MuiTextField}
                    fullWidth
                    name="humidity"
                    label="Humidity (%)"
                    margin="normal"
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                      style: { borderBottom: 'none' }
                    }}
                    type="number"
                  />
                </Grid>
                <Grid item xs={12} md={6} style={{ display: 'flex', flexDirection: 'column' }}>
                  <Field
                    as={MuiTextField}
                    fullWidth
                    name="windSpeed"
                    label="Wind Speed (km/h)"
                    margin="normal"
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                      style: { borderBottom: 'none' }
                    }}
                    type="number"
                  />
                </Grid>
                <Grid item xs={12} md={6} style={{ display: 'flex', flexDirection: 'column' }}>
                  <Field
                    as={MuiTextField}
                    fullWidth
                    name="backgroundNoise"
                    label="Background Noise Level (dB)"
                    margin="normal"
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                      style: { borderBottom: 'none' }
                    }}
                    type="number"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={MuiTextField}
                    fullWidth
                    name="testRequestSubmittedBy"
                    label="Test Request Submitted By"
                    margin="normal"
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                      style: { borderBottom: 'none' }
                    }}
                    required
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Noise Level Measurements */}
            <Box mb={3} p={2} sx={{ border: '1px solid #ccc', borderRadius: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" gutterBottom>NOISE LEVEL MEASUREMENTS</Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={() => handleAddMeasurement(setFieldValue, values)}
                >
                  Add Measurement
                </Button>
              </Box>
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Time</TableCell>
                      <TableCell>Location</TableCell>
                      <TableCell>L<sub>Aeq</sub> (dB)</TableCell>
                      <TableCell>L<sub>Max</sub> (dB)</TableCell>
                      <TableCell>L<sub>Min</sub> (dB)</TableCell>
                      <TableCell>Background (dB)</TableCell>
                      <TableCell width="100">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <FieldArray
                      name="noiseMeasurements"
                      render={arrayHelpers => (
                        <>
                          {values.noiseMeasurements.map((measurement, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                <MuiTextField
                                  type="time"
                                  name={`noiseMeasurements[${index}].time`}
                                  value={measurement.time}
                                  onChange={(e) => handleMeasurementChange(index, 'time', e.target.value, setFieldValue, values)}
                                  variant="standard"
                                  fullWidth
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                />
                              </TableCell>
                              <TableCell>
                                <MuiTextField
                                  name={`noiseMeasurements[${index}].location`}
                                  value={measurement.location}
                                  onChange={(e) => handleMeasurementChange(index, 'location', e.target.value, setFieldValue, values)}
                                  variant="standard"
                                  fullWidth
                                />
                              </TableCell>
                              <TableCell>
                                <MuiTextField
                                  type="number"
                                  name={`noiseMeasurements[${index}].lAeq`}
                                  value={measurement.lAeq}
                                  onChange={(e) => handleMeasurementChange(index, 'lAeq', e.target.value, setFieldValue, values)}
                                  variant="standard"
                                  fullWidth
                                />
                              </TableCell>
                              <TableCell>
                                <MuiTextField
                                  type="number"
                                  name={`noiseMeasurements[${index}].lMax`}
                                  value={measurement.lMax}
                                  onChange={(e) => handleMeasurementChange(index, 'lMax', e.target.value, setFieldValue, values)}
                                  variant="standard"
                                  fullWidth
                                />
                              </TableCell>
                              <TableCell>
                                <MuiTextField
                                  type="number"
                                  name={`noiseMeasurements[${index}].lMin`}
                                  value={measurement.lMin}
                                  onChange={(e) => handleMeasurementChange(index, 'lMin', e.target.value, setFieldValue, values)}
                                  variant="standard"
                                  fullWidth
                                />
                              </TableCell>
                              <TableCell>
                                <MuiTextField
                                  type="number"
                                  name={`noiseMeasurements[${index}].backgroundNoise`}
                                  value={measurement.backgroundNoise}
                                  onChange={(e) => handleMeasurementChange(index, 'backgroundNoise', e.target.value, setFieldValue, values)}
                                  variant="standard"
                                  fullWidth
                                />
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="standard"
                    InputProps={{
                      disableUnderline: true,
                      style: { borderBottom: 'none' }
                    }}
                                  color="error"
                                  size="small"
                                  onClick={() => handleRemoveMeasurement(index, setFieldValue, values)}
                                  disabled={values.noiseMeasurements.length <= 1}
                                >
                                  Remove
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </>
                      )}
                    />
                  </TableBody>
                </Table>
              </TableContainer>
              <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                Note: All measurements are in decibels (dB). Standard limits: Day (6 AM to 10 PM) - 55 dB, Night (10 PM to 6 AM) - 45 dB
              </Typography>
            </Box>

            {/* Remarks */}
            <Box mb={3} p={2} sx={{ border: '1px solid #ccc', borderRadius: 1 }}>
              <Typography variant="h6" gutterBottom>Remarks</Typography>
              <Field
                as={MuiTextField}
                fullWidth
                name="remarks"
                label="Additional Notes"
                margin="normal"
                variant="outlined"
                multiline
                rows={4}
              />
            </Box>

            {/* Submit Button */}
            <Box mt={3} display="flex" justifyContent="flex-end">
              <Button
                type="button"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                size="large"
                onClick={(e) => {
                  e.preventDefault();
                  submitForm();
                }}
              >
                Generate Report
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default NoiseReport;
