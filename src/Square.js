import React from 'react';

function Square(props) {

    return (
        <button
            className={props.winningSquare ? "highlighted-square square" : "square"}
            onClick={props.onClick}>
            {props.value}
        </button>
    );
}

export default Square;
