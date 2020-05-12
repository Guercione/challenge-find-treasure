import React from "react";
import renderer from "react-test-renderer";

import { renderWithReduxAllReducers } from "utils/unitTest";

import Game from "containers/Game";

describe("CONTAINER - Game", () => {
  it("Game - Test of board render correctly", () => {
    const tree = renderer
      .create(renderWithReduxAllReducers(<Game />).container.innerHTML)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
