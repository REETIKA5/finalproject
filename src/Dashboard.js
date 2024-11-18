import React, { useState } from 'react';
import { useUserAuth } from './UserAuthContext';
import { db } from './firebase';
import { addDoc, collection } from 'firebase/firestore';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useUserAuth();

  // State for earnings, expenses, totals, and date range
  const [earnings, setEarnings] = useState({
    salary: 0,
    freelance: 0,
    investments: 0,
    business: 0,
    rental: 0,
  });

  const [expenses, setExpenses] = useState({
    groceries: 0,
    rent: 0,
    utilities: 0,
    entertainment: 0,
    travel: 0,
  });

  const [totalEarnings, setTotalEarnings] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Handlers for updating earnings and expenses
  const handleInputChange = (e, type) => {
    const { name, value } = e.target;
    const parsedValue = parseFloat(value) || 0;
    const updatedValues = type === 'earnings'
      ? { ...earnings, [name]: parsedValue }
      : { ...expenses, [name]: parsedValue };

    type === 'earnings' ? setEarnings(updatedValues) : setExpenses(updatedValues);

    // Update totals dynamically
    const updatedTotal = Object.values(updatedValues).reduce((a, b) => a + b, 0);
    type === 'earnings' ? setTotalEarnings(updatedTotal) : setTotalExpenses(updatedTotal);
  };

  // Reset input fields on focus/blur
  const handleFocus = (e) => {
    if (e.target.value === '0') e.target.value = '';
  };
  const handleBlur = (e) => {
    if (e.target.value === '') e.target.value = '0';
  };

  // Save transaction to Firestore
  const handleSaveTransaction = async () => {
    if (!user) {
      alert('You must be logged in to save a transaction.');
      return;
    }

    if (!startDate || !endDate || new Date(startDate) > new Date(endDate)) {
      alert('Please select a valid date range.');
      return;
    }

    const transactionData = {
      earnings,
      expenses,
      userId: user.uid,
      startDate,
      endDate,
      netBalance: totalEarnings - totalExpenses,
      timestamp: new Date(),
    };

    try {
      const docRef = await addDoc(
        collection(db, 'transactions', user.uid, 'userTransactions'),
        transactionData
      );
      console.log('Transaction saved with ID:', docRef.id);
      alert('Transaction saved successfully!');
    } catch (error) {
      console.error('Error saving transaction:', error.message);
      alert('Failed to save transaction. Please try again.');
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>

      {/* Date range selection */}
      <div className="date-range">
        <label>Start Date:</label>
        <input 
          type="date" 
          value={startDate} 
          onChange={(e) => setStartDate(e.target.value)} 
        />
        <label>End Date:</label>
        <input 
          type="date" 
          value={endDate} 
          onChange={(e) => setEndDate(e.target.value)} 
        />
      </div>

      {/* Transaction input sections */}
      <div className="transaction-inputs">
        {/* Earnings Section */}
        <div className="earnings-section">
          <h2>Earnings</h2>
          {Object.keys(earnings).map((category) => (
            <div key={category} className="input-group">
              <label>{category.charAt(0).toUpperCase() + category.slice(1)}</label>
              <input
                type="number"
                name={category}
                value={earnings[category]}
                onChange={(e) => handleInputChange(e, 'earnings')}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
          ))}
          <div className="total-earnings">
            <strong>Total Earnings: ${totalEarnings.toFixed(2)}</strong>
          </div>
        </div>

        {/* Expenses Section */}
        <div className="expenses-section">
          <h2>Expenses</h2>
          {Object.keys(expenses).map((category) => (
            <div key={category} className="input-group">
              <label>{category.charAt(0).toUpperCase() + category.slice(1)}</label>
              <input
                type="number"
                name={category}
                value={expenses[category]}
                onChange={(e) => handleInputChange(e, 'expenses')}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
          ))}
          <div className="total-expenses">
            <strong>Total Expenses: ${totalExpenses.toFixed(2)}</strong>
          </div>
        </div>
      </div>

      {/* Net Balance */}
      <div className="net-balance">
        <strong>Net Balance: ${totalEarnings - totalExpenses}</strong>
      </div>

      {/* Save Transaction Button */}
      <button onClick={handleSaveTransaction} className="save-transaction-btn">
        Save Transaction
      </button>
    </div>
  );
};

export default Dashboard;
