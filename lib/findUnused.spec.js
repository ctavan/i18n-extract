'use strict';

var _chai = require('chai');

var _findUnused = require('./findUnused.js');

var _findUnused2 = _interopRequireDefault(_findUnused);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-env mocha */

describe('#findUnused()', function () {
  describe('static keys', function () {
    it('should work with a simple case', function () {
      var unused = (0, _findUnused2.default)({
        key1: 'Key 1',
        key2: 'Key 2'
      }, ['key1', 'key2']);

      _chai.assert.deepEqual([], unused, 'Should report zero unused key.');
    });

    it('should work with a simple case', function () {
      var unused = (0, _findUnused2.default)({
        key1: 'Key 1',
        key2: 'Key 2',
        key3: 'Key 3'
      }, ['key1', 'key2']);

      _chai.assert.deepEqual([{
        type: 'UNUSED',
        key: 'key3'
      }], unused, 'Should report one unused key.');
    });
  });

  describe('dynamic keys', function () {
    it('should work with a simple case', function () {
      var unused = (0, _findUnused2.default)({
        'foo.key1': 'Key 1',
        'foo.key2': 'Key 2'
      }, ['foo.*']);

      _chai.assert.deepEqual([], unused, 'Should report zero unused key.');
    });

    it('should work with a simple case', function () {
      var unused = (0, _findUnused2.default)({
        'foo.key1': 'Key 1',
        'foo.key2': 'Key 2',
        key3: 'Key 3'
      }, ['foo.*']);

      _chai.assert.deepEqual([{
        type: 'UNUSED',
        key: 'key3'
      }], unused, 'Should report one unused key.');
    });

    it('should do an exact match even with dynamic keys', function () {
      var missing = (0, _findUnused2.default)({
        'bar.key.foo': 'Key 1'
      }, ['key.*']);

      _chai.assert.deepEqual([{
        key: 'bar.key.foo',
        type: 'UNUSED'
      }], missing, 'Should report one missing key.');
    });
  });
});