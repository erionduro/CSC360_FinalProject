import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Chart from 'chart.js/auto';
import incidents from '../Common.js';

const BarChartStatus = () => {
  useEffect(() => {
    let chartInstance = null;

    if (incidents.length > 0) {
      const ctx = document.getElementById('incidentStatusChart');
      const incidentStatuses = {};

      // Count occurrences of each incident status
      incidents.forEach((incident) => {
        const status = incident.header.status;
        incidentStatuses[status] = incidentStatuses[status] ? incidentStatuses[status] + 1 : 1;
      });

      const colors = {
        open: 'rgba(255, 99, 132, 0.2)',
        inValidation: 'rgba(54, 162, 235, 0.2)',
        closed: 'rgba(75, 192, 192, 0.2)',
      };

      const data = {
        labels: Object.keys(incidentStatuses),
        datasets: [
          {
            label: 'Number of Incidents',
            data: Object.values(incidentStatuses),
            backgroundColor: Object.values(colors), // Custom colors for each bar
            borderColor: 'rgba(0, 0, 0, 1)',
            borderWidth: 1,
          },
        ],
      };

      const config = {
        type: 'bar',
        data: data,
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Incidents by Status',
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Number of Incidents',
              },
            },
            x: {
              title: {
                display: true,
                text: 'Incident Status',
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
  }, [incidents]); // Re-run effect when incidents array changes

  return (
    <Container style={{ width: '600px', height: '400px' }}>
      <canvas id="incidentStatusChart" width="600" height="400"></canvas>
    </Container>
  );
};

export default BarChartStatus;