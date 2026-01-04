// src/components/SampleCollection.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Typography, 
  Container, 
  Paper, 
  TextField, 
  MenuItem, 
  Grid, 
  Snackbar,
  Alert,
  styled
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// Custom styled TextField component to match other forms
const StyledTextField = styled(TextField)({
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
  '& .MuiFormHelperText-root': {
    marginLeft: 0,
    marginTop: '4px',
    fontSize: '0.75rem',
  },
});

const SampleCollection = () => {
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [sampleData, setSampleData] = useState({
    companyName: '',
    sampleCode: '',
    collectionDate: new Date(),
    sampleType: 'water',
  });

  const sampleTypes = [
    { value: 'water', label: 'Water' },
    { value: 'air', label: 'Air' },
    { value: 'soil', label: 'Soil' },
    { value: 'waste', label: 'Waste' },
    { value: 'other', label: 'Other' },
  ];

  // Generate sample code when component mounts or when company name changes
  useEffect(() => {
    if (sampleData.companyName) {
      const prefix = sampleData.companyName.substring(0, 3).toUpperCase();
      const date = new Date();
      const timestamp = date.getTime().toString().slice(-4);
      setSampleData(prev => ({
        ...prev,
        sampleCode: `${prefix}-${timestamp}`
      }));
    }
  }, [sampleData.companyName]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSampleData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (date) => {
    setSampleData(prev => ({
      ...prev,
      collectionDate: date
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Sample Data:', sampleData);
    setOpenSnackbar(true);
    // Reset form
    setSampleData({
      companyName: '',
      sampleCode: '',
      collectionDate: new Date(),
      sampleType: 'water',
    });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="md">
        <Box sx={{ mt: 4, mb: 6 }}>
          <Button 
            variant="contained" 
            onClick={() => navigate('/')}
            sx={{ 
              mb: 3,
              textTransform: 'none',
              fontWeight: 500
            }}
            startIcon={<span>←</span>}
          >
            Back to Home
          </Button>
          
          <Typography variant="h4" component="h1" gutterBottom sx={{ 
            color: '#1976d2',
            fontWeight: 600,
            mb: 4
          }}>
            Sample Collection
          </Typography>
          
          <Paper elevation={3} sx={{ 
            p: 4, 
            mb: 4,
            borderRadius: 2,
            backgroundColor: '#f9f9f9',
            border: '1px solid #e0e0e0'
          }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <StyledTextField
                    fullWidth
                    size="small"
                    label="Company Name"
                    name="companyName"
                    value={sampleData.companyName}
                    onChange={handleInputChange}
                    required
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <StyledTextField
                    fullWidth
                    size="small"
                    label="Sample Code"
                    name="sampleCode"
                    value={sampleData.sampleCode}
                    InputProps={{
                      readOnly: true,
                    }}
                    margin="normal"
                    helperText="Auto-generated code"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DatePicker
                    label="Collection Date"
                    value={sampleData.collectionDate}
                    onChange={handleDateChange}
                    renderInput={(params) => (
                      <StyledTextField 
                        {...params} 
                        fullWidth 
                        size="small"
                        margin="normal" 
                        required
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <StyledTextField
                    select
                    fullWidth
                    size="small"
                    label="Sample Type"
                    name="sampleType"
                    value={sampleData.sampleType}
                    onChange={handleInputChange}
                    margin="normal"
                    required
                    variant="outlined"
                  >
                    {sampleTypes.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </StyledTextField>
                </Grid>
                <Grid item xs={12} sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary"
                    disabled={!sampleData.companyName}
                    sx={{
                      minWidth: 150,
                      py: 1.5,
                      textTransform: 'none',
                      fontWeight: 500,
                      fontSize: '1rem'
                    }}
                  >
                    Record Sample
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Box>
        <Snackbar 
          open={openSnackbar} 
          autoHideDuration={6000} 
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
            Sample recorded successfully!
          </Alert>
        </Snackbar>
      </Container>
    </LocalizationProvider>
  );
};

export default SampleCollection;