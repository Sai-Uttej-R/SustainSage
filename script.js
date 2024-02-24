$(document).ready(function() {
    $('#search-button').click(function(event) {
        event.preventDefault(); 
        var query = $('#search-input').val().trim().toLowerCase(); 
        var searchType = $('#search-type').val();

        if (query && searchType) {
            findAlternatives(query, searchType);
        }
    });

    function findAlternatives(query, searchType) {
        var url = '';
        if (searchType === 'food') {
            url = 'https://world.openfoodfacts.org/cgi/search.pl?search_terms=' + encodeURIComponent(query) + '&search_simple=1&json=1';
        } else if (searchType === 'product') {
            url = 'https://www.openproductdata.org/api/v1/products?barcode=' + encodeURIComponent(query);
        }

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
        resultsContainer.empty(); 

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
