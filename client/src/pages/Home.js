import React from 'react';
import { Container, Grid, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const Home = () => {
  const theme = useTheme();

  return (
    <div>
      <div
        style={{
          backgroundColor: theme.palette.primary.main,
          padding: '4rem 0',
        }}
      >
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h1" style={{ color: theme.palette.text.primary }}>
                Welcome to Bike Service
              </Typography>
              <Typography
                variant="body1"
                style={{
                  color: theme.palette.text.primary,
                  marginTop: '1.5rem',
                }}
              >
                Discover the best bike services in town. Book your appointment today!
              </Typography>
              <div style={{ marginTop: '2rem' }}>
                <Button
                  variant="contained"
                  color="secondary"
                  component={Link}
                  to="/services"
                  style={{
                    backgroundColor: theme.palette.secondary.main,
                    color: theme.palette.text.primary,
                  }}
                >
                  Book Now
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              {/* Add an image or illustration here */}
            </Grid>
          </Grid>
        </Container>
      </div>
      {/* Add more sections for services, booking, and other content */}
    </div>
  );
};

export default Home;
