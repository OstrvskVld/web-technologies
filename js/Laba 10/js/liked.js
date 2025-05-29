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
}

cardContainer.addEventListener('click', (e) => {
    if (e.target.closest('.like')) {
        const button = e.target.closest('.like');
        const userId = button.dataset.userId;
        const user = users.find(u => u.login.uuid === userId);
        if (!user) return;

        toggleLike(user);
        button.classList.toggle('liked');


    }

     if (e.target.closest('.delete-user')) {
        const button = e.target.closest('.delete-user');
        const userId = button.dataset.userId;
        
        
        const likedUsers = JSON.parse(localStorage.getItem('likedUsers') || []);
        const updatedLikes = likedUsers.filter(u => u.login.uuid !== userId);
        localStorage.setItem('likedUsers', JSON.stringify(updatedLikes));
        
       
        const card = button.closest('.user-card');
        card.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            card.remove();
            
            
            if (cardContainer.children.length === 0) {
                cardContainer.innerHTML = '<p class="no-favorites">Немає вподобаних користувачів</p>';
            }
        }, 300);
    }
});


document.getElementById('favorites').addEventListener('click', () => {
    const likedUsers = JSON.parse(localStorage.getItem('likedUsers') || '[]');
    cardContainer.innerHTML = '';
    likedUsers.forEach(user => {
        cardContainer.innerHTML += showUser(user);
    });
});

function showUser(user, isFavoritesView = false) {
    const likedUsers = JSON.parse(localStorage.getItem('likedUsers') || '[]');
    const isLiked = likedUsers.some(u => u.login.uuid === user.login.uuid);

    return `
        <div class="user-card" data-user-id="${user.login.uuid}">
            <div class="user-info">
                <img class="user-img" src="${user.picture.large}" alt="User image">
                <p class="user-card-title">${user.name.first} ${user.name.last}</p>
                <p class="user-card-text">Age: ${user.dob.age}</p>
                <p class="user-card-text">Location: ${user.location.city}, ${user.location.country}</p>
                <p class="user-card-text">Phone: ${user.phone}</p>
                <p class="user-card-text">Email: ${user.email}</p>
            </div>
            <div class="user-actions">
                <button class="like ${isLiked ? 'liked' : ''}" data-user-id="${user.login.uuid}">
                    ${isLiked ? '❤️' : '🤍'}
                </button>
                ${isFavoritesView ? 
                    `<button class="delete-user" data-user-id="${user.login.uuid}">Видалити</button>` 
                    : ''}
            </div>
        </div>`;
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
    return index === -1; // Повертає true, якщо додали, false - якщо видалили
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




