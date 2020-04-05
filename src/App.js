import React, { Component } from 'react';

import './App.css';

class App extends Component {
  state = {
    curGameState: [
      [0,0,0],
      [0,0,0],
      [0,0,0], 
    ],
    curPlayer: 0,
    winner: ''
  };

  checkRows = () => {
    const curGameState = this.state.curGameState;
    const curPlayer = this.state.curPlayer;
    const comparedValue = curPlayer === 0 ? 1 : 2;

    for(let i =0; i<3; i++) {
      let rowComplete = false;
      rowComplete = curGameState[i].every(item => {
        return item === comparedValue
      });
      if(rowComplete) {
        return [true,i];
      }
    }
    return [false,-1];
  }

  checkColumns = () => {
    const curGameState = this.state.curGameState;
    const curPlayer = this.state.curPlayer;
    const comparedValue = curPlayer === 0 ? 1 : 2;

    for(let j=0;j<3;j++) {
      let columnComplete = true;
      for(let i = 0; i<3; i++) {
        if(curGameState[i][j] !== comparedValue) {
          columnComplete = false;
          break;
        }
      }
      if(columnComplete) {
        return [true,j];  
      } 
    }
    return [false,-1];
  }

  checkDiagonal = () => {
    const curGameState = this.state.curGameState;
    const curPlayer = this.state.curPlayer;
    const comparedValue = curPlayer === 0 ? 1 : 2;

    let diagonal = true;
    
    for(let i = 0, j=0; i < 3 && j<3; i++,j++) {
      if(curGameState[i][j] !== comparedValue) {
        diagonal = false;
        break;
      }
    }

    return diagonal;
  }

  checkAntiDiagonal = () => {
    const curGameState = this.state.curGameState;
    const curPlayer = this.state.curPlayer;
    const comparedValue = curPlayer === 0 ? 1 : 2;

    let antiDiagonal = true;

    for(let i = 0, j = 3 - 1; i < 3 && j >= 0; i++, j--) {
      if(curGameState[i][j] !== comparedValue) {
        antiDiagonal = false;
        break;
      }
    }

    return antiDiagonal;
  }

  computeWinner = () => {
    const curPlayer = this.state.curPlayer;
    let gameFinised = false;

    const [rowComplete,row] = this.checkRows();
    if(rowComplete) {
      gameFinised = true;
    }

    const [columnComplete,column] = this.checkColumns();
    if(columnComplete) {
      gameFinised = true;
    }

    const diagonalWise = this.checkDiagonal();
    if(diagonalWise) {
      gameFinised = true;
    }

    const antiDiagonal = this.checkAntiDiagonal();
    if(antiDiagonal) {
      gameFinised = true;
    }

    if(gameFinised) {
      const winner = curPlayer === 0 ? 'player 1' : 'player 2';
      this.setState({
        winner
      })
    }
    else {
    this.setState((prevState) => ({
      curPlayer: prevState.curPlayer === 0 ? 1 : 0
    }));
    }
  }

  handleBoxClick = (selectedRowIndex,selectedItemIndex) => {
    const curPlayer = this.state.curPlayer;
    const changedGameState = this.state.curGameState.map((row,rowIndex) => {
      if(rowIndex !== selectedRowIndex) {
        return row;
      }
      else {
        return row.map((item,itemIndex) => {
          if(itemIndex !== selectedItemIndex) {
            return item;
          }
          else {
            const value = curPlayer === 0 ? 1 : 2;
            return value;
          }
        });
      }
    });
    this.setState({
      curGameState: changedGameState,
    }, () => {
      this.computeWinner();
    });
  }

  renderCurGameState = () => {
    return (
      <div class="board">
        {this.state.curGameState.map((row,rowIndex) =>
          <div class="row"> 
            {row.map((item,itemIndex) => <div class="row__Item" onClick={() => this.handleBoxClick(rowIndex,itemIndex)}>{item}</div>)} 
          </div>
        )}
      </div>
    )
  }

  render() {
    const winner = this.state.winner;
    
    if(winner) {
      return (
        <div>Game was won by: {winner}</div>
      )
    }

    return (
      <div className="App">
        {this.renderCurGameState()}
      </div>
    );
  }
}

export default App;
