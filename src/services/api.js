import axios from 'axios';

const API_URL = 'http://localhost:8080/api/bank';

export const getAccounts = async () => {
  try {
    // En production, remplacer par un vrai endpoint
    const response = await axios.get(`${API_URL}/accounts`);
    console.log('response data: '+response.data)
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des comptes", error);
    throw error;
  }
};

export const transferMoney = async (source, destination, montant) => {
  try {
    const response = await axios.post(`${API_URL}/transfer`, null, {
      params: { source, destination, montant }
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors du transfert", error);
    throw error;
  }
};

export const getTransactionHistory = async (accountNumber) => {
  try {
    const response = await axios.get(`${API_URL}/transactions/${accountNumber}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'historique", error);
    throw error;
  }
};

export const exportToPdf = async (accountNumber) => {
  try {
    const response = await axios.get(`${API_URL}/export/pdf/${accountNumber}`, {
      responseType: 'blob'
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'export PDF", error);
    throw error;
  }
};

export const exportToCsv = async (accountNumber) => {
  try {
    const response = await axios.get(`${API_URL}/export/csv/${accountNumber}`, {
      responseType: 'blob'
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'export CSV", error);
    throw error;
  }
};