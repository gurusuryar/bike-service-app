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

const OwnerCompletedBookings = () => {
  const theme = useTheme(); // Access the theme for styling
  const [completedBookings, setCompletedBookings] = useState([]); // State for completed booking data

  useEffect(() => {
    const fetchCompletedBookings = async () => {
      try {
        const response = await axios.get("/api/bookings/completed", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token for authorization
          },
        });
        setCompletedBookings(response.data); // Set the fetched completed bookings data
      } catch (error) {
        console.error(error); // Log any errors
      }
    };
    fetchCompletedBookings(); // Fetch completed bookings when component mounts
  }, []);

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
        Completed Bookings of Owner
      </Typography>
      {completedBookings.length > 0 ? (
        <Grid container spacing={2}>
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
                  <Typography variant="h4" gutterBottom>
                    Customer: {booking.customerId.name}
                  </Typography>
                  <Typography variant="body1">
                    Service Name: {booking.serviceId?.name || "N/A"}
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
        <Typography variant="body1" style={{ marginTop: "1rem" }}>
          No completed bookings found!
        </Typography>
      )}
    </Container>
  );
};

export default OwnerCompletedBookings;
