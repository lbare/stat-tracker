import React from "react";
import renderer from "react-test-renderer";
import StatsScreen from "../../Screens/StatsScreen";
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

describe("<StatsScreen />", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <UserContext.Provider value={mockUserContext}>
          <StatsScreen />
        </UserContext.Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
