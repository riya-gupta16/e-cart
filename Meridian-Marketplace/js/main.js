/**
 * MERIDIAN MARKETPLACE - CORE CONTROLLER
 * Handles: Live Data Fetching, Global State, Cart Management, and Dynamic UI
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Global State & Configuration ---
    const API_URL = "http://localhost:5000/api";
    
    // Centralized source of truth for all pages
    window.meridian = {
        products: [],
        artisans: [],
        dataLoaded: false
    };

    /**
     * INITIALIZATION
     * Fetches all necessary data from MongoDB before rendering the UI
     */
    async function initApp() {
        try {
            // Fetch products and artisans simultaneously for better performance
            const [prodRes, artRes] = await Promise.all([
                fetch(`${API_URL}/products`),
                fetch(`${API_URL}/artisans`)
            ]);

            if (!prodRes.ok || !artRes.ok) throw new Error("Backend connection failed");

            window.meridian.products = await prodRes.json();
            window.meridian.artisans = await artRes.json();
            window.meridian.dataLoaded = true;

            // Notify page-specific scripts (like Cart or Impact charts) that data is ready
            document.dispatchEvent(new CustomEvent('meridianDataLoaded', {
                detail: { 
                    products: window.meridian.products, 
                    artisans: window.meridian.artisans 
                }
            }));

            // Initial rendering based on the current page
            routePageLogic();
            updateCartCount();

        } catch (err) {
            console.error("Initialization Error:", err);
            showErrorUI();
        }
    }

    /**
     * ROUTING LOGIC
     * Decides which UI components to render based on the URL
     */
    function routePageLogic() {
        const path = window.location.pathname;

        if (path.includes('products.html')) {
            handleInitialFilters();
        } else if (path.includes('artisans.html')) {
            renderArtisans(window.meridian.artisans);
        } else if (path.includes('index.html') || path === '/') {
            runHeroAnimation();
        }
    }

    // --- Hero Animation (Index Page) ---
    function runHeroAnimation() {
        const title = document.querySelector(".empowering-title");
        const subtitle = document.querySelector(".empowering-subtitle");
        if (!title) return;

        const text = "Empowering Local Artisans 🌍";
        let index = 0;
        function typeEffect() {
            if (index < text.length) {
                title.textContent += text.charAt(index);
                index++;
                setTimeout(typeEffect, 100);
            } else {
                title.classList.add("typing-end");
                setTimeout(() => subtitle?.classList.add("visible"), 500);
            }
        }
        typeEffect();
    }

    // --- Cart System (LocalStorage) ---
    function getCartItems() {
        // We only store IDs in LocalStorage to ensure price/data is always fresh from the DB
        return JSON.parse(localStorage.getItem('cartItemIds')) || [];
    }

    function updateCartCount() {
        const countLabel = document.getElementById('cart-count');
        if (countLabel) {
            const items = getCartItems();
            countLabel.textContent = items.length;
        }
    }

    // Exposed globally so 'Add to Cart' buttons in HTML work
    window.addToCart = function(productId) {
        const cartIds = JSON.parse(localStorage.getItem('cartItemIds')) || [];
        
        // Check global data using both ID formats
        const product = window.meridian.products.find(p => 
            (p._id === productId || p.id === productId || String(p._id) === String(productId))
        );
        
        if (product) {
            cartIds.push(productId);
            localStorage.setItem('cartItemIds', JSON.stringify(cartIds));
            updateCartCount();
            showCartToast(`${product.name} added to cart!`);
        }
    };

    function showCartToast(msg) {
        const toast = document.getElementById("cart-toast");
        const toastMsg = document.getElementById("cart-toast-message");
        if (toast && toastMsg) {
            toastMsg.textContent = msg;
            toast.classList.add("show");
            setTimeout(() => toast.classList.remove("show"), 2000);
        }
    }

    // --- Rendering Logic ---
    function renderProducts(productsToRender) {
        const grid = document.getElementById('product-grid');
        if (!grid) return;

        grid.innerHTML = productsToRender.length === 0 
            ? '<p class="no-products">No products found matching your filters.</p>' 
            : '';

        productsToRender.forEach((product, index) => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="product-image"><img src="${product.image}" alt="${product.name}" onerror="this.src='assets/images/placeholder.webp'"></div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="artisan-name">by ${product.artisan}</p>
                    <p class="product-price">₹${product.price.toFixed(2)}</p>
                    <button class="add-to-cart-btn" onclick="addToCart('${product._id || product.id}')">Add to Cart</button>
                </div>
            `;
            grid.appendChild(card);
            // Staggered entry animation
            setTimeout(() => card.classList.add('loaded'), index * 50);
        });
    }

    function renderArtisans(artisansToRender) {
        const grid = document.getElementById('artisan-grid');
        if (!grid) return;
        grid.innerHTML = '';
        artisansToRender.forEach((artisan, index) => {
            const card = document.createElement('div');
            card.className = 'artisan-card';
            card.innerHTML = `
                <img src="${artisan.image}" class="artisan-photo" onerror="this.src='assets/images/artisan-placeholder.webp'">
                <div class="artisan-info">
                    <h3>${artisan.name}</h3>
                    <p>${artisan.location}</p>
                    <span class="artisan-badge">${artisan.badge}</span>
                    <p class="artisan-bio">${artisan.bio}</p>
                    <div class="artisan-actions">
                        <a href="products.html?artisan=${encodeURIComponent(artisan.name)}" class="artisan-btn secondary">View Products</a>
                    </div>
                </div>
            `;
            grid.appendChild(card);
            setTimeout(() => card.classList.add('loaded'), index * 100);
        });
    }

    // --- Filtering Logic ---
    function applyFilters() {
        const selectedMaterials = Array.from(document.querySelectorAll('input[name="material"]:checked')).map(cb => cb.value.toLowerCase());
        const selectedSustainability = Array.from(document.querySelectorAll('input[name="sustainabilityMetric"]:checked')).map(cb => cb.value.toLowerCase());

        let filtered = window.meridian.products.filter(p => {
            const materialMatch = selectedMaterials.length === 0 || selectedMaterials.includes(p.material.toLowerCase());
            const sustainMatch = selectedSustainability.length === 0 || selectedSustainability.includes(p.sustainabilityMetric.toLowerCase());
            return materialMatch && sustainMatch;
        });

        renderProducts(filtered);
    }

    function handleInitialFilters() {
        const urlParams = new URLSearchParams(window.location.search);
        const cat = urlParams.get('category');
        const artisanName = urlParams.get('artisan');

        let filtered = window.meridian.products;

        if (cat) {
            filtered = filtered.filter(p => p.category.toLowerCase() === cat.toLowerCase());
        } else if (artisanName) {
            filtered = filtered.filter(p => p.artisan.toLowerCase() === artisanName.toLowerCase());
        }

        renderProducts(filtered);
        
        // Attach dynamic listeners to filter checkboxes
        document.querySelectorAll('.filters-container input').forEach(el => {
            el.addEventListener('change', applyFilters);
        });
    }

    // --- Global UI Interactions ---
    const hamburger = document.getElementById('hamburger-menu');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            document.querySelector('.nav-links').classList.toggle('active');
        });
    }

    function showErrorUI() {
        const grid = document.getElementById('product-grid');
        if (grid) grid.innerHTML = '<p class="error">Unable to load products. Please check if the server is running.</p>';
    }

    // Launch Application
    initApp();
});