import assert from 'node:assert/strict';
import test from 'node:test';
import {relativeDay,km} from '../web/model.mjs';
test('labels compare dates without inventing same-day ordering',()=>{
  assert.deepEqual(relativeDay('2020-11-14','2020-11-13T17:21'),{kind:'After',days:1});
  assert.equal(relativeDay('2020-08-16','2020-08-16T04:09').kind,'Same day');
  assert.equal(km(1),149597870.7);
});
