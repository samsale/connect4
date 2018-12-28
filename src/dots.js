import React, { Component } from 'react';




class Dot extends Component {
  constructor(props){
    super(props)
    this.state = {
  }
}

logger(){
  console.log("refs");
}
  render() {
    return (
      <div className='dots' style={{backgroundColor: this.props.colourOfDot}} id={this.props.id} key={this.props.id}>
      <img src={require('./imgs/board.png')} alt="dots" width="75" height="75" />
      </div>
    );
  }
}


export default Dot;
