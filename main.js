import { fetchProperties, createPropertyCard, sampleProperties } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  // Load featured properties on homepage
  const featuredPropertiesContainer = document.getElementById('featured-properties');
  
  if (featuredPropertiesContainer) {
    featuredPropertiesContainer.innerHTML = '<div class="loading">Loading featured properties...</div>';
    
    fetchProperties()
      .then(properties => {
        console.log("Fetched properties:", properties); // Debugging line

        const featuredProperties = properties.filter(p => p.featured);
        let displayProperties = featuredProperties.length > 0 
          ? featuredProperties 
          : properties.sort(() => 0.5 - Math.random()).slice(0, 4);

        if (displayProperties.length === 0) {
          featuredPropertiesContainer.innerHTML = '<div class="no-results">No properties found</div>';
          return;
        }

        featuredPropertiesContainer.innerHTML = displayProperties.map(createPropertyCard).join('');
      })
      .catch(error => {
        console.error('Error fetching properties:', error);
        featuredPropertiesContainer.innerHTML = '<div class="error">Failed to load properties. Please try again later.</div>';
      });
  }
  
  // Load category counts
  const categoriesSection = document.querySelector('.categories');
  if (categoriesSection) {
    fetchProperties()
      .then(properties => {
        console.log("Category count properties:", properties); // Debugging line
        
        const counts = {
          house: properties.filter(p => p.type === 'house').length,
          apartment: properties.filter(p => p.type === 'apartment').length,
          commercial: properties.filter(p => p.type === 'commercial').length,
          land: properties.filter(p => p.type === 'land').length
        };

        const categoryCards = categoriesSection.querySelectorAll('.category-card');
        categoryCards.forEach(card => {
          const propertyType = card.getAttribute('data-type');

          if (propertyType && counts[propertyType] !== undefined) {
            card.querySelector('p').textContent = `${counts[propertyType]} listings available`;
          }
        });
      })
      .catch(error => {
        console.error('Error fetching category counts:', error);
      });
  }

  // Initialize search functionality
  const searchBtn = document.querySelector('.search-btn');
  const searchInput = document.getElementById('searchInput');

  if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', () => {
      const searchQuery = searchInput.value.trim();
      if (searchQuery) {
        window.location.href = `buy.html?search=${encodeURIComponent(searchQuery)}`;
      }
    });

    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const searchQuery = searchInput.value.trim();
        if (searchQuery) {
          window.location.href = `buy.html?search=${encodeURIComponent(searchQuery)}`;
        }
      }
    });
  }
  
  // Fix category filtering in buy.html
  const categoryCards = document.querySelectorAll('.category-card');

  categoryCards.forEach(card => {
    card.addEventListener('click', () => {
      const propertyType = card.getAttribute('data-type');
      
      if (propertyType) {
        console.log("Redirecting to:", `buy.html?type=${propertyType}`); // Debugging line
        window.location.href = `buy.html?type=${propertyType}`;
      }
    });

    card.style.cursor = 'pointer';
  });

  // Ensure filtering works in buy.html
  const urlParams = new URLSearchParams(window.location.search);
  const selectedType = urlParams.get("type");

  if (selectedType) {
    console.log("Filtering for:", selectedType);
    
    fetchProperties().then(properties => {
      const filteredProperties = properties.filter(p => p.type === selectedType);
      const propertiesContainer = document.getElementById("property-list");

      if (filteredProperties.length > 0) {
        propertiesContainer.innerHTML = filteredProperties.map(createPropertyCard).join("");
      } else {
        propertiesContainer.innerHTML = '<div class="no-results">No listings available for this category.</div>';
      }
    });
  }
});
