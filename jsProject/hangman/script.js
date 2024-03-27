//Initial References
const container = document.querySelector(".container");
// Create HTML elements
const optionsContainer = document.createElement("h3");
optionsContainer.id = "options-container";

const letterContainer = document.createElement("div");
letterContainer.id = "letter-container";
letterContainer.className = "letter-container hide";

const userInputSection = document.createElement("div");
userInputSection.id = "user-input-section";

const canvas = document.createElement("canvas");
canvas.id = "canvas";

const newGameContainer = document.createElement("div");
newGameContainer.id = "new-game-container";
newGameContainer.className = "new-game-popup hide";

const resultContainer = document.createElement("div");
resultContainer.id = "result-container";

const resultTitle = document.createElement("h2");
resultTitle.id = "result-title";


const resultText = document.createElement("p");
resultText.id = "result-text";




const newGameButton = document.createElement("button");
newGameButton.id = "new-game-button";
newGameButton.textContent = "New Game";

// Append elements to the body or any desired parent element
container.appendChild(optionsContainer);
container.appendChild(letterContainer);
container.appendChild(userInputSection);
container.appendChild(canvas);
container.appendChild(newGameContainer);


// Append elements to result container
resultContainer.appendChild(resultTitle);
resultContainer.appendChild(resultText);

// Append elements to new game container
newGameContainer.appendChild(resultContainer);
newGameContainer.appendChild(newGameButton);


//Options values for buttons
let options = {
  fruits: [
    "Apple",
    "Blueberry",
    "Mandarin",
    "Pineapple",
    "Pomegranate",
    "Watermelon",
  ],
  animals: [
    "Hedgehog",
    "Rhinoceros",
    "Squirrel",
    "Panther",
    "Walrus",
    "Zebra",
  ],

  countries: [
    "India",
    "Hungary",
    "Kyrgyzstan",
    "Switzerland",
    "Zimbabwe",
    "Dominica",
  ],

  months: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
};
let letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

//count
let winCount = 0;
let count = 0;

let chosenWord = "";

//Display option buttons
const displayOptions = () => {
  optionsContainer.innerHTML = `Please Select An Option`;
  let buttonCon = document.createElement("div");
  for (let value in options) {
    
    buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
  }
  optionsContainer.appendChild(buttonCon);
};

//Block all the Buttons
const blocker = () => {
  let optionsButtons = document.querySelectorAll(".options");
  let letterButtons = document.querySelectorAll(".letters");
  //disable all options
  optionsButtons.forEach((button) => {
    button.disabled = true;
  });

  //disable all letters
  letterButtons.forEach((button) => {
    button.disabled.true;
  });
  newGameContainer.classList.remove("hide");
};

//Word Generator
const generateWord = (optionValue) => {
  let optionsButtons = document.querySelectorAll(".options");
  //If optionValur matches the button innerText then highlight the button
  optionsButtons.forEach((button) => {
    if (button.innerText.toLowerCase() === optionValue) {
      button.classList.add("active");
    }
    button.disabled = true;
  });

  //initially hide letters, clear previous word
  letterContainer.classList.remove("hide");
  userInputSection.innerText = "";

  let optionArray = options[optionValue];
  //choose random word
  chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
  chosenWord = chosenWord.toUpperCase();

  //replace every letter with span containing dash
  let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');

  //Display each element as span
  userInputSection.innerHTML = displayItem;
};

//Initial Function (Called when page loads/user presses new game)
const initializer = () => {
  winCount = 0;
  count = 0;

  //Initially erase all content and hide letteres and new game button
  userInputSection.innerHTML = "";
  optionsContainer.innerHTML = "";
  letterContainer.classList.add("hide");
  newGameContainer.classList.add("hide");
  letterContainer.innerHTML = "";

  //create button for alphabet

letters.forEach((letter) => {
  let button = document.createElement("button");
  button.classList.add("letters");
  button.innerText = letter;
  button.setAttribute("id", letter);
  letterContainer.appendChild(button);

  //character button click
  button.addEventListener("click", () => {
    let charArray = chosenWord.split("");
    let dashes = document.getElementsByClassName("dashes");
    //if array contains clciked value replace the matched dash with letter else dram on canvas
    if (charArray.includes(button.innerText)) {
      charArray.forEach((char, index) => {
        //if character in array is same as clicked button
        if (char === button.innerText) {
          //replace dash with letter
          dashes[index].innerText = char;
          //increment counter
          winCount += 1;
          //if winCount equals word lenfth
          if (winCount == charArray.length) {
            resultTitle.innerHTML = `You Win!!`;
            resultText.innerHTML = `The word was ${chosenWord}`;
            resultContainer.classList.remove("lose-msg")
            resultContainer.classList.add("win-msg")
            //block all buttons
            blocker();
          }
        }
      });
    } else {
      //lose count
      count += 1;
      //for drawing man
      drawMan(count);
      //Count==6 because head,body,left arm, right arm,left leg,right leg
      if (count == 6) {
        resultTitle.innerHTML = `You lost!!`;
        resultText.innerHTML = `The word was ${chosenWord}`;
        resultContainer.classList.remove("win-msg")
        resultContainer.classList.add("lose-msg")
        blocker();
      }
    }
    //disable clicked button
    button.disabled = true;
  });
})

  displayOptions();
  //Call to canvasCreator (for clearing previous canvas and creating initial canvas)
  let { initialDrawing } = canvasCreator();
  //initialDrawing would draw the frame
  initialDrawing();
};

//Canvas
const canvasCreator = () => {
  let context = canvas.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#000";
  context.lineWidth = 2;

  //For drawing lines
  const drawLine = (fromX, fromY, toX, toY) => {
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
  };

  const head = () => {
    context.beginPath();
    context.arc(70, 30, 10, 0, Math.PI * 2, true);
    context.stroke();
  };

  const body = () => {
    drawLine(70, 40, 70, 80);
  };

  const leftArm = () => {
    drawLine(70, 50, 50, 70);
  };

  const rightArm = () => {
    drawLine(70, 50, 90, 70);
  };

  const leftLeg = () => {
    drawLine(70, 80, 50, 110);
  };

  const rightLeg = () => {
    drawLine(70, 80, 90, 110);
  };

  //initial frame
  const initialDrawing = () => {
    //clear canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    //bottom line
    drawLine(10, 130, 130, 130);
    //left line
    drawLine(10, 10, 10, 131);
    //top line
    drawLine(10, 10, 70, 10);
    //small top line
    drawLine(70, 10, 70, 20);
  };

  return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
};

//draw the man
const drawMan = (count) => {
  let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
  switch (count) {
    case 1:
      head();
      break;
    case 2:
      body();
      break;
    case 3:
      leftArm();
      break;
    case 4:
      rightArm();
      break;
    case 5:
      leftLeg();
      break;
    case 6:
      rightLeg();
      break;
    default:
      break;
  }
};

//New Game
newGameButton.addEventListener("click", initializer);
window.onload = initializer;