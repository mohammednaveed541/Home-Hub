document.addEventListener('DOMContentLoaded', () => {
  // Load buy properties
  const propertiesContainer = document.getElementById('buy-properties');
  
  if (propertiesContainer) {
    // Show loading state
    propertiesContainer.innerHTML = '<div class="loading">Loading properties...</div>';
    
    // Get search parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    
    // Fetch properties for sale
    fetch('js/utils.js')
      .then(response => response.text())
      .then(text => {
        // Extract the sample properties from utils.js
        const match = text.match(/const sampleProperties = \[([\s\S]*?)\];/);
        if (match && match[1]) {
          const samplePropertiesText = `[${match[1]}]`;
          const sampleProperties = eval(samplePropertiesText);
          
          // Filter for sale properties
          let properties = sampleProperties.filter(p => p.listingType === 'sale');
          
          // Filter by search query if present
          if (searchQuery) {
            properties = properties.filter(property => 
              property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              property.location.toLowerCase().includes(searchQuery.toLowerCase())
            );
          }
          
          if (properties.length === 0) {
            propertiesContainer.innerHTML = '<div class="no-results">No properties found matching your criteria</div>';
            return;
          }
          
          let propertiesHTML = '';
          properties.forEach(property => {
            // Use the createPropertyCard function from the global scope
            // This is a simplified version for the buy page
            const priceDisplay = `$${property.price.toLocaleString()}`;
            
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
                  <div class="property-type property-sale">
                    For Sale
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
          
          propertiesContainer.innerHTML = propertiesHTML;
        } else {
          throw new Error('Could not find sample properties');
        }
      })
      .catch(error => {
        console.error('Error fetching properties:', error);
        propertiesContainer.innerHTML = '<div class="error">Failed to load properties. Please try again later.</div>';
      });
  }
  
  // Filter functionality
  const filterBtn = document.getElementById('filter-btn');
  if (filterBtn) {
    filterBtn.addEventListener('click', () => {
      const propertyType = document.getElementById('property-type').value;
      const priceRange = document.getElementById('price-range').value;
      const bedrooms = document.getElementById('bedrooms').value;
      const bathrooms = document.getElementById('bathrooms').value;
      
      // In a real app, this would filter from Firebase
      // For now, we'll filter our sample data
      fetch('js/utils.js')
        .then(response => response.text())
        .then(text => {
          // Extract the sample properties from utils.js
          const match = text.match(/const sampleProperties = \[([\s\S]*?)\];/);
          if (match && match[1]) {
            const samplePropertiesText = `[${match[1]}]`;
            const sampleProperties = eval(samplePropertiesText);
            
            // Filter for sale properties
            let filteredProperties = sampleProperties.filter(p => p.listingType === 'sale');
            
            // Apply filters
            if (propertyType) {
              filteredProperties = filteredProperties.filter(p => p.type === propertyType);
            }
            
            if (priceRange) {
              const [min, max] = priceRange.split('-');
              if (min && max) {
                filteredProperties = filteredProperties.filter(p => 
                  p.price >= parseInt(min) && p.price <= parseInt(max)
                );
              } else if (min) {
                filteredProperties = filteredProperties.filter(p => p.price >= parseInt(min));
              }
            }
            
            if (bedrooms) {
              filteredProperties = filteredProperties.filter(p => 
                p.bedrooms >= parseInt(bedrooms)
              );
            }
            
            if (bathrooms) {
              filteredProperties = filteredProperties.filter(p => 
                p.bathrooms >= parseInt(bathrooms)
              );
            }
            
            if (filteredProperties.length === 0) {
              propertiesContainer.innerHTML = '<div class="no-results">No properties found matching your criteria</div>';
              return;
            }
            
            let propertiesHTML = '';
            filteredProperties.forEach(property => {
              // Use the createPropertyCard function from the global scope
              // This is a simplified version for the buy page
              const priceDisplay = `$${property.price.toLocaleString()}`;
              
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
                    <div class="property-type property-sale">
                      For Sale
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
            
            propertiesContainer.innerHTML = propertiesHTML;
          } else {
            throw new Error('Could not find sample properties');
          }
        })
        .catch(error => {
          console.error('Error filtering properties:', error);
        });
    });
  }
});