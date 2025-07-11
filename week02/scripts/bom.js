const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');
// const li = document.createElement('li');
// const deleteButton = document.createElement('button');

// li.textContent = input.value;
// deleteButton.textContent = '❌';
// li.append(deleteButton);
// list.append(li);

button.addEventListener('click', function () { 
    if (input.value.trim() !== '') {
        const li = document.createElement('li');

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '❌';
        deleteButton.classList.add('delete');

        const textSpan = document.createElement('span');
        textSpan.textContent = input.value;

        li.appendChild(textSpan);
        li.appendChild(deleteButton);

        list.appendChild(li);

        deleteButton.addEventListener('click', function () {
            list.removeChild(li)
        });

        input.value = '';
        input.focus();

    } else {
        input.focus();
    }
});

input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        button.click();
    }
});