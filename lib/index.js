'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RadioIcon = exports.ReversedRadioButton = exports.RadioButton = exports.RadioGroup = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getInitialCheckedIndex(children) {
  var checkedIndex = void 0;

  for (var i = 0; i < children.length; i++) {
    if (!children[i].props.disabled) {
      checkedIndex = i;
      break;
    }
  }

  return checkedIndex;
}

var RadioGroup = exports.RadioGroup = function (_Component) {
  _inherits(RadioGroup, _Component);

  function RadioGroup(_ref) {
    var children = _ref.children,
        value = _ref.value;

    _classCallCheck(this, RadioGroup);

    var _this = _possibleConstructorReturn(this, (RadioGroup.__proto__ || Object.getPrototypeOf(RadioGroup)).call(this));

    var index = children.findIndex(function (c) {
      return c.props.value === value;
    });
    var checkedIndex = void 0;
    if (value === undefined) // This is the case where it is not specified
      checkedIndex = -1;else {
      if (index > -1 && !children[index].props.disabled) checkedIndex = index;else checkedIndex = getInitialCheckedIndex(children);
    }
    _this.state = { checkedIndex: checkedIndex };

    _this.renderChild = _this.renderChild.bind(_this);
    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  _createClass(RadioGroup, [{
    key: 'componentWillReceiveProps',


    // This is the case to handle late arriving props, 
    // and set the state according to the value
    // as long as it's not disabled
    value: function componentWillReceiveProps(nextProps) {
      var children = this.props.children;
      var index = children.findIndex(function (c) {
        return c.props.value === nextProps.value && !c.props.disabled;
      });
      if (index !== -1 && index !== this.state.checkedIndex) {
        this.setState({ checkedIndex: index });
      }
    }
  }, {
    key: 'onChange',
    value: function onChange(index) {
      var _props = this.props,
          onChange = _props.onChange,
          children = _props.children;

      var child = children[index];
      if (!child) return;

      this.setState({ checkedIndex: index });
      onChange && onChange(child.props.value || '');
    }
  }, {
    key: 'renderChild',
    value: function renderChild(child, index, checked) {
      var _props2 = this.props,
          children = _props2.children,
          horizontal = _props2.horizontal;

      return _react2.default.cloneElement(child, _extends({
        horizontal: horizontal, index: index, checked: checked,
        key: index,
        last: index === children.length - 1,
        onChange: this.onChange }, child.props));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var checkedIndex = this.state.checkedIndex;

      var _props3 = this.props,
          horizontal = _props3.horizontal,
          children = _props3.children,
          props = _objectWithoutProperties(_props3, ['horizontal', 'children']);

      var style = horizontal ? { display: 'inline-flex', width: '100%' } : {};
      return _react2.default.createElement(
        'div',
        _extends({ style: style }, props),
        children.map(function (c, i) {
          return _this2.renderChild(c, i, i === checkedIndex);
        })
      );
    }
  }, {
    key: 'value',
    get: function get() {
      var checkedIndex = this.state.checkedIndex;
      var children = this.props.children;


      var child = children.find(function (c) {
        return c.props.index === checkedIndex;
      });
      return child && child.props.value || '';
    }
  }]);

  return RadioGroup;
}(_react.Component);

RadioGroup.propTypes = {
  horizontal: _propTypes2.default.bool,
  children: _propTypes2.default.node,
  value: _propTypes2.default.string,
  onChange: _propTypes2.default.func
};

var RadioButton = exports.RadioButton = function (_Component2) {
  _inherits(RadioButton, _Component2);

  function RadioButton() {
    _classCallCheck(this, RadioButton);

    var _this3 = _possibleConstructorReturn(this, (RadioButton.__proto__ || Object.getPrototypeOf(RadioButton)).call(this));

    _this3.getStyles = _this3.getStyles.bind(_this3);
    _this3.onClick = _this3.onClick.bind(_this3);
    return _this3;
  }

  _createClass(RadioButton, [{
    key: 'getStyles',
    value: function getStyles() {
      var _props4 = this.props,
          horizontal = _props4.horizontal,
          last = _props4.last,
          padding = _props4.padding,
          rootColor = _props4.rootColor,
          pointColor = _props4.pointColor,
          disabled = _props4.disabled,
          disabledColor = _props4.disabledColor,
          label = _props4.label;


      return {
        root: {
          cursor: disabled ? 'not-allowed' : 'pointer',
          color: disabled ? disabledColor || '#e1e1e1' : rootColor || '#E0E0E0',
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: disabled ? disabledColor || '#e1e1e1' : rootColor || '#E0E0E0',
          borderRadius: 1,
          padding: padding || 16,
          flex: 1,
          marginBottom: horizontal ? 0 : label ? (padding || 16) / 2 : padding || 16,
          marginRight: horizontal && !last ? (padding || 16) / 2 : 0
        },
        label: {
          color: pointColor || '#8CB9FD',
          borderStyle: 'none',
          padding: padding || 8,
          marginBottom: horizontal ? 0 : padding || 8,
          marginRight: horizontal && !last ? (padding || 8) / 2 : 0
        },
        checked: {
          borderColor: pointColor || '#8CB9FD',
          color: pointColor || '#8CB9FD'
        }
      };
    }
  }, {
    key: 'onClick',
    value: function onClick() {
      var _props5 = this.props,
          onChange = _props5.onChange,
          checked = _props5.checked,
          index = _props5.index,
          disabled = _props5.disabled;

      !disabled && onChange && onChange(index);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props6 = this.props,
          checked = _props6.checked,
          iconSize = _props6.iconSize,
          iconInnerSize = _props6.iconInnerSize,
          rootColor = _props6.rootColor,
          pointColor = _props6.pointColor,
          children = _props6.children,
          disabled = _props6.disabled,
          disabledColor = _props6.disabledColor,
          label = _props6.label;

      var style = this.getStyles();
      var buttonStyle = Object.assign({}, style.root, checked ? style.checked : {});
      var labelStyle = Object.assign({}, style.root, style.label);

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { style: buttonStyle, onClick: this.onClick },
          _react2.default.createElement(
            'div',
            { style: { display: 'inline-flex', width: '100%' } },
            _react2.default.createElement(
              'div',
              { style: { flex: 1 } },
              children
            ),
            _react2.default.createElement(RadioIcon, { size: iconSize, innerSize: iconInnerSize,
              checked: checked, rootColor: rootColor, pointColor: pointColor,
              disabled: disabled, disabledColor: disabledColor
            })
          )
        ),
        label ? _react2.default.createElement(
          'div',
          { style: labelStyle },
          _react2.default.createElement(
            'div',
            null,
            label
          )
        ) : ''
      );
    }
  }]);

  return RadioButton;
}(_react.Component);

RadioButton.propTypes = {
  iconSize: _propTypes2.default.number,
  iconInnerSize: _propTypes2.default.number,
  padding: _propTypes2.default.number,
  rootColor: _propTypes2.default.string,
  pointColor: _propTypes2.default.string,
  value: _propTypes2.default.string,
  index: _propTypes2.default.number,
  checked: _propTypes2.default.bool,
  children: _propTypes2.default.node,
  horizontal: _propTypes2.default.bool,
  onChange: _propTypes2.default.func,
  disabled: _propTypes2.default.bool,
  disabledColor: _propTypes2.default.string,
  label: _propTypes2.default.string
};

var ReversedRadioButton = exports.ReversedRadioButton = function (_Component3) {
  _inherits(ReversedRadioButton, _Component3);

  function ReversedRadioButton() {
    _classCallCheck(this, ReversedRadioButton);

    var _this4 = _possibleConstructorReturn(this, (ReversedRadioButton.__proto__ || Object.getPrototypeOf(ReversedRadioButton)).call(this));

    _this4.getStyles = _this4.getStyles.bind(_this4);
    _this4.onClick = _this4.onClick.bind(_this4);
    return _this4;
  }

  _createClass(ReversedRadioButton, [{
    key: 'getStyles',
    value: function getStyles() {
      var _props7 = this.props,
          horizontal = _props7.horizontal,
          last = _props7.last,
          padding = _props7.padding,
          rootColor = _props7.rootColor,
          pointColor = _props7.pointColor,
          disabled = _props7.disabled,
          disabledColor = _props7.disabledColor,
          label = _props7.label;


      return {
        root: {
          cursor: disabled ? 'not-allowed' : 'pointer',
          color: disabled ? disabledColor || '#e1e1e1' : rootColor || '#E0E0E0',
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: disabled ? disabledColor || '#e1e1e1' : rootColor || '#E0E0E0',
          borderRadius: 1,
          padding: padding || 16,
          flex: 1,
          marginBottom: horizontal ? 0 : padding || 16,
          marginRight: horizontal && !last ? (padding || 16) / 2 : 0
        },
        label: {
          color: pointColor || '#8CB9FD',
          borderStyle: 'none',
          padding: padding || 8,
          marginBottom: horizontal ? 0 : padding || 8,
          marginRight: horizontal && !last ? (padding || 8) / 2 : 0
        },
        checked: {
          borderColor: pointColor || '#8CB9FD',
          color: pointColor || '#8CB9FD'
        }
      };
    }
  }, {
    key: 'onClick',
    value: function onClick() {
      var _props8 = this.props,
          onChange = _props8.onChange,
          checked = _props8.checked,
          index = _props8.index,
          disabled = _props8.disabled;

      !disabled && onChange && onChange(index);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props9 = this.props,
          checked = _props9.checked,
          iconSize = _props9.iconSize,
          iconInnerSize = _props9.iconInnerSize,
          rootColor = _props9.rootColor,
          pointColor = _props9.pointColor,
          children = _props9.children,
          disabled = _props9.disabled,
          disabledColor = _props9.disabledColor,
          padding = _props9.padding,
          label = _props9.label;

      var style = this.getStyles();
      var buttonStyle = Object.assign({}, style.root, checked ? style.checked : {});
      var labelStyle = Object.assign({}, style.root, style.label);

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { style: buttonStyle, onClick: this.onClick },
          _react2.default.createElement(
            'div',
            { style: { display: 'inline-flex', width: '100%' } },
            _react2.default.createElement(RadioIcon, { size: iconSize, innerSize: iconInnerSize,
              checked: checked, rootColor: rootColor, pointColor: pointColor,
              disabled: disabled, disabledColor: disabledColor,
              marginRight: padding || 16
            }),
            _react2.default.createElement(
              'div',
              { style: { flex: 1 } },
              children
            )
          )
        ),
        label ? _react2.default.createElement(
          'div',
          { style: labelStyle },
          _react2.default.createElement(
            'div',
            null,
            label
          )
        ) : ''
      );
    }
  }]);

  return ReversedRadioButton;
}(_react.Component);

ReversedRadioButton.propTypes = {
  iconSize: _propTypes2.default.number,
  iconInnerSize: _propTypes2.default.number,
  padding: _propTypes2.default.number,
  rootColor: _propTypes2.default.string,
  pointColor: _propTypes2.default.string,
  value: _propTypes2.default.string,
  index: _propTypes2.default.number,
  checked: _propTypes2.default.bool,
  children: _propTypes2.default.node,
  horizontal: _propTypes2.default.bool,
  onChange: _propTypes2.default.func,
  disabled: _propTypes2.default.bool,
  disabledColor: _propTypes2.default.bool,
  label: _propTypes2.default.string
};

var RadioIcon = exports.RadioIcon = function (_Component4) {
  _inherits(RadioIcon, _Component4);

  function RadioIcon() {
    _classCallCheck(this, RadioIcon);

    var _this5 = _possibleConstructorReturn(this, (RadioIcon.__proto__ || Object.getPrototypeOf(RadioIcon)).call(this));

    _this5.getStyles = _this5.getStyles.bind(_this5);
    return _this5;
  }

  _createClass(RadioIcon, [{
    key: 'getStyles',
    value: function getStyles() {
      var _props10 = this.props,
          size = _props10.size,
          innerSize = _props10.innerSize,
          rootColor = _props10.rootColor,
          pointColor = _props10.pointColor,
          disabled = _props10.disabled,
          disabledColor = _props10.disabledColor,
          marginRight = _props10.marginRight;


      return {
        root: {
          width: size || 10,
          height: size || 10,
          padding: 3,
          backgroundColor: '#FFF',
          borderWidth: 2,
          borderRadius: '50%',
          borderStyle: 'solid',
          borderColor: disabled ? disabledColor || '#e1e1e1' : rootColor || '#9E9E9E',
          marginRight: marginRight || 0
        },
        checked: {
          borderColor: pointColor || '#8CB9FD'
        },
        inner: {
          width: innerSize || 10,
          height: innerSize || 10,
          borderRadius: '50%',
          background: pointColor || '#8CB9FD'
        }
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var checked = this.props.checked;

      var style = this.getStyles();
      var iconStyle = Object.assign(style.root, checked ? style.checked : {});
      return _react2.default.createElement(
        'div',
        { style: iconStyle },
        checked && _react2.default.createElement('div', { style: style.inner })
      );
    }
  }]);

  return RadioIcon;
}(_react.Component);

RadioIcon.propTypes = {
  size: _propTypes2.default.number,
  innerSize: _propTypes2.default.number,
  rootColor: _propTypes2.default.string,
  pointColor: _propTypes2.default.string,
  checked: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  disabledColor: _propTypes2.default.string,
  marginRight: _propTypes2.default.number
};