// Configuration
const discordLink = 'https://discord.gg/onestory';
const serverIP = 'connect.g45.hopeheberg.fr:31210';

// Configuration de la boutique
const shopCategories = {
    coins: {
        id: 'coins',
        name: 'Coins',
        description: 'Monnaie virtuelle pour vos achats en jeu',
        icon: 'fas fa-coins',
        items: [
            {
                id: 'coins-1000',
                name: '1000 Coins',
                price: 10.00,
                description: 'Pack de base pour commencer'
            },
            {
                id: 'coins-2000',
                name: '2000 Coins',
                price: 20.00,
                description: 'Pack populaire pour les joueurs actifs'
            },
            {
                id: 'coins-3000',
                name: '3000 Coins',
                price: 30.00,
                description: 'Pack intermédiaire avec bonus'
            },
            {
                id: 'coins-4000',
                name: '4000 Coins',
                price: 40.00,
                description: 'Pack premium pour les joueurs réguliers'
            },
            {
                id: 'coins-5000',
                name: '5000 Coins',
                price: 50.00,
                description: 'Pack avancé avec avantages exclusifs'
            },
            {
                id: 'coins-6000',
                name: '6000 Coins',
                price: 60.00,
                description: 'Pack expert pour les gros joueurs'
            },
            {
                id: 'coins-7000',
                name: '7000 Coins',
                price: 70.00,
                description: 'Pack master avec privilèges VIP'
            },
            {
                id: 'coins-8000',
                name: '8000 Coins',
                price: 80.00,
                description: 'Pack élite pour les passionnés'
            },
            {
                id: 'coins-9000',
                name: '9000 Coins',
                price: 90.00,
                description: 'Pack ultime pour les collectionneurs'
            },
            {
                id: 'coins-10000',
                name: '10000 Coins',
                price: 100.00,
                description: 'Pack légendaire pour les vrais fans'
            }
        ]
    }
};

// Panier d'achat
let cart = JSON.parse(localStorage.getItem('onestory-cart')) || [];

// Fonction pour lancer FiveM
function joinServer() {
    // URL FiveM pour lancer l'application sans se connecter à un serveur
    const fivemUrl = 'fivem://';
    
    // Lancer FiveM sans connexion automatique
    window.location.href = fivemUrl;
}

// Fonction pour ouvrir un ticket Discord
function addToCart(itemId) {
    // Trouver l'item dans les catégories
    let item = null;
    for (const category of Object.values(shopCategories)) {
        const foundItem = category.items.find(i => i.id === itemId);
        if (foundItem) {
            item = foundItem;
            break;
        }
    }
    
    if (!item) {
        showNotification('Article non trouvé', 'error');
        return;
    }

    // Afficher une notification de redirection
    showNotification(`Redirection vers Discord pour ${item.name}...`, 'info');
    
    // Rediriger vers Discord après un court délai
    setTimeout(() => {
        window.open(discordLink, '_blank');
    }, 1500);
}

// Fonction pour naviguer vers une catégorie
function navigateToCategory(categoryId) {
    const category = shopCategories[categoryId];
    if (!category) {
        showNotification('Catégorie non trouvée', 'error');
        return;
    }

    // Créer la page de catégorie
    const categoryPage = document.createElement('div');
    categoryPage.className = 'category-page active';
    categoryPage.innerHTML = `
        <section class="category-section">
            <div class="container">
                <div class="category-header">
                    <button class="btn btn-back" onclick="goBackToShop()">
                        <i class="fas fa-arrow-left"></i>
                        Retour à la boutique
                    </button>
                    <h2 class="section-title">${category.name}</h2>
                    <p class="section-subtitle">${category.description}</p>
                </div>
                
                <div class="category-items">
                    ${category.items.map(item => `
                        <div class="category-item">
                            <div class="item-icon">
                                <i class="${category.icon}"></i>
                            </div>
                            <div class="item-info">
                                <h3>${item.name}</h3>
                                <p>${item.description}</p>
                                <div class="item-price">
                                    <span class="currency">€</span>
                                    <span class="amount">${item.price}</span>
                                </div>
                            </div>
                            <div class="item-actions">
                                <button class="btn btn-add-cart" onclick="addToCart('${item.id}')">
                                    <i class="fas fa-ticket-alt"></i>
                                    Ouvrir un ticket
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
    `;

    // Masquer la page boutique et afficher la page catégorie
    const shopPage = document.getElementById('page-boutique');
    shopPage.style.display = 'none';
    
    document.body.appendChild(categoryPage);
}

// Fonction pour retourner à la boutique
function goBackToShop() {
    const categoryPage = document.querySelector('.category-page');
    if (categoryPage) {
        categoryPage.remove();
    }
    
    const shopPage = document.getElementById('page-boutique');
    shopPage.style.display = 'block';
}

// Fonction pour retirer un item du panier
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    showNotification('Article retiré du panier', 'info');
    updateCartDisplay();
    saveCart();
}

// Fonction pour mettre à jour l'affichage du panier
function updateCartDisplay() {
    const cartContainer = document.getElementById('cart-container');
    const cartCount = document.getElementById('cart-count');
    
    // Mettre à jour le compteur du panier
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
    
    if (!cartContainer) return;

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="cart-empty">Votre panier est vide</p>';
        return;
    }

    let cartHTML = '<div class="cart-items">';
    let total = 0;

    cart.forEach(item => {
        // Trouver l'item dans les catégories
        let foundItem = null;
        for (const category of Object.values(shopCategories)) {
            const categoryItem = category.items.find(i => i.id === item.id);
            if (categoryItem) {
                foundItem = categoryItem;
                break;
            }
        }
        
        if (!foundItem) return;
        
        const itemTotal = foundItem.price * item.quantity;
        total += itemTotal;

        cartHTML += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${foundItem.name}</h4>
                    <p>${foundItem.price}€</p>
                </div>
                <div class="cart-item-quantity">
                    <button onclick="updateQuantity('${item.id}', ${item.quantity - 1})" ${item.quantity <= 1 ? 'disabled' : ''}>-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                </div>
                <div class="cart-item-total">
                    <span>${itemTotal.toFixed(2)}€</span>
                    <button onclick="removeFromCart('${item.id}')" class="remove-btn">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });

    cartHTML += `
        </div>
        <div class="cart-total">
            <h4>Total: ${total.toFixed(2)}€</h4>
            <button onclick="proceedToCheckout()" class="btn btn-primary">
                <i class="fas fa-ticket-alt"></i>
                Ouvrir un ticket
            </button>
        </div>
    `;

    cartContainer.innerHTML = cartHTML;
}

// Fonction pour mettre à jour la quantité d'un item
function updateQuantity(itemId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(itemId);
        return;
    }

    const item = cart.find(item => item.id === itemId);
    if (item) {
        item.quantity = newQuantity;
        updateCartDisplay();
        saveCart();
    }
}

// Fonction pour procéder au paiement
function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('Votre panier est vide', 'error');
        return;
    }

    // Rediriger vers Discord pour finaliser l'achat
    showNotification('Redirection vers Discord pour finaliser votre commande...', 'info');
    
    setTimeout(() => {
        window.open(discordLink, '_blank');
    }, 1500);
}

// Fonction pour simuler le paiement
function simulatePayment() {
    // Calculer le total en trouvant les items dans les catégories
    let total = 0;
    cart.forEach(item => {
        for (const category of Object.values(shopCategories)) {
            const foundItem = category.items.find(i => i.id === item.id);
            if (foundItem) {
                total += foundItem.price * item.quantity;
                break;
            }
        }
    });
    
    showNotification(`Paiement de ${total.toFixed(2)}€ en cours...`, 'info');
    
    setTimeout(() => {
        // Simuler un paiement réussi
        showNotification('Paiement réussi ! Vos achats seront livrés dans les 24h.', 'success');
        
        // Vider le panier
        cart = [];
        updateCartDisplay();
        saveCart();
        
        // Rediriger vers Discord pour l'activation
        setTimeout(() => {
            window.open(discordLink, '_blank');
        }, 3000);
    }, 3000);
}

// Fonction pour ouvrir le panier
function openCart() {
    const cartModal = document.createElement('div');
    cartModal.className = 'cart-modal';
    cartModal.innerHTML = `
        <div class="cart-modal-content">
            <div class="cart-modal-header">
                <h2>Votre Panier</h2>
                <button onclick="closeCart()" class="close-btn">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="cart-modal-body">
                <div id="cart-container">
                    ${cart.length === 0 ? '<p class="cart-empty">Votre panier est vide</p>' : ''}
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(cartModal);
    setTimeout(() => cartModal.classList.add('active'), 10);
    updateCartDisplay();
}

// Fonction pour fermer le panier
function closeCart() {
    const modal = document.querySelector('.cart-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    }
}

// Fonction pour sauvegarder le panier dans le localStorage
function saveCart() {
    localStorage.setItem('onestory-cart', JSON.stringify(cart));
}

// Navigation mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fermer le menu mobile quand on clique sur un lien
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Navigation sticky
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.9)';
    }
});

// Animation au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer les éléments à animer
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.server-card, .shop-card, .gallery-item, .discord-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Compteur animé pour les statistiques
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Animation des compteurs quand ils sont visibles
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const text = statNumber.textContent;
            
            if (text.includes('+')) {
                const number = parseInt(text);
                animateCounter(statNumber, number);
                statNumber.textContent = number + '+';
            } else if (text.includes('.')) {
                // Pour les notes avec décimales
                statNumber.style.opacity = '1';
            } else if (text === '24/7') {
                // Pour la disponibilité
                statNumber.style.opacity = '1';
            }
            
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        const statNumber = item.querySelector('.stat-number');
        statNumber.style.opacity = '0';
        statNumber.style.transition = 'opacity 0.5s ease';
        statsObserver.observe(item);
    });
});

// Bouton Discord
const discordButton = document.querySelector('.btn-discord');
if (discordButton) {
    discordButton.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remplacer par votre lien Discord
        const discordLink = 'https://discord.gg/onestory';
        
        // Ouvrir Discord dans un nouvel onglet
        window.open(discordLink, '_blank');
        
        // Notification de succès
        showNotification('Redirection vers Discord...', 'success');
    });
}

// Lien Discord dans le footer
const discordFooterLink = document.querySelector('.discord-link');
if (discordFooterLink) {
    discordFooterLink.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remplacer par votre lien Discord
        const discordLink = 'https://discord.gg/onestory';
        
        // Ouvrir Discord dans un nouvel onglet
        window.open(discordLink, '_blank');
    });
}

// Boutons de la boutique
const shopButtons = document.querySelectorAll('.btn-shop');
shopButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        
        const pack = button.getAttribute('data-pack');
        const packNames = {
            'starter': 'Pack Starter',
            'premium': 'Pack Premium',
            'ultimate': 'Pack Ultimate'
        };
        
        // Simulation d'achat - remplacer par votre système de paiement
        showNotification(`Redirection vers le système de paiement pour le ${packNames[pack]}...`, 'success');
        
        // Ici vous pouvez rediriger vers votre système de paiement
        // window.open('votre-lien-de-paiement', '_blank');
        
        // Pour l'exemple, on simule un délai
        setTimeout(() => {
            showNotification('Paiement traité avec succès ! Vos avantages sont maintenant actifs.', 'success');
        }, 2000);
    });
});

// Système de notification amélioré
function showNotification(message, type = 'info') {
    // Supprimer les notifications existantes
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${icons[type] || icons.info}"></i>
            <span class="notification-message">${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Styles pour la notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 15px;
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(400px) scale(0.8);
        transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        max-width: 350px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
    `;
    
    document.body.appendChild(notification);
    
    // Animation d'entrée avec effet de rebond
    setTimeout(() => {
        notification.style.transform = 'translateX(0) scale(1)';
    }, 100);
    
    // Fermeture automatique
    setTimeout(() => {
        notification.style.transform = 'translateX(400px) scale(0.8)';
        setTimeout(() => notification.remove(), 400);
    }, 6000);
    
    // Fermeture manuelle
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.transform = 'translateX(400px) scale(0.8)';
        setTimeout(() => notification.remove(), 400);
    });
    
    // Animation de survol
    notification.addEventListener('mouseenter', () => {
        notification.style.transform = 'translateX(0) scale(1.05)';
    });
    
    notification.addEventListener('mouseleave', () => {
        notification.style.transform = 'translateX(0) scale(1)';
    });
}

// Effet de parallaxe sur le hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Navigation entre les pages
let currentPage = 'accueil';
let isTransitioning = false;

function navigateTo(pageName) {
    if (isTransitioning || currentPage === pageName) return;
    
    isTransitioning = true;
    
    // Créer l'élément de transition
    const transition = document.createElement('div');
    transition.className = 'page-transition';
    document.body.appendChild(transition);
    
    // Activer la transition
    setTimeout(() => {
        transition.classList.add('active');
    }, 10);
    
    // Changer de page après la transition
    setTimeout(() => {
        // Masquer la page actuelle
        const currentPageElement = document.getElementById(`page-${currentPage}`);
        if (currentPageElement) {
            currentPageElement.classList.remove('active');
            currentPageElement.classList.add('slide-out');
        }
        
        // Afficher la nouvelle page
        const newPageElement = document.getElementById(`page-${pageName}`);
        if (newPageElement) {
            newPageElement.classList.add('active');
            newPageElement.classList.remove('slide-out');
        }
        
        // Mettre à jour la page courante
        currentPage = pageName;
        
        // Fermer le menu mobile si ouvert
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Désactiver la transition
        setTimeout(() => {
            transition.classList.remove('active');
            setTimeout(() => {
                document.body.removeChild(transition);
                isTransitioning = false;
            }, 500);
        }, 100);
        
    }, 250);
}

// Navigation au clavier (flèches gauche/droite)
document.addEventListener('keydown', (e) => {
    if (isTransitioning) return;
    
    const pages = ['accueil', 'serveur', 'boutique', 'galerie', 'contact'];
    const currentIndex = pages.indexOf(currentPage);
    
    if (e.key === 'ArrowLeft' && currentIndex > 0) {
        navigateTo(pages[currentIndex - 1]);
    } else if (e.key === 'ArrowRight' && currentIndex < pages.length - 1) {
        navigateTo(pages[currentIndex + 1]);
    }
});

// Effet de hover sur les cartes
document.querySelectorAll('.server-card, .rule-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Animation des icônes
document.querySelectorAll('.server-card i, .contact-item i').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'rotate(360deg) scale(1.2)';
        this.style.transition = 'transform 0.5s ease';
    });
    
    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'rotate(0deg) scale(1)';
    });
});

// Effet de typewriter pour le titre principal
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialiser l'effet typewriter quand la page est chargée
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 1000);
    }
    
    // Initialiser la boutique
    initializeShop();
});

// Fonction d'initialisation de la boutique
function initializeShop() {
    // Mettre à jour l'affichage du panier au chargement
    updateCartDisplay();
    
    // Ajouter des événements pour fermer les modals en cliquant à l'extérieur
    document.addEventListener('click', (e) => {
        const packModal = document.querySelector('.pack-modal');
        const cartModal = document.querySelector('.cart-modal');
        
        if (packModal && e.target === packModal) {
            closePackModal();
        }
        
        if (cartModal && e.target === cartModal) {
            closeCart();
        }
    });
    
    // Fermer les modals avec la touche Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closePackModal();
            closeCart();
        }
    });
}

// Effet de particules en arrière-plan (optionnel)
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(52, 152, 219, 0.5);
            border-radius: 50%;
            pointer-events: none;
            animation: float 6s ease-in-out infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 6}s;
        `;
        hero.appendChild(particle);
    }
}

// Animation pour les particules
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0;
        }
        50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Initialiser les particules
document.addEventListener('DOMContentLoaded', createParticles);

// Préchargement des images
function preloadImages() {
    const images = [
        'https://via.placeholder.com/400x300/2c3e50/ffffff?text=GTA+RP+1',
        'https://via.placeholder.com/400x300/34495e/ffffff?text=GTA+RP+2',
        'https://via.placeholder.com/400x300/3498db/ffffff?text=GTA+RP+3',
        'https://via.placeholder.com/400x300/e74c3c/ffffff?text=GTA+RP+4'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Précharger les images au chargement de la page
window.addEventListener('load', preloadImages);

// Effet de loading
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Gestion des erreurs
window.addEventListener('error', (e) => {
    console.error('Erreur JavaScript:', e.error);
});

// Performance monitoring
window.addEventListener('load', () => {
    if ('performance' in window) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Temps de chargement: ${loadTime}ms`);
    }
}); 