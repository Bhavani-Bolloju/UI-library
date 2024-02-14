'use strict';

const integration = require('..');
const assert = require('assert').strict;

assert.strictEqual(integration(), 'Hello from integration');
console.info('integration tests passed');
