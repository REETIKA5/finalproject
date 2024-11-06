import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'; // Import Link for navigation

function TextExample() {
  const [isHovered, setIsHovered] = useState(false); // State to manage hover

  return (
    <Card
      style={{
        width: '28rem',
        backgroundColor: "#ABE3FC",
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        boxShadow: isHovered ? '0 4px 15px rgba(0, 0, 0, 0.2)' : 'none',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card.Body>
        <Card.Title>Become a Better Budgeter</Card.Title>
        <Card.Text>
          Meet Maya. As a young professional balancing her career and personal life, Maya has many financial goals. With MoneyTrail, she's able to manage her spending, save for her dreams, and live without the stress of unexpected expenses. Maya uses the app to track every dollar, make conscious spending choices, and achieve her financial aspirations with confidence.
          This is her story.
          Sign up to start your story.
        </Card.Text>
        <Link to="/signup">
          <Button variant="warning" className="mt-3">
            Get Started Free
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default TextExample;
