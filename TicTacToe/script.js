let startButtons = document.querySelectorAll('[data-start-button]')
let player
let turn
let endGame = false
let startGameElement = document.getElementById('start_game')
let board = document.querySelector('.board')
let cells = document.querySelectorAll('.cell')
let endGameElement = document.querySelector('.end_game')
let restartButton = document.querySelector('.restart_game')
let endGameMessage = document.querySelector('.end_game_message')
let winComb = [
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   [0, 3, 6],
   [1, 4, 7],
   [2, 5, 8],
   [0, 4, 8],
   [2, 4, 6]
]

startButtons.forEach(function (button) {
    button.addEventListener('click', startGame)
})

function startGame(event) {
    event.preventDefault()
    if (this.className == "x") {
        player = "x"
        turn = "x_turn"
    } else {
        player = "o"
        turn = "o_turn"
    }
    startGameElement.classList.add('hide')
    board.classList.remove('hide')
    board.classList.add(turn)

    cells.forEach(function (cell) {
        cell.addEventListener('click', handleClick)
    })
}


function handleClick(e) {
    e.preventDefault()
    this.classList.add(player)
    let isDraw
    if (checkWin(player)) {
        isDraw = false
        endGameFunc(player, isDraw)
    } else if (checkDraw()) {
        isDraw = true
        endGameFunc(player, isDraw)
    } else {
        swapTurns()
    }
}

function swapTurns() {
    if (player == "x") {
        player = "o"
        turn = "o_turn"
    } else {
        player = "x"
        turn = "x_turn"
    }
    board.classList.remove("x_turn")
    board.classList.remove("o_turn")

    board.classList.add(turn)
}

restartButton.addEventListener('click', restartGame)

function restartGame(e) {
    e.preventDefault()
    board.classList.add('hide')
    endGameElement.classList.add('hide')
    startGameElement.classList.remove('hide')
    endGame = false
    cells.forEach(function (cell) {
        cell.classList.remove('o')
        cell.classList.remove('x')
    })
}

function endGameFunc(player, isDraw) {
    endGameElement.classList.remove('hide')
    if (isDraw) {
        endGameMessage.innerText = 'It is a Draw'
    } else {
        endGameMessage.innerText = `${player.toUpperCase()} is Won`
    }

    cells.forEach(function (cell) {
        cell.removeEventListener('click', handleClick)
    })

    board.classList.remove("x_turn")
    board.classList.remove("o_turn")
}

function checkWin(player) {
    winComb.forEach(function (comb) {
        let check = 0
        comb.forEach(function (index) {
            let c = cells[index].classList.contains(player)
            if (c == true) {
                check++
            }
        })
        if (check == 3) {
            endGame = true
        }
    })
    if (endGame) {
        return true
    } else {
        return false
    }
}

function checkDraw() {
    let check = 0
    cells.forEach(function (cell) {
        let hasO = cell.classList.contains('o')
        let hasX = cell.classList.contains('x')
        if (hasO || hasX) {
            check++
        }
    })
    if (check == 9) {
        endGame = true
        return true
    } else {
        return false
    }

}
