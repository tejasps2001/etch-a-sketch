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

function defaul() {
    this.style.backgroundColor = '#000000';
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

    // customMode remembers the previous mode setting
    cells.forEach((cell) => cell.addEventListener('mouseenter', currentMode));
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

function calculate(lightColor) {
    temp = lightColor.split(',');
    let [r, g, b] = [temp[0].split('(')[1].trim(), temp[1].trim(), temp[2].split(')')[0].trim()];
    r -= 25;
    g -= 25;
    b -= 25;
    if (r < 0) r = 0;
    if (g < 0) g = 0;
    if (b < 0) b = 0;
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}

function darken() {
    this.style.backgroundColor = calculate(this.style.backgroundColor);
}

function customise() {
    this.style.backgroundColor = customColor;
}

function randomise() {
    this.style.backgroundColor = '#' + getRandomColor();
}

function erase() {
    this.style.backgroundColor = 'rgb(255, 255, 255)';
}

const ALL_SUPPORTED_COLORS = 256 * 256 * 256; // 16,777,216 colors supported throught 24-bit colors 

let cells;
let customColor;
let gridSize = 16;
let gridLines = false;

// Store current mode details to remember the mode if grid size changes.
let currentMode = defaul;

const sketchGrid = document.querySelector('.grid');

// Grid size indicator in output
const gridDisplay = document.querySelector('.grid-display');

// Initial output 
gridDisplay.textContent = gridSize + "X" + gridSize;

// Create initial grid.
createGrid();

// Enable custom color functionality 
const customBtn = document.querySelector('input[type="color"');
customBtn.addEventListener('change', (e) => {
    currentMode = customise;

    // Use global variable to enable changing color in external function.
    customColor = e.target.value;
    cells.forEach((cell) => cell.removeEventListener('mouseenter', defaul));
    cells.forEach((cell) => cell.removeEventListener('mouseenter', darken));
    cells.forEach((cell) => cell.removeEventListener('mouseenter', randomise));
    cells.forEach((cell) => cell.removeEventListener('mouseenter', erase));
    cells.forEach((cell) => cell.addEventListener('mouseenter', customise));
});

// Grid lines
const linesBtn = document.querySelector('.toggle-lines');
linesBtn.addEventListener('click', (e) => toggleLines(e));

// Rainbow mode 
const rainbowbtn = document.querySelector('.rainbow');
rainbowbtn.addEventListener('click', (e) => {
    currentMode = randomise;

    // Trigger color changes of each cell to random.
    cells.forEach((cell) => cell.removeEventListener('mouseenter', defaul));
    cells.forEach((cell) => cell.removeEventListener('mouseenter', customise));
    cells.forEach((cell) => cell.removeEventListener('mouseenter', darken));
    cells.forEach((cell) => cell.removeEventListener('mouseenter', erase));
    cells.forEach((cell) => cell.addEventListener('mouseenter', randomise));
});

// Darken mode
let darkenBtn = document.querySelector('.darken');
darkenBtn.addEventListener('click', (e) => {
    currentMode = darken;
    cells.forEach((cell) => cell.removeEventListener('mouseenter', defaul));
    cells.forEach((cell) => cell.removeEventListener('mouseenter', customise));
    cells.forEach((cell) => cell.removeEventListener('mouseenter', randomise));
    cells.forEach((cell) => cell.removeEventListener('mouseenter', erase));
    cells.forEach((cell) => cell.addEventListener('mouseenter', darken));
});

// Eraser mode
const eraserBtn = document.querySelector('.eraser');
eraserBtn.addEventListener('click', (e) => {
    cells.forEach((cell) => cell.removeEventListener('mouseenter', defaul));
    cells.forEach((cell) => cell.removeEventListener('mouseenter', customise));
    cells.forEach((cell) => cell.removeEventListener('mouseenter', randomise));
    cells.forEach((cell) => cell.removeEventListener('mouseenter', darken));
    cells.forEach((cell) => cell.addEventListener('mouseenter', erase));
});

// Slider input for grid size.
const gridSizeInput = document.querySelector('#grid-size');

// Grid Size Change
gridSizeInput.addEventListener('input', (e) => gridDisplay.textContent = e.target.value + "X" + e.target.value);
gridSizeInput.addEventListener('mouseup', (e) => resizeGrid(e));