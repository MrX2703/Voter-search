// Load the JSON file
let votersData = [];
fetch('export.json')
    .then(response => {
        if (!response.ok) throw new Error('Failed to load JSON file');
        return response.json();
    })
    .then(data => {
        console.log('Raw JSON Data:', data); // Log raw data to verify structure
        // Assume `number` represents the voter list number
        votersData = data.page_data.flatMap(page => page.words.map(word => ({
            ...word,
            voter_list_number: word.number // Directly use the 'number' field from JSON
        })));
        console.log('Processed Voter Data:', votersData); // Log processed data
    })
    .catch(error => console.error('Error loading JSON:', error));

// Search function
function searchVoter() {
    const firstName = document.getElementById('firstName').value.toLowerCase();
    const lastName = document.getElementById('lastName').value.toLowerCase();
    const voterNumber = document.getElementById('voterNumber').value;

    console.log('Search Inputs:', { firstName, lastName, voterNumber });

    // Filter results based on input
    const results = votersData.filter(word => {
        return (
            (!firstName || word.text.toLowerCase().includes(firstName)) &&
            (!lastName || word.text.toLowerCase().includes(lastName)) &&
            (!voterNumber || word.text.includes(voterNumber))
        );
    });

    console.log('Filtered Results:', results); // Log filtered results
    displayResults(results);
}

// Display search results with voter list number
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
