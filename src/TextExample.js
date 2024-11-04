import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function TextExample() {
  return (
    <Card style={{ width: '28rem', backgroundColor:"#ABE3FC"}}>
      <Card.Body>
        <Card.Title>Become a Better Budgeter</Card.Title>
        
        <Card.Text>
        Meet Maya. As a young professional balancing her career and personal life, Maya has many financial goals. With Money Trial, she's able to manage her spending, save for her dreams, and live without the stress of unexpected expenses. Maya uses the app to track every dollar, make conscious spending choices, and achieve her financial aspirations with confidence.
        This is her story.
        Sign up to start your story.
        </Card.Text>
        <Button variant="warning" href="#" className="mt-3">
          Get Started Free
        </Button>
      </Card.Body>
    </Card>
  );
}

export default TextExample;
