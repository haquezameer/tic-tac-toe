import React from 'react';

const Board = ({curGameState,handleBoxClick}) => {
    return (
        <div class="board">
            {curGameState.map((row,rowIndex) =>
                <div class="row"> 
                    {row.map((item,itemIndex) => <div class="row__Item" onClick={() => handleBoxClick(rowIndex,itemIndex)}>{item}</div>)} 
                </div>
            )}
        </div>
    )
};

export default Board;