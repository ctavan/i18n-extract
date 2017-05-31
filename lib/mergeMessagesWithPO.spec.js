'use strict';

var _chai = require('chai');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _gettextParser = require('gettext-parser');

var _gettextParser2 = _interopRequireDefault(_gettextParser);

var _extractFromFiles = require('./extractFromFiles.js');

var _extractFromFiles2 = _interopRequireDefault(_extractFromFiles);

var _mergeMessagesWithPO = require('./mergeMessagesWithPO.js');

var _mergeMessagesWithPO2 = _interopRequireDefault(_mergeMessagesWithPO);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-env mocha */

describe('#mergeMessagesWithPO()', function () {
  var output = 'messages2.po';
  var messages = void 0;

  beforeEach(function () {
    messages = (0, _extractFromFiles2.default)('src/mergeMessagesWithPOFixtures/input.js');
  });

  afterEach(function () {
    _fs2.default.unlinkSync(output);
  });

  it('should not crash when the path is absolute', function () {
    (0, _mergeMessagesWithPO2.default)(messages, _path2.default.join(__dirname, 'mergeMessagesWithPOFixtures/messages.po'), output);
  });

  it('should output a new po file with merged messages when we give a po file outdated message', function () {
    (0, _mergeMessagesWithPO2.default)(messages, 'mergeMessagesWithPOFixtures/messages.po', output);

    var poContent = _fs2.default.readFileSync(output);
    var po = _gettextParser2.default.po.parse(poContent);

    _chai.assert.deepEqual(po, {
      charset: 'utf-8',
      headers: {
        'content-transfer-encoding': '8bit',
        'content-type': 'text/plain; charset=utf-8',
        language: 'fr'
      },
      translations: {
        '': {
          '': {
            msgid: '',
            msgstr: ['Language: fr\nContent-Type: text/plain; charset=utf-8\nContent-Transfer-Encoding: 8bit\n']
          },
          follow: {
            msgid: 'follow',
            msgstr: ['Suivre']
          },
          followed: {
            msgid: 'followed',
            msgstr: ['Suivi !']
          },
          following: {
            msgid: 'following',
            msgstr: ['']
          },
          unfollow: {
            msgid: 'unfollow',
            msgstr: ['']
          },
          unfollowed: {
            msgid: 'unfollowed',
            msgstr: ['']
          }
        }
      }
    });
  });
});