import React from 'react';

const Board = ({curGameState,handleBoxClick}) => {
    const renderCellItem = (value) => {
        let sym = '--';

        switch(value) {
            case 1: sym = 'x';
                    break;
            
            case 2: sym = 'o';
                    break;

            default: sym = '--';
        }

        return sym;
    };

    return (
        <div class="board">
            {curGameState.map((row,rowIndex) =>
                <div class="row"> 
                    {row.map((item,itemIndex) => 
                    <div class="row__Item" onClick={() => handleBoxClick(rowIndex,itemIndex)}>
                        {renderCellItem(item)}
                    </div>)} 
                </div>
            )}
        </div>
    )
};

export default Board;