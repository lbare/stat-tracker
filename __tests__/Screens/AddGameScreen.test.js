import React from "react";
import renderer from "react-test-renderer";
import AddGameScreen from "../../Screens/AddGameScreen";
import { UserContext } from "../../services/UserContext";

const mockUserContext = {
  user: [],
  setUser: jest.fn(),
  userSeasons: [],
  setUserSeasons: jest.fn(),
  userGames: [],
  setUserGames: jest.fn(),
  userAtBats: 0,
  setUserAtBats: jest.fn(),
};

jest.mock("react-native-step-indicator");

describe("<AddGameScreen />", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <UserContext.Provider value={mockUserContext}>
          <AddGameScreen />
        </UserContext.Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
