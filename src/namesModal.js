import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter ,
        InputGroup, InputGroupAddon, Input} from 'reactstrap';

class NamesModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  getPlayerNames(){
    let namesArray = []
    let player1 = document.getElementById('player1Name').value
    let player2 = document.getElementById('player2Name').value
    namesArray.push(player1, player2)
    this.props.getPlayerNames(namesArray)
  }


onClickFunctions(){
this.getPlayerNames()
this.toggle()
}

  render() {
    console.log(this.props);
    return (
      <div>
        <Modal size="sm" isOpen={this.state.modal}>
          <ModalHeader className="font-weight-bold" >Welcome to Connect 4</ModalHeader>
          <ModalBody>
          <p>Please enter your names</p>
          <InputGroup>
            <InputGroupAddon addonType="prepend">Player 1</InputGroupAddon>
              <Input id="player1Name" placeholder="Player 1"/>
                </InputGroup>
                <br/>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">Player 2</InputGroupAddon>
                    <Input id="player2Name" placeholder="Player 2"/>
                      </InputGroup>
          </ModalBody>
          <ModalFooter>
            <Button outline color="primary" onClick={this.onClickFunctions.bind(this)}>Start Game</Button>{' '}
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default NamesModal;
