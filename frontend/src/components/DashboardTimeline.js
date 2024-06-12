import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function DashboardTimeline( {incidents} ) {
  // Sort incidents based on creation timestamp in descending order
  const sortedIncidents = incidents.sort((a, b) => b.timeline.creationTimestamp - a.timeline.creationTimestamp);
  
  // Get the 10 most recent incidents
  const recentIncidents = sortedIncidents.slice(0, 10);

  return (
    <Container>
      <div className="horizontal-timeline">
        {recentIncidents.map((incident, index) => {
          let priorityClass = "";
          switch (incident.header.priority) {
            case "High":
              priorityClass = "bg-danger";
              break;
            case "Medium":
              priorityClass = "bg-warning";
              break;
            case "Low":
              priorityClass = "bg-info";
              break;
            default:
              priorityClass = "";
          }

          return (
            <div className="timeline-item mb-5" key={index}>
              <div className={`timeline-content ${priorityClass} text-white`}>
                <h5>{incident.header.title}</h5>
                <p>
                  {new Date(incident.timeline.creationTimestamp * 1000).toLocaleDateString()}
                </p>
                <p>{incident.header.status}</p>
                <p>{incident.header.priority} priority</p>
                <Link to={`/incident/${incident.header.id}`}>
                  <Button variant="secondary">
                    View Incident
                  </Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
}