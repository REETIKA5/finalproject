import React, { useState, useEffect, useCallback } from 'react';
import { db, auth } from './firebase';  // Import Firebase auth and db configuration
import { collection, query, where, getDocs } from 'firebase/firestore';  // Import Firestore functions


const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState('day');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const fetchTransactions = useCallback(async () => {
    const user = auth.currentUser;
    if (!user) {
      alert('Please log in first.');
      return;
    }

    const userId = user.uid;
    const transactionsRef = collection(db, 'transactions');
    const q = query(transactionsRef, where('userId', '==', userId));

    try {
      const querySnapshot = await getDocs(q);
      const allTransactions = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      let filteredTransactions = [];
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (startDate && endDate) {
        // Filter transactions based on date range
        filteredTransactions = allTransactions.filter(transaction => {
          const transactionDate = new Date(transaction.date.seconds * 1000); // Handle Firestore timestamp
          return transactionDate >= start && transactionDate <= end;
        });
      } else {
        // Default filtering based on period
        const today = new Date();
        switch (filter) {
          case 'day':
            filteredTransactions = allTransactions.filter(transaction =>
              new Date(transaction.date.seconds * 1000).toDateString() === today.toDateString()
            );
            break;
          case 'week':
            const lastWeek = new Date();
            lastWeek.setDate(lastWeek.getDate() - 7);
            filteredTransactions = allTransactions.filter(transaction =>
              new Date(transaction.date.seconds * 1000) >= lastWeek
            );
            break;
          case 'month':
            filteredTransactions = allTransactions.filter(transaction =>
              new Date(transaction.date.seconds * 1000).getMonth() === today.getMonth()
            );
            break;
          case 'year':
            filteredTransactions = allTransactions.filter(transaction =>
              new Date(transaction.date.seconds * 1000).getFullYear() === today.getFullYear()
            );
            break;
          default:
            filteredTransactions = allTransactions;
        }
      }

      setTransactions(filteredTransactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  }, [filter, startDate, endDate]);  // Memoize the function with dependencies

  useEffect(() => {
    // Fetch transactions when the filter or date range changes
    fetchTransactions();
  }, [fetchTransactions]);  // Use memoized function as dependency

  return (
    <div className="transaction-history">
      <h2>Transaction History</h2>
      <div className="filter-options">
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>

        <label>
          Filter:
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="day">Today</option>
            <option value="week">Last 7 Days</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </label>
      </div>

      <div className="transactions-list">
        {transactions.length === 0 ? (
          <p>No transactions found for this period.</p>
        ) : (
          <ul>
            {transactions.map((transaction) => (
              <li key={transaction.id}>
                <span>{new Date(transaction.date.seconds * 1000).toLocaleDateString()}</span>
                <span>{transaction.category}</span>
                <span>${transaction.amount}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
