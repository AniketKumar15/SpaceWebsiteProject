const tbody = document.getElementById("events-body");

// Helper function to add rows
function addRow(date, type, title, description) {
  const row = document.createElement("tr");
  row.innerHTML = `
        <td>${date}</td>
        <td>${type}</td>
        <td>${title}</td>
        <td>${description}</td>
    `;
  tbody.appendChild(row);
}

// Format category name to a human-readable type
function formatCategoryName(name) {
  return name.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

// Load and process JSON file
fetch('src/Js/astroFile.json')
  .then(response => response.json())
  .then(data => {
    for (const [category, events] of Object.entries(data.astronomy_events_2025)) {
      if (Array.isArray(events)) {
        for (const event of events) {
          if (category === "planetary_events" && event.dates) {
            for (const date of event.dates) {
              addRow(date, formatCategoryName(category), event.event || "Mercury Transit", event.description);
            }
          } else if (category === "star_clusters_and_nebulae") {
            addRow("—", "Deep Sky Object", event.object, event.description);
          } else if (event.date) {
            addRow(event.date, formatCategoryName(category), event.event || event.comet || event.object, event.description);
          }
        }
      }
    }
  })
  .catch(error => {
    console.error('Error loading JSON:', error);
    tbody.innerHTML = `<tr><td colspan="4">Failed to load events.</td></tr>`;
  });
