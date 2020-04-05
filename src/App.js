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
    startGame: false,
    err: ''
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
        curPlayer: prevState.curPlayer === 0 ? 1 : 0
      }));
    }
  }

  handleBoxClick = (selectedRowIndex, selectedItemIndex) => {
    const curPlayer = this.state.curPlayer;
    const changedGameState = this.state.curGameState.map((row, rowIndex) => {
      if (rowIndex !== selectedRowIndex) {
        return row;
      }
      else {
        return row.map((item, itemIndex) => {
          if (itemIndex !== selectedItemIndex) {
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

  handleBoardSizeChange = (e) => {
    const value = e.target.value;
    let err = '';

    if (value < 3 || value % 2 === 0) {
      err = value < 3 ? 'Board size must be greater than 3!' : 'Board size must be odd';
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
      startGame: true,
      curGameState: initialGameState
    })
  }

  isGameStartAllowed = () => {
    const boardSize = this.state.boardSize;

    if (boardSize >= 3 && (boardSize % 2) !== 0)
      return false;
    return true;
  }

  render() {
    const winner = this.state.winner;

    if (winner) {
      return (
        <div>Game was won by: {winner}</div>
      )
    }

    return (
      <div className="App">
        <form onChange={this.handleBoardSizeChange} onSubmit={this.handleGameStart}>
          <div>
            <label>Enter Board Size: </label>
            <input placeholder="Enter the board size (should be greater than 3 and odd)" type="number" />
            {this.state.err && <div>{this.state.err}</div>}
          </div>
          <button type="submit" disabled={this.isGameStartAllowed()}>Submit</button>
        </form>
        {this.state.startGame && <Board curGameState={this.state.curGameState} handleBoxClick={(selectedRowIndex, selectedItemIndex) => this.handleBoxClick(selectedRowIndex, selectedItemIndex)} />}
      </div>
    );
  }
}

export default App;