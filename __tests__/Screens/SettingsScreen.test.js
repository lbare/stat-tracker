import React from 'react';
import renderer from 'react-test-renderer';

import SettingsScreen from '../../Screens/SettingsScreen';

describe('<SettingsScreen />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<SettingsScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
