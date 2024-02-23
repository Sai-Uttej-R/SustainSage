$(document).ready(function() {
    $('#search-form').submit(function(event) {
        event.preventDefault(); // Prevent form submission
        var query = $('#search-input').val().trim().toLowerCase(); // Get search query from input field

        if (query) {
            findAlternatives(query);
        }
    });

    function findAlternatives(query) {
        var url = 'https://world.openfoodfacts.org/cgi/search.pl?search_terms=' + encodeURIComponent(query) + '&search_simple=1&json=1';
        
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                displayResults(query, data.products);
            },
            error: function(xhr, status, error) {
                console.error('Error:', error);
            }
        });
    }

    function displayResults(query, products) {
        var resultsContainer = $('#search-results');
        resultsContainer.empty(); // Clear previous results

        if (products.length > 0) {
            resultsContainer.append('<h2>Sustainable Alternatives for ' + query + '</h2>');
            products.forEach(function(product) {
                resultsContainer.append('<p>' + product.product_name + '</p>');
            });
        } else {
            resultsContainer.append('<p>No sustainable alternatives found for ' + query + '</p>');
        }
    }
});
