document.addEventListener('DOMContentLoaded', () => {
  // Load featured properties on homepage
  const featuredPropertiesContainer = document.getElementById('featured-properties');
  
  if (featuredPropertiesContainer) {
    // Show loading state
    featuredPropertiesContainer.innerHTML = '<div class="loading">Loading properties...</div>';
    
    // Fetch properties (we'll use a mix of sale and rent)
    fetch('js/utils.js')
      .then(response => response.text())
      .then(text => {
        // Extract the sample properties from utils.js
        const match = text.match(/const sampleProperties = \[([\s\S]*?)\];/);
        if (match && match[1]) {
          const samplePropertiesText = `[${match[1]}]`;
          const sampleProperties = eval(samplePropertiesText);
          
          // Get 3 random properties for featured section
          const featuredProperties = [...sampleProperties]
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);
          
          let propertiesHTML = '';
          
          featuredProperties.forEach(property => {
            // Use the createPropertyCard function from the global scope
            // This is a simplified version for the main page
            const priceDisplay = property.listingType === 'rent' 
              ? `$${property.price}/month` 
              : `$${property.price.toLocaleString()}`;
            
            const bedroomsBathrooms = property.type !== 'commercial' && property.type !== 'land'
              ? `
                <div class="property-feature">
                  <i class="fas fa-bed"></i>
                  <span>${property.bedrooms} Beds</span>
                </div>
                <div class="property-feature">
                  <i class="fas fa-bath"></i>
                  <span>${property.bathrooms} Baths</span>
                </div>
              `
              : '';
            
            propertiesHTML += `
              <div class="property-card">
                <div class="property-image" style="background-image: url('${property.image}')">
                  <div class="property-type property-${property.listingType}">
                    ${property.listingType === 'sale' ? 'For Sale' : 'For Rent'}
                  </div>
                </div>
                <div class="property-details">
                  <h3 class="property-title">${property.title}</h3>
                  <div class="property-price">${priceDisplay}</div>
                  <div class="property-features">
                    ${bedroomsBathrooms}
                    <div class="property-feature">
                      <i class="fas fa-ruler-combined"></i>
                      <span>${property.area} sq ft</span>
                    </div>
                  </div>
                  <div class="property-location">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${property.location}</span>
                  </div>
                </div>
              </div>
            `;
          });
          
          featuredPropertiesContainer.innerHTML = propertiesHTML;
        } else {
          throw new Error('Could not find sample properties');
        }
      })
      .catch(error => {
        console.error('Error loading featured properties:', error);
        featuredPropertiesContainer.innerHTML = '<div class="error">Failed to load properties. Please try again later.</div>';
      });
  }
  
  // Initialize search functionality
  const searchBtn = document.querySelector('.search-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      const searchInput = document.querySelector('.search-container input');
      if (searchInput.value.trim()) {
        window.location.href = `buy.html?search=${encodeURIComponent(searchInput.value.trim())}`;
      }
    });
  }
});