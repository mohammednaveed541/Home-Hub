import { fetchProperties, createPropertyCard } from './utils.js';

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
    fetchProperties('sale')
      .then(properties => {
        // Filter by search query if present
        if (searchQuery) {
          properties = properties.filter(property => 
            property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            property.subType.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        
        if (properties.length === 0) {
          propertiesContainer.innerHTML = '<div class="no-results">No properties found matching your criteria</div>';
          return;
        }
        
        let propertiesHTML = '';
        properties.forEach(property => {
          propertiesHTML += createPropertyCard(property);
        });
        
        propertiesContainer.innerHTML = propertiesHTML;
      })
      .catch(error => {
        console.error('Error fetching properties:', error);
        propertiesContainer.innerHTML = '<div class="error">Failed to load properties. Please try again later.</div>';
      });
  }
  
  // Update property type filter to include subtypes
  const propertyTypeSelect = document.getElementById('property-type');
  if (propertyTypeSelect) {
    // Clear existing options
    propertyTypeSelect.innerHTML = '<option value="">Property Type</option>';
    
    // Add main categories
    const categories = [
      { value: 'house', label: 'Houses' },
      { value: 'apartment', label: 'Apartments' },
      { value: 'commercial', label: 'Commercial' },
      { value: 'land', label: 'Land' }
    ];
    
    // Add subcategories
    const subcategories = [
      { value: 'house-single-family', label: '- Single Family Home' },
      { value: 'house-townhouse', label: '- Townhouse' },
      { value: 'house-villa', label: '- Villa' },
      { value: 'house-cottage', label: '- Cottage' },
      { value: 'house-waterfront', label: '- Waterfront' },
      { value: 'apartment-standard', label: '- Standard Apartment' },
      { value: 'apartment-penthouse', label: '- Penthouse' },
      { value: 'apartment-studio', label: '- Studio' },
      { value: 'apartment-loft', label: '- Loft' },
      { value: 'apartment-high-rise', label: '- High-Rise' },
      { value: 'commercial-office', label: '- Office Space' },
      { value: 'commercial-retail', label: '- Retail Space' },
      { value: 'commercial-industrial', label: '- Industrial' },
      { value: 'commercial-restaurant', label: '- Restaurant' },
      { value: 'land-residential', label: '- Residential Land' },
      { value: 'land-commercial', label: '- Commercial Land' },
      { value: 'land-agricultural', label: '- Agricultural Land' }
    ];
    
    // Add options to select
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category.value;
      option.textContent = category.label;
      propertyTypeSelect.appendChild(option);
    });
    
    subcategories.forEach(subcategory => {
      const option = document.createElement('option');
      option.value = subcategory.value;
      option.textContent = subcategory.label;
      propertyTypeSelect.appendChild(option);
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
      
      // Show loading state
      propertiesContainer.innerHTML = '<div class="loading">Filtering properties...</div>';
      
      // In a real app, this would filter from Firebase
      // For now, we'll filter our sample data
      fetchProperties('sale')
        .then(properties => {
          // Apply filters
          let filteredProperties = properties;
          
          if (propertyType) {
            if (propertyType.includes('-')) {
              // This is a subcategory filter
              const [type, subType] = propertyType.split('-');
              filteredProperties = filteredProperties.filter(p => 
                p.type === type && p.subType === subType
              );
            } else {
              // This is a main category filter
              filteredProperties = filteredProperties.filter(p => p.type === propertyType);
            }
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
              p.bedrooms >= parseInt(bedrooms) || p.type === 'commercial' || p.type === 'land'
            );
          }
          
          if (bathrooms) {
            filteredProperties = filteredProperties.filter(p => 
              p.bathrooms >= parseInt(bathrooms) || p.type === 'commercial' || p.type === 'land'
            );
          }
          
          if (filteredProperties.length === 0) {
            propertiesContainer.innerHTML = '<div class="no-results">No properties found matching your criteria</div>';
            return;
          }
          
          let propertiesHTML = '';
          filteredProperties.forEach(property => {
            propertiesHTML += createPropertyCard(property);
          });
          
          propertiesContainer.innerHTML = propertiesHTML;
        })
        .catch(error => {
          console.error('Error filtering properties:', error);
          propertiesContainer.innerHTML = '<div class="error">Failed to filter properties. Please try again.</div>';
        });
    });
  }
});