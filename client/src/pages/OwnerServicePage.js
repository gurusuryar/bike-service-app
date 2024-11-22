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
  Fab,
  Modal,
  TextField,
  Box,
  IconButton
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { toast } from "react-toastify";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useFormik } from "formik";
import * as yup from "yup";

const OwnerServicePage = () => {
  const theme = useTheme(); // Access the theme for styling
  const [services, setServices] = useState([]); // State for the list of services
  const [editService, setEditService] = useState(null); // State for the service being edited
  const [openModal, setOpenModal] = useState(false); // State to control the modal visibility

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("/api/services", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token for authorization
          },
        });
        setServices(response.data); // Set the fetched services data
      } catch (error) {
        console.error(error); // Log any errors
      }
    };
    fetchServices(); // Fetch services when component mounts
  }, []);

  const handleOpenModal = () => {
    setOpenModal(true); // Open the modal
  };

  const handleCloseModal = () => {
    setEditService(null); // Clear the edit service state
    setOpenModal(false); // Close the modal
    formik.resetForm(); // Reset form state
  };

  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
    price: yup
      .number()
      .required("Price is required")
      .min(1, "Price must be greater than zero"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: 0,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (editService) {
        await handleUpdateService(values);
      } else {
        await handleCreateService(values);
      }
    },
  });

  const handleCreateService = async (values) => {
    try {
      await axios.post("/api/services", values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token for authorization
        },
      });
      setOpenModal(false); // Close the modal
      formik.resetForm(); // Reset form state
      // Refetch services to update the list
      const response = await axios.get("/api/services", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token for authorization
        },
      });
      setServices(response.data); // Update the services state
      toast.success("Service Created..."); // Show success message
    } catch (error) {
      console.error(error); // Log any errors
    }
  };

  const handleEditService = (service) => {
    setEditService(service); // Set the service to be edited
    formik.setValues({
      name: service.name,
      description: service.description,
      price: service.price,
    }); // Populate the form with the service data
    handleOpenModal(); // Open the modal
  };

  const handleUpdateService = async (values) => {
    try {
      await axios.put(`/api/services/${editService._id}`, values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token for authorization
        },
      });
      setOpenModal(false); // Close the modal
      setEditService(null); // Clear the edit service state
      formik.resetForm(); // Reset form state
      // Refetch services to update the list
      const response = await axios.get("/api/services", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token for authorization
        },
      });
      setServices(response.data); // Update the services state
      toast.success("Service Updated..."); // Show success message
    } catch (error) {
      console.error(error); // Log any errors
    }
  };

  const handleDeleteService = async (serviceId) => {
    try {
      await axios.delete(`/api/services/${serviceId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token for authorization
        },
      });
      // Refetch services to update the list
      const response = await axios.get("/api/services", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token for authorization
        },
      });
      setServices(response.data); // Update the services state
      toast.success("Service Deleted..."); // Show success message
    } catch (error) {
      console.error(error); // Log any errors
    }
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: "6rem" }}>
      <Typography
        variant="h2"
        gutterBottom
        style={{ color: theme.palette.text.primary }}
      >
        Services of Owner
      </Typography>
      {services.length === 0 ? (
        <Typography
          variant="h4"
          style={{ marginTop: "2rem", color: theme.palette.text.primary }}
        >
          No services created!
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {services.map((service) => (
            <Grid item xs={12} sm={6} md={4} key={service._id}>
              <Card
                style={{
                  backgroundColor: theme.palette.ternary.main,
                  color: theme.palette.text.secondary,
                }}
              >
                <CardContent>
                  <Typography variant="h4" gutterBottom>
                    Service: {service.name}
                  </Typography>
                  <Typography variant="body1">
                    Description: {service.description}
                  </Typography>
                  <Typography variant="h5" style={{ marginTop: "1rem" }}>
                    ₹{service.price}
                  </Typography>
                </CardContent>
                <CardActions style={{ display: "flex", justifyContent: "flex-end" }}>
                  <IconButton
                    color="warning"
                    onClick={() => handleEditService(service)}
                    style={{ margin: "0.5rem" }}
                  >
                    <EditOutlinedIcon fontSize="large" color="warning" />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteService(service._id)}
                    style={{ margin: "0.5rem" }}
                  >
                    <DeleteForeverOutlinedIcon fontSize="large" color="error" />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <Fab
        color="info"
        aria-label="add"
        onClick={() => {
          setEditService(null);
          handleOpenModal();
        }}
        style={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
        }}
      >
        <AddIcon />
      </Fab>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
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
            id="modal-modal-title"
            variant="h4"
            style={{ color: theme.palette.text.secondary }}
            gutterBottom
          >
            {editService ? "Edit Service" : "Create New Service"}
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              label="Name"
              variant="outlined"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              style={{
                marginBottom: "1rem",
                color: theme.palette.text.secondary,
              }}
              InputProps={{ style: { color: theme.palette.text.secondary } }}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              required
            />
            <TextField
              label="Description"
              variant="outlined"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              style={{
                marginBottom: "1rem",
                color: theme.palette.text.secondary,
              }}
              InputProps={{ style: { color: theme.palette.text.secondary } }}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
              required
            />
            <TextField
              label="Price"
              variant="outlined"
              type="number"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              style={{
                marginBottom: "1rem",
                color: theme.palette.text.secondary,
              }}
              InputProps={{ style: { color: theme.palette.text.secondary } }}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
              required
            />
            <Box style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                color="secondary"
                type="submit"
              >
                {editService ? "Update" : "Create"}
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </Container>
  );
};

export default OwnerServicePage;
