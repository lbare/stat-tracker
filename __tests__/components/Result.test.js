import React from "react";
import renderer from "react-test-renderer";

import Result from "../../components/Result";

describe("<Result />", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<Result value="" setValue={() => {}} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
