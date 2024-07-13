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

const CustomerCompletedBookings = () => {
  const theme = useTheme();
  const [completedBookings, setCompletedBookings] = useState([]); // State to hold completed bookings

  // Fetch completed bookings on component mount
  useEffect(() => {
    const fetchCompletedBookings = async () => {
      try {
        const response = await axios.get("/api/bookings/customer/completed", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        // Filter and set completed bookings
        setCompletedBookings(
          response.data.filter((booking) => booking.status === "completed")
        );
      } catch (error) {
        console.error(error); // Handle error
      }
    };
    fetchCompletedBookings();
  }, []);

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
        Completed Bookings of Customer
      </Typography>
      {completedBookings.length > 0 ? (
        <Grid container spacing={4}>
          {completedBookings.map((booking) => (
            <Grid item xs={12} sm={6} md={4} key={booking._id}>
              <Card
                style={{
                  backgroundColor: theme.palette.ternary.main,
                  color: theme.palette.text.secondary,
                  padding: "1rem",
                }}
              >
                <CardContent>
                  <Typography variant="h3">
                    Service: {booking.serviceId?.name || "N/A"}
                  </Typography>
                  <Typography variant="h4">
                    <u>Vehicle Details</u>
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
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1">No completed bookings found!</Typography>
      )}
    </Container>
  );
};

export default CustomerCompletedBookings;
