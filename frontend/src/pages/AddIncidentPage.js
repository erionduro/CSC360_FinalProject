import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AddIncidentPage = () => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [impact, setImpact] = useState('Medium');
  const [urgency, setUrgency] = useState('High');
  const [priority, setPriority] = useState('Medium');
  const [status, setStatus] = useState('Open');
  const [inProgress, setInProgress] = useState(false);
  const [validation, setValidation] = useState(false);
  const [closed, setClosed] = useState(false);
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState('');
  const [responsibleParties, setResponsibleParties] = useState('');
  const [accountableParties, setAccountableParties] = useState('');
  const [consultedParties, setConsultedParties] = useState('');
  const [informedParties, setInformedParties] = useState('');
  const [inProgressTimestamp, setInProgressTimestamp] = useState('');
  const [validationTimestamp, setValidationTimestamp] = useState('');
  const [closedTimestamp, setClosedTimestamp] = useState('');
  const navigate = useNavigate();

  const determineStatus = () => {
    if (inProgress && validation && closed) {
      return 'Closed';
    } else if (inProgress && validation) {
      return 'In Validation';
    } else if (inProgress) {
      return 'In Progress';
    } else {
      return 'Open';
    }
  };

  const handleSave = async () => {
    const newStatus = determineStatus();

    const newIncident = {
      header: {
        headerId: `INC${Math.floor(Math.random() * 100000)}`,
        title,
        type,
        impact,
        urgency,
        priority,
        status: newStatus,
        createdTimestamp: Math.floor(Date.now() / 1000),
        inProgress,
        validation,
        closed
      },
      raci: {
        responsibleParties: responsibleParties.split(',').map(item => item.trim()),
        accountableParties: accountableParties.split(',').map(item => item.trim()),
        consultedParties: consultedParties.split(',').map(item => item.trim()),
        informedParties: informedParties.split(',').map(item => item.trim())
      },
      timeline: {
        creationTimestamp: Math.floor(Date.now() / 1000),
        inProgressTimestamp: inProgress ? (inProgressTimestamp ? Math.floor(new Date(inProgressTimestamp).getTime() / 1000) : Math.floor(Date.now() / 1000)) : null,
        validationTimestamp: validation ? (validationTimestamp ? Math.floor(new Date(validationTimestamp).getTime() / 1000) : Math.floor(Date.now() / 1000)) : null,
        closedTimestamp: closed ? (closedTimestamp ? Math.floor(new Date(closedTimestamp).getTime() / 1000) : Math.floor(Date.now() / 1000)) : null
      },
      documentation: {
        description,
        notes,
      }
    };

    try {
      const response = await fetch('http://127.0.0.1:5123/incidents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newIncident),
      });
      if (!response.ok) {
        throw new Error('Failed to create incident!');
      }
      const createdIncident = await response.json();
      console.log('Created Incident: ', createdIncident);
      navigate("/dashboard");
    } catch (error) {
      console.error('Error creating incident: ', error.message);
    }
  };

  return (
    <Container>
      <h2 className="my-4">Add New Incident</h2>
      <Form>
        <Row>
          <Col>
            <h3>Header</h3>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="type">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="impact">
              <Form.Label>Impact</Form.Label>
              <Form.Control
                as="select"
                value={impact}
                onChange={(e) => setImpact(e.target.value)}
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="urgency">
              <Form.Label>Urgency</Form.Label>
              <Form.Control
                as="select"
                value={urgency}
                onChange={(e) => setUrgency(e.target.value)}
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="priority">
              <Form.Label>Priority</Form.Label>
              <Form.Control
                as="select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="status">
              <Form.Label>Status</Form.Label>
            <Form.Group controlId="inProgress">
              <Form.Check
                type="checkbox"
                label="In Progress"
                checked={inProgress}
                onChange={(e) => setInProgress(e.target.checked)}
              />
            </Form.Group>
            <Form.Group controlId="validation">
              <Form.Check
                type="checkbox"
                label="Validation"
                checked={validation}
                onChange={(e) => setValidation(e.target.checked)}
              />
            </Form.Group>
            <Form.Group controlId="closed">
              <Form.Check
                type="checkbox"
                label="Closed"
                checked={closed}
                onChange={(e) => setClosed(e.target.checked)}
              />
            </Form.Group>
            </Form.Group>
          </Col>
          <Col>
            <h3>RACI</h3>
            <Form.Group controlId="responsibleParties">
              <Form.Label>Responsible Parties</Form.Label>
              <Form.Control
                type="text"
                value={responsibleParties}
                onChange={(e) => setResponsibleParties(e.target.value)}
                placeholder="Comma-separated list"
              />
            </Form.Group>
            <Form.Group controlId="accountableParties">
              <Form.Label>Accountable Parties</Form.Label>
              <Form.Control
                type="text"
                value={accountableParties}
                onChange={(e) => setAccountableParties(e.target.value)}
                placeholder="Comma-separated list"
              />
            </Form.Group>
            <Form.Group controlId="consultedParties">
              <Form.Label>Consulted Parties</Form.Label>
              <Form.Control
                type="text"
                value={consultedParties}
                onChange={(e) => setConsultedParties(e.target.value)}
                placeholder="Comma-separated list"
              />
            </Form.Group>
            <Form.Group controlId="informedParties">
              <Form.Label>Informed Parties</Form.Label>
              <Form.Control
                type="text"
                value={informedParties}
                onChange={(e) => setInformedParties(e.target.value)}
                placeholder="Comma-separated list"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>Documentation</h3>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="notes">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button onClick={handleSave}>Save</Button>
      </Form>
    </Container>
  );
};

export default AddIncidentPage;