import React from "react";
import renderer from "react-test-renderer";
import LogAtBatScreen from "../../Screens/LogAtBatScreen";

jest.mock("react-native-step-indicator");

describe("<LogAtBatScreen />", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<LogAtBatScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
