import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from './UserAuthContext';
import { db } from './firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import './Admin.css'; 
const Admin = () => {
  const { user, logOut } = useUserAuth();
  const [users, setUsers] = useState([]);
  const [accountants, setAccountants] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filteredAccountants, setFilteredAccountants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  
  useEffect(() => {
    if (!user || user.email !== 'admin@gmail.com') {
      setErrorMessage('Access Denied: You are not authorized to view this page.');
      navigate('/'); 
    } else {
      fetchUsers(); 
    }
  }, [user, navigate]);

  
  const fetchUsers = async () => {
    try {
      const usersCollection = collection(db, 'users');
      const userSnapshot = await getDocs(usersCollection);
      const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      const registeredUsers = userList.filter(user => user.role !== 'accountant');
      const registeredAccountants = userList.filter(user => user.role === 'accountant');

      setUsers(registeredUsers);
      setAccountants(registeredAccountants);
      setFilteredUsers(registeredUsers); 
      setFilteredAccountants(registeredAccountants);
    } catch (error) {
      setErrorMessage('Failed to fetch users.');
    }
  };

  
  const handleSearch = (query) => {
    setSearchQuery(query);
    const lowercasedQuery = query.toLowerCase();

    
    const filteredUsersList = users.filter(user =>
      user.email.toLowerCase().includes(lowercasedQuery) ||
      user.id.toLowerCase().includes(lowercasedQuery)
    );

   
    const filteredAccountantsList = accountants.filter(accountant =>
      accountant.email.toLowerCase().includes(lowercasedQuery) ||
      accountant.id.toLowerCase().includes(lowercasedQuery)
    );

    setFilteredUsers(filteredUsersList);
    setFilteredAccountants(filteredAccountantsList);
  };

  
  const toggleUserStatus = async (userId, currentStatus) => {
    try {
      const userDoc = doc(db, 'users', userId);
      await updateDoc(userDoc, {
        status: currentStatus === 'enabled' ? 'disabled' : 'enabled',
      });
      fetchUsers(); 
    } catch (error) {
      setErrorMessage('Failed to update user status.');
    }
  };

  return (
    <div className="admin-container">
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <h1 className="admin-header">Welcome to Admin Dashboard</h1>

      {/* Search bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search Email"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)} // Update search query on change
          className="search-input"
        />
        <button className="search-button">Search</button>
      </div>

      {/* Registered Users Section */}
      <section className="user-section">
        <h2>Registered Users</h2>
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.role || 'user'}</td>
                  <td>{user.status || 'enabled'}</td>
                  <td>
                    <button
                      className="enable-disable"
                      onClick={() => toggleUserStatus(user.id, user.status)}
                    >
                      {user.status === 'enabled' ? 'Disable' : 'Enable'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Registered Accountants Section */}
      <section className="accountant-section">
        <h2>Registered Accountants</h2>
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAccountants.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.role || 'accountant'}</td>
                  <td>{user.status || 'enabled'}</td>
                  <td>
                    <button
                      className="enable-disable"
                      onClick={() => toggleUserStatus(user.id, user.status)}
                    >
                      {user.status === 'enabled' ? 'Disable' : 'Enable'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Log Out Button */}
      <button className="logout-button" onClick={() => { logOut(); navigate('/Homepage'); }}>Log Out</button>
    </div>
  );
};

export default Admin;
