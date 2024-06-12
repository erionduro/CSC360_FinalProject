import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import DashboardTimeline from '../components/DashboardTimeline';
import IncidentTable from '../components/IncidentTable';
import GraphMTTR from '../components/GraphMTTR';
import PieChartPriority from '../components/PieChartPriority';
import BarChartType from '../components/BarChartType';
import BarChartStatus from '../components/BarChartStatus';
import IncidentAlerts from '../components/IncidentAlerts';

function DashboardPage() {
  return (
    <Container fluid>
      <Row>
        <Col>
          <h2 className="mt-5 mb-4">Dashboard</h2>
        </Col>
      </Row>
      {/* Incident Alerts */}
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <IncidentAlerts />
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
                    <GraphMTTR />
                  </Card.Body>
                </Card>
              </div>
              <div style={{ marginRight: '10px' }}>
                <Card>
                  <Card.Body>
                    <PieChartPriority />
                  </Card.Body>
                </Card>
              </div>
              <div>
                <Card>
                  <Card.Body>
                    <BarChartType />
                  </Card.Body>
                </Card>
              </div>
              <div>
                <Card>
                  <Card.Body>
                    <BarChartStatus />
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
              <IncidentTable />
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
              <DashboardTimeline />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default DashboardPage;