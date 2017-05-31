'use strict';

var _chai = require('chai');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _extractFromCode = require('./extractFromCode.js');

var _extractFromCode2 = _interopRequireDefault(_extractFromCode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-env mocha */

function getCode(name) {
  return _fs2.default.readFileSync(_path2.default.join(__dirname, 'extractFromCodeFixtures/' + name), 'utf8');
}

describe('#extractFromCode()', function () {
  describe('static keys', function () {
    it('should return the right keys with ES5 code', function () {
      var keys = (0, _extractFromCode2.default)(getCode('es5.js'));

      _chai.assert.deepEqual(['follow', 'followed', 'unfollowed', 'unfollow', 'following'], keys, 'Should work with ES5 code.');
    });

    it('should return the right keys with ES6 code', function () {
      var keys = (0, _extractFromCode2.default)(getCode('es6.js'));

      _chai.assert.deepEqual(['reset', 'revert', 'sweep', 'commit'], keys, 'Should work with ES6 code.');
    });

    it('should return the right keys with a custom marker', function () {
      var keys = (0, _extractFromCode2.default)(getCode('marker.js'), {
        marker: '__'
      });

      _chai.assert.deepEqual(['this_is_a_custom_marker'], keys, 'Should take into account the marker option.');
    });

    it('should return the right keys with a composed custom marker', function () {
      var keys = (0, _extractFromCode2.default)(getCode('markerComposed.js'), {
        marker: 'polyglot.t'
      });

      _chai.assert.deepEqual(['this_is_a_custom_marker'], keys, 'Should take into account the marker option.');
    });

    it('should return the right keys with multiple arguments', function () {
      var keys = (0, _extractFromCode2.default)(getCode('many-args.js'));

      _chai.assert.deepEqual(['hello_username'], keys, 'The second argument shoudn\'t have any impact.');
    });

    it('should deduplicate the keys', function () {
      var keys = (0, _extractFromCode2.default)(getCode('duplicated.js'));

      _chai.assert.deepEqual(['key'], keys, 'Should return only one key.');
    });

    it('should return the right key with literal template', function () {
      var keys = (0, _extractFromCode2.default)(getCode('template.js'));

      _chai.assert.deepEqual(['key'], keys, 'Should return only one key.');
    });

    it('should return the right key with a function call', function () {
      var keys = (0, _extractFromCode2.default)(getCode('function.js'));

      _chai.assert.deepEqual(['*'], keys, 'Should return one key.');
    });

    it('should return the right key with a member expression', function () {
      var keys = (0, _extractFromCode2.default)(getCode('memberExpression.js'));

      _chai.assert.deepEqual(['*'], keys, 'Should return one key.');
    });

    it('should return the right key with dynamic import in code', function () {
      var keys = (0, _extractFromCode2.default)(getCode('dynamicImport.js'));

      _chai.assert.deepEqual(['key'], keys, 'Should return only one key.');
    });
  });

  describe('dynamic keys', function () {
    var keys = void 0;

    it('should return the right key with a concat', function () {
      keys = (0, _extractFromCode2.default)(getCode('dynamicConcat.js'));
    });

    it('should return the right key with a template', function () {
      keys = (0, _extractFromCode2.default)(getCode('dynamicTemplate.js'));
    });

    afterEach(function () {
      _chai.assert.deepEqual(['key.*', 'key.*.bar', '*.bar', '*'], keys, 'Should return the right key.');
    });
  });

  describe('comment', function () {
    it('should return the keys when added as a comment', function () {
      var keys = (0, _extractFromCode2.default)(getCode('comment.js'));

      _chai.assert.deepEqual(['foo.bar1', 'foo.bar2'], keys, 'Should return the good keys.');
    });
  });
});