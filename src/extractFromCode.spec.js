import {assert} from 'chai';
import fs from 'fs';
import path from 'path';
import extractFromCode from './extractFromCode.js';

function getCode(name) {
  return fs.readFileSync(path.join(__dirname, `extractFromCodeFixtures/${name}`), 'utf8');
}

describe('#extractFromCode()', () => {
  it('should return the right keys with ES5 code', () => {
    const keys = extractFromCode(getCode('es5.js'));

    assert.deepEqual([
      'follow',
      'followed',
      'unfollowed',
      'unfollow',
      'following',
    ], keys, 'Should work with ES5 code.');
  });

  it('should return the right keys with ES6 code', () => {
    const keys = extractFromCode(getCode('es6.js'));

    assert.deepEqual([
      'reset',
      'revert',
      'sweep',
      'commit',
    ], keys, 'Should work with ES6 code.');
  });

  it('should return the right keys with a custom marker', () => {
    const keys = extractFromCode(getCode('marker.js'), {
      marker: '__',
    });

    assert.deepEqual([
      'this_is_a_custom_marker',
    ], keys, 'Should take into account the marker option.');
  });

  it('should return the right keys with multiple arguments', () => {
    const keys = extractFromCode(getCode('many-args.js'));

    assert.deepEqual([
      'hello_username',
    ], keys, 'The second argument shoudn\'t have any impact.');
  });

  it('should deduplicate the keys', () => {
    const keys = extractFromCode(getCode('duplicated.js'));

    assert.deepEqual([
      'key',
    ], keys, 'Should return only one element.');
  });
});