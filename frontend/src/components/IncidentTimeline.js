import React from "react";
import { Container } from "react-bootstrap";

export default function IncidentTimeline({ incident }) {
  const stages = [
    { key: "creation", label: "Creation", timestamp: incident.timeline.creationTimestamp, priority: incident.timeline.creationTimestamp ? "success" : "secondary" },
    { key: "inProgress", label: "In Progress", timestamp: incident.timeline.inProgressTimestamp, priority: incident.timeline.inProgressTimestamp ? "success" : "secondary" },
    { key: "validation", label: "Validation", timestamp: incident.timeline.validationTimestamp, priority: incident.timeline.validationTimestamp ? "success" : "secondary" },
    { key: "closed", label: "Closed", timestamp: incident.timeline.closedTimestamp, priority: incident.timeline.closedTimestamp ? "success" : "secondary" }
  ];

  return (
    <Container>
      <div className="horizontal-timeline">
        {stages.map((stage, index) => (
          <div className={`timeline-item-2 mb-5 ${stage.timestamp ? '' : 'text-muted'}`} key={index}>
            <div className={`timeline-content bg-${stage.priority}`}>
              <h5 className="bold">{stage.label}</h5>
              <p className="text-white mb-2 fw-bold">
                {stage.timestamp ? new Date(stage.timestamp * 1000).toLocaleString() : "N/A"}
              </p>
              <p className="text-white">{incident.header.status}</p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}