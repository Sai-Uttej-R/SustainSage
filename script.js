document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    var query = document.getElementById('search-input').value; // Get search query from input field
    
    // Call function to find sustainable alternatives based on user input
    findAlternatives(query);
});

function findAlternatives(query) {
    // Sample list of sustainable alternatives for demonstration purposes
    var alternatives = {
        'Plastic Water Bottle': ['Stainless Steel Water Bottle', 'Glass Water Bottle'],
        'Disposable Plastic Cutlery': ['Bamboo Cutlery Set', 'Stainless Steel Cutlery'],
        'Single-Use Plastic Bags': ['Reusable Cloth Bags', 'Biodegradable Bags']
    };

    var resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = ''; // Clear previous results

    var alternativesFound = alternatives[query];
    if (alternativesFound) {
        resultsContainer.innerHTML += '<h2>Sustainable Alternatives for ' + query + '</h2>';
        alternativesFound.forEach(function(alternative) {
            resultsContainer.innerHTML += '<p>' + alternative + '</p>';
        });
    } else {
        resultsContainer.innerHTML = '<p>No sustainable alternatives found for ' + query + '</p>';
    }
}
