// Load the JSON file
let votersData = [];
fetch('export.json')
    .then(response => response.json())
    .then(data => {
        // Flatten the data and add voter list number if available
        votersData = data.page_data.flatMap(page => {
            const words = page.words;
            let voterListNumber = 1; // Assume list numbers start from 1 on each page
            return words.map(word => ({
                ...word,
                voter_list_number: voterListNumber++ // Assign voter list number incrementally
            }));
        });
    })
    .catch(error => console.error('Error loading JSON:', error));

// Search function
function searchVoter() {
    const firstName = document.getElementById('firstName').value.toLowerCase();
    const lastName = document.getElementById('lastName').value.toLowerCase();
    const voterNumber = document.getElementById('voterNumber').value;

    const results = votersData.filter(word => {
        const text = word.text.toLowerCase();
        return (
            (!firstName || text.includes(firstName)) &&
            (!lastName || text.includes(lastName)) &&
            (!voterNumber || text.includes(voterNumber))
        );
    });

    displayResults(results);
}

// Display search results with details
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
            <p><strong>Voter List Number:</strong> ${voter.voter_list_number || 'N/A'}</p>
            <p><strong>Name:</strong> ${voter.text}</p>
            <p><strong>Voter Number:</strong> ${voter.voter_number || 'N/A'}</p>
            <p><strong>Age:</strong> ${voter.age || 'N/A'}</p>
            <p><strong>Gender:</strong> ${voter.gender || 'N/A'}</p>
            <p><strong>Other Details:</strong> ${JSON.stringify(voter)}</p>
        `;
        resultsDiv.appendChild(div);
    });
}
