import React from "react";
import { Container } from "react-bootstrap";

export default function IncidentTimeline({ incident, setIncident }) {
  const stages = [
    { key: "creation", label: "Creation", timestamp: incident.timeline.creationTimestamp, priority: incident.timeline.creationTimestamp ? "success" : "secondary" },
    { key: "inProgress", label: "In Progress", timestamp: incident.timeline.inProgressTimestamp, priority: incident.timeline.inProgressTimestamp ? "success" : "secondary" },
    { key: "validation", label: "Validation", timestamp: incident.timeline.validationTimestamp, priority: incident.timeline.validationTimestamp ? "success" : "secondary" },
    { key: "closed", label: "Closed", timestamp: incident.timeline.closedTimestamp, priority: incident.timeline.closedTimestamp ? "success" : "secondary" }
  ];

  const handlePhaseClick = async (phaseKey) => {
    const currentTime = Math.floor(Date.now() / 1000);
    const updatedIncident = {
        ...incident,
        timeline: {
          ...incident.timeline,
          inProgressTimestamp: phaseKey === 'inProgress' ? currentTime : incident.timeline.inProgressTimestamp,
          validationTimestamp: phaseKey === 'validation' ? currentTime : incident.timeline.validationTimestamp,
          closedTimestamp: phaseKey === 'closed' ? currentTime : incident.timeline.closedTimestamp,
        },
        header: {
          ...incident.header,
          status: phaseKey === 'closed' ? 'Closed' :
                  phaseKey === 'validation' ? 'In Validation' : 'In Progress',
          inProgress: phaseKey === 'inProgress' ? true : incident.header.inProgress,
          validation: phaseKey === 'validation' ? true : incident.header.validation,
          closed: phaseKey === 'closed' ? true : incident.header.closed,
        },
      };

    try {
      const response = await fetch(`http://127.0.0.1:5123/incidents/${incident.header.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedIncident),
      });
      if (!response.ok) {
        throw new Error('Failed to update phase!');
      }
      const savedIncident = await response.json();
      setIncident(savedIncident); // Update the state with the new incident data
    } catch (error) {
      console.error('Error updating phase: ', error.message);
    }
  };

  return (
    <Container>
      <div className="horizontal-timeline">
        {stages.map((stage, index) => (
          <div
            className={`timeline-item-2 mb-5 ${stage.timestamp ? '' : 'text-muted'}`}
            key={index}
            onClick={() => !stage.timestamp && handlePhaseClick(stage.key)}
            style={{ cursor: !stage.timestamp ? 'pointer' : 'default' }}
          >
            <div className={`timeline-content bg-${stage.priority}`}>
              <h5 className="bold">{stage.label}</h5>
              <p className="text-white mb-2 fw-bold">
                {stage.timestamp ? new Date(stage.timestamp * 1000).toLocaleString() : "N/A"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}