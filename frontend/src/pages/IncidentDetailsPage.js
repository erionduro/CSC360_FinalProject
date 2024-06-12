import React from 'react';
import { useParams } from 'react-router-dom';
import incidents from '../Common.js'; // Assuming incidents data is imported from another file
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import IncidentTimeline from '../components/IncidentTimeline.js';

const IncidentDetailPage = () => {
  const { id } = useParams(); // Extract the incident ID from the URL parameters
  const incident = incidents.find(incident => incident.header.id === id); // Find the incident by ID

  return (
    <Container>
      <h2 className="my-4">Incident Details</h2>
      {incident && (
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
              <IncidentTimeline incident={incident} />
            </Col>
            <Col>
              <h3>Documentation</h3>
              <Form>
                <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows={3} value={incident.documentation.description} readOnly />
                </Form.Group>
                <Form.Group controlId="notes">
                  <Form.Label>Notes</Form.Label>
                  <Form.Control as="textarea" rows={3} value={incident.documentation.notes} readOnly />
                </Form.Group>
                {/* Add Edit and Save buttons for editing */}
                {/* Add onSubmit handler to handle changes and write to database */}
              </Form>
            </Col>
          </Row>
        </div>
      )}
    </Container>
  );
};

export default IncidentDetailPage;