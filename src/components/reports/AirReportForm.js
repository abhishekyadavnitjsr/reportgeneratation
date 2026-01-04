// src/components/reports/AirReportForm.js
import React from 'react';
import { 
  Grid, 
  TextField, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  IconButton,
  Tooltip, Box, Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Field, FieldArray } from 'formik';

const MuiTextField = ({ field, form, ...props }) => {
  const error = form.touched[field.name] && Boolean(form.errors[field.name]);
  const helperText = form.touched[field.name] && form.errors[field.name];
  
  return (
    <TextField
      {...field}
      {...props}
      variant="outlined"
      size="small"
      fullWidth
      margin="normal"
      error={error}
      helperText={helperText}
      sx={{
        '& .MuiOutlinedInput-root': {
          backgroundColor: '#ffffff',
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: error ? '#d32f2f' : '#1976d2',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: error ? '#d32f2f' : '#1976d2',
            borderWidth: '1px',
          },
        },
        '& .MuiOutlinedInput-input': {
          padding: '10px 14px',
        },
        '& .MuiInputLabel-root': {
          color: error ? '#d32f2f' : 'rgba(0, 0, 0, 0.6)',
          '&.Mui-focused': {
            color: error ? '#d32f2f' : '#1976d2',
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
};

const AirReportForm = ({ values, handleChange, handleBlur, isSubmitting, setFieldValue, setFieldTouched }) => {
  const handleParameterChange = (index, field, value) => {
    const updatedParameters = [...values.airParameters];
    updatedParameters[index] = {
      ...updatedParameters[index],
      [field]: value
    };
    setFieldValue('airParameters', updatedParameters);
  };

  const handleAddParameter = () => {
    const newParameter = { parameter: '', result: '', method: '', limit: '' };
    setFieldValue('airParameters', [...values.airParameters, newParameter]);
  };

  const handleRemoveParameter = (index) => {
    if (values.airParameters.length > 1) {
      const updatedParameters = [...values.airParameters];
      updatedParameters.splice(index, 1);
      setFieldValue('airParameters', updatedParameters);
    }
  };
  return (
    <Grid container spacing={3}>
      {/* Header Information */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Header Information</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Field
                name="issuedTo"
                label="Issued To"
                component={MuiTextField}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                name="customerRefNo"
                label="Customer Reference No."
                component={MuiTextField}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      {/* Sampling Information */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Sampling Information</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Field
                name="location"
                label="Location"
                component={MuiTextField}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                name="samplingDate"
                label="Sampling Date"
                type="date"
                component={MuiTextField}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                name="samplingDuration"
                label="Sampling Duration"
                component={MuiTextField}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                name="weatherCondition"
                label="Weather Condition"
                component={MuiTextField}
                required
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      {/* Air Quality Parameters */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Air Quality Parameters</Typography>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Parameter</TableCell>
                  <TableCell>Method</TableCell>
                  <TableCell>Unit</TableCell>
                  <TableCell>Result</TableCell>
                  <TableCell>Standard Limit</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <FieldArray name="airParameters">
                  {() => (
                    values.airParameters.map((param, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Field
                            name={`airParameters.${index}.parameter`}
                            component={MuiTextField}
                            variant="standard"
                            fullWidth
                            onChange={(event) => handleParameterChange(index, 'parameter', event.target.value)}
                          />
                        </TableCell>
                        <TableCell>
                          <Field
                            name={`airParameters.${index}.method`}
                            component={MuiTextField}
                            variant="standard"
                            fullWidth
                          />
                        </TableCell>
                        <TableCell>
                          <Field
                            name={`airParameters.${index}.unit`}
                            component={MuiTextField}
                            variant="standard"
                            fullWidth
                          />
                        </TableCell>
                        <TableCell>
                          <Field
                            name={`airParameters.${index}.result`}
                            type="number"
                            component={MuiTextField}
                            variant="standard"
                            InputLabelProps={{ shrink: true }}
                            style={{ width: '100px' }}
                          />
                        </TableCell>
                        <TableCell>
                          <Field
                            name={`airParameters.${index}.standardLimit`}
                            component={MuiTextField}
                            variant="standard"
                            fullWidth
                          />
                        </TableCell>
                        <TableCell>
                          <Tooltip title="Remove parameter">
                            <IconButton 
                              onClick={() => handleRemoveParameter(index)}
                              disabled={values.airParameters.length <= 1}
                              color="error"
                              size="small"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </FieldArray>
              </TableBody>
            </Table>
          </TableContainer>
          <Box mt={2}>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleAddParameter}
              size="small"
            >
              Add Parameter
            </Button>
          </Box>
        </Paper>
      </Grid>

      {/* Remarks */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Field
            name="remarks"
            label="Remarks"
            component={MuiTextField}
            multiline
            rows={4}
            fullWidth
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AirReportForm;
