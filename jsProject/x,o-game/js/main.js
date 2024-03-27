const gameContainer = document.querySelector('.container');
const tictactoe = document.createElement('div');
let currentPlayer = 'X';
let messageOpen = false;


tictactoe.className = 'tictactoe';
const cells = []
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    tictactoe.appendChild(cell);
    cells.push(cell);

}
gameContainer.appendChild(tictactoe);
cells.forEach(cell => {
    cell.addEventListener('click', btnClick)


});


function btnClick(event) {
    if (messageOpen) {
        // אם יש הודעת מנהל פתוחה, תחזיר false כדי להפוך את הלחיצה על התא ללא פעילה
        return false;
    }
    const clickedCell = event.target;
    if (clickedCell.innerText !== '') {
        return;
    }

    clickedCell.innerText = currentPlayer;

    if (checkWin()) {
        setTimeout(() => { // עיכוב ההודעה כדי שהמשתמש יראה את הסימון
            showWinner(currentPlayer)
            // resetGame();
        }, 100); // עיכוב של 100 מילי-שניות
        return;
    }

    // בדיקת תיקו
    if (checkDraw()) {
        setTimeout(() => { // עיכוב ההודעה כדי שהמשתמש יראה את המצב הסופי
            showDraw()
            resetGame();
        }, 100); // עיכוב של 100 מילי-שניות
        return;
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Iterate over each winning combination
function checkWin() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ];

    let isWinningCombo = false;

    winningCombos.forEach(combo => {
        const [a, b, c] = combo;
        if (cells[a].innerText === currentPlayer &&
            cells[b].innerText === currentPlayer &&
            cells[c].innerText === currentPlayer) {
            isWinningCombo = true;
        }
    });

    return isWinningCombo;
}

function showWinner(winner) {
    const message = document.getElementById('message');
    let ParaMessage = message.querySelector('.ParaMessage');

    if (!ParaMessage) {
        ParaMessage = document.createElement('p');
        ParaMessage.className = 'ParaMessage';
        message.appendChild(ParaMessage);
    }

    ParaMessage.innerText = `${winner} wins!`;
    message.style.display = 'block';
    messageOpen = true;
    // הוסף כפתור לסגירת ההודעה או לאתחול מחדש של המשחק
    let closeButton = ParaMessage.querySelector('button');

    if (!closeButton) {
        closeButton = document.createElement('button');
        closeButton.className = 'closeButton';
        closeButton.innerText = 'Close';
        closeButton.addEventListener('click', function () {
            message.style.display = 'none';
            messageOpen = false;
            resetGame(); // ניתן להוסיף פונקציה שמאתחלת את המשחק מחדש אם רוצים
        });
        ParaMessage.appendChild(closeButton);
    }

}
function showDraw() {
    const message = document.getElementById('message');
    let ParaMessage = message.querySelector('.ParaMessage');

    if (!ParaMessage) {
        ParaMessage = document.createElement('p');
        ParaMessage.className = 'ParaMessage';
        message.appendChild(ParaMessage);
    }

    ParaMessage.innerText = `is draw`;
    message.style.display = 'block';

    // הוסף כפתור לסגירת ההודעה או לאתחול מחדש של המשחק
    let closeButton = message.querySelector('button');

    if (!closeButton) {
        closeButton = document.createElement('button');
        closeButton.className = 'closeButton';
        closeButton.innerText = 'Close';
        closeButton.addEventListener('click', function () {
            message.style.display = 'none';
            resetGame(); // ניתן להוסיף פונקציה שמאתחלת את המשחק מחדש אם רוצים
        });
        ParaMessage.appendChild(closeButton);
    }
}

function checkDraw() {
    return cells.every(cell => cell.innerText !== '');
}

function resetGame() {
    cells.forEach((cell) => {
        cell.innerText = '';
    });
    currentPlayer = 'X';
}


