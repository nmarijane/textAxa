import React from 'react';
import { shallow } from 'enzyme';
import StatsTable from './table';

describe('StatsTable', () => {
    it('should render correctly in "debug" mode', () => {
        const component = shallow(<StatsTable debug />);

        expect(component).toMatchSnapshot();
    });
});