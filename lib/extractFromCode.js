'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractFromCode;

var _babylon = require('babylon');

var _babelTraverse = require('babel-traverse');

var _babelTraverse2 = _interopRequireDefault(_babelTraverse);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var noInformationTypes = ['CallExpression', 'Identifier', 'MemberExpression'];

function getKey(node) {
  if (node.type === 'StringLiteral') {
    return node.value;
  } else if (node.type === 'BinaryExpression' && node.operator === '+') {
    return getKey(node.left) + getKey(node.right);
  } else if (node.type === 'TemplateLiteral') {
    return node.quasis.map(function (quasi) {
      return quasi.value.cooked;
    }).join('*');
  } else if (noInformationTypes.includes(node.type)) {
    return '*'; // We can't extract anything.
  }

  console.warn('Unsupported node: ' + node.type);

  return null;
}

var commentRegExp = /i18n-extract (\S+)/;

function extractFromCode(code) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$marker = options.marker,
      marker = _options$marker === undefined ? 'i18n' : _options$marker;


  var ast = (0, _babylon.parse)(code, {
    sourceType: 'module',

    // Enable all the plugins
    plugins: ['jsx', 'flow', 'asyncFunctions', 'classConstructorCall', 'doExpressions', 'trailingFunctionCommas', 'objectRestSpread', 'decorators', 'classProperties', 'exportExtensions', 'exponentiationOperator', 'asyncGenerators', 'functionBind', 'functionSent', 'dynamicImport']
  });

  var keys = [];

  // Look for keys in the comments.
  ast.comments.forEach(function (comment) {
    var match = commentRegExp.exec(comment.value);

    if (match) {
      keys.push(match[1]);
    }
  });

  // Look for keys in the source code.
  (0, _babelTraverse2.default)(ast, {
    CallExpression: function CallExpression(path) {
      var node = path.node;
      var _node$callee = node.callee,
          name = _node$callee.name,
          type = _node$callee.type;


      if (type === 'Identifier' && name === marker || path.get('callee').matchesPattern(marker)) {
        var key = getKey(node.arguments[0]);

        if (key) {
          keys.push(key);
        }
      }
    }
  });

  return (0, _utils.uniq)(keys);
}