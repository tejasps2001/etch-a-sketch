function deleteOldGrid() {
    while(sketchGrid.firstChild) {
        sketchGrid.removeChild(sketchGrid.firstChild);
    }
}

function createGrid() {
    for (let i = 0; i < gridSize; i++) {
        const divRow = document.createElement('div');
        divRow.style.display = 'flex';
        for (let j = 0; j < gridSize; j++) {
            const divCell = document.createElement('div');
            divCell.classList.add('cell');
            divCell.style.width = `calc(${1/(gridSize)} * var(--sketching-grid-size))`;
            divCell.style.height = `calc(${1/(gridSize)} * var(--sketching-grid-size))`;
            divRow.appendChild(divCell);
        }
        sketchGrid.appendChild(divRow);
    }
    const hovered = document.querySelectorAll('.cell');
    hovered.forEach((cell) => cell.addEventListener('mouseenter', () => cell.classList.add('hovered')));
}

const sketchGrid = document.querySelector('.grid');

// Create default grid and link it to reset button.
let gridSize = 16;
createGrid(gridSize);

const resetGridSize = document.querySelector('#reset-grid');
resetGridSize.addEventListener('click', () => {
    deleteOldGrid();
    gridSize = 16;
    createGrid(gridSize);
});

// slider input for grid size.
const gridSizeInput = document.querySelector('#grid-size');
gridSizeInput.addEventListener('input', (e) => {
    deleteOldGrid();
    gridSize = e.target.value;
    createGrid(gridSize);
});

// hovered.forEach((cell) => cell.addEventListener('mouseleave', () => cell.classList.remove('hovered')));