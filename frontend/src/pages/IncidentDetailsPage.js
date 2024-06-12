import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import IncidentTimeline from '../components/IncidentTimeline.js';

const IncidentDetailPage = () => {
  const { id } = useParams(); // Extract the incident ID from the URL parameters
  const [apiIncidents, setApiIncidents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState('');

  const fetchIncidents = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5123/incidents');
      if (!response.ok) {
        throw new Error('Failed to fetch!');
      }
      const data = await response.json();
      setApiIncidents(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching incidents: ', error.message);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  useEffect(() => {
    if (apiIncidents) {
      const incident = apiIncidents.find(incident => incident.header.id === id);
      if (incident) {
        setDescription(incident.documentation.description);
        setNotes(incident.documentation.notes);
      }
    }
  }, [apiIncidents, id]);

  const handleSave = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5123/incidents/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...apiIncidents.find(incident => incident.header.id === id),
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
      setApiIncidents(apiIncidents.map(incident =>
        incident.header.id === id ? updatedIncident : incident
      ));
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving incident: ', error.message);
    }
  };

  const setIncident = (updatedIncident) => {
    setApiIncidents(apiIncidents.map(incident =>
      incident.header.id === id ? updatedIncident : incident
    ));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const incident = apiIncidents.find(incident => incident.header.id === id);

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
            <p>ID: {incident.header.id}</p>
            <p>Title: {incident.header.title}</p>
            <p>Type: {incident.header.type}</p>
            <p>Impact: {incident.header.impact}</p>
            <p>Urgency: {incident.header.urgency}</p>
            <p>Priority: {incident.header.priority}</p>
            <p>Status: {incident.header.status}</p>
            <p>Created: {new Date(incident.header.createdTimestamp * 1000).toLocaleString()}</p>
          </Col>
          <Col>
            <h3>RACI</h3>
            <p>Responsible Parties: {incident.raci.responsibleParties.join(', ')}</p>
            <p>Accountable Parties: {incident.raci.accountableParties.join(', ')}</p>
            <p>Consulted Parties: {incident.raci.consultedParties.join(', ')}</p>
            <p>Informed Parties: {incident.raci.informedParties.join(', ')}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>Timeline</h3>
            <IncidentTimeline incident={incident} setIncident={setIncident} />
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