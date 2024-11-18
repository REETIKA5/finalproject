import React from 'react';
import facebookIcon from "C:\\Final\\finalproject\\src\\Images\\3670124.png";
import instagramIcon from "C:\\Final\\finalproject\\src\\Images\\15713420.png";
import twitterIcon from "C:\\Final\\finalproject\\src\\Images\\icon3.png";
import linkedinIcon from "C:\\Final\\finalproject\\src\\Images\\2504923.png";

function Footer() {
  return (
    <footer className="text-center" style={{ backgroundColor: '#333', color: 'white', padding: '20px 0' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <p>&copy; 2024 MoneyTrail</p>
        <div style={{ marginBottom: '10px' }}>
          <a href="/privacy" style={{ color: 'orange', marginRight: '15px' }}>Privacy Policy</a>
          <a href="/terms" style={{ color: 'orange', marginRight: '15px' }}>Terms of Service</a>
          <a href="/contact" style={{ color: 'orange' }}>Contact Us</a>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <p>Contact: support@moneytrail.com | Phone: (123) 456-7890</p>
        </div>
        <div style={{ display: 'flex', gap: '40px', marginTop: '10px' }}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <img src={facebookIcon} alt="Facebook" style={{ backgroundColor:'Transparent',width: '50px', height: '50px' }} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <img src={twitterIcon} alt="Twitter" style={{ width: '50px', height: '50px' }} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <img src={instagramIcon} alt="Instagram" style={{ width: '50px', height: '50px' }} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <img src={linkedinIcon} alt="LinkedIn" style={{ width: '46px', height: '47px' }} />
          </a>
        </div>
        <p style={{ fontSize: '0.9rem', marginTop: '20px' }}>
          Designed by MoneyTrail | Your trusted partner in budgeting and financial planning.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
