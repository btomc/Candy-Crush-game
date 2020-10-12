document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const width = 8
    const squares = []

    const candyTypes = [
        '🍭',
        '🍍',
        '🍓',
        '🧁',
        '🍬',
        '🍇'
    ]

    // Create Board
    function createBoard() {
        for (let i = 0; i < width*width; i++) {
            const square = document.createElement('div')
            let randomType = Math.floor(Math.random() * candyTypes.length)
      
            square.innerText = candyTypes[randomType]
            square.classList.add('square')
            grid.appendChild(square)
            squares.push(square)
        }
    }
    createBoard()


})