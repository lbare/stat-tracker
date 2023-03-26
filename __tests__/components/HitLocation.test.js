import React from "react";
import renderer from "react-test-renderer";

import HitLocation from "../../components/HitLocation";

describe("<HitLocation />", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <HitLocation hitLocation={{ x: 0, y: 0 }} setHitLocation={() => {}} />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
