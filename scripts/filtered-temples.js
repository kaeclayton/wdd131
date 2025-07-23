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
        handleResize();
    });
    window.addEventListener('resize', handleResize);
}

document.addEventListener('DOMContentLoaded', setupHamburgerMenu);

const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    {
        templeName: "Gilbert Arizona",
        location: "Gilbert, Arizona, United States",
        dedicated: "2014, March, 2",
        area: 85326,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/gilbert-arizona/400x400/temple-lds-mormon-arizona-religion-780528-wallpaper.jpg"
    },
    {
        templeName: "Salt Lake",
        location: "Salt Lake City, Utah, United States",
        dedicated: "1893, April, 6",
        area: 382207,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake-city-utah/400x250/salt-lake-temple-37762.jpg"
    },
    {
        templeName: "Montevideo Uruguay",
        location: "Carrasco, Montevideo, Uruguay",
        dedicated: "2001, March, 18",
        area: 10700,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/montevideo-uruguay/400x250/montevideo-uruguay-temple-lds-83476-wallpaper.jpg"
    },
    {
        templeName: "Laie Hawaii",
        location: "Laie, Hawaii, United States",
        dedicated: "1919, November, 27",
        area: 42100,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/laie-hawaii/400x250/laie-temple-775370-wallpaper.jpg"
    },
    {
        templeName: "St. George Utah",
        location: "St. George, Utah, United States",
        dedicated: "1877, April, 6",
        area: 143969,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/st-george-utah/400x250/st-george-temple-lds-894724-wallpaper.jpg"
    },
    
];

function createTempleCard(temple) {
    const card = document.createElement('figure');
    card.classList.add('temple-card');

    const img = document.createElement('img');
    img.src = temple.imageUrl;
    img.alt = temple.templeName;
    img.loading = 'lazy';

    const figcaption = document.createElement('figcaption');

    const name = document.createElement('h3');
    name.textContent = temple.templeName;

    const location = document.createElement('p');
    location.textContent = `Location: ${temple.location}`;

    const dedicated = document.createElement('p');
    dedicated.textContent = `Dedicated: ${temple.dedicated}`;

    const area = document.createElement('p');
    area.textContent = `Size: ${temple.area.toLocaleString()} sq ft`;

    figcaption.appendChild(name);
    figcaption.appendChild(location);
    figcaption.appendChild(dedicated);
    figcaption.appendChild(area);

    card.appendChild(img);
    card.appendChild(figcaption);

    return card;
}

function displayTemples(templesArray) {
    const gallery = document.querySelector('.gallery');
    
    while (gallery.children.length > 2) {
        gallery.removeChild(gallery.lastChild);
    }

    templesArray.forEach(temple => {
        const card = createTempleCard(temple);
        gallery.appendChild(card);
    });
}

function filterOld() {
    return temples.filter(temple => {
        const year = parseInt(temple.dedicated.split(',')[0]);
        return year < 1900;
    });
}

function filterNew() {
    return temples.filter(temple => {
        const year = parseInt(temple.dedicated.split(',')[0]);
        return year > 2000;
    });
}

function filterLarge() {
    return temples.filter(temple => temple.area > 90000);
}

function filterSmall() {
    return temples.filter(temple => temple.area < 10000);
}

function setupNavigation() {
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            let filteredTemples = [];
            const title = document.querySelector('.gallery h2');

            switch (link.textContent) {
                case 'Old':
                    filteredTemples = filterOld();
                    title.textContent = 'Old Temples (pre-1900)';
                    break;
                case 'New':
                    filteredTemples = filterNew();
                    title.textContent = 'New Temples (post-2000)';
                    break;
                case 'Large':
                    filteredTemples = filterLarge();
                    title.textContent = 'Large Temples (90,000+ sq ft)';
                    break;
                case 'Small':
                    filteredTemples = filterSmall();
                    title.textContent = 'Small Temples (<10,000 sq ft)';
                    break;
                default:
                    filteredTemples = temples;
                    title.textContent = 'All Temples';
            }

            displayTemples(filteredTemples);
        });
    });
}

function init() {
    setupNavigation();
    displayTemples(temples);
}

document.addEventListener('DOMContentLoaded', init);