import { random } from "./utils.js";

let currectResult;
let poitns = JSON.parse(localStorage.getItem('poitns')) || 0;

function render() {
    // save poitns
    localStorage.setItem('poitns', poitns);
    poitns = JSON.parse(localStorage.getItem('poitns'));

    const poitnsMessage = document.getElementById('poitns');
    poitnsMessage.innerText = `poitns: ${poitns}`
}

//function for random opertor
function randomOperator() {
    const operators = ["+", "-", "*", "/"];
    return operators[random(0, operators.length - 1)];
}


// Creating elements
const gameContainer = document.getElementById('game-container');

const header = document.createElement('header');
header.classList.add('game-title');

const h1 = document.createElement('h1');
h1.textContent = "משחק ללימודי חשבון";

const article = document.createElement('article');

const form = document.createElement('form');
form.classList.add('exercise-form');

const p = document.createElement('p');
p.classList.add('exercise');
p.setAttribute('id', 'exercise');
p.innerText = genExercise();

const input = document.createElement('input');
input.setAttribute('type', 'number');
input.setAttribute('id', 'input-result');
input.className = 'input-result';

const button = document.createElement('button');
button.setAttribute('id', 'btn-check');
button.setAttribute('type', 'button');
button.className = 'check-btn';
button.textContent = "בדוק";

const currectMessage = document.createElement('p');
currectMessage.setAttribute('id', 'currectMessage');
currectMessage.className = 'currectMessage';

const uncurrectMessage = document.createElement('p');
uncurrectMessage.setAttribute('id', 'uncurrectMessage');
uncurrectMessage.className = 'uncurrectMessage';

const poitnsMessage = document.createElement('p');
poitnsMessage.setAttribute('id', 'poitns');
poitnsMessage.className = 'poitns';

const resetBtn = document.createElement('button');
resetBtn.setAttribute('id', 'resetBtn');
resetBtn.className = 'reset-btn';
resetBtn.innerHTML = 'איפוס ניקוד';
resetBtn.addEventListener('click', () => {
    poitns = 0;
    render();
})


header.appendChild(h1);


form.appendChild(button);
form.appendChild(input);
form.appendChild(p);

article.appendChild(form);
article.appendChild(currectMessage);
article.appendChild(uncurrectMessage);
article.appendChild(poitnsMessage);
article.appendChild(resetBtn);

// Appending to the document body
gameContainer.appendChild(header);
gameContainer.appendChild(article);




//function for exercise
function genExercise(operator = randomOperator(), range = 10) {
    const rand1 = random(1, range);
    const rand2 = random(1, range);

    let targil = '';

    //replace if with switch:
    switch (operator) {
        case '+':
            targil = `${rand1} + ${rand2}`;
            currectResult = rand1 + rand2;
            break;
        case '-':
            targil = `${rand1} - ${rand2}`;
            currectResult = rand1 - rand2;
            break;
        case '*':
            targil = `${rand1} * ${rand2}`;
            currectResult = rand1 * rand2;
            break;
        case '/':
            targil = `${rand1} / ${rand2}`;
            currectResult = rand1 / rand2;
            break;
    }

    return targil;
}

function checkExercise() {
    const result = document.getElementById('input-result').value;
    if (result == currectResult) {
        currectMessage.innerText = 'correct';
        poitns++;
       render() 

        setTimeout(() => {
            currectMessage.innerText = "";
            p.innerText = genExercise();
            input.value = "";
            input.focus();
        }, 2000);

    } else {
        uncurrectMessage.innerText = 'uncorrect';
        setTimeout(() => {
            uncurrectMessage.innerText = "";
            p.innerText = genExercise();
            input.value = "";
            input.focus();
        }, 2000);
    }
}
button.addEventListener('click', checkExercise);
input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        checkExercise();
    }
})
input.focus();
render()