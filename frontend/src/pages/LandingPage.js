import React from 'react';
import { Card, Container, Button } from 'react-bootstrap';

function LandingPage() {
  return (
    <div
      style={{
        backgroundImage: `url('https://files.oaiusercontent.com/file-xAM4L23RaRCU9OqJeMl80tBn?se=2024-06-12T03%3A23%3A45Z&sp=r&sv=2023-11-03&sr=b&rscc=max-age%3D31536000%2C%20immutable&rscd=attachment%3B%20filename%3Da204beea-e042-411c-9f75-82c534c92653.webp&sig=fG8WsxG783fDU6YjpOyNkx75BMwtMKs6sDuoo4zv0dw%3D')`, // Replace with your background image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Card>
        <Card.Body opacity="0%">
          <Container className="text-center">
            <h1>Welcome to Erion's Incident Management System</h1>
            <Button variant="secondary" size="lg" href="/login">Login to continue</Button>
          </Container>
        </Card.Body>
      </Card> 
    </div>
  );
}

export default LandingPage;