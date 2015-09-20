var path = require('path');

require('babel/register');

GLOBAL.assert = require('./assert');
GLOBAL.should = require('should');
GLOBAL.request = require('supertest');
GLOBAL.PYWWS_ROOT = path.resolve('test/fixtures/pywwsdata');

process.env.NODE_ENV   = 'test';
process.env.PYWWS_ROOT = GLOBAL.PYWWS_ROOT;

