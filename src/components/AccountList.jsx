import React, { useState } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Typography,
  IconButton 
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TransactionHistory from './TransactionHistory';

const AccountList = ({ accounts }) => {
  const [selectedAccount, setSelectedAccount] = useState(null);

  const handleShowTransactions = (accountNumber) => {
    setSelectedAccount(selectedAccount === accountNumber ? null : accountNumber);
  };

  return (
    <div style={{ margin: '20px 0' }}>
      <Typography variant="h6" gutterBottom>
        Liste des Comptes
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Numéro de compte</TableCell>
              <TableCell align="right">Solde</TableCell>
              <TableCell>Statut</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.map((account) => (
              <React.Fragment key={account.id}>
                <TableRow>
                  <TableCell>{account.numeroCompte}</TableCell>
                  <TableCell align="right">{account.solde.toFixed(2)} €</TableCell>
                  <TableCell>{account.active ? 'Actif' : 'Inactif'}</TableCell>
                  <TableCell>
                    <IconButton 
                      onClick={() => handleShowTransactions(account.numeroCompte)}
                      color={selectedAccount === account.numeroCompte ? 'primary' : 'default'}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
                {selectedAccount === account.numeroCompte && (
                  <TableRow>
                    <TableCell colSpan={4} style={{ paddingTop: 0, paddingBottom: 0 }}>
                      <TransactionHistory accountNumber={selectedAccount} />
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AccountList;