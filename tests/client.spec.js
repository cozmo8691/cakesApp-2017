import client from '../app/API/client';
import { jsonError, jsonOk } from './helpers';

import React from 'react';
import {expect} from 'chai';
import { describe, it } from 'mocha';


describe('.fetch', () => {

  beforeEach(() => {
    sinon.stub(window, 'fetch');
  });

  afterEach(() => {
    window.fetch.restore();
  });

  describe('making a request via the client', () => {
    beforeEach(() => {
      window.fetch.returns(Promise.reject(new Error('Just a stub')));
    });

    it('behaves like any other sinon spy', () =>
      client('/foobar')
        .catch(() => expect(window.fetch.firstCall.args[0]).to.equal('/foobar')));
  });

  describe('stubbing response', () => {

    beforeEach(() => {
      const res = new window.Response('{"hello":"world"}', {
        status: 200,
        headers: {
          'Content-type': 'application/json'
        }
      });

      window.fetch.returns(Promise.resolve(res));
    });

    it('formats response correctly', () =>
      client('/foobar')
        .then((json) => {
          expect(json.hello).to.equal('world');
        }));
  });

  // describe('stubbing response (uses test helpers)', () => {
  //
  //   beforeEach(() => {
  //     window.fetch.returns(jsonOk({
  //       hello: 'world'
  //     }));
  //   });
  //
  //   it('formats response correctly', () =>
  //     client('/foobar')
  //       .then((json) => {
  //         expect(json.hello).to.equal('WORLD');
  //       }));
  // });

  describe('error response (uses test helpers)', () => {

    beforeEach(() => {
      window.fetch.returns(jsonError(401, {
        message: 'authentication required'
      }));
    });

    it('returns correct body', () =>
      client('/error-route')
        .catch(({ status, message }) => {
          expect(status).to.equal(401);
          expect(message).to.equal('authentication required');
        }));
  });
});