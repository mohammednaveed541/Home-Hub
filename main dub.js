import { fetchProperties, createPropertyCard, sampleProperties} from './utils dub.js';

document.addEventListener('DOMContentLoaded', () => {
  // Load featured properties on homepage
  const featuredPropertiesContainer = document.getElementById('featured-properties');
  
  if (featuredPropertiesContainer) {
    // Show loading state
    featuredPropertiesContainer.innerHTML = '<div class="loading">Loading featured properties...</div>';
    
    // Get featured properties
    fetchProperties()
      .then(properties => {
        // Filter for featured properties
        const featuredProperties = properties.filter(p => p.featured);
        
        // If no featured properties, get random ones
        let displayProperties = featuredProperties.length > 0 
          ? featuredProperties 
          : properties.sort(() => 0.5 - Math.random()).slice(0, 4);
        
        if (displayProperties.length === 0) {
          featuredPropertiesContainer.innerHTML = '<div class="no-results">No properties found</div>';
          return;
        }
        
        let propertiesHTML = '';
        displayProperties.forEach(property => {
          propertiesHTML += createPropertyCard(property);
        });
        
        featuredPropertiesContainer.innerHTML = propertiesHTML;
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
        // Count properties by type
        const counts = {
          house: properties.filter(p => p.type === 'house').length,
          apartment: properties.filter(p => p.type === 'apartment').length,
          commercial: properties.filter(p => p.type === 'commercial').length,
          land: properties.filter(p => p.type === 'land').length
        };
        
        // Update category cards with counts
        const categoryCards = categoriesSection.querySelectorAll('.category-card');
        categoryCards.forEach(card => {
          const heading = card.querySelector('h3').textContent.toLowerCase();
          
          if (heading.includes('house')) {
            card.querySelector('p').textContent = `${counts.house} listings available`;
          } else if (heading.includes('apartment')) {
            card.querySelector('p').textContent = `${counts.apartment} listings available`;
          } else if (heading.includes('commercial')) {
            card.querySelector('p').textContent = `${counts.commercial} listings available`;
          } else if (heading.includes('land')) {
            card.querySelector('p').textContent = `${counts.land} listings available`;
          }
        });
      })
      .catch(error => {
        console.error('Error fetching category counts:', error);
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
    
    // Also enable search on Enter key press
    const searchInput = document.querySelector('.search-container input');
    if (searchInput) {
      searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          if (searchInput.value.trim()) {
            window.location.href = `buy.html?search=${encodeURIComponent(searchInput.value.trim())}`;
          }
        }
      });
    }
  }
  
  // Add category links to the category cards
  const categoryCards = document.querySelectorAll('.category-card');
  if (categoryCards.length > 0) {
    categoryCards.forEach(card => {
      card.addEventListener('click', () => {
        const heading = card.querySelector('h3').textContent.toLowerCase();
        let propertyType = '';
        
        if (heading.includes('house')) {
          propertyType = 'house';
        } else if (heading.includes('apartment')) {
          propertyType = 'apartment';
        } else if (heading.includes('commercial')) {
          propertyType = 'commercial';
        } else if (heading.includes('land')) {
          propertyType = 'land';
        }
        
        if (propertyType) {
          window.location.href = `buy.html?type=${propertyType}`;
        }
      });
      
      // Add cursor pointer to show it's clickable
      card.style.cursor = 'pointer';
    });
  }
});