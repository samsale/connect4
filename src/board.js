import React, { Component } from 'react';
import Button from './buttons.js'
import Dot from './dots.js'
import ResultModal from './modal.js'
import NamesModal from './namesModal.js'
import { arrayOfWinningPos } from './winningcombos.js'
import Score from './score.js'



class Board extends Component {
  constructor(props){
    super(props)
    this.state = {
      gameResult: null,
      clicks: 0,
      currentTurn: null,
      nextTurn: null,
      board: null,
      turnNumber: "waiting for value",
      winningArray: null,
      player1:{
        Name: "Player 1",
        Colour: "yellow",
        Score: 0,
      },
      player2:{
        Name: "Player 2",
        Colour: `#e74c3c`,
        Score: 0,
      }
  }
}

createButtons(){
  let arrayOfButtons = []
  let numberOfButtons = 7
  for(let i=0 ; i < numberOfButtons; i++){
    arrayOfButtons.push(<Button id={`column${i+1}`} key={i} gameTurnFunction={this.OnAddOfPiece.bind(this)}/>)
  }return arrayOfButtons
}

createDots(){
  let arrayOfDots = []
  let i = 0
  for(let key in this.state.board){
      for(let colour of this.state.board[key]){
        arrayOfDots.push(<Dot id={i} key={i} colourOfDot={colour}/>)
        i ++
      }
  }return arrayOfDots
}

createBoard(){
let gameObj ={}
let arrayOfBoards = []
  let i = 0
  while(i < 7){
  arrayOfBoards.push(new Array(6).fill(null))
  i++
}

arrayOfBoards.forEach(function(value,index){
  gameObj[`column${index+1}`] = value
})
this.setState({board:gameObj})
}

createStartingPlayer(){
  let randomNumber = Math.floor(Math.random() * 2)
    if (randomNumber === 0){
      this.setState({turnNumber: randomNumber, nextTurn: "player2"})
    }else if(randomNumber === 1){
      this.setState({turnNumber: randomNumber, nextTurn: "player1"})
    }
}

updatePlayersNameState(arrayOfNames){
  var player1 = {...this.state.player1}
  var player2 = {...this.state.player2}
  player1.Name = arrayOfNames[0];
  player2.Name = arrayOfNames[1];
  this.setState({player1, player2})
}



componentDidMount(){
  this.createBoard()
  this.createStartingPlayer()
}

OnAddOfPiece(buttonId){
  this.setState({clicks: this.state.clicks+1})
  let playerTurn = this.findPlayer()
  this.findBoardPostion(playerTurn, buttonId)
  this.checkAgainstWinningPos(playerTurn)
}

findPlayer(){
    let {turnNumber} = this.state
    if (turnNumber % 2 === 0){
      this.setState({turnNumber: turnNumber +1, currentTurn: "player2", nextTurn:"player1"})
      return "player2"
    }else{
      this.setState({turnNumber: turnNumber +1, currentTurn: "player1", nextTurn:"player2"})
      return "player1"
    }
  }

findBoardPostion(playerTurn, buttonId){
  let positionOfInsertion = this.state.board[buttonId].indexOf(null)
    this.state.board[buttonId][positionOfInsertion] = this.state[playerTurn].Colour
    if(this.state.board[buttonId].indexOf(null) === -1){
      document.getElementById(buttonId).disabled = true
    }
  }

checkAgainstWinningPos(playerTurn){
  let {board, clicks} = this.state
  let currentArray = board.column1.concat(board.column2, board.column3, board.column4,
                                          board.column5, board.column6, board.column7);

  var resultsArray = arrayOfWinningPos.filter((aWinningArray) =>
  this.testGame(aWinningArray, currentArray, playerTurn))
  if(resultsArray.length > 0){
    if(playerTurn === "player1"){
      let player1 = {...this.state.player1}
      player1.Score = player1.Score +1
      this.setState({player1, winningArray: resultsArray[0], gameResult: "Won"})
    }else if (playerTurn === "player2"){
      let player2 = {...this.state.player2}
      player2.Score = player2.Score +1
      this.setState({player2, winningArray: resultsArray[0], gameResult: "Won"})
    }
  }else if (resultsArray.length === 0 && clicks === 41) {
    this.setState({gameResult: "Draw"})}
}

testGame(winningArray,currentArray, playerTurn){
  var counter = 0
  let status = false
  for(let x of winningArray){
    if(currentArray[x] === this.state[playerTurn].Colour){
      counter ++
    }
  }
  if (counter === 4){
    return true
  }
}

launchResultModal(){
  if(this.state.gameResult === "Won" && this.state.currentTurn === "player1"){
    let message = `${this.state.player1.Name} is the winner!`
    return <ResultModal messageForModal={message} newGameFunction={this.createNewGame.bind(this)}/>
  }else if(this.state.gameResult === "Won" && this.state.currentTurn === "player2"){
    let message = `${this.state.player2.Name} is the winner!`
    return <ResultModal messageForModal={message} newGameFunction={this.createNewGame.bind(this)}/>
  }else if(this.state.gameResult === "Draw"){
     let message = "The Game is a Draw!"
     return <ResultModal messageForModal={message}  newGameFunction={this.createNewGame.bind(this)}/>
  }
}

resetBoard(){
  window.location.reload();
}

resetButtons(){
  for(let i = 1; i < 8; i++){
    let button = `column${i}`
    document.getElementById(button).disabled = false
  }
}

createNewGame(){
    this.setState({
      gameResult: null,
      clicks: 0,
      currentTurn: null,
      board: null,
      winningArray: null,
    })
    this.createStartingPlayer()
    this.createBoard()
    this.resetButtons()
    }


  render() {
    console.log(this.state);
    return (
      <>
      <div className="gamearea">
        <Score currentGo={this.state.nextTurn} p1Score={this.state.player1.Score} p2Score={this.state.player2.Score}
        p1Colour={this.state.player1.Colour} p2Colour={this.state.player2.Colour} p1Name={this.state.player1.Name}
        p2Name={this.state.player2.Name}/>
        <NamesModal getPlayerNames={this.updatePlayersNameState.bind(this)}/>
      <div className="connect4">
      <div className="gridforbuttons">
        {this.createButtons()}
      </div>
      <div className="gridsfordots">
        {this.createDots()}
      </div>
      </div>
      <>
        {this.launchResultModal()}
      </>
      </div>
      </>
    );
  }
}

export default Board;
