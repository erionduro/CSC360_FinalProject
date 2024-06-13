import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Chart from "chart.js/auto"; 

export default function GraphMTTR({incidents}) {
const startedIncidents = incidents.filter(incident => incident.header.inProgress === true);

  // Function to calculate average mean time to respond
  const calculateAverageMTTR = () => {
    const responseTimesInSeconds = startedIncidents.map((incident) => {
      let time = incident.timeline.inProgressTimestamp - incident.timeline.creationTimestamp;
      return time / 1000 / 60;
    });
    const totalResponseTime = responseTimesInSeconds.reduce((acc, curr) => acc + curr, 0);
    return totalResponseTime / responseTimesInSeconds.length;
  };

  useEffect(() => {
    let chartInstance = null;

    if (startedIncidents.length > 0) {
      const ctx = document.getElementById("meanTimeToRespondChart");
      const responseTimesInSeconds = startedIncidents.map((incident) => {
        let time = incident.timeline.inProgressTimestamp - incident.timeline.creationTimestamp;
        return time / 1000 / 60;
      });

      const data = {
        labels: startedIncidents.map((_, index) => `${_.header.id}`),
        datasets: [
          {
            label: "Time to Respond (Minutes)",
            data: responseTimesInSeconds,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      };

      const config = {
        type: "line",
        data: data,
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Incident Response Times",
            },

          },
        },
      };

      // Destroy the existing chart instance if it exists
      if (chartInstance) {
        chartInstance.destroy();
      }

      // Create a new chart instance
      chartInstance = new Chart(ctx, config);
    }

    // Cleanup function to destroy chart instance on unmount
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [incidents]); // Re-run effect when incidents array changes

  return (
    <Container style={{ width: "400px", height: "400px" }}>
      <Row>
        <Col>
          <canvas id="meanTimeToRespondChart" width="600" height="400"></canvas>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <p>Mean Time to Respond: {calculateAverageMTTR().toFixed(2)} minutes</p>
        </Col>
      </Row>
    </Container>
  );
}