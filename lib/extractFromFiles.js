'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractFromFiles;

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _utils = require('./utils');

var _extractFromCode = require('./extractFromCode');

var _extractFromCode2 = _interopRequireDefault(_extractFromCode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function extractFromFiles(filenames, options) {
  var keys = [];

  // filenames should be an array
  if (typeof filenames === 'string') {
    filenames = [filenames];
  }

  var toScan = [];

  filenames.forEach(function (filename) {
    toScan = toScan.concat(_glob2.default.sync(filename, {}));
  });

  toScan.forEach(function (filename) {
    var code = _fs2.default.readFileSync(filename, 'utf8');
    keys = keys.concat((0, _extractFromCode2.default)(code, options));
  });

  return (0, _utils.uniq)(keys);
}