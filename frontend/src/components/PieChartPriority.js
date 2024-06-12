import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Chart from "chart.js/auto";
import incidents from "../Common.js";

const PieChartPriority = () => {
  useEffect(() => {
    let chartInstance = null;

    if (incidents.length > 0) {
      const ctx = document.getElementById("priorityChart");

      // Count incidents by priority level
      const priorityCounts = incidents.reduce((counts, incident) => {
        counts[incident.header.priority] = (counts[incident.header.priority] || 0) + 1;
        return counts;
      }, {});

      const labels = Object.keys(priorityCounts);
      const data = Object.values(priorityCounts);

      const config = {
        type: "pie",
        data: {
          labels: labels,
          datasets: [
            {
              data: data,
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
              hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Incidents by Priority",
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
  }, []); // No dependencies, so it runs only once

  return (
    <Container style={{ width: "400px", height: "400px" }}>
      <canvas id="priorityChart" width="400" height="400"></canvas>
    </Container>
  );
};

export default PieChartPriority;