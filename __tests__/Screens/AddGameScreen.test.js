import React from "react";
import renderer from "react-test-renderer";
import AddGameScreen from "../../Screens/AddGameScreen";

jest.mock("react-native-step-indicator");

describe("<AddGameScreen />", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<AddGameScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
