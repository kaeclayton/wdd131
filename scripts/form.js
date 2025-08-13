const products = [
    {
        id: "fc-1888",
        name: "flux capacitor",
        averagerating: 4.5
    },
    {
        id: "fc-2050",
        name: "power laces",
        averagerating: 4.7
    },
    {
        id: "fs-1987",
        name: "time circuits",
        averagerating: 3.5
    },
    {
        id: "ac-2000",
        name: "low voltage reactor",
        averagerating: 3.9
    },
    {
        id: "jj-1969",
        name: "warp equalizer",
        averagerating: 5.0
    }
];

loadFormData();


const form = document.getElementById('reviewForm');
form.addEventListener('input', saveFormData);


form.addEventListener('submit', clearFormData);


const copyrightYear = document.querySelector('#currentyear');
const lastModifiedElement = document.querySelector('#lastModified');

if (copyrightYear) {
    const currentYear = new Date().getFullYear();
    copyrightYear.textContent = currentYear;
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

function saveFormData() {
    const form = document.getElementById('reviewForm');
    const formData = {
        product: form.product.value,
        stars: form.stars.value,
        installDate: form.installDate.value,
        features: Array.from(form.features)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value),
        review: form.review.value,
        name: form.name.value
    };
    localStorage.setItem('productReviewFormData', JSON.stringify(formData));
}

function loadFormData() {
    const savedData = localStorage.getItem('productReviewFormData');
    if (!savedData) return;

    const formData = JSON.parse(savedData);
    const form = document.getElementById('reviewForm');

    if (formData.product) form.product.value = formData.product;
    if (formData.stars) form.stars.value = formData.stars;
    if (formData.installDate) form.installDate.value = formData.installDate;

    if (formData.features) {
        formData.features.forEach(feature => {
            const checkbox = form.querySelector(`input[name="features"][value="${feature}"]`);
            if (checkbox) checkbox.checked = true;
        });
    }

    if (formData.review) form.review.value = formData.review;
    if (formData.name) form.name.value = formData.name;
}

function clearFormData() {
    localStorage.removeItem('productReviewFormData');
}
