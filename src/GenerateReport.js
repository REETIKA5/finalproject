import React, { useState, useEffect, useCallback } from 'react';
import { db, auth } from './firebase';  // Import your firebase configuration
import { collection, query, where, getDocs } from 'firebase/firestore';

const GenerateReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [report, setReport] = useState(null);

  // Use useCallback to memoize the fetchReport function and avoid unnecessary re-renders
  const fetchReport = useCallback(async () => {
    const user = auth.currentUser; // Get the current logged-in user
    if (!user) {
      alert('Please log in first.');
      return;
    }

    const userId = user.uid; // User's unique ID from Firebase Authentication
    const transactionsRef = collection(db, 'transactions');
    const q = query(transactionsRef, where('userId', '==', userId)); // Query for user's transactions

    try {
      const querySnapshot = await getDocs(q);
      const transactions = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Convert the start and end dates to Date objects for comparison
      const start = new Date(startDate);
      const end = new Date(endDate);

      // Filter transactions based on the selected date range
      const filteredTransactions = transactions.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return transactionDate >= start && transactionDate <= end;
      });

      const totalAmount = filteredTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);

      setReport({
        filteredTransactions,
        totalAmount,
      });
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  }, [startDate, endDate]);  // Adding startDate and endDate to the dependencies ensures the function is recalculated only when needed

  useEffect(() => {
    if (startDate && endDate) {
      
    }
  }, [startDate, endDate]); // Include startDate and endDate as dependencies
  
  return (
    <div className="generate-report">
      <h2>Generate Report</h2>

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
        <button onClick={fetchReport}>Generate Report</button>
      </div>

      {report && (
        <div className="report">
          <h3>Report for the selected period:</h3>
          {report.filteredTransactions.length > 0 ? (
            <div>
              <ul>
                {report.filteredTransactions.map((transaction) => (
                  <li key={transaction.id}>
                    <span>{transaction.date}</span> -{' '}
                    <span>{transaction.category}</span>: <span>${transaction.amount}</span>
                  </li>
                ))}
              </ul>
              <h4>Total: ${report.totalAmount}</h4>
            </div>
          ) : (
            <p>No transactions found for this period.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default GenerateReport;
