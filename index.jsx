import React, { Component } from 'react';
import PropTypes from 'prop-types';

function getInitialCheckedIndex(children) {
  let checkedIndex;

  for (let i = 0; i < children.length; i++) {
    if (!children[i].props.disabled) {
      checkedIndex = i;
      break;
    }
  }

  return checkedIndex;
}

export class RadioGroup extends Component {
  constructor({ children, value }) {
    super();

    const index = children.findIndex(c => c.props.value === value);
    let checkedIndex 
    if (value === undefined)    // This is the case where it is not specified
      checkedIndex = -1 
    else {
      if (index > -1 && !children[index].props.disabled)
        checkedIndex = index 
      else 
        checkedIndex = getInitialCheckedIndex(children)
    }
    this.state = { checkedIndex: checkedIndex };

    this.renderChild = this.renderChild.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  get value() {
    const { checkedIndex } = this.state;
    const { children } = this.props;

    const child = children.find(c => c.props.index === checkedIndex);
    return child && child.props.value || '';
  }

// This is the case to handle late arriving props, 
// and set the state according to the value
// as long as it's not disabled
  componentWillReceiveProps(nextProps) {
    const children = this.props.children
    const index = children.findIndex(c => c.props.value === nextProps.value && !c.props.disabled);
    if (index !== -1 && index !== this.state.checkedIndex) {
      this.setState({ checkedIndex: index });
    }
  }

  onChange(index) {
    const { onChange, children } = this.props;
    const child = children[index];
    if (!child) return;

    this.setState({ checkedIndex: index });
    onChange && onChange(child.props.value || '');
  }

  renderChild(child, index, checked) {
    const { children, horizontal } = this.props;
    return React.cloneElement(child, {
      horizontal, index, checked,
      key: index,
      last: index === children.length - 1,
      onChange: this.onChange, ...child.props
    });
  }

  render() {
    const { checkedIndex } = this.state;
    const { horizontal, children, ...props } = this.props;
    const style = horizontal ? { display: 'inline-flex', width: '100%' } : {};
    return (
      <div style={style} {...props}>
        {
          children.map((c, i) => (this.renderChild(c, i, i === checkedIndex)))
        }
      </div>
    );
  }
}

RadioGroup.propTypes = {
  horizontal: PropTypes.bool,
  children: PropTypes.node,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export class RadioButton extends Component {
  constructor() {
    super();
    this.getStyles = this.getStyles.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  getStyles() {
    const { horizontal, last, padding, rootColor, pointColor, disabled, disabledColor, label } = this.props;

    return {
      root: {
        cursor: disabled ? 'not-allowed' : 'pointer',
        color: disabled ? (disabledColor || '#e1e1e1') : (rootColor || '#E0E0E0'),
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: disabled ? (disabledColor || '#e1e1e1') : (rootColor || '#E0E0E0'),
        borderRadius: 1,
        padding: padding || 16,
        flex: 1,
        marginBottom: horizontal ? 0 : label ? (padding || 16) / 2 : (padding || 16),
        marginRight: horizontal && !last ? (padding || 16) / 2 : 0,
      },
      label: {
        color: pointColor || '#8CB9FD',
        borderStyle: 'none',
        padding: padding || 8,
        marginBottom: horizontal ? 0 : (padding || 8),
        marginRight: horizontal && !last ? (padding || 8) / 2 : 0
      },
      checked: {
        borderColor: pointColor || '#8CB9FD',
        color: pointColor || '#8CB9FD',
      },
    };
  }

  onClick() {
    const { onChange, checked, index, disabled } = this.props;
    !disabled && onChange && onChange(index);
  }

  render() {
    const { checked, iconSize, iconInnerSize, rootColor, pointColor, children, disabled, disabledColor, label } = this.props;
    const style = this.getStyles();
    const buttonStyle = Object.assign({}, style.root, checked ? style.checked : {});
    const labelStyle = Object.assign({}, style.root, style.label)

    return (

      <div style={buttonStyle} onClick={this.onClick}>
        <div style={{ display: 'inline-flex', width: '100%' }}>
          <div style={{ flex: 1 }}>
            {children}
          </div>
          <RadioIcon size={iconSize} innerSize={iconInnerSize}
            checked={checked} rootColor={rootColor} pointColor={pointColor}
            disabled={disabled} disabledColor={disabledColor}
          />
        </div>
        {
          label ? (
            <div style={labelStyle}>
              <div>{label}</div>
            </div>
            ) : ''
        }
      </div>
    );
  }
}

RadioButton.propTypes = {
  iconSize: PropTypes.number,
  iconInnerSize: PropTypes.number,
  padding: PropTypes.number,
  rootColor: PropTypes.string,
  pointColor: PropTypes.string,
  value: PropTypes.string,
  index: PropTypes.number,
  checked: PropTypes.bool,
  children: PropTypes.node,
  horizontal: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  disabledColor: PropTypes.string,
  label: PropTypes.string
};

export class ReversedRadioButton extends Component {
  constructor() {
    super();
    this.getStyles = this.getStyles.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  getStyles() {
    const { horizontal, last, padding, rootColor, pointColor, disabled, disabledColor, label } = this.props;

    return {
      root: {
        cursor: disabled ? 'not-allowed' : 'pointer',
        color: disabled ? (disabledColor || '#e1e1e1') : (rootColor || '#E0E0E0'),
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: disabled ? (disabledColor || '#e1e1e1') : (rootColor || '#E0E0E0'),
        borderRadius: 1,
        padding: padding || 16,
        flex: 1,
        marginBottom: horizontal ? 0 : (padding || 16),
        marginRight: horizontal && !last ? (padding || 16) / 2 : 0,
      },
      label: {
        color: pointColor || '#8CB9FD',
        borderStyle: 'none',
        padding: padding || 8,
        marginBottom: horizontal ? 0 : (padding || 8),
        marginRight: horizontal && !last ? (padding || 8) / 2 : 0
      },
      checked: {
        borderColor: pointColor || '#8CB9FD',
        color: pointColor || '#8CB9FD',
      },
    };
  }

  onClick() {
    const { onChange, checked, index, disabled } = this.props;
    !disabled && onChange && onChange(index);
  }

  render() {
    const { checked, iconSize, iconInnerSize, rootColor, pointColor, children, disabled, disabledColor, padding, label } = this.props;
    const style = this.getStyles();
    const buttonStyle = Object.assign({}, style.root, checked ? style.checked : {});
    const labelStyle = Object.assign({}, style.root, style.label)
    
    return (
      <div style={buttonStyle} onClick={this.onClick}>
        <div style={{ display: 'inline-flex', width: '100%' }}>
          <RadioIcon size={iconSize} innerSize={iconInnerSize}
            checked={checked} rootColor={rootColor} pointColor={pointColor}
            disabled={disabled} disabledColor={disabledColor}
            marginRight={padding || 16}
          />
          <div style={{ flex: 1 }}>
            {children}
          </div>
        </div>
        {
          label ? (
            <div style={labelStyle}>
              <div>{label}</div>
            </div>
            ) : ''
        }
      </div>
    );
  }
}

ReversedRadioButton.propTypes = {
  iconSize: PropTypes.number,
  iconInnerSize: PropTypes.number,
  padding: PropTypes.number,
  rootColor: PropTypes.string,
  pointColor: PropTypes.string,
  value: PropTypes.string,
  index: PropTypes.number,
  checked: PropTypes.bool,
  children: PropTypes.node,
  horizontal: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  disabledColor: PropTypes.bool,
  label: PropTypes.string
};

export class RadioIcon extends Component {
  constructor() {
    super();
    this.getStyles = this.getStyles.bind(this);
  }

  getStyles() {
    const { size, innerSize, rootColor, pointColor, disabled, disabledColor, marginRight } = this.props;

    return {
      root: {
        width: size || 10,
        height: size || 10,
        padding: 3,
        backgroundColor: '#FFF',
        borderWidth: 2,
        borderRadius: '50%',
        borderStyle: 'solid',
        borderColor: disabled ? (disabledColor || '#e1e1e1') : (rootColor || '#9E9E9E'),
        marginRight: marginRight || 0,
      },
      checked: {
        borderColor: pointColor || '#8CB9FD',
      },
      inner: {
        width: innerSize || 10,
        height: innerSize || 10,
        borderRadius: '50%',
        background: pointColor || '#8CB9FD',
      }
    }
  }

  render() {
    const { checked } = this.props;
    const style = this.getStyles();
    const iconStyle = Object.assign(style.root, checked ? style.checked : {});
    return (
      <div style={iconStyle}>
        {checked && <div style={style.inner} />}
      </div>
    );
  }
}

RadioIcon.propTypes = {
  size: PropTypes.number,
  innerSize: PropTypes.number,
  rootColor: PropTypes.string,
  pointColor: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  disabledColor: PropTypes.string,
  marginRight: PropTypes.number,
};
