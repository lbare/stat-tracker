import React from "react";
import renderer from "react-test-renderer";
import LogGameScreen from "../../Screens/LogGameScreen";

jest.mock("react-native-step-indicator");

describe("<LogGameScreen />", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<LogGameScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
