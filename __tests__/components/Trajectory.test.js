import React from 'react';
import renderer from 'react-test-renderer';

import Trajectory from '../../components/Trajectory';

describe('<Trajectory />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Trajectory />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
