import React from 'react';
import { shallow } from 'enzyme';

// Components
import App from './App';

function setup() {
    const wrapper = shallow(<App />);
    return { wrapper, props };
}

describe('WelcomeMessage Test Suite', () => {
    it('Should show', () => {
        const { wrapper } = setup();
        wrapper.
        expect(wrapper.find('<div className="alert alert-danger error" role="alert">').exists()).toBe(true);
    });
});