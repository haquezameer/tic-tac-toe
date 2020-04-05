import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    curGameState: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ]
  };

  checkRows = () => {
    const curGameState = this.state.curGameState;
    for(let i =0; i<3; i++) {
      let rowComplete = false;
      rowComplete = curGameState[i].every(item => item === 1);
      if(rowComplete) {
        return [true,i];
      }
    }
    return [false,-1];
  }

  computeWinner = () => {
    const curGameState = this.state.curGameState;
    const [rowComplete,row] = this.checkRows();
    console.log('checkRows',rowComplete,row);
    if(rowComplete) {
      console.log('won by rowise',row);
    }
  }

  handleBoxClick = (selectedRowIndex,selectedItemIndex) => {
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
            return 1;
          }
        });
      }
    });
    this.setState({
      curGameState: changedGameState
    }, () => {
      this.computeWinner();
    });
  }

  renderCurGameState = () => {
    const curGameState = this.state.curGameState;
    console.log(curGameState);
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
    return (
      <div className="App">
        Heelo worlds
        {this.renderCurGameState()}
      </div>
    );
  }
}

export default App;
