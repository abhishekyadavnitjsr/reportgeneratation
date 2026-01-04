// src/components/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Typography, 
  Container, 
  Paper, 
  Grid, 
  Card, 
  CardContent, 
  useTheme,
  useMediaQuery
} from '@mui/material';
import ScienceIcon from '@mui/icons-material/Science';
import AssessmentIcon from '@mui/icons-material/Assessment';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import AirIcon from '@mui/icons-material/Air';
import ParkIcon from '@mui/icons-material/Park';
import GrassIcon from '@mui/icons-material/Grass';

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const features = [
    {
      title: 'Record a Sample',
      description: 'Add new sample data for water, air, soil, or noise quality testing.',
      icon: <ScienceIcon sx={{ fontSize: 60, color: theme.palette.primary.main }} />,
      buttonText: 'Record Sample',
      onClick: () => navigate('/sample-collection')
    },
    {
      title: 'Generate Report',
      description: 'Create detailed reports for various environmental quality parameters.',
      icon: <AssessmentIcon sx={{ fontSize: 60, color: theme.palette.primary.main }} />,
      buttonText: 'View Reports',
      onClick: () => document.getElementById('reports-section')?.scrollIntoView({ behavior: 'smooth' })
    }
  ];

  const reportTypes = [
    { 
      id: 'water', 
      label: 'Water Quality',
      icon: <WaterDropIcon sx={{ fontSize: 40, mb: 1 }} color="primary" />,
      description: 'Comprehensive water quality analysis and reporting'
    },
    { 
      id: 'air', 
      label: 'Air Quality',
      icon: <AirIcon sx={{ fontSize: 40, mb: 1 }} color="primary" />,
      description: 'Detailed air quality assessment reports'
    },
    { 
      id: 'soil', 
      label: 'Soil Quality',
      icon: <GrassIcon sx={{ fontSize: 40, mb: 1 }} color="primary" />,
      description: 'Soil composition and contamination analysis'
    },
    { 
      id: 'noise', 
      label: 'Noise Level',
      icon: <ParkIcon sx={{ fontSize: 40, mb: 1 }} color="primary" />,
      description: 'Environmental noise level monitoring reports'
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <Box 
        sx={{ 
          bgcolor: 'primary.main', 
          color: 'primary.contrastText',
          py: 8,
          textAlign: 'center',
          mb: 6
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
            Environmental Quality Monitoring System
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, maxWidth: '800px', mx: 'auto', opacity: 0.9 }}>
            Comprehensive environmental monitoring and reporting for water, air, soil, and noise quality
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            {features.map((feature, index) => (
              <Button
                key={index}
                variant="contained"
                color="secondary"
                size="large"
                onClick={feature.onClick}
                startIcon={feature.icon}
                sx={{
                  px: 4,
                  py: 2,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 3,
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {feature.buttonText}
              </Button>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} md={5} key={index}>
              <Card 
                elevation={3} 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center', py: 4 }}>
                  <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2, textAlign: 'center' }}>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    size="large"
                    onClick={feature.onClick}
                    sx={{ 
                      borderRadius: 2,
                      px: 4,
                      '&:hover': {
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText',
                      },
                    }}
                  >
                    {feature.buttonText}
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Reports Section */}
      <Box id="reports-section" sx={{ py: 6, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h4" 
            component="h2" 
            align="center" 
            gutterBottom
            sx={{ 
              fontWeight: 'bold',
              mb: 6,
              position: 'relative',
              '&:after': {
                content: '""',
                display: 'block',
                width: '80px',
                height: '4px',
                bgcolor: 'primary.main',
                mx: 'auto',
                mt: 2,
                borderRadius: '2px'
              }
            }}
          >
            Available Reports
          </Typography>
          
          <Grid container spacing={4}>
            {reportTypes.map((report) => (
              <Grid item xs={12} sm={6} md={3} key={report.id}>
                <Paper 
                  elevation={3} 
                  sx={{ 
                    p: 3, 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 6,
                    },
                  }}
                >
                  {report.icon}
                  <Typography variant="h6" component="h3" gutterBottom>
                    {report.label}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                    {report.description}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => navigate(`/report/${report.id}`)}
                    sx={{ mt: 'auto', borderRadius: 2 }}
                  >
                    Generate {report.label} Report
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', py: 4, mt: 6, borderTop: `1px solid ${theme.palette.divider}` }}>
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            {new Date().getFullYear()} Environmental Quality Monitoring System. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;