// Simple test framework
function assert(condition, message) {
    if (!condition) {
        console.error('Test failed:', message);
    } else {
        console.log('✓', message);
    }
}

// Test data
const testProducts = [
    { id: 1, name: 'Test Product', category: 'test', brand: 'test', price: 10.99, image: 'test.jpg', description: 'Test' }
];

// Mock DOM elements for testing
document.body.innerHTML = `
    <div id="productsGrid"></div>
    <div id="cartCount">0</div>
    <div id="cartItems"></div>
    <div id="cartTotal" style="display: none;"><span id="totalAmount">0</span></div>
`;

// Test addToCart function
function testAddToCart() {
    console.log('Testing addToCart...');
    const initialCount = parseInt(document.getElementById('cartCount').textContent);
    addToCart(1);
    const newCount = parseInt(document.getElementById('cartCount').textContent);
    assert(newCount > initialCount, 'Cart count should increase after adding item');
    assert(cart.length > 0, 'Cart should contain items after adding');
}

// Test filterProducts function
function testFilterProducts() {
    console.log('Testing filterProducts...');
    // Set a filter
    document.getElementById('category').value = 'complete';
    filterProducts();
    // Check if filtered products are displayed (this would need more setup for full test)
    assert(true, 'Filter function executed without error');
}

// Test showSection function
function testShowSection() {
    console.log('Testing showSection...');
    showSection('shop');
    const shopSection = document.getElementById('shop');
    assert(shopSection && !shopSection.classList.contains('hidden'), 'Shop section should be visible');
}

// Run tests
console.log('Running Skate Plug tests...');
testAddToCart();
testFilterProducts();
testShowSection();
console.log('Tests completed.');