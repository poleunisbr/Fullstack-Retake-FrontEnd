document.addEventListener("DOMContentLoaded", function () {
    // Define the API endpoints
    const apiBaseUrl = "https://my-json-server.typicode.com/poleunisbr/json-srv";

    // Fetch and display produce items
    function loadProduce() {
        fetch(`${apiBaseUrl}/produce`)
            .then(response => response.json())
            .then(data => {
                const produceContainer = document.getElementById('produce-container');
                produceContainer.innerHTML = data.map(item => `
                    <div class="col-md-4">
                        <div class="card mb-4">
                            <img src="${item.image_url}" class="card-img-top" alt="${item.name}">
                            <div class="card-body">
                                <h5 class="card-title">${item.name}</h5>
                                <p class="card-text">${item.description}</p>
                                <p class="card-text"><strong>$${item.price.toFixed(2)}</strong></p>
                                <p class="card-text"><em>${item.season}</em></p>
                            </div>
                        </div>
                    </div>
                `).join('');
            })
            .catch(error => console.error('Error fetching produce data:', error));
    }

    // Fetch and display farming practices
    function loadFarmingPractices() {
        fetch(`${apiBaseUrl}/farming-practices`)
            .then(response => response.json())
            .then(data => {
                const accordionContainer = document.getElementById('farming-practices-accordion');
                accordionContainer.innerHTML = data.map((practice, index) => `
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="heading${index}">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}">
                                ${practice.practice_name}
                            </button>
                        </h2>
                        <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#farming-practices-accordion">
                            <div class="accordion-body">
                                <p>${practice.description}</p>
                                <img src="${practice.image_url}" class="img-fluid mt-3" alt="${practice.practice_name}">
                            </div>
                        </div>
                    </div>
                `).join('');
            })
            .catch(error => console.error('Error fetching farming practices data:', error));
    }

    // Fetch and display community events
    function loadCommunityEvents() {
        fetch(`${apiBaseUrl}/community-events`)
            .then(response => response.json())
            .then(data => {
                const eventsContainer = document.getElementById('community-events-container');
                eventsContainer.innerHTML = data.map(event => `
                    <div class="card mb-3">
                        <div class="card-body">
                            <h5 class="card-title">${event.event_name}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${new Date(event.event_date).toLocaleDateString()}</h6>
                            <p class="card-text">${event.description}</p>
                        </div>
                    </div>
                `).join('');
            })
            .catch(error => console.error('Error fetching community events data:', error));
    }

    // Handle contact form submission
    const form = document.getElementById('contact-form');
    const responseDiv = document.getElementById('form-response');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        fetch('http://localhost:8000/contact/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                responseDiv.innerHTML = `<div class="alert alert-success" role="alert">${data.message}</div>`;
                form.reset(); // Reset form fields
            })
            .catch(error => {
                responseDiv.innerHTML = `<div class="alert alert-danger" role="alert">There was a problem with your submission. Please try again later.</div>`;
                console.error('Error:', error);
            });
    });

    // Load data when the page is ready
    loadProduce();
    loadFarmingPractices();
    loadCommunityEvents();
});
