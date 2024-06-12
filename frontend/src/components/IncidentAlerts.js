import React from 'react';
import { Card, Button, ListGroup, Row, Col } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { Bell } from 'react-bootstrap-icons';

const IncidentAlerts = ({incidents}) => {
  // Filter incidents that are not in progress
  const notInProgressIncidents = incidents.filter((incident) => incident.header.inProgress === false);

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          <Bell className="mr-2" /> Incident Alerts
        </Card.Title>
        <ListGroup>
          {notInProgressIncidents.map((incident) => (
            <ListGroup.Item key={incident.id} className={getPriorityClassName(incident.header.priority)}>
              <Row>
                <Col>
                    <Row className="MyAlert">
                       <strong><Link to={`/incident/${incident.header.id}`} className="text-white" >{incident.header.title}:</Link></strong>
                    </Row>
                    <Row>
                       {incident.documentation.description} 
                    </Row>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

// Function to get priority class name based on incident priority
const getPriorityClassName = (priority) => {
  switch (priority) {
    case 'High':
      return 'bg-danger text-white';
    case 'Medium':
      return 'bg-warning text-dark';
    case 'Low':
      return 'bg-info text-dark';
    default:
      return '';
  }
};

export default IncidentAlerts;