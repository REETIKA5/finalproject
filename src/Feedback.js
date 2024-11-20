import React, { useState } from 'react';
import './Feedback.css';
import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Feedback = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name && email && feedback && role) {
      try {
        await addDoc(collection(db, 'feedback'), {
          name,
          email,
          feedback,
          role,
          timestamp: serverTimestamp(),
        });
        setMessage('Thank you for your feedback!');
        setName('');
        setEmail('');
        setFeedback('');
        setRole('');
      } catch (error) {
        setMessage('There was an error submitting your feedback. Please try again.');
      }
    } else {
      setMessage('Please fill in all fields.');
    }
  };

  return (
    <div className="feedback-page">
      <div className="feedback-container">
        <h2>We value your feedback</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="feedback">Your Feedback</label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="input-group">
            <label htmlFor="role">Select Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="accountant">Accountant</option>
            </select>
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
        {message && <p className="feedback-message">{message}</p>}
      </div>
    </div>
  );
};

export default Feedback;
