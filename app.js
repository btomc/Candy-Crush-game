document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const width = 8
    const squares = []
    let score = 0

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

    // Checking for matches
    // check for row of Four
    function checkRowForFour() {
        for (i = 0; i < 61; i++) {
            let rowOfFour = [i, i+1, i+2, i+3]
            let decidedType = squares[i].innerText
            const isBlank = squares[i].innerText === ''

            const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55]
            if (notValid.includes(i)) continue

            if (rowOfFour.every(index => squares[index].innerText === decidedType && !isBlank)) {
                score += 4
                rowOfFour.forEach(index => {
                    squares[index].innerText = ''
                })
            }                 
        }
    }

    checkRowForFour()

    // check for column of Four
    function checkColumnForFour() {
        for (i = 0; i < 39; i++) {
            let columnOfFour = [i, i+width, i+width*2, i+width*3]
            let decidedType = squares[i].innerText
            const isBlank = squares[i].innerText === ''

            if (columnOfFour.every(index => squares[index].innerText === decidedType && !isBlank)) {
                score += 4
                columnOfFour.forEach(index => {
                    squares[index].innerText = ''
                })
            }                 
        }
    }

    checkColumnForFour()


    // check for row of Three
    function checkRowForThree() {
        for (i = 0; i < 62; i++) {
            let rowOfThree = [i, i+1, i+2]
            let decidedType = squares[i].innerText
            const isBlank = squares[i].innerText === ''

            const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]
            if (notValid.includes(i)) continue

            if (rowOfThree.every(index => squares[index].innerText === decidedType && !isBlank)) {
                score += 3
                rowOfThree.forEach(index => {
                    squares[index].innerText = ''
                })
            }                 
        }
    }

    checkRowForThree()

    // check for column of Three
    function checkColumnForThree() {
        for (i = 0; i < 47; i++) {
            let columnOfThree = [i, i+width, i+width*2]
            let decidedType = squares[i].innerText
            const isBlank = squares[i].innerText === ''

            if (columnOfThree.every(index => squares[index].innerText === decidedType && !isBlank)) {
                score += 3
                columnOfThree.forEach(index => {
                    squares[index].innerText = ''
                })
            }                 
        }
    }

    checkColumnForThree()

    window.setInterval(function(){
        checkRowForFour()
        checkColumnForFour()
        checkRowForThree()
        checkColumnForThree()
    }, 100)

    

})