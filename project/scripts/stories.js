document.addEventListener('DOMContentLoaded', async function () {
    // Load all data
    const [temples, stories] = await Promise.all([
        fetch('data/temples.json').then(r => r.json()),
        fetch('data/stories.json').then(r => r.json())
    ]);

    // Populate temple filter dropdown
    const templeFilter = document.getElementById('temple-filter');
    const storyTempleSelect = document.getElementById('story-temple');

    temples.forEach(temple => {
        if (temple.status === 'visited') {
            const option = new Option(temple.name, temple.id);
            templeFilter.add(option.cloneNode(true));
            storyTempleSelect.add(option);
        }
    });

    // Display all stories initially
    displayStories(stories, temples);

    // Setup filter event
    templeFilter.addEventListener('change', (e) => {
        const templeId = e.target.value;
        const filtered = templeId === 'all'
            ? stories
            : stories.filter(s => s.templeId == templeId);
        displayStories(filtered, temples);
    });
});

function displayStories(stories, temples) {
    const container = document.getElementById('stories-list');

    // Group stories by temple
    const grouped = stories.reduce((acc, story) => {
        const temple = temples.find(t => t.id === story.templeId);
        const templeName = temple.name;
        acc[templeName] = acc[templeName] || [];
        acc[templeName].push(story);
        return acc;
    }, {});

    // Sort temples alphabetically
    const sortedTempleNames = Object.keys(grouped).sort();

    // Build HTML
    let html = '';
    sortedTempleNames.forEach(templeName => {
        html += `<section class="temple-stories">
                   <h2>${templeName}</h2>
                   <div class="story-cards">`;

        grouped[templeName].forEach(story => {
            html += `<article class="story-card">
                       ${story.date ? `<div class="story-date">${formatDate(story.date)}</div>` : ''}
                       <h3>${story.title}</h3>
                       <p>${story.content}</p>
                       ${story.memories ? `<div class="memory-tags">
                           ${story.memories.map(m => `<span>${m}</span>`).join('')}
                       </div>` : ''}
                       ${story.image ? `<img src="${story.image}" alt="${story.title}">` : ''}
                     </article>`;
        });

        html += `</div></section>`;
    });

    container.innerHTML = html || '<p>No stories found. Be the first to share!</p>';
}
//helper function for consistent date formatting
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

document.getElementById('story-form').addEventListener('submit', function (e) {
    e.preventDefault();
    
    //basic validation
    if (!this.checkValidity()) {
        this.reportValidity();
        return;
    }

    const newStory = {
        id: 'story-' + Date.now(),
        templeId: parseInt(document.getElementById('story-temple').value),
        date: document.getElementById('story-date').value || null,
        title: document.getElementById('story-title').value,
        content: document.getElementById('story-content').value,
        image: '' 
    };

    try {
        stories.push(newStory);
        displayStories(stories, temples);

        alert('Story submitted successfully!');
        this.reset();
    } catch (error) {
        console.error('Error submitting story:', error);
        alert('There was an error submitting your story. Please try again.');
    }

    console.log('New story with date:', newStory);
    this.reset();
});

// Save draft stories
document.getElementById('story-form').addEventListener('input', function () {
    const draft = {
        title: document.getElementById('story-title').value,
        content: document.getElementById('story-content').value,
        templeId: document.getElementById('story-temple').value
    };
    localStorage.setItem('storyDraft', JSON.stringify(draft));
});

// Load draft on page load
document.addEventListener('DOMContentLoaded', function () {
    const draft = JSON.parse(localStorage.getItem('storyDraft'));
    if (draft) {
        document.getElementById('story-title').value = draft.title;
        document.getElementById('story-content').value = draft.content;
        document.getElementById('story-temple').value = draft.templeId;
    }
});

// Clear on successful submission
document.getElementById('story-form').addEventListener('submit', function () {
    localStorage.removeItem('storyDraft');
});