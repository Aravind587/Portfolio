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
}

function closePopup(id) {
    const popup = document.getElementById(id);
    if (!popup) return;
    popup.classList.remove('is-open');
    document.body.classList.remove('popup-open');
}

/* Backdrop click closes any popup */
document.querySelectorAll('.popup-backdrop').forEach(bd => {
    bd.addEventListener('click', () => {
        const popup = bd.closest('.popup');
        if (popup) {
            popup.classList.remove('is-open');
            document.body.classList.remove('popup-open');
        }
    });
});

/* Escape key closes all popups */
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.popup.is-open').forEach(p => p.classList.remove('is-open'));
        document.body.classList.remove('popup-open');
    }
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