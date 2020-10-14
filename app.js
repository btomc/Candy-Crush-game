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
            square.setAttribute('draggable', true)
            square.setAttribute('id', i)
            let randomType = Math.floor(Math.random() * candyTypes.length)
      
            square.innerText = candyTypes[randomType]
            square.classList.add('square')
            grid.appendChild(square)
            squares.push(square)
        }
    }
    createBoard()

    // Drag the candies
    let typeBeingDragged
    let typeBeingReplaced
    let squareIdBeingDragged
    let squareIdBeingReplaced

    squares.forEach(square => square.addEventListener('dragstart', dragStart))
    squares.forEach(square => square.addEventListener('dragend', dragEnd))
    squares.forEach(square => square.addEventListener('dragover', dragOver))
    squares.forEach(square => square.addEventListener('dragenter', dragEnter))
    squares.forEach(square => square.addEventListener('dragleave', dragLeave))
    squares.forEach(square => square.addEventListener('drop', dragDrop))

    function dragStart() {
        typeBeingDragged = this.innerText
        squareIdBeingDragged = parseInt(this.id)
        console.log(typeBeingDragged)
        console.log(this.id, 'dragstart')
    }

    function dragOver(e) {
        e.preventDefault()
        console.log(this.id, 'dragsover')
    }

    function dragEnter(e) {
        e.preventDefault()
        console.log(this.id, 'dragenter')
    }

    function dragLeave() {
        console.log(this.id, 'dragleave')
    }

    

    function dragDrop() {
        console.log(this.id, 'dragdrop')
        typeBeingReplaced = this.innerText
        squareIdBeingReplaced = parseInt(this.id)
        this.innerText = typeBeingDragged
        squares[squareIdBeingDragged].innerText = typeBeingReplaced
    }

    function dragEnd() {
        console.log(this.id, 'dragend')
        // what is valid move?
        let validMoves = [
            squareIdBeingDragged - 1,
            squareIdBeingDragged -width,
            squareIdBeingDragged + 1,
            squareIdBeingDragged +width
        ]
        let validMove = validMoves.includes(squareIdBeingReplaced)

        if (squareIdBeingReplaced && validMove) {
            squareIdBeingReplaced = null
        } else if (squareIdBeingReplaced && !validMove) {
            squares[squareIdBeingReplaced].innerText = typeBeingReplaced
            squares[squareIdBeingDragged].innerText = typeBeingDragged
        } else squares[squareIdBeingDragged].innerText = typeBeingDragged
    }

    

})