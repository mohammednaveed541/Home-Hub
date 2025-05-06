// Utility functions shared across multiple files

// Function to create property card HTML
export function createPropertyCard(property) {
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
  
  return `
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
}

// Function to fetch properties from Firebase
export function fetchProperties(listingType = null) {
  return new Promise((resolve, reject) => {
    // In a real app, this would fetch from Firebase
    // For now, we'll use our sample data
    const sampleProperties = [
      {
        id: 1,
        title: "Modern Apartment with City View",
        price: 350000,
        type: "apartment",
        listingType: "sale",
        bedrooms: 2,
        bathrooms: 2,
        area: 1200,
        location: "Downtown, New York",
        image: "/placeholder.svg?height=400&width=600"
      },
      {
        id: 2,
        title: "Spacious Family House with Garden",
        price: 550000,
        type: "house",
        listingType: "sale",
        bedrooms: 4,
        bathrooms: 3,
        area: 2500,
        location: "Suburbia, California",
        image: "/placeholder.svg?height=400&width=600"
      },
      {
        id: 3,
        title: "Luxury Penthouse with Rooftop",
        price: 3500,
        type: "apartment",
        listingType: "rent",
        bedrooms: 3,
        bathrooms: 2,
        area: 1800,
        location: "Marina District, San Francisco",
        image: "/placeholder.svg?height=400&width=600"
      },
      {
        id: 4,
        title: "Cozy Studio in Historic Building",
        price: 1200,
        type: "apartment",
        listingType: "rent",
        bedrooms: 1,
        bathrooms: 1,
        area: 600,
        location: "Old Town, Chicago",
        image: "/placeholder.svg?height=400&width=600"
      },
      {
        id: 5,
        title: "Commercial Space for Business",
        price: 450000,
        type: "commercial",
        listingType: "sale",
        area: 3000,
        location: "Business District, Seattle",
        image: "/placeholder.svg?height=400&width=600"
      },
      {
        id: 6,
        title: "Waterfront Property with Dock",
        price: 850000,
        type: "house",
        listingType: "sale",
        bedrooms: 5,
        bathrooms: 4,
        area: 3200,
        location: "Lakeside, Michigan",
        image: "/placeholder.svg?height=400&width=600"
      }
    ];
    
    setTimeout(() => {
      let properties = [...sampleProperties];
      
      if (listingType) {
        properties = properties.filter(p => p.listingType === listingType);
      }
      
      resolve(properties);
    }, 500);
  });
}