import React, { useState, useEffect, useCallback } from 'react';
import { db } from './firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useUserAuth } from './UserAuthContext';
import './AccountantDashboard.css';

const AccountantDashboard = () => {
  const { user, role } = useUserAuth();
  const [clients, setClients] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [view, setView] = useState('clients'); // 'clients', 'feedback', 'transactions'
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const loadClients = useCallback(async () => {
    setLoading(true);
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('assignedAccountant', '==', user.uid));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const clientData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setClients(clientData);
      } else {
        setClients([]);
      }
    } catch (err) {
      console.error('Error fetching clients:', err);
      setError('Error loading clients');
    }
    setLoading(false);
  }, [user]);

  const loadFeedbacks = useCallback(async () => {
    setLoading(true);
    try {
      const feedbackRef = collection(db, 'feedback');
      const q = query(feedbackRef, where('accountantId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const feedbackData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFeedbacks(feedbackData);
      } else {
        setFeedbacks([]);
      }
    } catch (err) {
      console.error('Error fetching feedbacks:', err);
      setError('Error loading feedbacks');
    }
    setLoading(false);
  }, [user]);

  const loadTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const transactionsRef = collection(db, 'transactions');
      const q = query(transactionsRef, where('accountantId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const transactionData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTransactions(transactionData);
      } else {
        setTransactions([]);
      }
    } catch (err) {
      console.error('Error fetching transactions:', err);
      setError('Error loading transactions');
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    if (role === 'accountant' && user) {
      if (view === 'clients') {
        loadClients();
      } else if (view === 'feedback') {
        loadFeedbacks();
      } else if (view === 'transactions') {
        loadTransactions();
      }
    } else {
      setError('Access denied: Only accountants can view this page.');
    }
  }, [user, role, view, loadClients, loadFeedbacks, loadTransactions]);

  return (
    <div className="dashboard-container">
      <h1>Accountant Dashboard</h1>
      {error && <p className="error-message">{error}</p>}
      {loading && <p>Loading...</p>}

      {!error && !loading && (
        <>
          <div className="nav-options">
            <button onClick={() => setView('clients')}>View Clients</button>
            <button onClick={() => setView('feedback')}>View Feedback</button>
            <button onClick={() => setView('transactions')}>View Transactions</button>
          </div>

          {view === 'clients' && (
            <div className="client-list">
              <h2>Registered Users (Assigned Clients)</h2>
              {clients.length > 0 ? (
                clients.map(client => (
                  <div key={client.id} className="client-item">
                    <h3>{client.name}</h3>
                    <p>Email: {client.email}</p>
                    <p>Assigned Accountant: {client.assignedAccountant}</p>
                  </div>
                ))
              ) : (
                <p>No clients assigned to you.</p>
              )}
            </div>
          )}

          {view === 'feedback' && (
            <div className="feedback-list">
              <h2>Feedback</h2>
              {feedbacks.length > 0 ? (
                feedbacks.map(feedback => (
                  <div key={feedback.id} className="feedback-item">
                    <p>Message: {feedback.message}</p>
                    <p>From: {feedback.clientName || 'Anonymous'}</p>
                  </div>
                ))
              ) : (
                <p>No feedback available.</p>
              )}
            </div>
          )}

          {view === 'transactions' && (
            <div className="transactions-list">
              <h2>Transactions</h2>
              {transactions.length > 0 ? (
                transactions.map(transaction => (
                  <div key={transaction.id} className="transaction-item">
                    <p>Amount: ${transaction.amount}</p>
                    <p>Description: {transaction.description}</p>
                    <p>Date: {new Date(transaction.date).toLocaleDateString()}</p>
                  </div>
                ))
              ) : (
                <p>No transactions available.</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AccountantDashboard;
