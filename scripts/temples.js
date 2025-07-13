function setupHamburgerMenu() {
    const nav = document.querySelector('nav ul');
    const hamburgerBtn = document.createElement('button');
    hamburgerBtn.classList.add('hamburger');
    hamburgerBtn.textContent = '☰';
    hamburgerBtn.setAttribute('aria-label', 'Toggle navigation menu');

    const header = document.querySelector('header') || document.body;
    header.insertBefore(hamburgerBtn, nav.parentElement);

    function toggleMenu() {
        const isExpanded = nav.style.display !== 'none';
        nav.style.display = isExpanded ? 'none' : 'flex';
        hamburgerBtn.innerHTML = isExpanded ? '☰' : '✕';
        hamburgerBtn.setAttribute('aria-expanded', !isExpanded);
    }

    hamburgerBtn.addEventListener('click', toggleMenu);

    function handleResize() {
        const isMobile = window.innerWidth < 768;
        hamburgerBtn.style.display = isMobile ? 'block' : 'none';
        nav.style.display = isMobile ? 'none' : 'flex';
    }

    window.addEventListener('load', () => {
        updateFooter();
        handleResize();
    });
    window.addEventListener('resize', handleResize);
}

document.addEventListener('DOMContentLoaded', setupHamburgerMenu);
