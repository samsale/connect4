import React, { Component } from 'react';
import { Button } from 'reactstrap';

class Buttons extends Component {

getButtonClickId(event){
  this.props.gameTurnFunction(event.target.id)
}

  render() {
    return (
      <Button id={this.props.id} key={this.props.id} outline color="primary" className="button"
      type="button" onClick={this.getButtonClickId.bind(this)}>+</Button>
    );
  }
}

export default Buttons;
