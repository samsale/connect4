import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ResetButton from './resetbutton.js'

class Score extends Component {

resetBoard(){
        window.location.reload();
      }

  render() {

    const rowStyle2 = (row, rowIndex) => {
      const style = {};
      console.log(rowIndex);
      if(this.props.currentGo === "player1"){
      if (rowIndex === 0) {
        style.backgroundColor = this.props.p1Colour;
      } else {
        style.backgroundColor = 'white';
      }return style;
    }else if (this.props.currentGo === "player2") {
      if (rowIndex === 1) {
        style.backgroundColor = this.props.p2Colour;
      } else {
        style.backgroundColor = 'white';
      }return style;
    }
}

    var data = [
      {player: "1", name: this.props.p1Name, value: this.props.p1Score},
      {player: "2", name: this.props.p2Name, value: this.props.p2Score}
    ]


    const columns = [{
      dataField: 'player',
      text: 'Player'
    },
      {
      dataField: 'name',
      text: 'Name'
    }, {
      dataField: 'value',
      text: 'Score'
    }];

    return (
      <div className="score">


  <BootstrapTable keyField='name' data={ data } columns={ columns } rowStyle={ rowStyle2 }
  width='120px' bordered={ false }/>
<div className="reset">
      <>
      <ResetButton resetFunction={this.resetBoard.bind(this)}/>
      </>
      </div>
      </div>
    )
  }
}

export default Score;
