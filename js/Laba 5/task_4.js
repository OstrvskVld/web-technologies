const productCatalog = new Map();
const orders = new Set();
const productHistory = new WeakMap();
const userActivity = new WeakSet(); 

let nextProductId = 1;


function displayCatalog() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    productCatalog.forEach((product, id) => {
        const listItem = document.createElement('li');
        listItem.textContent = `ID: ${id}, Назва: ${product.name}, Ціна: ${product.price}, Кількість: ${product.quantity}`;
        productList.appendChild(listItem);
    });
}


document.getElementById('add-product-btn').addEventListener('click', () => {
    const nameInput = document.getElementById('add-name');
    const priceInput = document.getElementById('add-price');
    const quantityInput = document.getElementById('add-quantity');
    const messageDisplay = document.getElementById('add-message');

    const name = nameInput.value.trim();
    const price = parseFloat(priceInput.value);
    const quantity = parseInt(quantityInput.value);

    if (name && !isNaN(price) && !isNaN(quantity) && price >= 0 && quantity >= 0) {
        const productId = nextProductId++;
        productCatalog.set(productId, { name, price, quantity });
        productHistory.set(productCatalog.get(productId), []); 
        displayCatalog();
        messageDisplay.textContent = `Продукт "${name}" додано з ID: ${productId}`;
        messageDisplay.className = 'message success';
        nameInput.value = '';
        priceInput.value = '';
        quantityInput.value = '';
    } else {
        messageDisplay.textContent = 'Будь ласка, введіть коректні дані продукту.';
        messageDisplay.className = 'message error';
    }
});


document.getElementById('remove-product-btn').addEventListener('click', () => {
    const idInput = document.getElementById('remove-id');
    const messageDisplay = document.getElementById('remove-message');
    const productId = parseInt(idInput.value);

    if (productCatalog.has(productId)) {
        const productName = productCatalog.get(productId).name;
        productCatalog.delete(productId);
        displayCatalog();
        messageDisplay.textContent = `Продукт з ID ${productId} ("${productName}") видалено.`;
        messageDisplay.className = 'message success';
        idInput.value = '';
    } else {
        messageDisplay.textContent = `Продукт з ID ${productId} не знайдено.`;
        messageDisplay.className = 'message error';
    }
});


document.getElementById('update-product-btn').addEventListener('click', () => {
    const idInput = document.getElementById('update-id');
    const priceInput = document.getElementById('update-price');
    const quantityInput = document.getElementById('update-quantity');
    const messageDisplay = document.getElementById('update-message');
    const productId = parseInt(idInput.value);

    if (productCatalog.has(productId)) {
        const product = productCatalog.get(productId);
        const newPrice = parseFloat(priceInput.value);
        const newQuantity = parseInt(quantityInput.value);

        if (!isNaN(newPrice) && newPrice >= 0) {
            product.price = newPrice;
            const history = productHistory.get(product) || [];
            history.push({ type: 'price', oldValue: product.price, newValue: newPrice, timestamp: new Date() });
            productHistory.set(product, history);
        }
        if (!isNaN(newQuantity) && newQuantity >= 0) {
            product.quantity = newQuantity;
            const history = productHistory.get(product) || [];
            history.push({ type: 'quantity', oldValue: product.quantity, newValue: newQuantity, timestamp: new Date() });
            productHistory.set(product, history);
        }

        displayCatalog();
        messageDisplay.textContent = `Інформацію про продукт з ID ${productId} ("${product.name}") оновлено.`;
        messageDisplay.className = 'message success';
        idInput.value = '';
        priceInput.value = '';
        quantityInput.value = '';
    } else {
        messageDisplay.textContent = `Продукт з ID ${productId} не знайдено.`;
        messageDisplay.className = 'message error';
    }
});


document.getElementById('search-product-btn').addEventListener('click', () => {
    const nameInput = document.getElementById('search-name');
    const searchResultsDiv = document.getElementById('search-results');
    const searchTerm = nameInput.value.trim().toLowerCase();
    searchResultsDiv.innerHTML = '';

    let found = false;
    productCatalog.forEach((product, id) => {
        if (product.name.toLowerCase().includes(searchTerm)) {
            const productInfo = document.createElement('p');
            productInfo.textContent = `ID: ${id}, Назва: ${product.name}, Ціна: ${product.price}, Кількість: ${product.quantity}`;
            searchResultsDiv.appendChild(productInfo);
            found = true;
        }
    });

    if (!found) {
        searchResultsDiv.textContent = `Продукти з назвою "${searchTerm}" не знайдено.`;
    }
});


document.getElementById('order-product-btn').addEventListener('click', () => {
    const idInput = document.getElementById('order-id');
    const quantityInput = document.getElementById('order-quantity');
    const messageDisplay = document.getElementById('order-message');
    const productId = parseInt(idInput.value);
    const orderQuantity = parseInt(quantityInput.value);

    if (productCatalog.has(productId)) {
        const product = productCatalog.get(productId);
        if (product.quantity >= orderQuantity) {
            product.quantity -= orderQuantity;
            orders.add({ productId, quantity: orderQuantity, timestamp: new Date() });
            displayCatalog();
            messageDisplay.textContent = `Замовлення на ${orderQuantity} од. продукту "${product.name}" оформлено. Кількість на складі оновлено.`;
            messageDisplay.className = 'message success';
            idInput.value = '';
            quantityInput.value = '';
        } else {
            messageDisplay.textContent = `Недостатньо товару "${product.name}" на складі (доступно: ${product.quantity}).`;
            messageDisplay.className = 'message error';
        }
    } else {
        messageDisplay.textContent = `Продукт з ID ${productId} не знайдено.`;
        messageDisplay.className = 'message error';
    }
});


displayCatalog();