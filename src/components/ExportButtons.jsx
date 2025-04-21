import React from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { exportToPdf, exportToCsv } from '../services/api';

const ExportButtons = ({ accountNumber }) => {
  const handleExport = async (type) => {
    try {
      let blob;
      let filename = `transactions_${accountNumber}.${type}`;
      
      if (type === 'pdf') {
        blob = await exportToPdf(accountNumber);
      } else {
        blob = await exportToCsv(accountNumber);
      }
      
      // Créer un lien temporaire pour le téléchargement
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error(`Erreur lors de l'export ${type}`, error);
    }
  };

  return (
    <ButtonGroup variant="contained" sx={{ mt: 2, mb: 3 }}>
      <Button onClick={() => handleExport('pdf')}>Export PDF</Button>
      <Button onClick={() => handleExport('csv')}>Export CSV</Button>
    </ButtonGroup>
  );
};

export default ExportButtons;