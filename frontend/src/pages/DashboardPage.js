import React, { useEffect, useState } from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import IncidentAlerts from '../components/IncidentAlerts';
import GraphMTTR from '../components/GraphMTTR';
import PieChartPriority from '../components/PieChartPriority';
import BarChartType from '../components/BarChartType';
import BarChartStatus from '../components/BarChartStatus';
import IncidentTable from '../components/IncidentTable';
import DashboardTimeline from '../components/DashboardTimeline';

function DashboardPage() {
  const [apiIncidents, setApiIncidents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      console.error('Error fetching incidents:', error.message);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          <h2 className="mt-5 mb-4">Dashboard</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Link to="/add-incident">
            <Button variant="primary">Add New Incident</Button>
          </Link>
        </Col>
      </Row>
      {/* Incident Alerts */}
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <IncidentAlerts incidents={apiIncidents} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* Graphs */}
      <Row>
        <Card>
          <Card.Title><h4 className="mb-4">Graphs</h4></Card.Title>
          <Card.Body style={{ overflowX: 'auto' }}>
            <div style={{ display: 'flex' }}>
              <div style={{ marginRight: '10px' }}>
                <Card>
                  <Card.Body>
                    <GraphMTTR incidents={apiIncidents} />
                  </Card.Body>
                </Card>
              </div>
              <div style={{ marginRight: '10px' }}>
                <Card>
                  <Card.Body>
                    <PieChartPriority incidents={apiIncidents} />
                  </Card.Body>
                </Card>
              </div>
              <div>
                <Card>
                  <Card.Body>
                    <BarChartType incidents={apiIncidents} />
                  </Card.Body>
                </Card>
              </div>
              <div>
                <Card>
                  <Card.Body>
                    <BarChartStatus incidents={apiIncidents} />
                  </Card.Body>
                </Card>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Row>
      {/* Incidents */}
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h4 className="mb-4">All Incidents</h4>
              <IncidentTable incidents={apiIncidents} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* Timeline */}
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h4 className="mb-4">Incident Timeline</h4>
              <DashboardTimeline incidents={apiIncidents} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default DashboardPage;