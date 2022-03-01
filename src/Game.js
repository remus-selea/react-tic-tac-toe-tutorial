import Board from './Board';
import React from 'react';

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            history: [{
                squares: Array(9).fill(null),
                latestMove: undefined
            }],
            winningSquares: undefined,
            stepNumber: 0,
            xIsNext: true,
            isHistoryAscending: true
        }
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = Array.from(current.squares); // shallow copy of the array
        const winner = calculateWinner(squares);

        if (winner?.winningSquares || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';

        this.setState({
            history: history.concat([{
                squares: squares,
                latestMove: i
            }]),
            winningSquares: winner?.winningSquares,
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo = (step) => {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        })
    }

    reverseMovesOrder = () => {
        this.setState({
            isHistoryAscending: !this.state.isHistoryAscending
        })
    }

    createMovesHistory = (history) => {
        return history.map((step, move) => {
            const col = step.latestMove % 3;
            const row = Math.floor(step.latestMove / 3);
            const desc = move ? `Go to move #${move} with last position (${col}, ${row})` : 'Go to game start';

            return (
                <li key={move}>
                    <button
                        onClick={() => { this.jumpTo(move); }}
                        className={this.state.stepNumber === move ? "move-item-selected" : ""}
                    >
                        {desc}
                    </button>

                </li>
            );
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winningDetails = calculateWinner(current.squares);
        const draw = !current.squares.includes(null) && !winningDetails;

        const moves = this.createMovesHistory(history)
        const isAscending = this.state.isHistoryAscending;

        if (!isAscending) {
            moves.reverse();
        }

        let status;
        if (winningDetails) {
            status = 'Winner: ' + winningDetails.player;
        } else if (draw) {
            status = 'It is a draw.';
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }


        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        winningSquares={winningDetails?.winningSquares}
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                    <div className='status'>{status}</div>

                </div>

                <div className="game-info">
                    <button className="reverse-btn" onClick={this.reverseMovesOrder}>Reverse move list order</button>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

export default Game;

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return { winningSquares: lines[i], player: squares[a] };
        }
    }
    return null;
}