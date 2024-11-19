
import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
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

  const handleEarningsChange = (e) => {
    const { name, value } = e.target;
    setEarnings({ ...earnings, [name]: parseFloat(value) });
    setTotalEarnings(
      Object.values({ ...earnings, [name]: parseFloat(value) }).reduce(
        (a, b) => a + b,
        0
      )
    );
  };

  const handleExpensesChange = (e) => {
    const { name, value } = e.target;
    setExpenses({ ...expenses, [name]: parseFloat(value) });
    setTotalExpenses(
      Object.values({ ...expenses, [name]: parseFloat(value) }).reduce(
        (a, b) => a + b,
        0
      )
    );
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="container">
        <div className="earnings-container">
          <h2>Earnings</h2>
          {Object.keys(earnings).map((category) => (
            <div key={category} className="input-group">
              <label>{category.charAt(0).toUpperCase() + category.slice(1)}</label>
              <input
                type="number"
                name={category}
                value={earnings[category]}
                onChange={handleEarningsChange}
              />
            </div>
          ))}
          <div className="total">
            <strong>Total Earnings: ${totalEarnings}</strong>
          </div>
        </div>

        <div className="expenses-container">
          <h2>Expenses</h2>
          {Object.keys(expenses).map((category) => (
            <div key={category} className="input-group">
              <label>{category.charAt(0).toUpperCase() + category.slice(1)}</label>
              <input
                type="number"
                name={category}
                value={expenses[category]}
                onChange={handleExpensesChange}
              />
            </div>
          ))}
          <div className="total">
            <strong>Total Expenses: ${totalExpenses}</strong>
          </div>
        </div>
      </div>
      <div className="summary">
        <strong>Net Balance: ${totalEarnings - totalExpenses}</strong>
      </div>
    </div>
  );
};

export default Dashboard;
