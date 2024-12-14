// In your frontend's script.js
fetch('https://your-backend-service.onrender.com/api/endpoint')
  .then(response => response.json())
  .then(data => {
    console.log('Data from backend:', data);
    // You can now use the data to update your frontend
  })
  .catch(error => console.error('Error:', error));document.addEventListener("DOMContentLoaded", () => {
    // Smooth Scrolling for all links
    const smoothScrollLinks = document.querySelectorAll("a[href^='#']");
    smoothScrollLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // Add to Cart functionality
    function addToCart(productId) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        if (!cart.includes(productId)) {
            cart.push(productId);
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCount();
        } else {
            alert("This item is already in your cart!");
        }
    }

    // Update Cart Count in Header
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const cartCount = document.getElementById("cart-count");
        cartCount.textContent = cart.length;
    }

    // Fetch products from the backend
    fetch('/products') // Assuming backend API is set up
        .then(response => response.json())
        .then(products => {
            const productGrid = document.getElementById('product-grid');
            products.forEach(product => {
                const productElement = document.createElement('div');
                productElement.classList.add('product-item');
                productElement.setAttribute('data-category', product.category);
                productElement.innerHTML = `
                    <img src="${product.imageUrl}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>$${product.price}</p>
                    <button onclick="addToCart(${product.id})">Add to Cart</button>
                `;
                productGrid.appendChild(productElement);
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });

    // Category Filtering
    const categoryFilter = document.getElementById("category-filter");
    if (categoryFilter) {
        categoryFilter.addEventListener("change", (event) => {
            const selectedCategory = event.target.value;
            const productItems = document.querySelectorAll(".product-item");
            productItems.forEach(item => {
                const itemCategory = item.getAttribute("data-category");
                if (selectedCategory === "All" || selectedCategory === itemCategory) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });
        });
    }

    // Product Sorting (by Price)
    const sortSelect = document.getElementById("sort-select");
    if (sortSelect) {
        sortSelect.addEventListener("change", (event) => {
            const sortBy = event.target.value;
            const productGrid = document.getElementById('product-grid');
            let products = Array.from(productGrid.getElementsByClassName('product-item'));
            products.sort((a, b) => {
                const priceA = parseFloat(a.querySelector('p').textContent.replace('$', ''));
                const priceB = parseFloat(b.querySelector('p').textContent.replace('$', ''));
                if (sortBy === "price-low-to-high") {
                    return priceA - priceB;
                } else if (sortBy === "price-high-to-low") {
                    return priceB - priceA;
                }
                return 0; // Default (no sorting)
            });
            products.forEach(product => productGrid.appendChild(product));
        });
    }

    // Form Validation (Enhanced)
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const name = contactForm.name.value.trim();
            const email = contactForm.email.value.trim();
            const message = contactForm.message.value.trim();

            if (!name || !email || !message) {
                alert("Please fill out all fields.");
                return;
            }

            if (!validateEmail(email)) {
                alert("Please enter a valid email address.");
                return;
            }

            alert("Thank you for your message!");
            contactForm.reset();
        });
    }

    // Email Validation Function
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Call updateCartCount on page load to show the current cart count
    updateCartCount();
});
