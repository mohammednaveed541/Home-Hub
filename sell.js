// Import Firebase modules
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";
import { auth, database } from "./firebase-config.js"; // Ensure correct import path

document.addEventListener("DOMContentLoaded", () => {
  // Check if user is logged in
  onAuthStateChanged(auth, (user) => {
    const authMessage = document.getElementById("auth-message");
    const sellForm = document.getElementById("sell-form");

    if (user) {
      authMessage.classList.add("hidden");
      sellForm.classList.remove("hidden");
    } else {
      authMessage.classList.remove("hidden");
      sellForm.classList.add("hidden");
    }
  });

  // Update property type dropdown with subcategories
  const propertyTypeSelect = document.getElementById("property-type");
  if (propertyTypeSelect) {
    const categories = [
      { label: "Houses", subcategories: ["Single Family Home", "Townhouse", "Villa", "Cottage", "Waterfront"] },
      { label: "Apartments", subcategories: ["Standard Apartment", "Penthouse", "Studio", "Loft", "High-Rise"] },
      { label: "Commercial", subcategories: ["Office Space", "Retail Space", "Industrial", "Restaurant"] },
      { label: "Land", subcategories: ["Residential Land", "Commercial Land", "Agricultural Land"] }
    ];

    propertyTypeSelect.innerHTML = '<option value="">Select Type</option>';
    categories.forEach(category => {
      const optgroup = document.createElement("optgroup");
      optgroup.label = category.label;

      category.subcategories.forEach(subcategory => {
        const option = document.createElement("option");
        option.value = subcategory.toLowerCase().replace(/\s/g, "-");
        option.textContent = subcategory;
        optgroup.appendChild(option);
      });

      propertyTypeSelect.appendChild(optgroup);
    });
  }

  // Handle image upload and preview
  const imageInput = document.getElementById("images");
  const imagePreview = document.getElementById("image-preview");

  if (imageInput) {
    imageInput.addEventListener("change", () => {
      imagePreview.innerHTML = "";

      Array.from(imageInput.files).forEach(file => {
        if (!file.type.match("image.*")) return;

        const reader = new FileReader();
        reader.onload = (e) => {
          const img = document.createElement("img");
          img.src = e.target.result;
          img.className = "preview-image";
          imagePreview.appendChild(img);
        };

        reader.readAsDataURL(file);
      });
    });
  }

  // Handle form submission
  const sellForm = document.getElementById("sell-form");
  if (sellForm) {
    sellForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const user = auth.currentUser;
      if (!user) {
        alert("You must be logged in to list a property");
        return;
      }

      const title = document.getElementById("title").value;
      const propertyType = document.getElementById("property-type").value;
      const price = document.getElementById("price").value;
      const area = document.getElementById("area").value;
      const bedrooms = document.getElementById("bedrooms").value || 0;
      const bathrooms = document.getElementById("bathrooms").value || 0;
      const address = document.getElementById("address").value;
      const description = document.getElementById("description").value;
      const listingType = document.getElementById("listing-type").value;
      const images = document.getElementById("images").files;

      if (!title || !propertyType || !price || !area || !address || !description || !listingType) {
        alert("Please fill in all required fields");
        return;
      }

      if (images.length === 0) {
        alert("Please upload at least one image");
        return;
      }

      // Convert images to Base64
      const imageDataUrls = await Promise.all(
        Array.from(images).map(file =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          })
        )
      );

      // Store data in Firebase Database
      try {
        await push(ref(database, "properties"), {
          title,
          propertyType,
          price: parseInt(price),
          area: parseInt(area),
          bedrooms: parseInt(bedrooms),
          bathrooms: parseFloat(bathrooms),
          address,
          description,
          listingType,
          images: imageDataUrls,
          userId: user.uid,
          createdAt: new Date().toISOString()
        });

        alert("Property listed successfully!");
        window.location.href = listingType === "sale" ? "buy.html" : "rent.html";
      } catch (error) {
        alert(`Failed to list property: ${error.message}`);
      }
    });
  }
});
