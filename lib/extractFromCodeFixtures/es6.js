'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable */

// fixture from https://github.com/gaearon/redux-devtools.


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _LogMonitorEntry = require('./LogMonitorEntry');

var _LogMonitorEntry2 = _interopRequireDefault(_LogMonitorEntry);

var _LogMonitorButton = require('./LogMonitorButton');

var _LogMonitorButton2 = _interopRequireDefault(_LogMonitorButton);

var _i18n = require('i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _themes = require('./themes');

var themes = _interopRequireWildcard(_themes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var styles = {
  container: {
    fontFamily: 'monaco, Consolas, Lucida Console, monospace',
    position: 'relative',
    overflowY: 'hidden',
    width: '100%',
    height: '100%',
    minWidth: 300
  },
  buttonBar: {
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderColor: 'transparent',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'row'
  },
  elements: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 38,
    bottom: 0,
    overflowX: 'hidden',
    overflowY: 'auto'
  }
};

var LogMonitor = function () {
  function LogMonitor() {
    _classCallCheck(this, LogMonitor);

    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', this.handleKeyPress);
    }
  }

  _createClass(LogMonitor, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var node = (0, _react.findDOMNode)(this.refs.elements);
      if (!node) {
        this.scrollDown = true;
      } else if (this.props.stagedActions.length < nextProps.stagedActions.length) {
        var scrollTop = node.scrollTop,
            offsetHeight = node.offsetHeight,
            scrollHeight = node.scrollHeight;


        this.scrollDown = Math.abs(scrollHeight - (scrollTop + offsetHeight)) < 20;
      } else {
        this.scrollDown = false;
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var node = (0, _react.findDOMNode)(this.refs.elements);
      if (!node) {
        return;
      }
      if (this.scrollDown) {
        var offsetHeight = node.offsetHeight,
            scrollHeight = node.scrollHeight;

        node.scrollTop = scrollHeight - offsetHeight;
        this.scrollDown = false;
      }
    }
  }, {
    key: 'handleRollback',
    value: function handleRollback() {
      this.props.rollback();
    }
  }, {
    key: 'handleSweep',
    value: function handleSweep() {
      this.props.sweep();
    }
  }, {
    key: 'handleCommit',
    value: function handleCommit() {
      this.props.commit();
    }
  }, {
    key: 'handleToggleAction',
    value: function handleToggleAction(index) {
      this.props.toggleAction(index);
    }
  }, {
    key: 'handleReset',
    value: function handleReset() {
      this.props.reset();
    }
  }, {
    key: 'handleKeyPress',
    value: function handleKeyPress(event) {
      var monitorState = this.props.monitorState;


      if (event.ctrlKey && event.keyCode === 72) {
        // Ctrl+H
        event.preventDefault();
        this.props.setMonitorState(_extends({}, monitorState, {
          isVisible: !monitorState.isVisible
        }));
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var elements = [];
      var _props = this.props,
          monitorState = _props.monitorState,
          skippedActions = _props.skippedActions,
          stagedActions = _props.stagedActions,
          computedStates = _props.computedStates,
          select = _props.select;

      var theme = void 0;
      if (typeof this.props.theme === 'string') {
        if (typeof themes[this.props.theme] !== 'undefined') {
          theme = themes[this.props.theme];
        } else {
          console.warn('DevTools theme ' + this.props.theme + ' not found, defaulting to nicinabox');
          theme = themes.nicinabox;
        }
      } else {
        theme = this.props.theme;
      }
      if (!monitorState.isVisible) {
        return null;
      }

      for (var i = 0; i < stagedActions.length; i++) {
        var action = stagedActions[i];
        var _computedStates$i = computedStates[i],
            state = _computedStates$i.state,
            error = _computedStates$i.error;

        var previousState = void 0;
        if (i > 0) {
          previousState = computedStates[i - 1].state;
        }
        elements.push(_react2.default.createElement(_LogMonitorEntry2.default, {
          key: i,
          index: i,
          theme: theme,
          select: select,
          action: action,
          state: state,
          previousState: previousState,
          collapsed: skippedActions[i],
          error: error,
          onActionClick: this.handleToggleAction
        }));
      }

      return _react2.default.createElement(
        'div',
        { style: _extends({}, styles.container, { backgroundColor: theme.base00 }) },
        _react2.default.createElement(
          'div',
          { style: _extends({}, styles.buttonBar, { borderColor: theme.base02 }) },
          _react2.default.createElement(
            _LogMonitorButton2.default,
            { theme: theme, onClick: this.handleReset },
            (0, _i18n2.default)('reset')
          ),
          _react2.default.createElement(
            _LogMonitorButton2.default,
            { theme: theme, onClick: this.handleRollback, enabled: computedStates.length },
            (0, _i18n2.default)('revert')
          ),
          _react2.default.createElement(
            _LogMonitorButton2.default,
            {
              theme: theme,
              onClick: this.handleSweep,
              enabled: Object.keys(skippedActions).some(function (key) {
                return skippedActions[key];
              })
            },
            (0, _i18n2.default)('sweep')
          ),
          _react2.default.createElement(
            _LogMonitorButton2.default,
            { theme: theme, onClick: this.handleCommit, enabled: computedStates.length > 1 },
            (0, _i18n2.default)('commit')
          )
        ),
        _react2.default.createElement(
          'div',
          { style: styles.elements, ref: 'elements' },
          elements
        )
      );
    }
  }]);

  return LogMonitor;
}();

LogMonitor.propTypes = {
  computedStates: _react.PropTypes.array.isRequired,
  currentStateIndex: _react.PropTypes.number.isRequired,
  monitorState: _react.PropTypes.object.isRequired,
  stagedActions: _react.PropTypes.array.isRequired,
  sweep: _react.PropTypes.func.isRequired,
  toggleAction: _react.PropTypes.func.isRequired
};
LogMonitor.defaultProps = {
  select: function select(state) {
    return state;
  },
  monitorState: {
    isVisible: true
  },
  theme: 'nicinabox'
};
exports.default = LogMonitor;