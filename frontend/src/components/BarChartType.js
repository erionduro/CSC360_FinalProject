import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import Chart from "chart.js/auto";

const BarChartType = ({ incidents }) => {
  useEffect(() => {
    let chartInstance = null;

    if (incidents && incidents.length > 0) {
      const ctx = document.getElementById("incidentTypeChart");
      const incidentTypes = {};

      // Count occurrences of each incident type
      incidents.forEach((incident) => {
        const type = incident.header.type;
        incidentTypes[type] = incidentTypes[type] ? incidentTypes[type] + 1 : 1;
      });

      const data = {
        labels: Object.keys(incidentTypes),
        datasets: [
          {
            label: "Number of Incidents",
            data: Object.values(incidentTypes),
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      };

      const config = {
        type: "bar",
        data: data,
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Incidents by Type",
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Number of Incidents",
              },
            },
            x: {
              title: {
                display: true,
                text: "Incident Type",
              },
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
  }, [incidents]); // Add incidents as a dependency so it re-runs when incidents change

  return (
    <Container style={{ width: "600px", height: "400px" }}>
      <canvas id="incidentTypeChart" width="600" height="400"></canvas>
    </Container>
  );
};

export default BarChartType;