// Load the JSON file
let votersData = [];
fetch('export.json')
    .then(response => response.json())
    .then(data => votersData = data.page_data) // Adjust for JSON structure
    .catch(error => console.error('Error loading JSON:', error));

// Search function
function searchVoter() {
    const firstName = document.getElementById('firstName').value.toLowerCase();
    const lastName = document.getElementById('lastName').value.toLowerCase();
    const voterNumber = document.getElementById('voterNumber').value;

    const results = votersData.flatMap(page =>
        page.words.filter(word => {
            const text = word.text.toLowerCase();
            return (
                (!firstName || text.includes(firstName)) &&
                (!lastName || text.includes(lastName)) &&
                (!voterNumber || text.includes(voterNumber))
            );
        })
    );

    displayResults(results);
}

// Display search results
function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (results.length === 0) {
        resultsDiv.innerHTML = '<p>No voters found.</p>';
        return;
    }

    results.forEach(voter => {
        const div = document.createElement('div');
        div.classList.add('result-item');
        div.innerHTML = `
            <p><strong>Name:</strong> ${voter.text}</p>
        `;
        resultsDiv.appendChild(div);
    });
}
