async function search() {
    const searchInput = document.getElementById('searchInput').value.trim();
    const resultsContainer = document.getElementById('resultsContainer');
    
    // Clear previous results
    resultsContainer.innerHTML = '';
  
    try {
      // Fetch data from Open Food Facts API
      const response1 = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${searchInput}&search_simple=1&action=process&json=1`);
      const data1 = await response1.json();
      const openFoodFactsResults = data1.products.map(product => ({
        name: product.product_name,
        description: product.generic_name,
        image: product.image_url
      }));
  
      // Fetch data from GoodGuide API
      const response2 = await fetch(`https://api.goodguide.com/search/${searchInput}?format=json`);
      const data2 = await response2.json();
      const goodGuideResults = data2.results.map(result => ({
        name: result.name,
        description: result.description,
        image: result.image_url
      }));
  
      // Fetch data from Ecovia Intelligence API
      const response3 = await fetch(`https://api.ecoviaintelligence.com/search?q=${searchInput}`);
      const data3 = await response3.json();
      const ecoviaResults = data3.map(item => ({
        name: item.name,
        description: item.description,
        image: item.image_url
      }));
  
      // Combine results from all three APIs
      const combinedData = [...openFoodFactsResults, ...goodGuideResults, ...ecoviaResults];
  
      combinedData.forEach(item => {
        const resultDiv = document.createElement('div');
        resultDiv.classList.add('result');
        resultDiv.innerHTML = `
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <img src="${item.image}" alt="${item.name}">
        `;
        resultsContainer.appendChild(resultDiv);
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  