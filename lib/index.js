'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RadioButton = exports.RadioGroup = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RadioGroup = exports.RadioGroup = function (_Component) {
  _inherits(RadioGroup, _Component);

  function RadioGroup(_ref) {
    var children = _ref.children;
    var value = _ref.value;

    _classCallCheck(this, RadioGroup);

    var _this = _possibleConstructorReturn(this, (RadioGroup.__proto__ || Object.getPrototypeOf(RadioGroup)).call(this));

    var index = children.findIndex(function (c) {
      return c.props.value === value;
    });
    _this.state = { checkedIndex: index > -1 ? index : 0 };
    _this.renderChild = _this.renderChild.bind(_this);
    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  _createClass(RadioGroup, [{
    key: 'onChange',
    value: function onChange(index) {
      var _props = this.props;
      var onChange = _props.onChange;
      var children = _props.children;

      var child = children[index];
      if (!child) return;

      this.setState({ checkedIndex: index });
      onChange && onChange(child.props.value || '');
    }
  }, {
    key: 'renderChild',
    value: function renderChild(child, index, checked) {
      var _props2 = this.props;
      var children = _props2.children;
      var horizontal = _props2.horizontal;

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
      var _props3 = this.props;
      var horizontal = _props3.horizontal;
      var children = _props3.children;

      var props = _objectWithoutProperties(_props3, ['horizontal', 'children']);

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
  horizontal: _react.PropTypes.bool,
  children: _react.PropTypes.node,
  value: _react.PropTypes.string,
  onChange: _react.PropTypes.func
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
      var _props4 = this.props;
      var horizontal = _props4.horizontal;
      var last = _props4.last;
      var padding = _props4.padding;
      var rootColor = _props4.rootColor;
      var pointColor = _props4.pointColor;


      return {
        root: {
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: rootColor || '#E0E0E0',
          borderRadius: 1,
          padding: padding || 16,
          flex: 1,
          marginBottom: horizontal ? 0 : padding || 16,
          marginRight: horizontal && !last ? (padding || 16) / 2 : 0
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
      var _props5 = this.props;
      var onChange = _props5.onChange;
      var checked = _props5.checked;
      var index = _props5.index;

      onChange && onChange(index);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props6 = this.props;
      var checked = _props6.checked;
      var iconSize = _props6.iconSize;
      var iconInnerSize = _props6.iconInnerSize;
      var rootColor = _props6.rootColor;
      var pointColor = _props6.pointColor;
      var children = _props6.children;

      var style = this.getStyles();
      var buttonStyle = Object.assign(style.root, checked ? style.checked : {});
      return _react2.default.createElement(
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
            checked: checked, rootColor: rootColor, pointColor: pointColor
          })
        )
      );
    }
  }]);

  return RadioButton;
}(_react.Component);

RadioButton.propTypes = {
  iconSize: _react.PropTypes.number,
  iconInnerSize: _react.PropTypes.number,
  padding: _react.PropTypes.number,
  rootColor: _react.PropTypes.string,
  pointColor: _react.PropTypes.string,
  value: _react.PropTypes.string,
  index: _react.PropTypes.number,
  checked: _react.PropTypes.bool,
  children: _react.PropTypes.node,
  horizontal: _react.PropTypes.bool,
  onChange: _react.PropTypes.func
};

var RadioIcon = function (_Component3) {
  _inherits(RadioIcon, _Component3);

  function RadioIcon() {
    _classCallCheck(this, RadioIcon);

    var _this4 = _possibleConstructorReturn(this, (RadioIcon.__proto__ || Object.getPrototypeOf(RadioIcon)).call(this));

    _this4.getStyles = _this4.getStyles.bind(_this4);
    return _this4;
  }

  _createClass(RadioIcon, [{
    key: 'getStyles',
    value: function getStyles() {
      var _props7 = this.props;
      var size = _props7.size;
      var innerSize = _props7.innerSize;
      var rootColor = _props7.rootColor;
      var pointColor = _props7.pointColor;


      return {
        root: {
          width: size || 10,
          height: size || 10,
          padding: 3,
          backgroundColor: '#FFF',
          borderWidth: 2,
          borderRadius: '50%',
          borderStyle: 'solid',
          borderColor: rootColor || '#9E9E9E'
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
  size: _react.PropTypes.number,
  innerSize: _react.PropTypes.number,
  rootColor: _react.PropTypes.string,
  pointColor: _react.PropTypes.string,
  checked: _react.PropTypes.bool
};