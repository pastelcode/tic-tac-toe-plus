import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import { Button } from 'react-bootstrap'
import './App.css'

// The approach to highlight the last movement made in every round is adding an extra board cell which is not painted in board, but it works saving the index of the last clicked cell.

const Square = ({
  value,
  onSquareClick,
  wasLastMovement,
}: {
  value: string
  onSquareClick: () => void
  wasLastMovement: boolean
}) => (
  <button
    className={`square border rounded ${
      wasLastMovement
        ? 'highlight-movement text-primary-emphasis'
        : 'text-secondary'
    }`}
    onClick={onSquareClick}
  >
    {value}
  </button>
)

const Board = ({
  xIsNext,
  squares,
  onPlay,
}: {
  xIsNext: boolean
  squares: string[]
  onPlay: (nextSquares: string[]) => void
}) => {
  const handleClick = (i: number) => {
    if (calculateWinner(squares) || squares[i]) return
    const nextSquares = squares.slice()
    nextSquares[i] = xIsNext ? 'X' : 'O'
    nextSquares[9] = i.toString() // Here is saved the last clicked cell index
    onPlay(nextSquares)
  }

  const winner = calculateWinner(squares)
  let status
  let className
  if (winner) {
    status = `Winner: ${winner}!!!`
    className = 'text-success fs-3 d-relative'
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`
    className = ''
  }

  return (
    <>
      <p className={`status text-center ${className}`}>{status}</p>
      <div className="board-row">
        <Square
          value={squares[0]}
          onSquareClick={() => handleClick(0)}
          wasLastMovement={squares[9] === '0'}
        />
        <Square
          value={squares[1]}
          onSquareClick={() => handleClick(1)}
          wasLastMovement={squares[9] === '1'}
        />
        <Square
          value={squares[2]}
          onSquareClick={() => handleClick(2)}
          wasLastMovement={squares[9] === '2'}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[3]}
          onSquareClick={() => handleClick(3)}
          wasLastMovement={squares[9] === '3'}
        />
        <Square
          value={squares[4]}
          onSquareClick={() => handleClick(4)}
          wasLastMovement={squares[9] === '4'}
        />
        <Square
          value={squares[5]}
          onSquareClick={() => handleClick(5)}
          wasLastMovement={squares[9] === '5'}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[6]}
          onSquareClick={() => handleClick(6)}
          wasLastMovement={squares[9] === '6'}
        />
        <Square
          value={squares[7]}
          onSquareClick={() => handleClick(7)}
          wasLastMovement={squares[9] === '7'}
        />
        <Square
          value={squares[8]}
          onSquareClick={() => handleClick(8)}
          wasLastMovement={squares[9] === '8'}
        />
      </div>
    </>
  )
}

const Game = () => {
  // Instead of saving space for 9 board cells, add an extra one for storing the last clicked cell index.
  const [history, setHistory] = useState([Array(10).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const xIsNext = currentMove % 2 === 0
  const currentSquares = history[currentMove]

  const handlePlay = (nextSquares: string[]) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  const jumpTo = (nextMove: number) => {
    setCurrentMove(nextMove)
  }

  const moves = history.map((_, move) => {
    let description
    if (move > 0) {
      description = 'Go to move #' + move
    } else {
      description = 'Go to game start'
    }
    return (
      <li key={move}>
        <Button
          variant="secondary"
          className="mb-1"
          onClick={() => jumpTo(move)}
        >
          {description}
        </Button>
      </li>
    )
  })

  return (
    <div className="game d-flex flex-column border rounded-5 p-4 container-sm shadow">
      <h1 className="mx-auto fs-1 mb-5">Tic-Tac-Toe +</h1>
      <div className="game-board mx-auto mb-5">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info mx-auto overflow-auto px-5">
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

const calculateWinner = (squares: string[]) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

export default Game
