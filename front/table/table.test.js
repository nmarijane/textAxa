import React from 'react';
import {shallow} from 'enzyme';
import StatsTable from "./table";

// Components

function setup() {
    const props = [{
            date: new Date('2019-05-06'),
            id: 0,
            value: 10
        },
            {
                date: new Date('2019-05-06'),
                id: 1,
                value: 20
            }];
    return shallow(<StatsTable items={props}/>);
}

describe('Table test', () => {
    it('should display the table with the good length', () => {
        const wrapper = setup();
        expect(wrapper.find('table').exists()).toBe(true);
        expect(wrapper.find('table').html()).toContain(
            '<tr><td>06/05/2019</td><td><input type="number" value="20" class="transparentInput" disabled=""/></td></tr>');
    });
    /*it('cancels changes when user presses esc', done => {
        const wrapper = setup();
        const input = wrapper.find('input').at(0);
        input.simulate('click');
        input.simulate('focus');
        input.simulate('change', { target: { value: 99 } });
        input.simulate('onBlur');
        expect(input.props().value).toBe(99);
        done();
    });*/
});