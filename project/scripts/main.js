document.addEventListener('DOMContentLoaded', async function () {
    try {
        // Load temple data
        const response = await fetch('data/temples.json');
        const temples = await response.json();

        // Process all temple cards
        document.querySelectorAll('.temple-card').forEach(card => {
            const templeId = parseInt(card.getAttribute('data-id'));
            const temple = temples.find(t => t.id === templeId);
            if (!temple) return;

            // Save the original HTML for the front face
            const frontContent = card.innerHTML;

            // Create the back face content with temple details
            const backContent = `
                <div class="temple-card-back">
                    <button class="close-btn" aria-label="Close details">&times;</button>
                    <h3>${temple.name}</h3>
                    <p><strong>Location:</strong> ${temple.location.city}, ${temple.location.state || temple.location.country}</p>
                    <p><strong>Dedicated:</strong> ${formatDate(temple.dedication)}</p>
                    <p><strong>Size:</strong> ${temple.size}</p>
                    <div class="temple-features">
                        <h4>Notable Features:</h4>
                        <ul>
                            ${temple.features.map(f => `<li>${f}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;

            // Wrap the existing content in the flip card structure
            card.innerHTML = `
                <div class="temple-card-inner">
                    <div class="temple-card-front">
                        ${frontContent}
                    </div>
                    ${backContent}
                </div>
            `;

            // Update the image with proper src and fallback
            const img = card.querySelector('.temple-card-front img');
            if (img) {
                img.src = temple.image;
                img.onerror = function () {
                    this.src = temple.imageFallback || 'images/default-temple.jpg';
                };
                img.style.height = '250px'; height
                img.style.objectFit = 'cover'; 
            }

            // Add click event for flipping
            card.addEventListener('click', function (e) {
                // Don't flip if clicking on the close button
                if (e.target.classList.contains('close-btn')) {
                    this.classList.remove('flipped');
                    return;
                }

                this.classList.toggle('flipped');

                localStorage.setItem('lastViewedTemple', templeID);
            });

            // Add keyboard accessibility
            card.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.classList.toggle('flipped');
                }
            });

            // Make cards focusable for keyboard users
            card.setAttribute('tabindex', '0');
        });

    } catch (error) {
        console.error('Error loading temple data:', error);
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = 'Failed to load temple data. Please try again later.';
        document.querySelector('.gallery-container').prepend(errorElement);
    }
});

function formatDate(dateString) {
    if (!dateString || isNaN(new Date(dateString))) return 'Unknown date';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

async function loadHomePageData() {
    try {
        const [temples, stories] = await Promise.all([
            fetch('data/temples.json').then(r => r.json()),
            fetch('data/stories.json').then(r => r.json())
        ]);

        // Update stats
        document.getElementById('visited-count').textContent =
            temples.filter(t => t.status === 'visited').length;
        document.getElementById('stories-count').textContent = stories.length;
        document.getElementById('future-count').textContent =
            temples.filter(t => t.status === 'wish list').length;

        // Display featured story (most recent)
        if (stories.length > 0) {
            const featuredStory = stories.reduce((latest, story) => {
                const storyDate = story.date ? new Date(story.date) : new Date(0);
                const latestDate = latest.date ? new Date(latest.date) : new Date(0);
                return storyDate > latestDate ? story : latest;
            });

            document.getElementById('featured-story-title').textContent = featuredStory.title;
            document.getElementById('featured-story-excerpt').textContent =
                featuredStory.content.substring(0, 150) + '...';
            document.getElementById('featured-story-link').href =
                `stories.html?story=${featuredStory.id}`;
        }

        const lastViewed = localStorage.getItem('lastViewedTemple');
        if (lastViewed) {
            console.log('Last viewed temple:', lastViewed);
        }

        // Update copyright year and last modified
        const copyrightYear = document.getElementById('current-year');
        const lastModifiedElement = document.getElementById('lastModified');

        if (copyrightYear) {
            copyrightYear.textContent = new Date().getFullYear();
        }

        if (lastModifiedElement) {
            lastModifiedElement.textContent = `Last Modified: ${document.lastModified}`;
        }

    } catch (error) {
        console.error('Error loading home page data:', error);
    }
}

// Call this when on home page
if (document.querySelector('body').classList.contains('home-page')) {
    loadHomePageData();
}