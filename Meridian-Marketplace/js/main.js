document.addEventListener('DOMContentLoaded', () => {
    
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        // This is the animation code, only runs on the homepage
        const title = document.querySelector(".empowering-title");
        const subtitle = document.querySelector(".empowering-subtitle");

        if (title && subtitle) {
            const text = "Empowering Local Artisans 🌍";
            let index = 0;
            const typingSpeed = 100; // Speed of the typing effect in milliseconds

            function typeEffect() {
                if (index < text.length) {
                    title.textContent += text.charAt(index);
                    index++;
                    setTimeout(typeEffect, typingSpeed);
                } else {
                    // Typing is complete, now remove the blinking cursor
                    title.classList.add("typing-end");
                    
                    // Show subtitle after a short delay
                    setTimeout(() => {
                        subtitle.classList.add("visible");
                    }, 500);
                }
            }
            typeEffect();
        }
    }

    // --- Element Selectors ---
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const navActions = document.querySelector('.nav-actions');
    const cartCount = document.getElementById('cart-count');
    const searchForm = document.getElementById('search-form');
    const searchBar = document.getElementById('search-bar');
    const productGrid = document.getElementById('product-grid');
    const artisanGrid = document.getElementById('artisan-grid');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalContainer = document.getElementById('cart-total');
    const filterCheckboxes = document.querySelectorAll('.filters-container input[type="checkbox"]');
    const checkoutBtn = document.getElementById('checkout-btn');
    const paymentMessage = document.getElementById('payment-message');
    const discountMessage = document.getElementById('discount-message');
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    // Game selectors
    const gameContainer = document.getElementById('game-container');
    const productDisplay = document.getElementById('product-display');
    const scoreDisplay = document.getElementById('score');
    const progressText = document.getElementById('progress-text');
    const sustainableBtn = document.getElementById('sustainable-btn');
    const notSustainableBtn = document.getElementById('not-sustainable-btn');
    const feedbackMessage = document.getElementById('feedback-message');
    const progressBar = document.getElementById('progress-bar');
    const gameControls = document.querySelector('.game-controls');

    

    // Assuming these data arrays are available in a separate file (e.g., data.js)
    const products = [
        {
            id: 1, name: "Hand-Painted Vase", price: 45, artisan: "Elena Rodriguez", category: "pottery", region: "mexico", material: "clay", gender: "women", isFairTrade: true, isCarbonNeutral: false, sustainabilityMetric: "Organic", image: "assets/images/product1.webp"
        },
        {
            id: 2, name: "Eco-Friendly Yoga Mat", price: 75, artisan: "Aisha Khan", category: "yoga", region: "india", material: "cotton", gender: "women", isFairTrade: true, isCarbonNeutral: true, sustainabilityMetric: "Biodegradable", image: "assets/images/product2.webp"
        },
        {
            id: 3, name: "Artisan Coffee Blend", price: 22, artisan: "Marco Rossi", category: "organic", region: "italy", material: "herbs", gender: "men", isFairTrade: true, isCarbonNeutral: true, sustainabilityMetric: "Organic", image: "assets/images/product3.webp"
        },
        {
            id: 4, name: "Handwoven Scarf", price: 55, artisan: "Sofia Petrova", category: "accessories", region: "vietnam", material: "cotton", gender: "women", isFairTrade: true, isCarbonNeutral: false, sustainabilityMetric: "Handcrafted", image: "assets/images/product4.webp"
        },
        {
            id: 5, name: "Clay & Herb Infuser", price: 30, artisan: "Wei Chen", category: "herbal", region: "china", material: "clay", gender: "men", isFairTrade: false, isCarbonNeutral: false, sustainabilityMetric: "Handcrafted", image: "assets/images/product5.webp"
        },
        {
            id: 6, name: "Regional Spice Set", price: 40, artisan: "Javier Morales", category: "regional", region: "mexico", material: "herbs", gender: "men", isFairTrade: true, isCarbonNeutral: true, sustainabilityMetric: "Organic", image: "assets/images/product6.webp"
        },
        {
            id: 7, name: "Carved Wooden Bowl", price: 120, artisan: "Lena Schmidt", category: "woodwork", region: "mexico", material: "wood", gender: "women", isFairTrade: false, isCarbonNeutral: false, sustainabilityMetric: "Biodegradable", image: "assets/images/product7.webp"
        },
        {
            id: 8, name: "Ceramic Tea Set", price: 95, artisan: "Kenji Tanaka", category: "pottery", region: "japan", material: "clay", gender: "men", isFairTrade: true, isCarbonNeutral: true, sustainabilityMetric: "Handcrafted", image: "assets/images/product8.webp"
        },
        {
            id: 9, name: "Hand-Stitched Quilt", price: 210, artisan: "Anya Petrova", category: "accessories", region: "russia", material: "cotton", gender: "women", isFairTrade: false, isCarbonNeutral: true, sustainabilityMetric: "Handcrafted", image: "assets/images/product9.webp"
        },
        {
            id: 10, name: "Essential Oil Diffuser", price: 65, artisan: "Chloé Dubois", category: "herbal", region: "russia", material: "wood", gender: "women", isFairTrade: true, isCarbonNeutral: false, sustainabilityMetric: "Biodegradable", image: "assets/images/product10.webp"
        },
        {
            id: 11, name: "Peruvian Loom", price: 110, artisan: "Maria Flores", category: "accessories", region: "peru", material: "cotton", gender: "women", isFairTrade: true, isCarbonNeutral: true, sustainabilityMetric: "Handcrafted", image: "assets/images/product11.webp"
        },
        {
            id: 12, name: "Eco-friendly Basket", price: 45, artisan: "Sanjay Patel", category: "home", region: "india", material: "jute", gender: "men", isFairTrade: true, isCarbonNeutral: false, sustainabilityMetric: "Biodegradable", image: "assets/images/product12.webp"
        }
    ];

    const artisans = [
        {
            id: 1, name: "Elena Rodriguez", location: "Oaxaca, Mexico", bio: "Traditional oaxacan pottery artist with a modern touch.", badge: "Fair Trade", gender: "women", image: "assets/images/artisan1.webp"
        },
        {
            id: 2, name: "Aisha Khan", location: "Kerala, India", bio: "Eco-friendly wellness crafts inspired by Ayurveda.", badge: "Eco-Friendly", gender: "women", image: "assets/images/artisan2.webp"
        },
        {
            id: 3, name: "Marco Rossi", location: "Tuscany, Italy", bio: "Organic coffee blends crafted with Italian passion.", badge: "Organic Certified", gender: "men", image: "assets/images/artisan3.webp"
        }
    ];

    // --- Mobile Menu Toggle ---
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navActions.classList.toggle('active');
        });
    }
    function showCartToast(message = "Product added to cart 🛒") {
    const toast = document.getElementById("cart-toast");
    const toastMessage = document.getElementById("cart-toast-message");

    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}


    // --- Cart Functions (Frontend Only) ---
    function getCartItems() {
        return JSON.parse(localStorage.getItem('cartItems')) || [];
    }

    function updateCartCount() {
        const cartItems = getCartItems();
        if (cartCount) {
            cartCount.textContent = cartItems.length;
        }
    }

    function addToCart(productId) {
    const cartItems = getCartItems();
    const productToAdd = products.find(p => p.id === productId);
    if (productToAdd) {
        cartItems.push(productToAdd);
        
        // Store both formats for compatibility
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        
        // Also store just IDs for cart.html compatibility
        const cartIds = cartItems.map(item => item.id);
        localStorage.setItem('cartItemIds', JSON.stringify(cartIds));
        
        updateCartCount();

         showCartToast(`${productToAdd.name} added to cart`);
    }
}


function removeFromCart(productId) {
    const cartItems = getCartItems();
    const updatedItems = cartItems.filter(item => item.id !== productId);
    
    // Update both storage formats
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    const cartIds = updatedItems.map(item => item.id);
    localStorage.setItem('cartItemIds', JSON.stringify(cartIds));
    
    updateCartCount();
    renderCart(); // Re-render cart after removal
}

    function processPayment() {
    localStorage.removeItem('cartItems');
    localStorage.removeItem('cartItemIds');
    localStorage.removeItem('discountApplied');
    renderCart();
    updateCartCount();
    if (checkoutBtn) {
        checkoutBtn.style.display = 'none';
    }
    if (paymentMessage) {
        paymentMessage.textContent = 'Payment Successful! Thank you for your purchase.';
        paymentMessage.style.display = 'block';
    }
}

    const contactBtn = document.getElementById('contact-btn');
    const contactModal = document.getElementById('contact-modal');
    const closeBtn = document.querySelector('.close-btn');

    if (contactBtn && contactModal && closeBtn) {
        contactBtn.addEventListener('click', () => {
            contactModal.style.display = 'flex';
        });

        closeBtn.addEventListener('click', () => {
            contactModal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === contactModal) {
                contactModal.style.display = 'none';
            }
        });
    }

    // --- Dynamic Content Rendering ---
    const renderProducts = (productsToRender) => {
    if (!productGrid) return;

    productGrid.innerHTML = ''; // Clear existing products
    const productCards = []; // Store the created cards

    if (productsToRender.length === 0) {
        productGrid.innerHTML = '<p class="no-products-found">No products found. Try a different search or filter!</p>';
    } else {
        productsToRender.forEach((product, index) => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="artisan-name">by ${product.artisan}</p>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <button class="add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
                </div>
            `;
            productGrid.appendChild(productCard);
            productCards.push(productCard); // Add the card to our array
        });

        // Loop through the cards and add the 'loaded' class with a delay
        productCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('loaded');
            }, index * 150); // 150ms delay between each product
        });
    }

    // Add event listeners for 'Add to Cart' buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.productId);
            addToCart(productId);
        });
    });
};

   const renderArtisans = (artisansToRender) => {
    if (!artisanGrid) return;

    artisanGrid.innerHTML = '';

    artisansToRender.forEach((artisan, index) => {
        const artisanCard = document.createElement('div');
        artisanCard.className = 'artisan-card';

        artisanCard.innerHTML = `
            <img src="${artisan.image}" alt="${artisan.name}" class="artisan-photo">

            <div class="artisan-info">
                <h3>${artisan.name}</h3>
                <p class="artisan-location">${artisan.location}</p>
                <span class="artisan-badge">${artisan.badge}</span>
                <p class="artisan-bio">${artisan.bio}</p>

                <div class="artisan-actions">
                    <a href="contact.html?artisan=${encodeURIComponent(artisan.name)}"
                       class="artisan-btn primary">
                        Contact Artisan
                    </a>

                    <a href="products.html?artisan=${encodeURIComponent(artisan.name)}"
                       class="artisan-btn secondary">
                        View Products
                    </a>
                </div>
            </div>
        `;

        artisanGrid.appendChild(artisanCard);

        setTimeout(() => {
            artisanCard.classList.add('loaded');
        }, index * 150);
    });
};


    const renderCart = () => {
    if (!cartItemsContainer || !cartTotalContainer) return;
    const cartItems = getCartItems();
    let total = 0;
    cartItemsContainer.innerHTML = '';
    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align:center;">Your cart is empty. Start shopping!</p>';
        if (checkoutBtn) {
            checkoutBtn.style.display = 'none';
        }
        if (gameContainer) {
            gameContainer.style.display = 'none';
        }
    } else {
        cartItems.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';
            itemDiv.innerHTML = `
                <img 
             src="${item.image}" 
             alt="${item.name}" 
                class="cart-item-img"
             
>

                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})" style="
                    background: #C76B6B;
                    color: white;
                    border: none;
                    padding: 0.5rem 1rem;
                    border-radius: 5px;
                    cursor: pointer;
                    margin-left: auto;
                ">Remove</button>
            `;
            cartItemsContainer.appendChild(itemDiv);
            total += item.price;
        });
        // ... rest of the function remains the same
    }
    // ... rest of total calculation remains the same
};

    // --- Filtering Logic ---

function applyFilters() {
    const categoryFilters = document.querySelectorAll('input[name="category"]:checked');
    const priceFilters = document.querySelectorAll('input[name="price"]:checked');
    const regionFilters = document.querySelectorAll('input[name="region"]:checked');
    const materialFilters = document.querySelectorAll('input[name="material"]:checked');
    const sustainabilityFilters = document.querySelectorAll('input[name="sustainabilityMetric"]:checked'); // Selects the checkboxes

    const selectedCategories = Array.from(categoryFilters).map(cb => cb.value.toLowerCase());
    const selectedPrices = Array.from(priceFilters).map(cb => cb.value);
    const selectedRegions = Array.from(regionFilters).map(cb => cb.value.toLowerCase());
    const selectedMaterials = Array.from(materialFilters).map(cb => cb.value.toLowerCase());
    const selectedSustainability = Array.from(sustainabilityFilters).map(cb => cb.value.toLowerCase()); // Maps the values

    let filteredProducts = products;

    if (selectedCategories.length > 0) {
        filteredProducts = filteredProducts.filter(product => {
            const productCategory = product.category ? product.category.toLowerCase() : '';
            const productGender = product.gender ? product.gender.toLowerCase() : '';
            return selectedCategories.includes(productCategory) || selectedCategories.includes(productGender);
        });
    }

    if (selectedPrices.length > 0) {
        filteredProducts = filteredProducts.filter(product => {
            const productPrice = product.price;
            return selectedPrices.some(range => {
                // Correctly handles the ">" case
                if (range.includes('>')) {
                    const min = parseInt(range.replace('>', ''));
                    return productPrice > min;
                }
                const [min, max] = range.split('-').map(Number);
                return productPrice >= min && productPrice <= max;
            });
        });
    }

    if (selectedRegions.length > 0) {
        filteredProducts = filteredProducts.filter(product =>
            product.region && selectedRegions.includes(product.region.toLowerCase())
        );
    }

    if (selectedMaterials.length > 0) {
        filteredProducts = filteredProducts.filter(product =>
            product.material && selectedMaterials.includes(product.material.toLowerCase())
        );
    }
    
    // Add this block to filter by Sustainability Metric
    if (selectedSustainability.length > 0) {
        filteredProducts = filteredProducts.filter(product =>
            product.sustainabilityMetric && selectedSustainability.includes(product.sustainabilityMetric.toLowerCase())
        );
    }
    

    renderProducts(filteredProducts);
}
    
    // --- Game Logic ---
    let shuffledProducts = [];
    let currentIndex = 0;
    let score = 0;
    const totalRounds = 5;

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

        function startGame() {
    shuffledProducts = shuffleArray(
        products.map(p => ({ ...p }))
    );
    currentIndex = 0;
    score = 0;
    gameControls.style.display = 'flex';
    feedbackMessage.style.display = 'none';
    productDisplay.innerHTML = '';
    updateDisplay();
}


    function updateDisplay() {
        if (currentIndex >= totalRounds) {
            endGame();
            return;
        }
        // 🔹 Sustainability progress update
const progressPercent = Math.round((score / totalRounds) * 100);

// Update progress bar
progressBar.style.width = `${progressPercent}%`;

// Update points badge (if exists)
const pointsBadge = document.querySelector('.points-badge');
if (pointsBadge) {
    pointsBadge.textContent = `${score * 10} Points`;
}

        
        const currentProduct = shuffledProducts[currentIndex];

        productDisplay.innerHTML = `
    <img
        src="${currentProduct.image}"
        alt="${currentProduct.name}"
        style="
            max-width: 180px;
            height: auto;
            border-radius: 10px;
            margin-bottom: 1rem;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        "
    >
    <h3>${currentProduct.name}</h3>
    <p>by ${currentProduct.artisan}</p>
`;


        
        scoreDisplay.textContent = `Score: ${score}`;
        progressText.textContent = `${currentIndex + 1} of ${totalRounds}`;
        const progressPercentage = ((currentIndex + 1) / totalRounds) * 100;
        progressBar.style.width = `${progressPercentage}%`;
    }

    function checkAnswer(isSustainableChoice) {
        const currentProduct = shuffledProducts[currentIndex];
        const isProductSustainable =
    currentProduct.isFairTrade === true ||
    currentProduct.sustainabilityMetric === "Organic" ||
    currentProduct.sustainabilityMetric === "Biodegradable";

        
        if (isSustainableChoice === isProductSustainable) {
            score++;
            feedbackMessage.textContent = "Correct!";
            feedbackMessage.className = "feedback-message correct";
        } else {
            feedbackMessage.textContent = "Incorrect!";
            feedbackMessage.className = "feedback-message incorrect";
        }
        
        feedbackMessage.style.display = 'block';
        currentIndex++;
        
        setTimeout(() => {
            feedbackMessage.style.display = 'none';
            updateDisplay();
        }, 1000);
    }

    function endGame() {
        let message = `Challenge Complete! You scored ${score} out of ${totalRounds}.`;
        if (score >= Math.ceil(totalRounds * 0.8)) {
            message += " You've earned a 10% discount on your order!";
            localStorage.setItem('discountApplied', 'true');
        } else {
            message += " You can try again on your next visit!";
            localStorage.removeItem('discountApplied');
        }
        productDisplay.innerHTML = `
            <h2>${message}</h2>
        `;
        gameControls.style.display = 'none';
        
        renderCart();
    }

    // --- Main Logic & Event Handling ---
    updateCartCount();

    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = searchBar.value;
            window.location.href = `products.html?search=${encodeURIComponent(query)}`;
        });
    }

    if (window.location.pathname.includes('products.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get('search');
        const categoryParam = urlParams.get('category');
        
        if (filterCheckboxes) {
            filterCheckboxes.forEach(checkbox => {
                checkbox.addEventListener('change', applyFilters);
            });
        }

        let productsToRender = products;
        
        if (searchQuery) {
            productsToRender = productsToRender.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.artisan.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (categoryParam) {
            const param = categoryParam.toLowerCase();
            const subCategories = {
                'fashion': ['men', 'women', 'accessories'],
                'handicrafts': ['pottery', 'woodwork'],
                'food': ['organic', 'regional', 'fusion'],
                'wellness': ['herbal', 'yoga', 'home-remedies']
            };

            if (subCategories[param]) {
                const subCategoryList = subCategories[param];
                productsToRender = productsToRender.filter(product => {
                    const productCategory = product.category?.toLowerCase();
                    const productGender = product.gender?.toLowerCase();
                    return subCategoryList.includes(productCategory) || subCategoryList.includes(productGender);
                });
            } else {
                productsToRender = productsToRender.filter(product => {
                    const productCategory = product.category?.toLowerCase();
                    const productGender = product.gender?.toLowerCase();
                    return productCategory === param || productGender === param;
                });
            }

            const checkbox = document.querySelector(`input[type="checkbox"][value="${categoryParam}"]`);
            if (checkbox) {
                checkbox.checked = true;
            }
        }
        
        renderProducts(productsToRender);

    } else if (window.location.pathname.includes('artisans.html')) {
        renderArtisans(artisans);
    } else if (window.location.pathname.includes('cart.html')) {
        renderCart();
        
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', processPayment);
        }
        
        if (gameContainer) {
            sustainableBtn.addEventListener('click', () => checkAnswer(true));
            notSustainableBtn.addEventListener('click', () => checkAnswer(false));
            if (getCartItems().length > 0 && !localStorage.getItem('discountApplied')) {
                startGame();
            }
        }
    } else if (window.location.pathname.includes('contact.html')) {
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                formStatus.textContent = 'Thank you for your message! We will get back to you shortly.';
                formStatus.style.color = 'green';
                contactForm.reset();
            });
        }
    }


    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for a saved theme preference in local storage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
    }

    // Add event listener to the toggle button
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            if (body.classList.contains('dark-mode')) {
                body.classList.remove('dark-mode');
                localStorage.setItem('theme', '');
            } else {
                body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark-mode');
            }
            updateThemeIcon();
        });
    }

    // Function to update the icon based on the current theme
    function updateThemeIcon() {
        if (body.classList.contains('dark-mode')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }

    // Initial icon update
    updateThemeIcon();
});