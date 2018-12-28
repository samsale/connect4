import React, { Component } from 'react';
import { Button } from 'reactstrap';




class ResetButton extends Component {


  render() {
    return (
<div className="reset">
<Button outline color="danger" onClick={this.props.resetFunction}>Reset to Zero</Button>
</div>
);
}
}


export default ResetButton;
