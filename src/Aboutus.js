import React from 'react';

function Aboutus() {
    return (
        <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto', fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4' }}>
            <h1 style={{ fontSize: '3rem', textAlign: 'center', color: '#4A90E2', marginBottom: '20px' }}>About Us</h1>
            
            <section style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '2rem', color: '#333' }}>Our Mission</h2>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#666' }}>
                    Our mission is to empower users to take control of their finances and make informed decisions 
                    about their spending. We provide tools and insights to help manage budgets, set financial goals, 
                    and track expenses efficiently.
                </p>
            </section>

            <section>
                <h2 style={{ fontSize: '2rem', color: '#333' }}>Our Values</h2>
                <ul style={{ fontSize: '1.1rem', color: '#666', lineHeight: '1.6' }}>
                    <li>Transparency: We believe in clear and honest communication.</li>
                    <li>Empowerment: We strive to give our users the tools they need to succeed.</li>
                    <li>Innovation: We're always looking for ways to improve and innovate.</li>
                    <li>Customer Focus: Our users are our priority.</li>
                </ul>
            </section>
        </div>
    );
}

export default Aboutus;
