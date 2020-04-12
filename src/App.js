import React, { Component } from 'react';

import Board from './components/Board';

import { getBoard, checkRows, checkColumns, checkDiagonal, checkAntiDiagonal } from './utils';

import './App.css';

class App extends Component {
  state = {
    curGameState: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
    curPlayer: 0,
    winner: '',
    boardSize: 0,
    isGameStarted: false,
    err: '',
    curMoves: 0
  };

  computeWinner = () => {
    const { curPlayer, curGameState, boardSize } = this.state;
    let gameFinised = false;

    const [rowComplete, row] = checkRows({ curGameState, curPlayer, boardSize });
    if (rowComplete) {
      gameFinised = true;
    }

    const [columnComplete, column] = checkColumns({ curGameState, curPlayer, boardSize });
    if (columnComplete) {
      gameFinised = true;
    }

    const diagonalWise = checkDiagonal({ curGameState, curPlayer, boardSize });
    if (diagonalWise) {
      gameFinised = true;
    }

    const antiDiagonal = checkAntiDiagonal({ curGameState, curPlayer, boardSize });
    if (antiDiagonal) {
      gameFinised = true;
    }

    if (gameFinised) {
      const winner = curPlayer === 0 ? 'player 1' : 'player 2';
      this.setState({
        winner
      })
    }
    else {
      this.setState((prevState) => ({
        curPlayer: prevState.curPlayer === 0 ? 1 : 0,
        curMoves: prevState.curMoves++
      }));
    }
  }

  handleBoxClick = (selectedRowIndex, selectedItemIndex) => {
    const curPlayer = this.state.curPlayer;
    const curGameState = this.state.curGameState;

    const value = curPlayer === 0 ? 1 : 2;
    
    if(curGameState[selectedRowIndex][selectedItemIndex] === 0) {
      curGameState[selectedRowIndex][selectedItemIndex] = value;
      this.setState({
        curGameState,
      }, () => {
        this.computeWinner();
      });
    }
  }

  handleBoardSizeChange = (e) => {
    const value = e.target.value;
    let err = '';

    if (value < 3) {
      err = 'Board size must be greater than 3!';  
    }

    this.setState({
      boardSize: value,
      err
    })
  }

  handleGameStart = (e) => {
    e.preventDefault();
    const boardSize = this.state.boardSize;
    const initialGameState = getBoard(boardSize);
    this.setState({
      isGameStarted: true,
      curGameState: initialGameState,
    })
  }

  isGameStartAllowed = () => {
    const boardSize = this.state.boardSize;

    if (boardSize >= 3 && (boardSize % 2) !== 0)
      return false;
    return true;
  }

  handlePlayAgain = () => {
    window.location.reload();
  }

  render() {
    const { isGameStarted, winner, boardSize, curMoves } = this.state;

    if (isGameStarted && curMoves >= boardSize * boardSize) {
      return (
        <div>
          Game Over
          <button onClick={this.handlePlayAgain}> Play again </button>
        </div>
      )
    }

    return (
      <div className="App">
        {!isGameStarted && <form onChange={this.handleBoardSizeChange} onSubmit={this.handleGameStart}>
          <div>
            <label>Enter Board Size: </label>
            <input placeholder="Enter the board size (should be greater than 3 and odd)" type="number" />
            {this.state.err && <div>{this.state.err}</div>}
          </div>
          <button type="submit" disabled={this.isGameStartAllowed()}>Submit</button>
        </form>
        }
        {winner && <div>
          <div>Game was won by: {winner}</div>
          <button onClick={this.handlePlayAgain}> Play again </button>
        </div>}
        {isGameStarted && <Board curGameState={this.state.curGameState} handleBoxClick={(selectedRowIndex, selectedItemIndex) => this.handleBoxClick(selectedRowIndex, selectedItemIndex)} />}
      </div>
    );
  }
}

export default App;
