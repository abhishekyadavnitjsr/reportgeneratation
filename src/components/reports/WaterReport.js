// src/components/reports/WaterReport.js
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

const WaterReport = ({ onSubmit }) => {
  const navigate = useNavigate();
  
  const initialValues = {
    // Header Information
    issuedTo: 'KEC International Limted, 9th Floor, DLF 9, DLF Cyber City, Phase III, Gurugram, Haryana - 122002',
    sampleRegNo: `RPT-${Date.now().toString().slice(-6)}`,
    sampleRegDate: new Date().toISOString().split('T')[0],
    reportDate: new Date().toISOString().split('T')[0],
    reportNo: `RPT-${Date.now()}`,
    customerRefNo: '',
    
    // Part A: Particulars of Sample Submitted
    natureOfSample: 'Ground Water',
    sampleCondition: 'Good',
    gradeVariety: 'NA',
    brandName: 'NA',
    sampleQuantity: '6 Ltr',
    batchSizeLocation: 'NA',
    modeOfPacking: 'Packed in bottles',
    dateOfReceipt: new Date().toISOString().split('T')[0],
    dateOfStart: new Date().toISOString().split('T')[0],
    dateOfCompletion: 'NA',
    sealStatus: 'NA',
    iosSignature: 'NA',
    testRequestSubmittedBy: 'KEC International Private Limited',
    manufacturedBy: 'NA',
    suppliedBy: 'NA',
    
    // Water Analysis Parameters
    waterParameters: [
      { parameter: 'pH', result: '', method: 'IS 3025 (Part 11):1983', limit: '6.5-8.5' },
      { parameter: 'Turbidity (NTU)', result: '', method: 'IS 3025 (Part 10):1991', limit: '5' },
      { parameter: 'Total Dissolved Solids (mg/L)', result: '', method: 'IS 3025 (Part 16):1984', limit: '500' },
      { parameter: 'Total Hardness (as CaCO3) (mg/L)', result: '', method: 'IS 3025 (Part 21):2009', limit: '200' },
      { parameter: 'Chlorides (as Cl) (mg/L)', result: '', method: 'IS 3025 (Part 32):1988', limit: '250' },
    ],
    
    // Organoleptic Parameters
    organolepticParameters: [
      {
        parameter: 'Colour (Hazen Unit)',
        instrument: 'Turbidity meter',
        method: 'IS 3025 (Part 4): 1983 (RA 2018)',
        acceptableLimit: '5.0',
        permissibleLimit: '15.0',
        result: '1.0'
      },
      {
        parameter: 'Odour',
        instrument: 'Sensory',
        method: 'IS 3025 (Part 5): 2015',
        acceptableLimit: 'Unobjectionable',
        permissibleLimit: 'Unobjectionable',
        result: 'Unobjectionable'
      }
    ],
    
    // Other
    remarks: ''
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
    dateOfReceipt: Yup.string().required('Required'),
    dateOfStart: Yup.string().required('Required'),
    testRequestSubmittedBy: Yup.string().required('Required'),
    organolepticParameters: Yup.array().of(
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
    const updatedParameters = [...values.waterParameters];
    updatedParameters[index] = {
      ...updatedParameters[index],
      [field]: value
    };
    setFieldValue('waterParameters', updatedParameters);
  };

  // Handler for adding a new parameter
  const handleAddParameter = (setFieldValue, values) => {
    const newParameter = { parameter: '', result: '', method: '', limit: '' };
    setFieldValue('waterParameters', [...values.waterParameters, newParameter]);
  };

  // Handler for removing a parameter
  const handleRemoveParameter = (index, setFieldValue, values) => {
    if (values.waterParameters.length > 1) {
      const updatedParameters = [...values.waterParameters];
      updatedParameters.splice(index, 1);
      setFieldValue('waterParameters', updatedParameters);
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
        WATER QUALITY TEST REPORT
      </Typography>
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          if (onSubmit) {
            const reportData = {
              ...values,
              // Include any additional fields or transformations if needed
              organolepticParameters: values.organolepticParameters || []
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

            {/* Part A: Particulars of Sample Submitted */}
            <Box mb={3} p={2} sx={{ border: '1px solid #ccc', borderRadius: 1 }}>
              <Typography variant="h6" gutterBottom>PART A: PARTICULARS OF SAMPLE SUBMITTED</Typography>
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
                <Grid item xs={12} md={6}>
                  <Field
                    as={MuiTextField}
                    fullWidth
                    name="dateOfReceipt"
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
                    name="testRequestSubmittedBy"
                    label="Test Request Submitted By"
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Box>
            {/* Water Analysis Parameters */}
            <Box sx={{ mt: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Water Analysis Parameters
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={() => handleAddParameter(setFieldValue, values)}
                >
                  Add Parameter
                </Button>
              </Box>
              <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Parameter</TableCell>
                      <TableCell>Result</TableCell>
                      <TableCell>Method</TableCell>
                      <TableCell>Permissible Limit</TableCell>
                      <TableCell width="50">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <FieldArray
                      name="waterParameters"
                      render={arrayHelpers => (
                        <>
                          {values.waterParameters.map((param, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                <MuiTextField
                                  name={`waterParameters[${index}].parameter`}
                                  value={param.parameter}
                                  onChange={(e) => handleParameterChange(index, 'parameter', e.target.value, setFieldValue, values)}
                                  variant="standard"
                                  fullWidth
                                />
                              </TableCell>
                              <TableCell>
                                <MuiTextField
                                  name={`waterParameters[${index}].result`}
                                  value={param.result}
                                  onChange={(e) => handleParameterChange(index, 'result', e.target.value, setFieldValue, values)}
                                  variant="standard"
                                  fullWidth
                                />
                              </TableCell>
                              <TableCell>
                                <MuiTextField
                                  name={`waterParameters[${index}].method`}
                                  value={param.method}
                                  onChange={(e) => handleParameterChange(index, 'method', e.target.value, setFieldValue, values)}
                                  variant="standard"
                                  fullWidth
                                />
                              </TableCell>
                              <TableCell>
                                <MuiTextField
                                  name={`waterParameters[${index}].limit`}
                                  value={param.limit}
                                  onChange={(e) => handleParameterChange(index, 'limit', e.target.value, setFieldValue, values)}
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
                                  disabled={values.waterParameters.length <= 1}
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
            {/* Organoleptic & Physical Parameters */}
            <Box mb={3} p={2} sx={{ border: '1px solid #ccc', borderRadius: 1 }}>
              <Typography variant="h6" gutterBottom>ORGANOLEPTIC & PHYSICAL PARAMETERS</Typography>
              <TableContainer component={Paper} sx={{ mb: 3 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Parameter</TableCell>
                      <TableCell>Instrument</TableCell>
                      <TableCell>Method</TableCell>
                      <TableCell>Acceptable Limit</TableCell>
                      <TableCell>Permissible Limit</TableCell>
                      <TableCell>Result</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <FieldArray name="organolepticParameters">
                      {({ remove }) => (
                        values.organolepticParameters.map((param, index) => (
                          <TableRow key={index}>
                            <TableCell>{param.parameter}</TableCell>
                            <TableCell>{param.instrument}</TableCell>
                            <TableCell>{param.method}</TableCell>
                            <TableCell>{param.acceptableLimit}</TableCell>
                            <TableCell>{param.permissibleLimit}</TableCell>
                            <TableCell>
                              <MuiTextField
                                size="small"
                                name={`organolepticParameters.${index}.result`}
                                value={param.result}
                                onChange={handleChange}
                                variant="outlined"
                                fullWidth
                              />
                            </TableCell>
                            <TableCell>
                              <Button 
                                variant="outlined" 
                                color="error"
                                size="small"
                                onClick={() => remove(index)}
                              >
                                Remove
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </FieldArray>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            {/* Submit Button */}
            <Box mt={3} display="flex" justifyContent="flex-end">
              <Button
                type="submit"
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

export default WaterReport;