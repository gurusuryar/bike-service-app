import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const OwnerDashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    price: 0,
  });
  const [editService, setEditService] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('/api/services', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setServices(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchServices();
  }, []);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setEditService(null);
    setOpenModal(false);
  };

  const handleCreateService = async () => {
    try {
      await axios.post(
        '/api/services',
        newService,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setOpenModal(false);
      setNewService({ name: '', description: '', price: 0 });
      // Refetch services to update the list
      const response = await axios.get('/api/services', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setServices(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditService = (service) => {
    setEditService(service);
    setNewService({ name: service.name, description: service.description, price: service.price });
    handleOpenModal();
  };

  const handleUpdateService = async () => {
    try {
      await axios.put(
        `/api/services/${editService._id}`,
        newService,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setOpenModal(false);
      setEditService(null);
      setNewService({ name: '', description: '', price: 0 });
      // Refetch services to update the list
      const response = await axios.get('/api/services', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setServices(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteService = async (serviceId) => {
    try {
      await axios.delete(`/api/services/${serviceId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      // Refetch services to update the list
      const response = await axios.get('/api/services', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setServices(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: '6rem' }}>
      <Typography variant="h2" gutterBottom style={{ color: theme.palette.text.primary }}>
        Owner Dashboard
      </Typography>
      <Grid container spacing={2}>
        {services.map((service) => (
          <Grid item xs={12} sm={6} md={4} key={service._id}>
            <Card style={{ backgroundColor: theme.palette.ternary.main, color: theme.palette.text.secondary }}>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  {service.name}
                </Typography>
                <Typography variant="body1">{service.description}</Typography>
                <Typography variant="h5" style={{ marginTop: '1rem' }}>
                  ${service.price}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleEditService(service)}
                  style={{ marginRight: '0.5rem' }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDeleteService(service._id)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Fab
        color="secondary"
        aria-label="add"
        onClick={() => {
          setEditService(null);
          handleOpenModal();
        }}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.text.primary,
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
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h4" style={{ color: theme.palette.text.secondary }} gutterBottom>
            {editService ? 'Edit Service' : 'Create New Service'}
          </Typography>
          <TextField
            label="Name"
            variant="outlined"
            value={newService.name}
            onChange={(e) => setNewService({ ...newService, name: e.target.value })}
            fullWidth
            style={{ marginBottom: '1rem', color: theme.palette.text.secondary }}
            InputProps={{ style: { color: theme.palette.text.secondary } }}
          />
          <TextField
            label="Description"
            variant="outlined"
            value={newService.description}
            onChange={(e) => setNewService({ ...newService, description: e.target.value })}
            fullWidth
            style={{ marginBottom: '1rem', color: theme.palette.text.secondary }}
            InputProps={{ style: { color: theme.palette.text.secondary } }}
          />
          <TextField
            label="Price"
            variant="outlined"
            type="number"
            value={newService.price}
            onChange={(e) => setNewService({ ...newService, price: parseFloat(e.target.value) })}
            fullWidth
            style={{ marginBottom: '1rem', color: theme.palette.text.secondary }}
            InputProps={{ style: { color: theme.palette.text.secondary } }}
          />
          <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" color="secondary" onClick={editService ? handleUpdateService : handleCreateService}>
              {editService ? 'Update' : 'Create'}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default OwnerDashboard;
