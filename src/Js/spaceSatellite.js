// Fetching the satellite data from a JSON file
const fetchSatelliteData = async () => {
    try {
        const response = await fetch('src/Js/spaceCraft.json');
        const data = await response.json();
        const satellites = data.spacecrafts;

        createSatelliteList(satellites);
    } catch (error) {
        console.error('Error fetching satellite data:', error);
    }
};

// Function to create the satellite list in the sidebar
const createSatelliteList = (satellites) => {
    const satelliteList = document.getElementById('satellite-list');

    satellites.forEach(satellite => {
        const listItem = document.createElement('li');
        listItem.classList.add('satellite-item');
        listItem.innerHTML = `${satellite.name} <span class="arrow">→</span>`;

        // Add click event to show satellite details
        listItem.addEventListener('click', () => showSatelliteDetails(satellite, listItem));

        satelliteList.appendChild(listItem);
    });
};

// Function to display the selected satellite details
const showSatelliteDetails = (satellite, listItem) => {
    const satelliteDetails = document.getElementById('satellite-details');
    const allTextInfo = document.getElementById('allInfoText');


    // Set the selected satellite details in the main content area
    satelliteDetails.innerHTML = `
        <h3>${satellite.name}</h3>
        <img src="${satellite.img}" alt="${satellite.name}" style="width: 100%; max-width: 500px; margin-bottom: 20px;">
    `;
    allTextInfo.innerHTML = `
        <p> <strong>Launch Date:</strong> ${satellite.launch_date}</p>
        <p><strong>Mission Duration:</strong> ${satellite.mission_duration}</p>
        <p><strong>Mass:</strong> ${satellite.mass}</p>
        <p><strong>Orbit:</strong> ${satellite.orbit}</p>
        <p><strong>Description:</strong> ${satellite.description}</p>
    `;

    // Mark the clicked satellite as active and toggle the arrow
    document.querySelectorAll('.satellite-item').forEach(item => item.classList.remove('active'));
    listItem.classList.add('active');
};

// Call the function to load satellite data on page load
fetchSatelliteData();
