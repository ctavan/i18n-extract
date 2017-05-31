'use strict';

var _chai = require('chai');

var _extractFromFiles = require('./extractFromFiles.js');

var _extractFromFiles2 = _interopRequireDefault(_extractFromFiles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-env mocha */

describe('#extractFromFiles()', function () {
  it('should work when scanning with a glob and a string parameter', function () {
    var keys = (0, _extractFromFiles2.default)('src/extractFromFilesFixture/*View.js');

    _chai.assert.deepEqual(['key1', 'key2', 'key3'], keys, 'Should find all the key without duplication');
  });

  it('should work when scanning with an array as parameter', function () {
    var keys = (0, _extractFromFiles2.default)(['src/extractFromFilesFixture/*.jsx', 'src/extractFromFilesFixture/*.js']);

    _chai.assert.deepEqual(['key3', 'key4', 'key1', 'key2'], keys, 'Should work with an array as first parameter');
  });
});