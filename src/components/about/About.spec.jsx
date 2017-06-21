// Passing arrow functions (lambdas) to Mocha is discouraged
// https://mochajs.org/#arrow-functions
// eslint prefer-arrow-callback: 0, func-names: 0, 'react/jsx-boolean-value': ['error', 'always']
// global describe, it, beforeEach, before

import React from 'react';
import assert from 'assert';
import { shallow } from 'enzyme';
import About from './About';

describe('About', () => {

  it('should render without crashing', function() {
    shallow(<About />);
  });

  it('should have a div as container', function() {
    const wrapper = shallow(<About />);
    assert.strictEqual(wrapper.type(), 'div');
  });

});
