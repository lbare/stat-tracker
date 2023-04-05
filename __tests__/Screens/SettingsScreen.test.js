import React from "react";
import renderer from "react-test-renderer";
import SettingsScreen from "../../Screens/SettingsScreen";
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

describe("<SettingsScreen />", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <UserContext.Provider value={mockUserContext}>
          <SettingsScreen />
        </UserContext.Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
