// Load and display stories alphabetically
async function loadStories() {
    const [temples, stories] = await Promise.all([
        fetch('data/temples.json').then(r => r.json()),
        fetch('data/stories.json').then(r => r.json())
    ]);

    // 1. Group stories by temple name
    const grouped = stories.reduce((acc, story) => {
        const temple = temples.find(t => t.id === story.templeId);
        const templeName = temple.name;
        acc[templeName] = acc[templeName] || [];
        acc[templeName].push(story);
        return acc;
    }, {});

    // 2. Sort temples alphabetically
    const sortedTempleNames = Object.keys(grouped).sort();

    // 3. Build HTML
    let html = '';
    sortedTempleNames.forEach(templeName => {
        html += `<section class="temple-stories">
               <h2>${templeName}</h2>
               <div class="story-cards">`;

        grouped[templeName].forEach(story => {
            html += `<article class="story-card">
                 <h3>${story.title}</h3>
                 <p>${story.content}</p>
                 ${story.image ? `<img src="${story.image}" alt="">` : ''}
               </article>`;
        });

        html += `</div></section>`;
    });

    document.getElementById('stories-list').innerHTML = html;
}

// Initialize
document.addEventListener('DOMContentLoaded', loadStories);