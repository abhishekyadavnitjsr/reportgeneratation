// src/components/reports/SoilReport.js
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
          borderColor: props.error ? '#d32f2f' : '#1976d2',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: props.error ? '#d32f2f' : '#1976d2',
          borderWidth: '1px',
        },
      },
      '& .MuiOutlinedInput-input': {
        padding: '10px 14px',
      },
      '& .MuiInputLabel-root': {
        color: props.error ? '#d32f2f' : 'rgba(0, 0, 0, 0.6)',
        '&.Mui-focused': {
          color: props.error ? '#d32f2f' : '#1976d2',
        },
      },
      '& .MuiFormHelperText-root': {
        marginLeft: 0,
        marginTop: '4px',
        fontSize: '0.75rem',
      },
      ...props.sx,
    }}
  />
);

const SoilReport = ({ onSubmit }) => {
  const navigate = useNavigate();
  
  const initialValues = {
    // Header Information
    issuedTo: 'KEC International Limited, 9th Floor, DLF 9, DLF Cyber City, Phase III, Gurugram, Haryana - 122002',
    sampleRegNo: `SOIL-${Date.now().toString().slice(-6)}`,
    sampleRegDate: new Date().toISOString().split('T')[0],
    reportDate: new Date().toISOString().split('T')[0],
    reportNo: `SOIL-RPT-${Date.now()}`,
    customerRefNo: '',
    
    // Part A: Particulars of Sample Submitted
    natureOfSample: 'Soil Sample',
    sampleCondition: 'Good',
    sampleSource: 'Surface Soil',
    sampleDepth: '0-15 cm',
    sampleQuantity: '1 kg',
    modeOfPacking: 'Sealed in plastic bags',
    dateOfCollection: new Date().toISOString().split('T')[0],
    dateOfReceipt: new Date().toISOString().split('T')[0],
    dateOfAnalysis: new Date().toISOString().split('T')[0],
    testRequestSubmittedBy: 'KEC International Private Limited',
    location: '',
    gpsCoordinates: '',
    
    // Soil Analysis Parameters
    soilParameters: [
      {
        parameter: 'pH',
        method: 'IS 2720 (Part 26): 1987',
        unit: '-',
        result: '',
        standardLimit: '6.5 - 8.5'
      },
      {
        parameter: 'Electrical Conductivity',
        method: 'IS 14767: 2000',
        unit: 'dS/m',
        result: '',
        standardLimit: '< 4.0',
      },
      {
        parameter: 'Organic Carbon',
        method: 'Walkley & Black',
        unit: '%',
        result: '',
        standardLimit: '0.5 - 2.0',
      },
      {
        parameter: 'Available Nitrogen',
        method: 'Kjeldahl',
        unit: 'kg/ha',
        result: '',
        standardLimit: '> 280',
      },
      {
        parameter: 'Available Phosphorus',
        method: 'Olsen\'s',
        unit: 'kg/ha',
        result: '',
        standardLimit: '> 10',
      },
      {
        parameter: 'Available Potassium',
        method: 'Flame Photometry',
        unit: 'kg/ha',
        result: '',
        standardLimit: '> 125',
      },
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
    natureOfSample: Yup.string().required('Required'),
    sampleCondition: Yup.string().required('Required'),
    sampleQuantity: Yup.string().required('Required'),
    modeOfPacking: Yup.string().required('Required'),
    dateOfCollection: Yup.string().required('Required'),
    dateOfReceipt: Yup.string().required('Required'),
    dateOfAnalysis: Yup.string().required('Required'),
    testRequestSubmittedBy: Yup.string().required('Required'),
    location: Yup.string().required('Required'),
    soilParameters: Yup.array().of(
      Yup.object().shape({
        result: Yup.string().required('Required')
      })
    )
  });

  const handleBack = () => {
    navigate('/');
  };

  // Handler for parameter changes
  const handleParameterChange = (index, field, value, setFieldValue, values) => {
    const updatedParameters = [...values.soilParameters];
    updatedParameters[index] = {
      ...updatedParameters[index],
      [field]: value
    };
    setFieldValue('soilParameters', updatedParameters);
  };

  // Handler for adding a new parameter
  const handleAddParameter = (setFieldValue, values) => {
    const newParameter = { 
      parameter: '', 
      result: '', 
      method: 'IS 2720', 
      unit: '',
      standardLimit: '' 
    };
    setFieldValue('soilParameters', [...values.soilParameters, newParameter]);
  };

  // Handler for removing a parameter
  const handleRemoveParameter = (index, setFieldValue, values) => {
    if (values.soilParameters.length > 1) {
      const updatedParameters = [...values.soilParameters];
      updatedParameters.splice(index, 1);
      setFieldValue('soilParameters', updatedParameters);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
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
        SOIL QUALITY TEST REPORT
      </Typography>
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          if (onSubmit) {
            const reportData = {
              ...values,
              soilParameters: values.soilParameters || []
            };
            onSubmit(reportData);
          }
          setSubmitting(false);
        }}
      >
        {({ values, handleChange, isSubmitting, setFieldValue, setFieldTouched, submitForm }) => (
          <Form>
            {/* Header Information */}
            <Box mb={3} p={2} sx={{ border: '1px solid #ccc', borderRadius: 1 }}>
              <Typography variant="h6" gutterBottom>Header Information</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Field
                    as={MuiTextField}
                    fullWidth
                    name="issuedTo"
                    label="Issued To"
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Field
                    as={MuiTextField}
                    fullWidth
                    name="sampleRegNo"
                    label="Sample Reg. No."
                    margin="normal"
                    variant="outlined"
                    disabled
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Field
                    as={MuiTextField}
                    fullWidth
                    name="sampleRegDate"
                    label="Sample Reg. Date"
                    margin="normal"
                    variant="outlined"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Field
                    as={MuiTextField}
                    fullWidth
                    name="reportDate"
                    label="Report Date"
                    margin="normal"
                    variant="outlined"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Field
                    as={MuiTextField}
                    fullWidth
                    name="reportNo"
                    label="Report No."
                    margin="normal"
                    variant="outlined"
                    disabled
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Field
                    as={MuiTextField}
                    fullWidth
                    name="customerRefNo"
                    label="Customer Ref. No. & Date"
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Sample Information */}
            <Box mb={3} p={2} sx={{ border: '1px solid #ccc', borderRadius: 1 }}>
              <Typography variant="h6" gutterBottom>Sample Information</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Field
                    as={MuiTextField}
                    fullWidth
                    name="natureOfSample"
                    label="Nature of Sample"
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Field
                    as={MuiTextField}
                    fullWidth
                    name="sampleCondition"
                    label="Sample Condition"
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Field
                    as={MuiTextField}
                    fullWidth
                    name="sampleSource"
                    label="Sample Source"
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Field
                    as={MuiTextField}
                    fullWidth
                    name="sampleDepth"
                    label="Sample Depth"
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Field
                    as={MuiTextField}
                    fullWidth
                    name="sampleQuantity"
                    label="Sample Quantity"
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Field
                    as={MuiTextField}
                    fullWidth
                    name="modeOfPacking"
                    label="Mode of Packing"
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Field
                    as={MuiTextField}
                    fullWidth
                    name="dateOfCollection"
                    label="Date of Collection"
                    margin="normal"
                    variant="outlined"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Field
                    as={MuiTextField}
                    fullWidth
                    name="dateOfReceipt"
                    label="Date of Receipt"
                    margin="normal"
                    variant="outlined"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Field
                    as={MuiTextField}
                    fullWidth
                    name="dateOfAnalysis"
                    label="Date of Analysis"
                    margin="normal"
                    variant="outlined"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Field
                    as={MuiTextField}
                    fullWidth
                    name="testRequestSubmittedBy"
                    label="Test Request Submitted By"
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Field
                    as={MuiTextField}
                    fullWidth
                    name="location"
                    label="Location"
                    margin="normal"
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Field
                    as={MuiTextField}
                    fullWidth
                    name="gpsCoordinates"
                    label="GPS Coordinates"
                    margin="normal"
                    variant="outlined"
                    placeholder="e.g., 28.6139° N, 77.2090° E"
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Soil Analysis Parameters */}
            <Box mb={3} p={2} sx={{ border: '1px solid #ccc', borderRadius: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" gutterBottom>SOIL ANALYSIS PARAMETERS</Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={() => handleAddParameter(setFieldValue, values)}
                >
                  Add Parameter
                </Button>
              </Box>
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Parameter</TableCell>
                      <TableCell>Method</TableCell>
                      <TableCell>Unit</TableCell>
                      <TableCell>Result</TableCell>
                      <TableCell>Standard Limit</TableCell>
                      <TableCell width="100">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <FieldArray
                      name="soilParameters"
                      render={arrayHelpers => (
                        <>
                          {values.soilParameters.map((param, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                <MuiTextField
                                  name={`soilParameters[${index}].parameter`}
                                  value={param.parameter}
                                  onChange={(e) => handleParameterChange(index, 'parameter', e.target.value, setFieldValue, values)}
                                  variant="standard"
                                  fullWidth
                                />
                              </TableCell>
                              <TableCell>
                                <MuiTextField
                                  name={`soilParameters[${index}].method`}
                                  value={param.method}
                                  onChange={(e) => handleParameterChange(index, 'method', e.target.value, setFieldValue, values)}
                                  variant="standard"
                                  fullWidth
                                />
                              </TableCell>
                              <TableCell>
                                <MuiTextField
                                  name={`soilParameters[${index}].unit`}
                                  value={param.unit}
                                  onChange={(e) => handleParameterChange(index, 'unit', e.target.value, setFieldValue, values)}
                                  variant="standard"
                                  fullWidth
                                />
                              </TableCell>
                              <TableCell>
                                <MuiTextField
                                  name={`soilParameters[${index}].result`}
                                  value={param.result}
                                  onChange={(e) => handleParameterChange(index, 'result', e.target.value, setFieldValue, values)}
                                  variant="standard"
                                  fullWidth
                                />
                              </TableCell>
                              <TableCell>
                                <MuiTextField
                                  name={`soilParameters[${index}].standardLimit`}
                                  value={param.standardLimit}
                                  onChange={(e) => handleParameterChange(index, 'standardLimit', e.target.value, setFieldValue, values)}
                                  variant="standard"
                                  fullWidth
                                />
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="outlined"
                                  color="error"
                                  size="small"
                                  onClick={() => handleRemoveParameter(index, setFieldValue, values)}
                                  disabled={values.soilParameters.length <= 1}
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

export default SoilReport;
