let users = [];
const NUMBER_OF_CARD_PER_PAGE = 30;
let usersButton = document.getElementById('users');
let cardContainer = document.getElementById('card-container');
let isLoading = false;
let lastFetchTime = 0;
let currentUsers = [];

function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

function applyFiltersFromUrl() {
    showLoading();
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name') || '';
    const age = params.get('age') || '';
    const birthYear = params.get('birthYear') || '';
    const location = params.get('location') || '';
    const email = params.get('email') || '';
    const sort = params.get('sort');


    document.getElementById('search').value = name;
    document.getElementById('filter-age').value = age;
    document.getElementById('filter-year').value = birthYear;
    document.getElementById('filter-location').value = location;
    document.getElementById('filter-email').value = email;

    applyAllFilters();

    if (sort) {
        switch (sort) {
            case 'name':
                document.getElementById('sort-by-name').click();
                break;
            case 'age':
                document.getElementById('sort-by-age').click();
                break;
            case 'registration':
                document.getElementById('sort-by-registration').click();
                break;
        }
    }
    hideLoading();
}

function applyAllFilters() {
    const name = document.getElementById('search').value.trim().toLowerCase();
    const age = parseInt(document.getElementById('filter-age').value.trim(), 10);
    const birthYear = parseInt(document.getElementById('filter-year').value.trim(), 10);
    const location = document.getElementById('filter-location').value.trim().toLowerCase();
    const email = document.getElementById('filter-email').value.trim().toLowerCase()

    let filtered = users.filter(user => {
        const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
        const userAge = user.dob.age;
        const userBirthYear = new Date(user.dob.date).getFullYear();
        const userLocation = `${user.location.city}, ${user.location.country}`.toLowerCase();
        const userEmail = `${user.email}`.toLowerCase();
        return (
            (!name || fullName.includes(name)) &&
            (isNaN(age) || userAge === age) &&
            (isNaN(birthYear) || userBirthYear === birthYear) &&
            (!location || userLocation.includes(location)) &&
            (!email || userEmail.includes(email))
        );
    });

    renderFiltered(filtered);
    setUrl({
        name: name || '',
        age: isNaN(age) ? '' : age,
        birthYear: isNaN(birthYear) ? '' : birthYear,
        location: location || '',
        email: email || ''
    });
}

console.log(localStorage.getItem('user'));

async function getUsers(n) {
    const response = await fetch(`https://randomuser.me/api/?results=${n}`, {
        headers: {'Content-Type': 'application/json'},
    });
    const result = await response.json();

    users = [...users, ...result.results];
    currentUsers = [...users];
}




function toggleLike(user) {
    const likedUsers = JSON.parse(localStorage.getItem('likedUsers') || '[]');
    const userId = user.login.uuid;

    const index = likedUsers.findIndex(u => u.login.uuid === userId);
    if (index === -1) {
        likedUsers.push(user);
    } else {
        likedUsers.splice(index, 1);
    }

    localStorage.setItem('likedUsers', JSON.stringify(likedUsers));
    return index === -1;
}


cardContainer.addEventListener('click', (e) => {
    
    if (e.target.closest('.like')) {
        const button = e.target.closest('.like');
        const userId = button.dataset.userId;
        const user = users.find(u => u.login.uuid === userId);
        if (!user) return;

        const wasAdded = toggleLike(user);
        button.innerHTML = wasAdded ? '❤️' : '🤍';
        
        
        if (isFavoritesView && !wasAdded) {
            removeUserCard(userId);
        }
    }
    
    
    if (e.target.closest('.delete-user')) {
        const button = e.target.closest('.delete-user');
        const userId = button.dataset.userId;
        removeUserFromFavorites(userId);
    }
});


function removeUserFromFavorites(userId) {
    
    const likedUsers = JSON.parse(localStorage.getItem('likedUsers') || '[]');
    const updatedLikes = likedUsers.filter(u => u.login.uuid !== userId);
    localStorage.setItem('likedUsers', JSON.stringify(updatedLikes));
    
    
    removeUserCard(userId);
}


function removeUserCard(userId) {
    const card = document.querySelector(`.user-card[data-user-id="${userId}"]`);
    if (card) {
        card.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            card.remove();
            checkEmptyFavorites();
        }, 300);
    }
}


function checkEmptyFavorites() {
    if (cardContainer.children.length === 0) {
        cardContainer.innerHTML = '<p class="no-favorites">Немає вподобаних користувачів</p>';
    }
}


document.getElementById('favorites').addEventListener('click', () => {
    const likedUsers = JSON.parse(localStorage.getItem('likedUsers') || '[]');
    cardContainer.innerHTML = likedUsers.length > 0 ? '' : '<p class="no-favorites">Немає вподобаних користувачів</p>';
    
    likedUsers.forEach(user => {
        cardContainer.innerHTML += showUser(user, true); 
    });
    
    isFavoritesView = true;
});

usersButton.addEventListener('click', async () => {
    if (getItemWithExpire('user')) {
        cardContainer.style.display = 'flex';
        cabinetContainer.style.display = 'none';

        if (users.length === 0) {
            try {
                showLoading();
                await getUsers(NUMBER_OF_CARD_PER_PAGE * 3);
                currentUsers = [...users];
                showPage(1);
            } catch (error) {
                console.error('Помилка при ініціалізації користувачів:', error);
                getError('Не вдалося ініціалізувати користувачів. Спробуйте пізніше.');
            } finally {
                hideLoading();
            }
        } else {
            showPage(1);
        }
    }
});


async function generateOnePage(pageNumber = 1) {
    const totalNeeded = pageNumber * NUMBER_OF_CARD_PER_PAGE;

    if (users.length < totalNeeded) {
        const now = Date.now();
        if (now - lastFetchTime < 2000 || isLoading) return;

        isLoading = true;
        showLoading();
        lastFetchTime = now;

        const toFetch = totalNeeded - users.length;
        await getUsers(toFetch);

        isLoading = false;
        hideLoading();
    }

    showPage(pageNumber);
    setUrl({page: pageNumber});
}


function getError(message = 'Щось пішло не так. Спробуйте ще раз пізніше.') {
    const errorMessageDiv = document.getElementById('error-message');
    if (errorMessageDiv) {
        errorMessageDiv.textContent = message;
        errorMessageDiv.style.display = 'block';
        setTimeout(() => {
            errorMessageDiv.style.display = 'none';
            errorMessageDiv.textContent = '';
        }, 20000);
    }
}


document.addEventListener('scroll', debounce(() => {
    if (!getItemWithExpire('user')) return;

    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const fullHeight = document.body.offsetHeight;

    if (scrollTop + windowHeight >= fullHeight - 100) {
        const currentPage = getPageFromUrl();
        const nextPage = currentPage + 1;

        generateOnePage(nextPage).catch(error => {
            console.error('Помилка при завантаженні користувачів:', error);
            getError('Не вдалося завантажити користувачів. Спробуйте пізніше.');
        });
    }
}, 500));


function renderSortedUsers(sortedUsers) {
    cardContainer.innerHTML = '';
    sortedUsers.forEach(user => {
        cardContainer.innerHTML += showUser(user);
    });
    currentUsers = sortedUsers;
}

document.getElementById('sort-by-name').addEventListener('click', () => {
    showLoading();
    const sorted = [...currentUsers].sort((a, b) => {
        const nameA = `${a.name.first} ${a.name.last}`.toLowerCase();
        const nameB = `${b.name.first} ${b.name.last}`.toLowerCase();
        return nameA.localeCompare(nameB);
    });
    renderSortedUsers(sorted);
    setUrl({sort: 'name'});
    hideLoading();
});

document.getElementById('sort-by-age').addEventListener('click', () => {
    showLoading();
    const sorted = [...currentUsers].sort((a, b) => a.dob.age - b.dob.age);
    renderSortedUsers(sorted);
    setUrl({sort: 'age'});
    hideLoading();
});

document.getElementById('sort-by-registration').addEventListener('click', () => {
    showLoading();
    const sorted = [...currentUsers].sort((a, b) => new Date(b.registered.date) - new Date(a.registered.date));
    renderSortedUsers(sorted);
    setUrl({sort: 'registration'});
    hideLoading();
});

function renderFiltered(filtered) {
    currentUsers = filtered;
    cardContainer.innerHTML = '';
    filtered.forEach(user => {
        cardContainer.innerHTML += showUser(user);
    });
}

document.getElementById('filter-age').addEventListener('input', debounce(applyAllFilters, 300));
document.getElementById('filter-year').addEventListener('input', debounce(applyAllFilters, 300));
document.getElementById('filter-location').addEventListener('input', debounce(applyAllFilters, 300));
document.getElementById('filter-email').addEventListener('input', debounce(applyAllFilters, 300));
document.getElementById('search').addEventListener('input', debounce(applyAllFilters, 300));
window.addEventListener('popstate', () => {
    applyFiltersFromUrl();
});
document.addEventListener('DOMContentLoaded', () => {
    applyFiltersFromUrl();

    const params = new URLSearchParams(window.location.search);
    const pageParam = parseInt(params.get('page'));
    if (!isNaN(pageParam)) {
        currentPage = pageParam;
    }

    if (users.length > 0) {
        showPage(currentPage);
    }
});