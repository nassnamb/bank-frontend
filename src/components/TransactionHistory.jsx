import React, { useState, useEffect } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Typography, 
  Select, MenuItem, FormControl, InputLabel 
} from '@mui/material';
import ExportButtons from './ExportButtons';
import { getTransactionHistory } from '../services/api';

const TransactionHistory = ({ accountNumber }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (accountNumber) {
      fetchTransactions();
    }
  }, [accountNumber]);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const data = await getTransactionHistory(accountNumber);
      setTransactions(data);
    } catch (error) {
      console.error("Erreur", error);
    } finally {
      setLoading(false);
    }
  };

  const getTransactionType = (type) => {
    switch(type) {
      case 'CREDIT': return 'Crédit';
      case 'DEBIT': return 'Débit';
      case 'TRANSFERT': return 'Transfert';
      default: return type;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div style={{ marginTop: '20px' }}>
      
      <Typography variant="h6" gutterBottom>
        Historique des transactions
      </Typography>
      <ExportButtons accountNumber={accountNumber} />
      {loading ? (
        <Typography>Chargement...</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Montant</TableCell>
                <TableCell>Compte source</TableCell>
                <TableCell>Compte destination</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell>{formatDate(tx.dateOperation)}</TableCell>
                  <TableCell>{getTransactionType(tx.typeOperation)}</TableCell>
                  <TableCell>{tx.montant.toFixed(2)} €</TableCell>
                  <TableCell>{tx.compteSource || '-'}</TableCell>
                  <TableCell>{tx.compteDestination || '-'}</TableCell>
                  <TableCell>{tx.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default TransactionHistory;