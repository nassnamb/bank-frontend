import React, { useState } from 'react';
import { Button, TextField, Grid, Box, MenuItem, Typography } from '@mui/material';
import { transferMoney } from '../services/api';

const TransferForm = ({ onTransfer, showNotification }) => {
  const [formData, setFormData] = useState({
    source: '',
    destination: '',
    amount: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await transferMoney(formData.source, formData.destination, parseFloat(formData.amount));
      showNotification('Transfert effectué avec succès!', 'success');
      onTransfer();
      setFormData({ source: '', destination: '', amount: '' });
    } catch (error) {
      showNotification(error.response?.data?.message || 'Erreur lors du transfert', 'error');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Effectuer un transfert
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Compte source"
            name="source"
            value={formData.source}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Compte destination"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Montant (€)"
            name="amount"
            type="number"
            inputProps={{ step: "0.01", min: "0.01" }}
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Effectuer le transfert
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TransferForm;