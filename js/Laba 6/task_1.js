let products = [];
let filteredCategory = null;
let sortKey = null;

const productList = document.getElementById('productList');
const totalPriceElem = document.getElementById('totalPrice');
const productModal = document.getElementById('productModal');
const productForm = document.getElementById('productForm');
const toast = document.getElementById('toast');
const emptyMessage = document.getElementById('emptyMessage');
const filterContainer = document.getElementById('filterContainer');

document.getElementById('addProductBtn').onclick = () => openModal();

productForm.onsubmit = (e) => {
    e.preventDefault();
    const data = new FormData(productForm);
    const id = data.get('id') || crypto.randomUUID();
    const product = {
        id,
        name: data.get('name'),
        price: parseFloat(data.get('price')),
        category: data.get('category').trim(),
        image: data.get('image'),
        created: new Date(),
        updated: new Date()
    };

    const existingIndex = products.findIndex(p => p.id === id);
    if (existingIndex !== -1) {
        product.created = products[existingIndex].created;
        products[existingIndex] = product;
        showToast(`Товар оновлено: ${product.id} (${product.name})`);
        products = [product, ...products.filter(p => p.id !== id)];
    } else {
        products.push(product);
        showToast(`Додано товар: ${product.name}`);
    }
    closeModal();
    productForm.reset();
    render();
};

const openModal = (product = null) => {
    productModal.style.display = 'flex';
    if (product) {
        productForm.name.value = product.name;
        productForm.price.value = product.price;
        productForm.category.value = product.category;
        productForm.image.value = product.image;
        productForm.id.value = product.id;
    } else {
        productForm.reset();
    }
};

const closeModal = () => productModal.style.display = 'none';
window.onclick = (e) => { if (e.target === productModal) closeModal(); };

const showToast = (msg) => {
    toast.textContent = msg;
    toast.style.display = 'block';
    setTimeout(() => toast.style.display = 'none', 3000);
};

const deleteProduct = (id) => {
    products = products.filter(p => p.id !== id);
    render();
    showToast('Товар видалено');
};

const editProduct = (id) => {
    const product = products.find(p => p.id === id);
    if (product) openModal(product);
};

const render = () => {
    productList.innerHTML = '';
    let items = [...products];

    if (filteredCategory) {
        items = items.filter(p =>
            p.category.trim().toLowerCase() === filteredCategory.trim().toLowerCase()
        );
    }

    if (sortKey) {
        items.sort((a, b) => {
            if (sortKey === 'price') return a.price - b.price;
            if (sortKey === 'created') return new Date(a.created) - new Date(b.created);
            if (sortKey === 'updated') return new Date(a.updated) - new Date(b.updated);
        });
    }

    if (items.length === 0) {
        emptyMessage.style.display = 'block';
    } else {
        emptyMessage.style.display = 'none';
        items.forEach(p => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${p.image}" alt="${p.name}">
                <div><strong>ID:</strong> ${p.id}</div>
                <div><strong>Назва:</strong> ${p.name}</div>
                <div><strong>Ціна:</strong> ${p.price} грн</div>
                <div><strong>Категорія:</strong> ${p.category}</div>
                <div class="actions">
                    <button class="edit-btn" onclick='editProduct("${p.id}")'>Редагувати</button>
                    <button class="delete-btn" onclick='deleteProduct("${p.id}")'>Видалити</button>
                </div>
            `;
            productList.appendChild(card);
        });
    }

    renderTotal();
    renderFilters();
};

const renderTotal = () => {
    const sum = products.reduce((acc, p) => acc + p.price, 0);
    totalPriceElem.textContent = `${sum.toFixed(2)} грн`;
};

const renderFilters = () => {
    const categories = [...new Set(products.map(p => p.category.trim()))];
    filterContainer.innerHTML = '';

    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.textContent = cat;
        btn.onclick = () => {
            filteredCategory = cat;
            render();
        };
        filterContainer.appendChild(btn);
    });

    if (categories.length > 0) {
        const reset = document.createElement('button');
        reset.textContent = 'Скинути фільтр';
        reset.onclick = () => {
            filteredCategory = null;
            render();
        };
        filterContainer.appendChild(reset);
    }
};

const sortProducts = (key) => {
    sortKey = key;
    render();
};

const resetSort = () => {
    sortKey = null;
    render();
};

render();
