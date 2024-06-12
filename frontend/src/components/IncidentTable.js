import React, { useState } from 'react';
import { Table, Pagination } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import incidents from '../Common.js';

const IncidentTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [incidentsPerPage] = useState(5); // Number of incidents per page

  // Get current incidents
  const indexOfLastIncident = currentPage * incidentsPerPage;
  const indexOfFirstIncident = indexOfLastIncident - incidentsPerPage;
  const currentIncidents = incidents.slice(indexOfFirstIncident, indexOfLastIncident);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Type</th>
            <th>Impact</th>
            <th>Urgency</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {currentIncidents.map((incident) => (
            <tr key={incident.header.id}>
              <td><Link to={`/incident/${incident.header.id}`}>{incident.header.id}</Link></td>
              <td>{incident.header.title}</td>
              <td>{incident.header.type}</td>
              <td>{incident.header.impact}</td>
              <td>{incident.header.urgency}</td>
              <td>{incident.header.priority}</td>
              <td>{incident.header.status}</td>
              <td>{new Date(incident.timeline.creationTimestamp * 1000).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        {[...Array(Math.ceil(incidents.length / incidentsPerPage))].map((_, index) => (
          <Pagination.Item key={index + 1} onClick={() => paginate(index + 1)}>
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
};

export default IncidentTable;