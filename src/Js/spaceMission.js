// Handle Space missions
document.addEventListener('DOMContentLoaded', function () {
    // Fetch the JSON data
    fetch('src/Js/spaceMission.json')
        .then(response => response.json())
        .then(data => {
            const missionCardsContainer = document.getElementById('mission-cards');
            console.log(data); // Log the fetched data for debugging
            // Loop through each mission and create a card
            data.forEach(mission => {
                const card = document.createElement('div');
                card.classList.add('card');

                // Add the card image
                const cardImg = document.createElement('img');
                cardImg.src = mission.img;
                cardImg.alt = mission.title;
                card.appendChild(cardImg);

                // Add the card body
                const cardBody = document.createElement('div');
                cardBody.classList.add('card-body');

                const cardTitle = document.createElement('h3');
                cardTitle.textContent = mission.title + ` (${mission.done_by})`;
                cardBody.appendChild(cardTitle);

                const cardDesc = document.createElement('p');
                cardDesc.textContent = mission.desc;
                cardBody.appendChild(cardDesc);

                const sourceLink = document.createElement('a');
                sourceLink.href = mission.source_link;
                sourceLink.textContent = 'Learn More';
                sourceLink.target = '_blank';
                cardBody.appendChild(sourceLink);

                card.appendChild(cardBody);

                // Append the card to the container
                missionCardsContainer.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error fetching the mission data:', error);
        });
});
