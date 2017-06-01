'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { RadioGroup, RadioButton } from '../index.jsx';

let App = React.createClass({
  onChange(value) {
    console.log(value);
  },
  render() {
    return (
      <div style={ { padding: 16 } }>
        <h4>Vertical Radio Buttons</h4>
        <RadioGroup onChange={ this.onChange }>
          <RadioButton value="apple">
            Apple
          </RadioButton>
          <RadioButton value="orange">
            Orange
          </RadioButton>
          <RadioButton value="melon">
            Melon
          </RadioButton>
        </RadioGroup>
        <h4 style={ { marginTop: 32 } }>Horizontal Radio Buttons</h4>
        <RadioGroup onChange={ this.onChange } horizontal>
          <RadioButton value="apple">
            Apple
          </RadioButton>
          <RadioButton value="orange">
            Orange
          </RadioButton>
          <RadioButton value="melon">
            Melon
          </RadioButton>
        </RadioGroup>
        <h4 style={ { marginTop: 32 } }>1st option disabled (prevents onChange callback and style overwrite to look disabled)</h4>
        <RadioGroup onChange={ this.onChange }>
          <RadioButton value="apple" disabled={true} disabledColor={'green'}>
            Apple
          </RadioButton>
          <RadioButton value="orange">
            Orange
          </RadioButton>
          <RadioButton value="melon">
            Melon
          </RadioButton>
        </RadioGroup>
        <h4>Check console to see the value of the RadioGroup via the onChange callback</h4>
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('content'));
