import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import { format, parseISO } from "date-fns";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Alert,
} from "@mui/material";
import { toast } from "react-toastify";

const CustomerBookingDetails = () => {
  const theme = useTheme();
  const [bookings, setBookings] = useState([]); // State to store bookings
  const [alert, setAlert] = useState(null); // State to manage alerts

  // Fetch customer bookings when the component mounts
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("/api/bookings/customer", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token in request headers
          },
        });
        setBookings(response.data); // Set bookings data
      } catch (error) {
        console.error(error); // Handle fetch error
      }
    };
    fetchBookings();
  }, []);

  // Handle booking cancellation
  const handleCancelBooking = async (booking) => {
    // Check if the booking status allows cancellation
    if (booking.status !== "pending") {
      setAlert({
        message: "Booking cannot be canceled as it is ready for delivery.",
        severity: "warning", // Set warning alert
      });
      return;
    }

    try {
      await axios.delete(`/api/bookings/${booking._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token in request headers
        },
      });
      // Update bookings list by removing the canceled booking
      setBookings(bookings.filter((b) => b._id !== booking._id));
      toast.success("Booking canceled successfully"); // Show success message
    } catch (error) {
      console.error(error); // Handle error during cancellation
      toast.error("Error canceling booking. Please try again."); // Show error message
    }
  };

  // Function to format date from ISO format to readable string
  const formatDate = (isoDate) => {
    return format(parseISO(isoDate), "MMMM d, yyyy");
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: "6rem" }}>
      <Typography
        variant="h2"
        gutterBottom
        style={{ color: theme.palette.text.primary }}
      >
        Bookings of Customer
      </Typography>
      {alert && (
        <Alert severity={alert.severity} onClose={() => setAlert(null)}>
          {alert.message}
        </Alert>
      )}
      {bookings.length > 0 ? (
        <Grid container spacing={4}>
          {bookings.map((booking) => (
            <Grid item xs={12} sm={6} md={4} key={booking._id}>
              <Card
                style={{
                  backgroundColor: theme.palette.ternary.main,
                  color: theme.palette.text.secondary,
                  padding: ".5rem",
                }}
              >
                <CardContent>
                  <Typography variant="h3">
                    Service: {booking.serviceId?.name || "N/A"}
                  </Typography>
                  <Typography variant="h4">
                    Vehicle Details
                  </Typography>
                  <Typography variant="body1">
                    Brand: {booking.brand}
                  </Typography>
                  <Typography variant="body1">
                    Model: {booking.model}
                  </Typography>
                  <Typography variant="body1">Year: {booking.year}</Typography>
                  <Typography variant="body1">
                    License Plate: {booking.licensePlate}
                  </Typography>
                  <Typography variant="body1">
                    Date: {formatDate(booking.date)}
                  </Typography>
                  <Typography variant="body1">
                    Status: {booking.status}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleCancelBooking(booking)}
                  >
                    Cancel
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1">No active bookings found!</Typography>
      )}
    </Container>
  );
};

export default CustomerBookingDetails;
