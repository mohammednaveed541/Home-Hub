document.addEventListener('DOMContentLoaded', () => {
  // Check if user is logged in
  const currentUser = firebase.auth().currentUser;
  const database = firebase.database();
  
  // Update auth UI based on login status
  const authMessage = document.getElementById('auth-message');
  const sellForm = document.getElementById('sell-form');
  
  if (authMessage && sellForm) {
    if (currentUser) {
      authMessage.classList.add('hidden');
      sellForm.classList.remove('hidden');
    } else {
      authMessage.classList.remove('hidden');
      sellForm.classList.add('hidden');
    }
  }
  
  const imageInput = document.getElementById('images');
  const imagePreview = document.getElementById('image-preview');
  
  // Handle image preview
  if (imageInput) {
    imageInput.addEventListener('change', () => {
      imagePreview.innerHTML = '';
      
      if (imageInput.files.length > 0) {
        for (let i = 0; i < imageInput.files.length; i++) {
          const file = imageInput.files[i];
          
          if (!file.type.match('image.*')) {
            continue;
          }
          
          const reader = new FileReader();
          
          reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.className = 'preview-image';
            imagePreview.appendChild(img);
          };
          
          reader.readAsDataURL(file);
        }
      }
    });
  }
  
  // Handle form submission
  if (sellForm) {
    sellForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      if (!currentUser) {
        alert('You must be logged in to list a property');
        return;
      }
      
      const title = document.getElementById('title').value;
      const propertyType = document.getElementById('property-type').value;
      const price = document.getElementById('price').value;
      const area = document.getElementById('area').value;
      const bedrooms = document.getElementById('bedrooms').value || 0;
      const bathrooms = document.getElementById('bathrooms').value || 0;
      const address = document.getElementById('address').value;
      const description = document.getElementById('description').value;
      const listingType = document.getElementById('listing-type').value;
      const images = document.getElementById('images').files;
      
      if (!title || !propertyType || !price || !area || !address || !description || !listingType) {
        alert('Please fill in all required fields');
        return;
      }
      
      if (images.length === 0) {
        alert('Please upload at least one image');
        return;
      }
      
      // Show loading state
      const submitBtn = sellForm.querySelector('.submit-btn');
      submitBtn.textContent = 'Uploading...';
      submitBtn.disabled = true;
      
      // Process images to base64
      const imagePromises = [];
      
      for (let i = 0; i < images.length; i++) {
        const file = images[i];
        
        if (!file.type.match('image.*')) {
          continue;
        }
        
        const promise = new Promise((resolve, reject) => {
          const reader = new FileReader();
          
          reader.onload = function(e) {
            resolve(e.target.result);
          };
          
          reader.onerror = function(e) {
            reject(e);
          };
          
          reader.readAsDataURL(file);
        });
        
        imagePromises.push(promise);
      }
      
      Promise.all(imagePromises)
        .then(imageDataUrls => {
          // Create property object
          const property = {
            title,
            type: propertyType,
            price: parseInt(price),
            area: parseInt(area),
            bedrooms: parseInt(bedrooms),
            bathrooms: parseInt(bathrooms),
            address,
            description,
            listingType,
            images: imageDataUrls,
            userId: currentUser.uid,
            createdAt: new Date().toISOString()
          };
          
          // Save to Firebase
          return database.ref('properties').push(property);
        })
        .then(() => {
          alert('Property listed successfully!');
          
          // Redirect to appropriate page
          if (listingType === 'sale') {
            window.location.href = 'buy.html';
          } else {
            window.location.href = 'rent.html';
          }
        })
        .catch(error => {
          console.error('Error listing property:', error);
          alert('Failed to list property. Please try again.');
          submitBtn.textContent = 'List Property';
          submitBtn.disabled = false;
        });
    });
  }
});