import React, { Component } from 'react';
import { Button, Badge } from 'reactstrap';


class NextGo extends Component {

  render() {
    return (
      <div className="currentgo">

    <h4>Next Go {this.props.currentPlayer}</h4>


      </div>
    );
  }
}

export default NextGo;
