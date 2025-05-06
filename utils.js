// Sample data for properties with expanded categories
const sampleProperties = [
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
      image: "assets/property-2.jpg?height=400&width=600",
      featured: true
    },
    {
      id: 2,
      title: "Luxury Penthouse ",
      price: 3500,
      type: "apartment",
      subType: "penthouse",
      listingType: "rent",
      bedrooms: 3,
      bathrooms: 2,
      area: 1800,
      location: "Marina District, San Francisco",
      image: "assets/property-5.jpg?height=400&width=600",
      featured: true
    },
    {
      id: 3,
      title: "Industrial Loft Apartment",
      price: 420000,
      type: "apartment",
      subType: "loft",
      listingType: "sale",
      bedrooms: 1,
      bathrooms: 1,
      area: 950,
      location: "Arts District, Los Angeles",
      image: "assets/property-6.jpg?height=400&width=600"

    },
    {
      id: 4,
      title: "Waterfront Property with Dock",
      price: 850000,
      type: "house",
      subType: "waterfront",
      listingType: "sale",
      bedrooms: 5,
      bathrooms: 4,
      area: 3200,
      location: "Lakeside, Michigan",
      image: "assets/pexels-pixabay-276387 (1).jpg?height=400&width=600",
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
      image: "assets/property-1.jpg?height=400&width=600"
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
      image: "assets/property-3.jpg?height=400&width=600",
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
      image: "assets/property-4.jpg?height=400&width=600"
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
      image: "https://www.pexels.com/photo/view-of-a-loft-style-living-room-with-a-brown-leather-sofa-20337840/?height=400&width=600"
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
      image: "https://pxhere.com/en/photo/1043708?height=400&width=600"
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
      image: "https://www.pexels.com/photo/high-rise-buildings-during-night-time-4270292/?height=400&width=600"
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
      image: "https://www.pexels.com/photo/empty-escalators-inside-building-54581/?height=400&width=600"
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
      image: "https://www.freepik.com/free-ai-image/photorealistic-scene-with-warehouse-logistics-operations_186748568.htm#fromView=keyword&page=1&position=4&uuid=63073515-d482-4749-92aa-55d708ac04a2&query=Warehouse+Loading+Docks?height=400&width=600"
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
      image: "https://www.pexels.com/photo/kitchen-bar-interior-design-of-modern-business-331107/?height=400&width=600"
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
      title: "Waterfront Dock",
      price: 350000,
      type: "house",
      subType: "waterfront",
      listingType: "sale",
      bedrooms: 5,
      bathrooms: 4,
      area: 3200,
      location: "Lakeside, Michigan",
      image: "assets/pexels-robertkso-11643801.jpg?height=400&width=600",
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
        categoryLabel = `${capitalize(property.subType)} Home`;
        break;
      case 'apartment':
        categoryLabel = `${capitalize(property.subType)} Apartment`;
        break;
      case 'commercial':
        categoryLabel = `${capitalize(property.subType)} Space`;
        break;
      case 'land':
        categoryLabel = `${capitalize(property.subType)} Land`;
        break;
      default:
        categoryLabel = capitalize(property.type);
    }
  
    return categoryLabel;
  }
  
  // Function to capitalize words
  function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  
  // Function to fetch properties (mocked for now)
  function fetchProperties(listingType = null) {
    return new Promise((resolve) => {
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
  export { createPropertyCard, fetchProperties, sampleProperties };
  