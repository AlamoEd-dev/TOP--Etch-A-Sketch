const container = document.querySelector('#container');
const resetBtn = document.querySelector('#reset-btn');

const CONTAINER_SIZE = 960; // Fixed width and height in pixels

// Generates a grid of size x size
function createGrid(size) {
  // Clear any existing grid nodes
  container.innerHTML = '';

  // Calculate size of each individual square dynamically
  const squareSize = CONTAINER_SIZE / size;

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement('div');
    square.classList.add('grid-square');
    
    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;

    // Track interactions per square for progressive darkening
    square.dataset.interactions = 0;

    // Mouseover event listener for trail coloring
    square.addEventListener('mouseover', handleMouseOver);

    container.appendChild(square);
  }
}

// Handles hover logic, random RGB assignment, and progressive darkening
function handleMouseOver(e) {
  const square = e.target;
  let interactions = parseInt(square.dataset.interactions, 10);

  // If first hover, assign a random RGB color
  if (interactions === 0) {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    square.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  }

  // Progressive darkening: Increase opacity by 0.1 per interaction (up to 1.0)
  if (interactions < 10) {
    interactions++;
    square.dataset.interactions = interactions;
    square.style.opacity = interactions * 0.1;
  }
}

// Button click handler to resize grid via prompt
resetBtn.addEventListener('click', () => {
  let userInput = prompt("Enter number of squares per side (max 100):");

  if (userInput === null) return; // User cancelled prompt

  const size = parseInt(userInput, 10);

  if (isNaN(size) || size < 1 || size > 100) {
    alert("Please enter a valid number between 1 and 100.");
    return;
  }

  createGrid(size);
});

// Initialize default 16x16 grid on load
createGrid(16);