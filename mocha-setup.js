// Uncomment lines if you want to use chai or chai and dirty-chai for BDD style tests.
import React from 'react';
// import chai from 'chai';
// import dirtyChai from 'dirty-chai';
import { JSDOM } from 'jsdom';


// chai.use(dirtyChai);
global.React = React;
// global.expect = chai.expect;

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .map(prop => Object.getOwnPropertyDescriptor(src, prop));
  Object.defineProperties(target, props);
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js'
};
copyProps(window, global);
