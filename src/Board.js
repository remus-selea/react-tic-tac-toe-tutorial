import React from 'react';
import Square from './Square'

class Board extends React.Component {

    renderSquare(i) {
        let winningSquare = this.props.winningSquares?.includes(i) ? true : false;

        return (<Square
            key={i}
            winningSquare={winningSquare}
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
        />);
    }

    createBoardSquares(boardSize) {
        const boardSquares = [];

        const columns = Array(boardSize);
        for (const [colIndex] of columns.entries()) {
            const rows = [];

            for (const [rowIndex] of columns.entries()) {
                rows.push(this.renderSquare(colIndex * boardSize + rowIndex));
            }

            boardSquares.push(<div key={colIndex} className="board-row">{rows}</div>);
        }

        return boardSquares;
    }

    render() {
        const boardSize = Math.sqrt(this.props.squares.length);
        const boardSquares = this.createBoardSquares(boardSize);

        return (
            <div>{boardSquares}</div>
        );
    }

}

export default Board;