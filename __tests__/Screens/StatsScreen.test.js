import React from 'react';
import renderer from 'react-test-renderer';

import StatsScreen from '../../Screens/StatsScreen';

describe('<StatsScreen />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<StatsScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
