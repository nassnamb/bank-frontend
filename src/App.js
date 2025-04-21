import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';
import { Container, Typography, CssBaseline } from '@mui/material';
import AccountList from './components/AccountList';
import TransferForm from './components/TransferForm';
import Notification from './components/Notification';
import { getAccounts } from './services/api';

function App() {
  const [accounts, setAccounts] = useState([]);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const data = await getAccounts();
      setAccounts(data);
    } catch (error) {
      showNotification('Erreur lors du chargement des comptes', 'error');
    }
  };

  const showNotification = (message, severity = 'info') => {
    setNotification({ open: true, message, severity });
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md">
        <Typography variant="h4" component="h1" gutterBottom>
          Gestion Bancaire
        </Typography>
        
        <AccountList accounts={accounts} />
        <TransferForm onTransfer={fetchAccounts} showNotification={showNotification} />
        
        <Notification 
          open={notification.open}
          message={notification.message}
          severity={notification.severity}
          onClose={handleCloseNotification}
        />
      </Container>
    </>
  );
}

export default App;