'use strict';

var _chai = require('chai');

var _findMissing = require('./findMissing.js');

var _findMissing2 = _interopRequireDefault(_findMissing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-env mocha */

describe('#findMissing()', function () {
  describe('static keys', function () {
    it('should work with a simple case', function () {
      var missing = (0, _findMissing2.default)({
        key1: 'Key 1',
        key2: 'Key 2'
      }, ['key1', 'key2', 'key3']);

      _chai.assert.deepEqual([{
        type: 'MISSING',
        key: 'key3'
      }], missing, 'Should report one missing key.');
    });
  });

  describe('dynamic keys', function () {
    it('should work with a simple case', function () {
      var missing = (0, _findMissing2.default)({
        'foo.key1': 'Key 1',
        'foo.key2': 'Key 2',
        bar: 'Key 3',
        'foo.key.bar': 'Key 4'
      }, ['foo.*', '*.key1', '*', 'foo.*.bar']);

      _chai.assert.deepEqual([], missing, 'Should report zero missing key.');
    });

    it('should work with a simple case', function () {
      var missing = (0, _findMissing2.default)({
        'bar.key1': 'Key 1',
        'bar.key.foo': 'Key 1',
        foo: 'Key 2'
      }, ['foo.*', '*.key2', 'bar.*.foo1']);

      _chai.assert.deepEqual([{
        key: 'foo.*',
        type: 'MISSING'
      }, {
        key: '*.key2',
        type: 'MISSING'
      }, {
        key: 'bar.*.foo1',
        type: 'MISSING'
      }], missing, 'Should report three missing key.');
    });

    it('should do an exact match even with dynamic keys', function () {
      var missing = (0, _findMissing2.default)({
        'bar.key.foo': 'Key 1'
      }, ['key.*']);

      _chai.assert.deepEqual([{
        key: 'key.*',
        type: 'MISSING'
      }], missing, 'Should report one missing key.');
    });
  });
});