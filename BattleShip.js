const gridSize = 4;
const totalShips = 5;
const maxChances = 8;
let ships = [];
let shipsFound = 0;
let chancesLeft = maxChances;

function initializeGame() {
  shipsFound = 0;
  chancesLeft = maxChances;
  ships = [];
  document.getElementById('ships-found').textContent = shipsFound;
  document.getElementById('chances-left').textContent = chancesLeft;

  const boxes = document.querySelectorAll('.box');
  boxes.forEach(box => {
    box.classList.remove('ship', 'miss');
    box.textContent = '';
    box.innerHTML = ''; 
    box.addEventListener('click', handleBoxClick);
  });

  
  while (ships.length < totalShips) {
    const shipPosition = Math.floor(Math.random() * gridSize * gridSize);
    if (!ships.includes(shipPosition)) {
      ships.push(shipPosition);
    }
  }
}

function handleBoxClick() {
  const boxIndex = Array.from(document.querySelectorAll('.box')).indexOf(this);

  if (chancesLeft <= 0) {
    alert('Reset game to try again.');
    return;
  }

  if (ships.includes(boxIndex)) {
    this.classList.add('ship');
    shipsFound++;
    document.getElementById('ships-found').textContent = shipsFound;
    this.removeEventListener('click', handleBoxClick);
    
    
    const shipImage = document.createElement('img');
    shipImage.src = 'https://ik.imagekit.io/d9mvewbju/Course/BigbinaryAcademy/battleship-image_e6bWCZ1w4.png'; 
    this.appendChild(shipImage); 

    if (shipsFound === totalShips) {
      setTimeout(() => alert('YOU WON !!!'), 100);
    }
  } else {
    this.classList.add('miss');
    this.textContent = 'X';
    this.removeEventListener('click', handleBoxClick);
    
    
    const missImage = document.createElement('img');
    
    this.appendChild(missImage); 
  }

  chancesLeft--;
  document.getElementById('chances-left').textContent = chancesLeft;

  if (chancesLeft === 0 && shipsFound < totalShips) {
    setTimeout(() => alert('YOU LOST !!!'), 100);
  }
}

document.getElementById('reset-btn').addEventListener('click', initializeGame);

initializeGame();
