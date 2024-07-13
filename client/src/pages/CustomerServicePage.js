import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Box,
  Modal,
  Backdrop,
  Fade,
} from "@mui/material";
import { toast } from "react-toastify";

const CustomerServicePage = () => {
  const theme = useTheme();
  const [allServices, setAllServices] = useState([]); // State to store all available services
  const [newBooking, setNewBooking] = useState({
    brand: "",
    model: "",
    year: "",
    licensePlate: "",
    date: "",
  }); // State to manage new booking details
  const [openModal, setOpenModal] = useState(false); // State to control modal visibility
  const [selectedServiceId, setSelectedServiceId] = useState(null); // State to store selected serviceId

  useEffect(() => {
    const fetchAllServices = async () => {
      try {
        // Fetch available services from API
        const response = await axios.get("/api/services", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token for authorization
          },
        });
        setAllServices(response.data); // Update state with fetched services
      } catch (error) {
        console.error(error); // Log any errors that occur during fetch
      }
    };
    fetchAllServices(); // Call fetch function on component mount
  }, []);

  const handleBookService = async () => {
    try {
      // Create a new booking with selected serviceId
      await axios.post(
        "/api/bookings",
        { ...newBooking, serviceId: selectedServiceId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token for authorization
          },
        }
      );
      // Reset new booking form and close modal after successful booking
      setNewBooking({
        brand: "",
        model: "",
        year: "",
        licensePlate: "",
        date: "",
      });
      setOpenModal(false);
      setSelectedServiceId(null); // Clear selectedServiceId
      // Notify user of successful booking
      toast.success("New Booking Created..");
      toast.success("Email sent to service owner");
    } catch (error) {
      console.error(error); // Log any errors that occur during booking
    }
  };

  const handleOpenModal = (serviceId) => {
    setSelectedServiceId(serviceId); // Set selected serviceId and open modal
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false); // Close modal and reset selectedServiceId
    setSelectedServiceId(null);
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: "6rem" }}>
      <Typography
        variant="h2"
        gutterBottom
        style={{ color: theme.palette.text.primary }}
      >
        Available Services to Customer
      </Typography>
  
      {allServices.length === 0 ? (
        <Typography
          variant="h5"
          style={{ marginTop: "2rem", color: theme.palette.text.primary }}
        >
          No services found!
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {allServices.map((service) => (
            <Grid item xs={12} sm={6} md={4} key={service._id}>
              <Card
                style={{
                  backgroundColor: theme.palette.ternary.main,
                  color: theme.palette.text.secondary,
                  padding: ".5rem",
                }}
              >
                <CardContent>
                  <Typography variant="h4">Service: {service.name}</Typography>
                  <Typography variant="body1">
                    Description: {service.description}
                  </Typography>
                  <Typography variant="body1">Price: ${service.price}</Typography>
                </CardContent>
                <CardActions
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleOpenModal(service._id)}
                  >
                    Book Service
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
  
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography
              variant="h3"
              style={{
                marginBottom: "1rem",
                color: theme.palette.text.secondary,
              }}
              align="center"
            >
              Vehicle Information
            </Typography>
            <TextField
              label="Brand"
              variant="outlined"
              value={newBooking.brand}
              onChange={(e) =>
                setNewBooking({ ...newBooking, brand: e.target.value })
              }
              fullWidth
              style={{ marginBottom: "1rem" }}
              InputProps={{
                sx: {
                  color: theme.palette.text.secondary,
                },
              }}
            />
            <TextField
              label="Model"
              variant="outlined"
              value={newBooking.model}
              onChange={(e) =>
                setNewBooking({ ...newBooking, model: e.target.value })
              }
              fullWidth
              style={{ marginBottom: "1rem" }}
              InputProps={{
                sx: {
                  color: theme.palette.text.secondary,
                },
              }}
            />
            <TextField
              label="Year"
              variant="outlined"
              value={newBooking.year}
              onChange={(e) =>
                setNewBooking({ ...newBooking, year: e.target.value })
              }
              fullWidth
              style={{ marginBottom: "1rem" }}
              InputProps={{
                sx: {
                  color: theme.palette.text.secondary,
                },
              }}
            />
            <TextField
              label="License Plate"
              variant="outlined"
              value={newBooking.licensePlate}
              onChange={(e) =>
                setNewBooking({ ...newBooking, licensePlate: e.target.value })
              }
              fullWidth
              style={{ marginBottom: "1rem" }}
              InputProps={{
                sx: {
                  color: theme.palette.text.secondary,
                },
              }}
            />
            <TextField
              label="Date"
              variant="outlined"
              type="date"
              value={newBooking.date}
              onChange={(e) =>
                setNewBooking({ ...newBooking, date: e.target.value })
              }
              fullWidth
              style={{ marginBottom: "1rem" }}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                sx: {
                  color: theme.palette.text.secondary,
                },
              }}
            />
            <Box style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleBookService}
              >
                Book
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Container>
  );  
};
export default CustomerServicePage;
