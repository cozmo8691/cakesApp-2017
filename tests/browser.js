const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

import fetch from 'isomorphic-fetch';

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .map(prop => Object.getOwnPropertyDescriptor(src, prop));
  Object.defineProperties(target, props);
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};

//global.XMLHttpRequest = global.window.XMLHttpRequest;
global.sinon = require('sinon');
//global.sinon.useFakeXMLHttpRequest();
//global.window.XMLHttpRequest = global.XMLHttpRequest;


window.fetch = fetch;
global.fetch = window.fetch;
window.Response = global.Response;
global.Response = window.Response;


copyProps(window, global);

