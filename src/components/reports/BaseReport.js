// src/components/reports/BaseReport.js
import React from 'react';
import { Formik, Form } from 'formik';
import { Box, Button } from '@mui/material';

const BaseReport = ({ 
  reportType,
  initialValues, 
  validationSchema, 
  onSubmit, 
  children 
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formikProps) => (
        <Form>
          {typeof children === 'function' ? children(formikProps) : children}
          <Box mt={3}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={formikProps.isSubmitting}
              fullWidth
              size="large"
            >
              Generate {reportType ? `${reportType} ` : ''}Report
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default BaseReport;