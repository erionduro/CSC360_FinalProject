import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import IncidentTimeline from '../components/IncidentTimeline.js';

const IncidentDetailPage = () => {
  const {Id} = useParams(); // Extract the incident ID from the URL parameters
  const [incident, setIncident] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState('');

  const fetchIncident = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5123/incidents/`);
      if (!response.ok) {
        throw new Error('Failed to fetch!');
      }
      const data = await response.json()
      const incident= data[Id-1];
      setIncident(incident);
      setDescription(incident.documentation.description);
      setNotes(incident.documentation.notes);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching incident: ', error.message);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncident();
  }, [Id]);

  const handleSave = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5123/incidents/${Id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...incident,
          documentation: {
            description,
            notes,
          },
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to save!');
      }
      const updatedIncident = await response.json();
      setIncident(updatedIncident);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving incident: ', error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!incident) {
    return <div>Incident not found</div>;
  }

  return (
    <Container>
      <Row>
        <Link to="/dashboard"><Button variant="secondary">Back to Dashboard</Button></Link>
      </Row>
      <Row>
        <h2 className="my-4">Incident Details</h2>
      </Row>
      
      <div>
        <Row>
          <Col>
            <h3>Header</h3>
            {incident.header && (
              <>
                <p>ID: {incident.header.headerId}</p>
                <p>Title: {incident.header.title}</p>
                <p>Type: {incident.header.type}</p>
                <p>Impact: {incident.header.impact}</p>
                <p>Urgency: {incident.header.urgency}</p>
                <p>Priority: {incident.header.priority}</p>
                <p>Status: {incident.header.status}</p>
                <p>Created: {new Date(incident.header.createdTimestamp * 1000).toLocaleString()}</p>
              </>
            )}
          </Col>
          <Col>
            <h3>RACI</h3>
            {incident.raci && (
              <>
                <p>Responsible Parties: {incident.raci.responsibleParties.join(', ')}</p>
                <p>Accountable Parties: {incident.raci.accountableParties.join(', ')}</p>
                <p>Consulted Parties: {incident.raci.consultedParties.join(', ')}</p>
                <p>Informed Parties: {incident.raci.informedParties.join(', ')}</p>
              </>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>Timeline</h3>
            {incident.timeline && <IncidentTimeline incident={incident} setIncident={setIncident} />}
          </Col>
          <Col>
            <h3>Documentation</h3>
            <Form>
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={description}
                  readOnly={!isEditing}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="notes">
                <Form.Label>Notes</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={notes}
                  readOnly={!isEditing}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Cancel' : 'Edit'}
        </Button>
        {isEditing && <Button onClick={handleSave}>Save</Button>}
      </div>
    </Container>
  );
};

export default IncidentDetailPage;