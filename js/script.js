/**
 * @typedef {Object} Product
 * @property {number} id
 * @property {string} name
 * @property {string} category
 * @property {string} brand
 * @property {number} price
 * @property {string} image
 * @property {string} description
 * @property {string} [badge]
 */

/** @type {Product[]} */
const products = [
    {
        id: 1,
        name: "Element Pro Complete",
        category: "complete",
        brand: "element",
        price: 129.99,
        image: '<img src="https://images.unsplash.com/photo-1547447134-cd3f5c716530?w=300&h=200&fit=crop&crop=center" alt="Skateboard" loading="lazy" />',
        description: "Professional complete skateboard perfect for street riding and tricks.",
        badge: "Best Seller"
    },
    {
        id: 2,
        name: "Baker Logo Deck",
        category: "decks",
        brand: "baker",
        price: 65.00,
        image: '<img src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop&crop=center" alt="Skateboard Deck" loading="lazy" onclick="openImageModal(this.src, this.alt)" />',
        description: "Classic Baker logo deck, 8.25\" width, perfect for technical skating.",
        badge: "New"
    },
    {
        id: 3,
        name: "Independent Trucks",
        category: "trucks",
        brand: "independent",
        price: 45.99,
        image: '<img src="https://images.unsplash.com/photo-1544568100-847a948585b9?w=300&h=200&fit=crop&crop=center" alt="Skateboard Trucks" loading="lazy" onclick="openImageModal(this.src, this.alt)" />',
        description: "Durable Independent trucks, standard height, multiple sizes available."
    },
    {
        id: 4,
        name: "Spitfire Formula Four",
        category: "wheels",
        brand: "spitfire",
        price: 35.99,
        image: '<img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center" alt="Skateboard Wheels" loading="lazy" onclick="openImageModal(this.src, this.alt)" />',
        description: "High-performance urethane wheels, 53mm, 99a durometer."
    },
    {
        id: 5,
        name: "Bones Swiss Bearings",
        category: "bearings",
        brand: "bones",
        price: 89.99,
        image: '<img src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=300&h=200&fit=crop&crop=center" alt="Skateboard Bearings" loading="lazy" onclick="openImageModal(this.src, this.alt)" />',
        description: "Premium Swiss-made bearings for the smoothest ride possible.",
        badge: "Premium"
    },
    {
        id: 6,
        name: "Hardware Pack",
        category: "hardware",
        brand: "independent",
        price: 12.99,
        image: '<img src="images/hardware.png" alt="Hardware Pack" />',
        description: "Complete hardware pack with bolts and nuts for deck assembly."
    },
    {
        id: 7,
        name: "Pro-Tec Helmet",
        category: "protection",
        brand: "protec",
        price: 55.99,
        image: '<img src="images/helmet.png" alt="Skateboard Helmet" />',
        description: "Professional skateboarding helmet, multiple colors and sizes."
    },
    {
        id: 8,
        name: "Thrasher Logo Tee",
        category: "apparel",
        brand: "thrasher",
        price: 29.99,
        image: '<img src="images/tshirt.png" alt="T-Shirt" />',
        description: "Classic Thrasher magazine logo t-shirt, 100% cotton."
    },
    {
        id: 9,
        name: "Supreme Deck Limited",
        category: "decks",
        brand: "supreme",
        price: 185.00,
        image: '<img src="images/supreme-deck.png" alt="Supreme Skateboard Deck" />',
        description: "Limited edition Supreme collaboration deck, collector's item.",
        badge: "Limited"
    },
    {
        id: 10,
        name: "Vans Old Skool",
        category: "apparel",
        brand: "vans",
        price: 79.99,
        image: '<img src="images/shoes.png" alt="Skateboard Shoes" />',
        description: "Classic Vans Old Skool skate shoes, durable and stylish."
    },
    {
        id: 11,
        name: "Complete Cruiser",
        category: "complete",
        brand: "element",
        price: 89.99,
        image: '<img src="images/cruiser.png" alt="Cruiser Skateboard" />',
        description: "Perfect for cruising around town, softer wheels for smooth rides."
    },
    {
        id: 12,
        name: "Bones Reds Bearings",
        category: "bearings",
        brand: "bones",
        price: 19.99,
        image: '<img src="images/red-bearings.png" alt="Red Skateboard Bearings" />',
        description: "Reliable and affordable bearings, great for beginners and pros alike."
    }
];

let cart = [];
let filteredProducts = [...products];

// Initialize page with hash navigation support
document.addEventListener('DOMContentLoaded', function() {
    updateCartDisplay();

    // Check if there's a hash in the URL (for direct links or back button)
    if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        const [section, filter] = hash.split('-');
        if (section) {
            showSection(section, filter);
            return; // Don't show home if we have a hash
        }
    }

    // Show home section by default
    showSection('home');
});

// Section management with browser history support
function showSection(sectionName, filter = null) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('hidden');
    });

    // Show requested section
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.remove('hidden');
    }

    // Update browser history for back button support
    const url = filter ? `#${sectionName}-${filter}` : `#${sectionName}`;
    history.pushState({ section: sectionName, filter: filter }, '', url);

    // If navigating to shop with a filter, apply it
    if (sectionName === 'shop') {
        setTimeout(() => {
            displayProducts(products);
            if (filter) {
                document.getElementById('category').value = filter;
                filterProducts();
            }
        }, 100);
    }

    // If navigating to contact with repair service, pre-select it
    if (sectionName === 'contact' && filter) {
        setTimeout(() => {
            document.getElementById('service-type').value = 'repair';
        }, 100);
    }

    // Scroll to top when changing sections
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Handle browser back/forward buttons
window.addEventListener('popstate', function(event) {
    if (event.state) {
        showSection(event.state.section, event.state.filter);
    }
});

// Dropdown functionality
function toggleDropdown(event, menuId) {
    event.preventDefault();

    // Close all other dropdowns
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
        if (menu.id !== menuId + '-menu') {
            menu.classList.remove('show');
        }
    });

    document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
        if (toggle !== event.currentTarget) {
            toggle.classList.remove('active');
        }
    });

    // Toggle current dropdown
    const menu = document.getElementById(menuId + '-menu');
    const toggle = event.currentTarget;

    if (menu) {
        menu.classList.toggle('show');
        toggle.classList.toggle('active');
    }
}

// Close dropdowns when clicking outside
document.addEventListener('click', function(event) {
    if (!event.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.classList.remove('show');
        });
        document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
            toggle.classList.remove('active');
        });
    }
});

// Display products
function displayProducts(productsToShow) {
    try {
        const grid = document.getElementById('productsGrid');
        if (!grid) {
            console.error('Products grid element not found');
            return;
        }

        // Show loading state
        grid.innerHTML = '<div class="loading">Loading products...</div>';

        // Simulate async loading (in real app, this would be an API call)
        setTimeout(() => {
            try {
                grid.innerHTML = '';

                if (productsToShow.length === 0) {
                    grid.innerHTML = '<div class="no-products">No products found matching your criteria.</div>';
                    return;
                }

                productsToShow.forEach(product => {
                    const productCard = `
                        <div class="product-card" data-category="${product.category}" data-brand="${product.brand}" data-price="${product.price}">
                            <div class="product-image">
                                ${product.image.replace('<img ', '<img onerror="handleImageError(this)" ')}
                                ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
                            </div>
                            <div class="product-info">
                                <div class="product-category">${product.category}</div>
                                <h3 class="product-name">${product.name}</h3>
                                <p class="product-description">${product.description}</p>
                                <div class="product-price">$${product.price}</div>
                                <div class="product-actions">
                                    <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
                                    <button class="quick-view" onclick="quickView(${product.id})">Quick View</button>
                                </div>
                            </div>
                        </div>
                    `;
                    grid.innerHTML += productCard;
                });
            } catch (error) {
                console.error('Error displaying products:', error);
                grid.innerHTML = '<div class="error">Error loading products. Please try again.</div>';
            }
        }, 500); // Simulate loading delay
    } catch (error) {
        console.error('Error in displayProducts:', error);
    }
}

// Filter products
function filterProducts() {
    const category = document.getElementById('category').value;
    const brand = document.getElementById('brand').value;
    const priceRange = document.getElementById('priceRange').value;

    filteredProducts = products.filter(product => {
        let matches = true;

        if (category && product.category !== category) {
            matches = false;
        }

        if (brand && product.brand !== brand) {
            matches = false;
        }

        if (priceRange) {
            const price = product.price;
            switch(priceRange) {
                case '0-50':
                    if (price >= 50) matches = false;
                    break;
                case '50-100':
                    if (price < 50 || price >= 100) matches = false;
                    break;
                case '100-200':
                    if (price < 100 || price >= 200) matches = false;
                    break;
                case '200+':
                    if (price < 200) matches = false;
                    break;
            }
        }

        return matches;
    });

    displayProducts(filteredProducts);
}

// Clear filters
function clearFilters() {
    document.getElementById('category').value = '';
    document.getElementById('brand').value = '';
    document.getElementById('priceRange').value = '';
    filteredProducts = [...products];
    displayProducts(products);
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({...product, quantity: 1});
    }

    updateCartDisplay();
    
    // Show feedback
    const button = event.target;
    const originalText = button.textContent;
            button.textContent = 'Added!';
            button.style.background = '#28a745';
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '#ff0000';
            }, 1000);
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
}

// Update quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartDisplay();
        }
    }
}

// Update cart display
function updateCartDisplay() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const totalAmount = document.getElementById('totalAmount');

    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = itemCount;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <p>Your cart is empty</p>
                <p>Add some sick gear to get started! 🛹</p>
            </div>
        `;
        cartTotal.style.display = 'none';
    } else {
        let cartHTML = '';
        let total = 0;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            cartHTML += `
                <div class="cart-item">
                    <div class="cart-item-image">${item.image}</div>
                    <div class="cart-item-details">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">$${item.price} each</div>
                        <div class="cart-item-controls">
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                            <span class="quantity-display">${item.quantity}</span>
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                            <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
                        </div>
                    </div>
                </div>
            `;
        });

        cartItems.innerHTML = cartHTML;
        totalAmount.textContent = total.toFixed(2);
        cartTotal.style.display = 'block';
    }
}

// Toggle cart sidebar
function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    sidebar.classList.toggle('open');
}

// Quick view functionality
function quickView(productId) {
    const product = products.find(p => p.id === productId);
    alert(`Quick View: ${product.name}\n\nPrice: $${product.price}\nCategory: ${product.category}\nBrand: ${product.brand}\n\nDescription: ${product.description}\n\n(In a full website, this would open a detailed product modal with larger images, reviews, etc.)`);
}

// Checkout functionality
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Checkout initiated!\n\nTotal: $${total.toFixed(2)}\nItems: ${cart.length}\n\n(In a full website, this would redirect to a secure payment page)`);
}

// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thanks for reaching out! We\'ll get back to you soon.');
    });
});

// Close cart when clicking outside
document.addEventListener('click', function(event) {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartIcon = document.querySelector('.cart-icon');
    
    if (!cartSidebar.contains(event.target) && !cartIcon.contains(event.target)) {
        cartSidebar.classList.remove('open');
    }
});

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.9)';
    }
});

// Animate service cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Initialize animations when services section is shown
function initializeAnimations() {
    document.querySelectorAll('.service-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Search functionality
function handleSearch(event) {
    event.preventDefault();
    const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();

    if (searchTerm) {
        // Filter products based on search term
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm) ||
            product.brand.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );

        // Navigate to shop with filtered results
        showSection('shop');
        setTimeout(() => {
            displayProducts(filteredProducts);
            // Update search input to show current search
            document.getElementById('searchInput').value = searchTerm;
        }, 100);

        // Show search results message
        if (filteredProducts.length > 0) {
            console.log(`Found ${filteredProducts.length} products matching "${searchTerm}"`);
        } else {
            console.log(`No products found matching "${searchTerm}"`);
            // Could show a "no results" message
        }
    }
}

// Carousel functionality
function moveCarousel(carouselId, direction) {
    const track = document.getElementById(`${carouselId}-track`);
    if (!track) return;

    const items = track.children;
    const itemWidth = items[0].offsetWidth + 32; // 32px for gap
    const currentScroll = track.scrollLeft;
    const newScroll = currentScroll + (direction * itemWidth);

    track.scrollTo({
        left: newScroll,
        behavior: 'smooth'
    });
}

// Newsletter functionality
function handleNewsletter(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;

    if (email) {
        // In a real application, this would send to a backend
        alert(`Thanks for subscribing! We'll send updates to ${email}`);
        event.target.reset();
    }
}

// Call animations when page loads
setTimeout(initializeAnimations, 1000);



// Legacy image modal functions (for product images)
function openImageModal(src, alt) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal" onclick="closeImageModal()">&times;</span>
            <img src="${src}" alt="${alt}" style="max-width: 90vw; max-height: 90vh;" onerror="handleImageError(this)">
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'block';

    // Close on background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeImageModal();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeImageModal();
        }
    });
}

function closeImageModal() {
    const modal = document.querySelector('.image-modal');
    if (modal) {
        modal.remove();
    }
}

function handleImageError(img) {
    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2NjYyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBOb3QgRm91bmQ8L3RleHQ+PC9zdmc+';
    img.alt = 'Image not available';
}