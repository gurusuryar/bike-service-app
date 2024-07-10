import React from "react";
import { Container, Typography, Button, Grid, Card, CardContent, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import serviceImage from "../assets/hero-bike.jpg"; // Example image for services
import heroBikeImage1 from "../assets/hero1-bike.jpg"; // Example carousel image
import heroBikeImage2 from "../assets/hero1.1-bike.jpg";
import heroBikeImage3 from "../assets/hero1.2-bike.jpg";
import heroBikeImage4 from "../assets/hero2-bike.jpg";
import heroBikeImage5 from "../assets/hero4-bike.jpg";

const carouselImages = [
  { id: 1, src: heroBikeImage1 },
  { id: 2, src: heroBikeImage2 },
  { id: 3, src: heroBikeImage3 },
  { id: 4, src: heroBikeImage4 },
  { id: 5, src: heroBikeImage5 },
];

const Home = () => {
  const theme = useTheme();

  const services = [
    {
      title: "General Service Check-up",
      description: "Comprehensive bike service to ensure smooth and safe rides.",
      link: "/register",
    },
    {
      title: "Oil Change",
      description: "Keep your bike running smoothly with regular oil changes.",
      link: "/register",
    },
    {
      title: "Water Wash",
      description: "Get your bike sparkling clean with our professional wash service.",
      link: "/register",
    },
  ];

  const carouselSettings = {
    dots: true, // Disable dots navigation

    speed: 1200, // Adjust speed for smoother sliding
    slidesToShow: 1,
    slidesToScroll: 1,
    easing: "ease",
  };

  return (
    <>
      <Slider {...carouselSettings} style={{ maxWidth: "100%", margin: "0 auto" }}>
        {carouselImages.map((image) => (
          <div key={image.id}>
            <div
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.3)), url(${image.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                paddingTop: "4rem",
                width: "100%",
                minHeight: "80vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Container style={{ padding: "2rem 0"}}>
                <Typography variant="h1" style={{ color: theme.palette.text.primary }}>
                  Welcome to Bike Service
                </Typography>
                <Typography variant="body1" style={{ color: theme.palette.text.primary, marginTop: "1.5rem" }}>
                  Discover the best bike services in town. Book your appointment today!
                </Typography>
                <div style={{ marginTop: "2rem" }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to="/register"
                    style={{
                      backgroundColor: theme.palette.secondary.main,
                      color: theme.palette.text.primary,
                      marginRight: "1rem",
                    }}
                    startIcon={<OpenInNewRoundedIcon />}
                  >
                    Book Service
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to="/register"
                    style={{
                      backgroundColor: theme.palette.secondary.main,
                      color: theme.palette.text.primary,
                    }}
                    startIcon={<OpenInNewRoundedIcon />}
                  >
                    Add Service
                  </Button>
                </div>
              </Container>
            </div>
          </div>
        ))}
      </Slider>

      <Container style={{ marginTop: "2rem", marginBottom: "2rem" }}>
        <Typography variant="h3" style={{ color: theme.palette.text.primary, marginBottom: "2rem" }}>
          Our Services
        </Typography>
        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={serviceImage} // Replace with your service image
                  alt={service.title}
                />
                <CardContent>
                  <Typography variant="h4" component="div" style={{ color: theme.palette.primary.main }}>
                    {service.title}
                  </Typography>
                  <Typography variant="body2" style={{ color: theme.palette.text.secondary }}>
                    {service.description}
                  </Typography>
                </CardContent>
                <Button
                  variant="contained"
                  color="secondary"
                  component={Link}
                  to={service.link}
                  style={{ margin: "0.5rem", backgroundColor: theme.palette.secondary.main }}
                >
                  Learn More
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Home;
