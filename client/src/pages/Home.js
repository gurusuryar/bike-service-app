import React from "react";
import { Container, Grid, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import backgroundImage from "../assets/hero-bike.jpg";

import bikeImage1 from "../assets/hero-bike.jpg";
import bikeImage2 from "../assets/hero-bike.jpg";
import bikeImage3 from "../assets/hero-bike.jpg";
import bikeImage4 from "../assets/hero-bike.jpg";
import bikeImage5 from "../assets/hero-bike.jpg";
import bikeImage6 from "../assets/hero-bike.jpg";

const Home = () => {
  const theme = useTheme();

  const bikes = [
    { img: bikeImage1, text: "Bike 1" },
    { img: bikeImage2, text: "Bike 2" },
    { img: bikeImage3, text: "Bike 3" },
    { img: bikeImage4, text: "Bike 4" },
    { img: bikeImage5, text: "Bike 5" },
    { img: bikeImage6, text: "Bike 6" },
  ];

  return (
    <>
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          paddingTop: "4rem",
        }}
      >
        <Container style={{ padding: "2rem 0" }}>
          <Typography
            variant="h1"
            style={{ color: theme.palette.text.primary }}
          >
            Welcome to Bike Service
          </Typography>
          <Typography
            variant="body1"
            style={{
              color: theme.palette.text.primary,
              marginTop: "1.5rem",
            }}
          >
            Discover the best bike services in town. Book your appointment
            today!
          </Typography>
          <div style={{ marginTop: "2rem" }}>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/services"
              style={{
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.text.primary,
              }}
              startIcon={<OpenInNewRoundedIcon />}
            >
              Book Now
            </Button>
          </div>
        </Container>
        <div
          style={{
            marginTop: "3rem",
            backgroundColor: theme.palette.primary.main,
            padding: "2rem 0",
          }}
        >
          <Container>
            <Grid container spacing={2}>
              {bikes.map((bike, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <div
                    style={{
                      textAlign: "center",
                      margin: "0.5rem",
                      padding: ".2rem",
                      borderRadius: "8px",
                      backgroundColor: theme.palette.background.paper,
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <img
                      src={bike.img}
                      alt={bike.text}
                      style={{
                        width: "100%",
                        height: "auto",
                        maxWidth: "200px",
                      }}
                    />
                    <Typography
                      variant="body2"
                      style={{
                        color: theme.palette.text.secondary,
                        marginTop: "0.5rem",
                      }}
                    >
                      {bike.text}
                    </Typography>
                  </div>
                </Grid>
              ))}
            </Grid>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Home;
