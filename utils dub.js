// Utility functions shared across multiple files

// Sample data for properties with expanded categories
const sampleProperties = [
  // Houses
  {
    id: 1,
    title: "Modern Single-Family Home",
    price: 450000,
    type: "house",
    subType: "single-family",
    listingType: "sale",
    bedrooms: 4,
    bathrooms: 3,
    area: 2200,
    location: "Maple Heights, Seattle",
    image: "https://plus.unsplash.com/premium_photo-1661915661139-5b6a4e4a6fcc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW9kZXJuJTIwaG91c2V8ZW58MHx8MHx8fDA%3D?height=400&width=600",
    featured: true
  },
  {
    id: 2,
    title: "Spacious Family House with Garden",
    price: 550000,
    type: "house",
    subType: "single-family",
    listingType: "sale",
    bedrooms: 5,
    bathrooms: 3,
    area: 2800,
    location: "Suburbia, California",
    image: "https://unsplash.com/photos/white-and-brown-concrete-building-hHz4yrvxwlA?height=400&width=600",
    featured: true
  },
  {
    id: 3,
    title: "Luxury Townhouse in Gated Community",
    price: 375000,
    type: "house",
    subType: "townhouse",
    listingType: "sale",
    bedrooms: 3,
    bathrooms: 2.5,
    area: 1850,
    location: "Parkview, Boston",
    image: "assets\property-1.jpg?height=400&width=600"
  },
  {
    id: 4,
    title: "Mediterranean Villa with Pool",
    price: 890000,
    type: "house",
    subType: "villa",
    listingType: "sale",
    bedrooms: 6,
    bathrooms: 5,
    area: 4200,
    location: "Palm Beach, Florida",
    image: "/placeholder.svg?height=400&width=600",
    featured: true
  },
  {
    id: 5,
    title: "Cozy Cottage Near Lake",
    price: 2200,
    type: "house",
    subType: "cottage",
    listingType: "rent",
    bedrooms: 2,
    bathrooms: 1,
    area: 1100,
    location: "Lakeside, Michigan",
    image: "https://source.unsplash.com/600x400/?house,modern"
  },
  
  // Apartments
  {
    id: 6,
    title: "Modern Apartment with City View",
    price: 350000,
    type: "apartment",
    subType: "standard",
    listingType: "sale",
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    location: "Downtown, New York",
    image: "/placeholder.svg?height=400&width=600"
  },
  {
    id: 7,
    title: "Luxury Penthouse with Rooftop",
    price: 3500,
    type: "apartment",
    subType: "penthouse",
    listingType: "rent",
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    location: "Marina District, San Francisco",
    image: "/placeholder.svg?height=400&width=600",
    featured: true
  },
  {
    id: 8,
    title: "Cozy Studio in Historic Building",
    price: 1200,
    type: "apartment",
    subType: "studio",
    listingType: "rent",
    bedrooms: 0,
    bathrooms: 1,
    area: 600,
    location: "Old Town, Chicago",
    image: "/placeholder.svg?height=400&width=600"
  },
  {
    id: 9,
    title: "Industrial Loft Apartment",
    price: 420000,
    type: "apartment",
    subType: "loft",
    listingType: "sale",
    bedrooms: 1,
    bathrooms: 1,
    area: 950,
    location: "Arts District, Los Angeles",
    image: "/placeholder.svg?height=400&width=600"
  },
  {
    id: 10,
    title: "High-Rise Apartment with Balcony",
    price: 2800,
    type: "apartment",
    subType: "high-rise",
    listingType: "rent",
    bedrooms: 2,
    bathrooms: 2,
    area: 1100,
    location: "Financial District, Chicago",
    image: "/placeholder.svg?height=400&width=600"
  },
  
  // Commercial
  {
    id: 11,
    title: "Downtown Office Space",
    price: 450000,
    type: "commercial",
    subType: "office",
    listingType: "sale",
    area: 3000,
    location: "Business District, Seattle",
    image: "/placeholder.svg?height=400&width=600"
  },
  {
    id: 12,
    title: "Retail Space in Shopping Center",
    price: 4500,
    type: "commercial",
    subType: "retail",
    listingType: "rent",
    area: 2500,
    location: "Mall Avenue, Dallas",
    image: "/placeholder.svg?height=400&width=600"
  },
  {
    id: 13,
    title: "Industrial Warehouse with Loading Docks",
    price: 780000,
    type: "commercial",
    subType: "industrial",
    listingType: "sale",
    area: 12000,
    location: "Industrial Park, Houston",
    image: "/placeholder.svg?height=400&width=600"
  },
  {
    id: 14,
    title: "Restaurant Space with Kitchen",
    price: 5200,
    type: "commercial",
    subType: "restaurant",
    listingType: "rent",
    area: 1800,
    location: "Culinary District, Portland",
    image: "/placeholder.svg?height=400&width=600"
  },
  
  // Land
  {
    id: 15,
    title: "Residential Building Lot",
    price: 120000,
    type: "land",
    subType: "residential",
    listingType: "sale",
    area: 8500,
    location: "Hillside Estates, Denver",
    image: "/placeholder.svg?height=400&width=600"
  },
  {
    id: 16,
    title: "Commercial Development Land",
    price: 950000,
    type: "land",
    subType: "commercial",
    listingType: "sale",
    area: 43560, // 1 acre
    location: "Highway Junction, Phoenix",
    image: "/placeholder.svg?height=400&width=600"
  },
  {
    id: 17,
    title: "Agricultural Land with Water Rights",
    price: 650000,
    type: "land",
    subType: "agricultural",
    listingType: "sale",
    area: 217800, // 5 acres
    location: "Fertile Valley, Oregon",
    image: "/placeholder.svg?height=400&width=600"
  },
  {
    id: 18,
    title: "Waterfront Property with Dock",
    price: 850000,
    type: "house",
    subType: "waterfront",
    listingType: "sale",
    bedrooms: 5,
    bathrooms: 4,
    area: 3200,
    location: "Lakeside, Michigan",
    image: "/placeholder.svg?height=400&width=600",
    featured: true
  }
];

// Function to create property card HTML
function createPropertyCard(property) {
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
        <div class="property-category">${getCategoryLabel(property)}</div>
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

// Helper function to get a formatted category label
function getCategoryLabel(property) {
  let categoryLabel = '';
  
  switch(property.type) {
    case 'house':
      categoryLabel = property.subType.charAt(0).toUpperCase() + property.subType.slice(1) + ' Home';
      break;
    case 'apartment':
      categoryLabel = property.subType.charAt(0).toUpperCase() + property.subType.slice(1) + ' Apartment';
      break;
    case 'commercial':
      categoryLabel = property.subType.charAt(0).toUpperCase() + property.subType.slice(1) + ' Space';
      break;
    case 'land':
      categoryLabel = property.subType.charAt(0).toUpperCase() + property.subType.slice(1) + ' Land';
      break;
    default:
      categoryLabel = property.type.charAt(0).toUpperCase() + property.type.slice(1);
  }
  
  return categoryLabel;
}

// Function to fetch properties from Firebase
function fetchProperties(listingType = null) {
  return new Promise((resolve, reject) => {
    // In a real app, this would fetch from Firebase
    // For now, we'll use our sample data
    setTimeout(() => {
      let properties = [...sampleProperties];
      
      if (listingType) {
        properties = properties.filter(p => p.listingType === listingType);
      }
      
      resolve(properties);
    }, 500);
  });
}

// Export functions for use in other files
window.createPropertyCard = createPropertyCard;
window.fetchProperties = fetchProperties;
window.sampleProperties = sampleProperties;