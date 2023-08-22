function resizeGrid(e) {
    deleteOldGrid();
    gridSize = e.target.value;
    createGrid();
}

function deleteOldGrid() {
    while (sketchGrid.firstChild) {
        sketchGrid.removeChild(sketchGrid.firstChild);
    }
}

function createGrid() {
    let gridCellDimensions = `calc(${1 / (gridSize)} * var(--sketching-grid-size))`;
    for (let i = 0; i < gridSize; i++) {
        let divRow = document.createElement('div');
        divRow.style.display = 'flex';
        for (let j = 0; j < gridSize; j++) {
            const divCell = document.createElement('div');
            setUpCell(gridCellDimensions, divRow, divCell);
        }
        sketchGrid.appendChild(divRow);
    }
    cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => cell.addEventListener('mouseenter', () => cell.style.backgroundColor = customColor));
}

function setUpCell(dimensions, row, cell) {
    // No need to return row after this function since parameters don't deep copy arguments
    cell.classList.add('cell');
    if (gridLines) cell.classList.add('lines');
    cell.style.width = dimensions;
    cell.style.height = dimensions;
    cell.style.backgroundColor = 'rgb(255, 255, 255)';
    row.appendChild(cell);
}

function toggleLines(event) {
    if (event.target.innerText == "Grid Lines: On") {
        event.target.innerText = "Grid Lines: Off";
        gridLines = false;
        cells.forEach((cell) => cell.classList.remove('lines'));
    }
    else {
        event.target.innerText = "Grid Lines: On";
        gridLines = true;
        cells.forEach((cell) => cell.classList.add('lines'));
    }
}

function getRandomColor() {
    const colorNumber = Math.floor(Math.random() * ALL_SUPPORTED_COLORS);
    return colorNumber.toString(16);
}

const ALL_SUPPORTED_COLORS = 256 * 256 * 256; // 16,777,216 colors supported throught 24-bit colors 

let cells;
let gridLines = false;
let gridSize = 16;
let customColor = '#000000';
const sketchGrid = document.querySelector('.grid');

createGrid();

// Enable custom color functionality 
const customBtn = document.querySelector('input[type="color"');
customBtn.addEventListener('change', (e) => {
    cells.forEach((cell) => cell.addEventListener('mouseenter', () => cell.style.backgroundColor = e.target.value));
});

// Grid lines
const linesBtn = document.querySelector('.toggle-lines');
linesBtn.addEventListener('click', (e) => toggleLines(e));

// Rainbow mode 
const rainbowbtn = document.querySelector('.rainbow');
rainbowbtn.addEventListener('click', (e) => {
    // Trigger color changes of each cell to random.
    cells.forEach((cell) => cell.addEventListener('mouseenter', () => cell.style.backgroundColor = '#' + getRandomColor()));
});

// Eraser mode
const eraserBtn = document.querySelector('.eraser');
eraserBtn.addEventListener('click', (e) => {
    // Trigger color changes of each cell to random.
    cells.forEach((cell) => cell.addEventListener('mouseenter', () => cell.style.backgroundColor = 'rgb(255, 255, 255)'));
});

// Grid size indicator 
const gridDisplay = document.querySelector('.grid-display');

// Initial output 
gridDisplay.textContent = gridSize + "X" + gridSize;

// slider input for grid size.
const gridSizeInput = document.querySelector('#grid-size');

gridSizeInput.addEventListener('input', (e) => gridDisplay.textContent = e.target.value + "X" + e.target.value);
gridSizeInput.addEventListener('mouseup', (e) => resizeGrid(e));