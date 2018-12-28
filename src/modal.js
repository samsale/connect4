import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ResultModal extends Component {
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


  render() {
    console.log(this.props);
    return (
      <div>
        <Modal size="lg" isOpen={this.state.modal}  className={this.props.className}>
          <ModalHeader className="font-weight-bold" >Game Complete</ModalHeader>
          <ModalBody>
          {this.props.messageForModal}
          </ModalBody>
          <ModalFooter>
            <Button outline color="primary" onClick={this.props.newGameFunction}>Play Again</Button>{' '}
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default ResultModal;
