/* ── HEADER SCROLL ── */
const header = document.getElementById('mainHeader');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
});

/* ── PROJECT TAB SWITCHING ── */
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.projects-panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const panel = document.getElementById('tab-' + btn.dataset.tab);
        if (panel) panel.classList.add('active');
    });
});

/* ── POPUP OPEN / CLOSE ── */
function openPopup(id) {
    const popup = document.getElementById(id);
    if (!popup) return;
    popup.classList.add('is-open');
    document.body.classList.add('popup-open');
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closePopup(id) {
    const popup = document.getElementById(id);
    if (!popup) return;
    popup.classList.remove('is-open');
    document.body.classList.remove('popup-open');
    // Restore body scroll
    document.body.style.overflow = '';
}

/* Helper to close all popups */
function closeAllPopups() {
    document.querySelectorAll('.popup.is-open').forEach(p => {
        p.classList.remove('is-open');
    });
    document.body.classList.remove('popup-open');
    document.body.style.overflow = '';
}

/* Backdrop click closes any popup - improved for mobile */
document.querySelectorAll('.popup-backdrop').forEach(bd => {
    bd.addEventListener('click', (e) => {
        e.stopPropagation();
        const popup = bd.closest('.popup');
        if (popup) {
            popup.classList.remove('is-open');
            document.body.classList.remove('popup-open');
            document.body.style.overflow = '';
        }
    });
});

/* Escape key closes all popups */
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        closeAllPopups();
    }
});

/* Prevent popup content click from closing */
document.querySelectorAll('.popup-content').forEach(content => {
    content.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});

/* Mobile swipe-to-close for popups */
let touchStartY = 0;
let touchEndY = 0;

document.querySelectorAll('.popup').forEach(popup => {
    popup.addEventListener('touchstart', (e) => {
        if (e.target === popup.querySelector('.popup-backdrop') || 
            e.target.classList.contains('popup-backdrop')) {
            touchStartY = e.changedTouches[0].screenY;
        }
    }, false);

    popup.addEventListener('touchend', (e) => {
        if (e.target === popup.querySelector('.popup-backdrop') || 
            e.target.classList.contains('popup-backdrop')) {
            touchEndY = e.changedTouches[0].screenY;
            // Close on downward swipe on backdrop
            if (touchEndY - touchStartY > 100) {
                const closestPopup = popup.classList.contains('popup') ? popup : e.target.closest('.popup');
                if (closestPopup) {
                    closestPopup.classList.remove('is-open');
                    document.body.classList.remove('popup-open');
                    document.body.style.overflow = '';
                }
            }
        }
    }, false);
});

/* ── SCROLL REVEAL ── */
const revealEls = document.querySelectorAll(
    '.rm-item, .skill-category, .cert-card, .proj-card, .flutter-highlight, .ai-highlight'
);
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity .55s ease, transform .55s ease';
    observer.observe(el);
});

/* ── HAMBURGER MENU ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.info_links');
let menuOpen = false;

hamburger.addEventListener('click', () => {
    menuOpen = !menuOpen;
    if (menuOpen) {
        navLinks.style.cssText = `
            display:flex; flex-direction:column; position:absolute;
            top:64px; right:5%; background:rgba(11,13,24,.97);
            border:1px solid rgba(255,255,255,.09); border-radius:12px;
            padding:12px; z-index:999; gap:4px;
        `;
    } else {
        navLinks.style.display = 'none';
    }
});

document.querySelectorAll('.info_links a').forEach(a => {
    a.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navLinks.style.display = 'none';
            menuOpen = false;
        }
    });
});

/* ── ACTIVE NAV HIGHLIGHT ── */
const sections = document.querySelectorAll('section[id], footer[id]');
const navA     = document.querySelectorAll('.info_links a');

sections.forEach(s => {
    new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                navA.forEach(a => {
                    a.style.color = '';
                    if (a.getAttribute('href') === '#' + e.target.id) a.style.color = 'var(--accent)';
                });
            }
        });
    }, { threshold: 0.45 }).observe(s);
});

/* ── MOBILE MENU CLOSE ON BODY CLICK ── */
document.addEventListener('click', (e) => {
    if (menuOpen && !e.target.closest('.hamburger') && !e.target.closest('.info_links')) {
        navLinks.style.display = 'none';
        menuOpen = false;
    }
});

/* ── BACK TO TOP BUTTON ── */
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
backToTopBtn.className = 'back-to-top';
backToTopBtn.setAttribute('aria-label', 'Back to top');
backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: var(--accent);
    border: none;
    color: #0d1117;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 100;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(201, 168, 76, 0.3);
`;

document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.style.display = 'flex';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

backToTopBtn.addEventListener('mouseenter', () => {
    backToTopBtn.style.background = 'linear-gradient(135deg, #f9e8a0, #c9a84c)';
    backToTopBtn.style.transform = 'scale(1.1)';
});

backToTopBtn.addEventListener('mouseleave', () => {
    backToTopBtn.style.background = 'var(--accent)';
    backToTopBtn.style.transform = 'scale(1)';
});

/* Mobile back-to-top button size */
if (window.innerWidth <= 768) {
    backToTopBtn.style.bottom = '20px';
    backToTopBtn.style.right = '20px';
    backToTopBtn.style.width = '40px';
    backToTopBtn.style.height = '40px';
}

window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        backToTopBtn.style.bottom = '20px';
        backToTopBtn.style.right = '20px';
        backToTopBtn.style.width = '40px';
        backToTopBtn.style.height = '40px';
    } else {
        backToTopBtn.style.bottom = '30px';
        backToTopBtn.style.right = '30px';
        backToTopBtn.style.width = '44px';
        backToTopBtn.style.height = '44px';
    }
});