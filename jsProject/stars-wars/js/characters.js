const container = document.getElementById('container');
const cardContainer = document.querySelector('.card-container');
const searchInput = document.getElementById('search');
const fullCharacters = await fetchData();
let characters = [...fullCharacters];

function search() {
    const searchInput = document.getElementById('search').value;
    characters = fullCharacters.filter(character => character.fullName.toLowerCase().includes(searchInput.toLowerCase()));
    render();
}

function reset () {
    characters = [...fullCharacters];
    render();
}

function render() {
    cardContainer.innerHTML = '';
    characters.forEach(character => {
        const card = document.createElement('div');
        card.classList.add('card');

        const image = document.createElement('img');
        image.src = character.imageUrl;

        const name = document.createElement('h2');
        name.innerText = character.fullName;

        const title = document.createElement('h3');
        title.innerText = character.title;

        const family = document.createElement('p');
        family.innerText = `Family: ${character.family}`;

        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(title);
        card.appendChild(family);
        cardContainer.appendChild(card);
    });
}

async function fetchData() {
    const res = await fetch('https://thronesapi.com/api/v2/Characters');
    const data = await res.json();
    return data;
}

reset();

searchInput.addEventListener('input', (e) => {
    if (e.target.value) {
        cardContainer.innerHTML = '';
        search(e.target.value);
    } else {
        reset();
        render();
    }
});

function glow() {
    cardContainer.classList.add('glow');
    setTimeout(() => {
        cardContainer.classList.remove('glow');
    }, 2000);
}

render();

