const url = "https://api.spaceflightnewsapi.net/v4/articles/?has_event=true&has_launch=true&is_featured=true&limit=20";

const fetchSpaceNews = async () => {
    try {
        const res = await fetch(url);
        const data = await res.json();
        const newsCardsContainer = document.getElementById('News-cards');

        // Loop through each article and create a card
        data.results.forEach(article => {
            const card = document.createElement('div');
            card.classList.add('card');

            // Add the image to the card
            const cardImg = document.createElement('img');
            cardImg.src = article.image_url || 'https://images.unsplash.com/photo-1517976487492-5750f3195933?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cm9ja2V0fGVufDB8fDB8fHww'; // Fallback to default image if no image URL
            cardImg.alt = article.title;

            // Set up a fallback image if the image URL fails (404 error or other issues)
            cardImg.onerror = () => {
                cardImg.src = 'https://images.unsplash.com/photo-1517976487492-5750f3195933?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cm9ja2V0fGVufDB8fDB8fHww'; // Fallback to default image
            };

            card.appendChild(cardImg);

            // Add the card body
            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            // Add title
            const cardTitle = document.createElement('h3');
            cardTitle.textContent = article.title;
            cardBody.appendChild(cardTitle);

            // Add description or excerpt
            const cardDesc = document.createElement('p');
            cardDesc.textContent = article.summary || 'No summary available';
            cardBody.appendChild(cardDesc);

            // Add a "Learn More" link
            const sourceLink = document.createElement('a');
            sourceLink.href = article.url;
            sourceLink.textContent = 'Read More';
            sourceLink.target = '_blank';
            cardBody.appendChild(sourceLink);

            // Append the card to the container
            card.appendChild(cardBody);
            newsCardsContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching space news:', error);
    }
}

fetchSpaceNews();
