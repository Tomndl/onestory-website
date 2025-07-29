// Configuration
const discordLink = 'https://discord.gg/onestory';
const serverIP = 'connect.g45.hopeheberg.fr:31210';

// Fonction pour lancer FiveM
function joinServer() {
    // URL FiveM pour lancer l'application sans se connecter à un serveur
    const fivemUrl = 'fivem://';
    
    // Lancer FiveM sans connexion automatique
    window.location.href = fivemUrl;
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

// Système de notification
function showNotification(message, type = 'info') {
    // Supprimer les notifications existantes
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Styles pour la notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Fermeture automatique
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    // Fermeture manuelle
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
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
});

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