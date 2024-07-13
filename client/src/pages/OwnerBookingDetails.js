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
} from "@mui/material";
import { toast } from "react-toastify";

const OwnerBookingDetails = () => {
  const theme = useTheme(); // Access the theme for styling
  const [bookings, setBookings] = useState([]); // State for booking data

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("/api/bookings/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token for authorization
          },
        });
        setBookings(response.data); // Set the fetched bookings data
      } catch (error) {
        console.error(error); // Log any errors
      }
    };
    fetchBookings(); // Fetch bookings when component mounts
  }, []);

  const handleUpdateBookingStatus = async (bookingId, status) => {
    try {
      await axios.put(
        `/api/bookings/${bookingId}`,
        { status }, // Update the booking status
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token for authorization
          },
        }
      );
      // Refetch bookings to update the list
      const response = await axios.get("/api/bookings/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token for authorization
        },
      });
      setBookings(response.data); // Update bookings state

      // Show toast messages based on the status
      if (status === "ready for delivery") {
        toast.success('Booking status changed to "Ready for Delivery"');
        toast.success("Email sent to the customer for vehicle pickup");
      }

      if (status === "completed") {
        toast.success("Booking status changed to Completed");
      }
    } catch (error) {
      console.error(error); // Log any errors
    }
  };

  // Function to format date
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
        Booking Details for Owner
      </Typography>
      {bookings.length > 0 ? (
        <Grid container spacing={2}>
          {bookings.map((booking) => (
            <Grid item xs={12} sm={6} md={4} key={booking._id}>
              <Card
                style={{
                  backgroundColor: theme.palette.ternary.main,
                  color: theme.palette.text.secondary,
                  padding: "1rem",
                }}
              >
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Customer: {booking.customerId.name}
                  </Typography>
                  <Typography variant="body1">
                    Service: {booking.serviceId?.name || "N/A"}
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
                    onClick={() =>
                      handleUpdateBookingStatus(
                        booking._id,
                        "ready for delivery"
                      )
                    }
                    style={{ marginRight: "0.5rem" }}
                  >
                    Delivery
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() =>
                      handleUpdateBookingStatus(booking._id, "completed")
                    }
                  >
                    Completed
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

export default OwnerBookingDetails;
