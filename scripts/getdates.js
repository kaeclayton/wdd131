const copyrightYear = document.querySelector('#copyright');
const lastModifiedElement = document.querySelector('#lastModified');

if (copyrightYear) {
    const currentYear = new Date().getFullYear();
    copyrightYear.innerHTML = `&copy; ${currentYear} | Kae Clayton | Arizona`;
}

if (lastModifiedElement) {
    lastModifiedElement.textContent = `Last Modified: ${formatDate(document.lastModified)}`;
}

function formatDate(dateString) {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
}