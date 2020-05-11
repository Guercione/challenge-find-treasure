import Type from "redux/types/gameType";

import { getMatch, getUserName } from "utils/localStorage";

export const initialState = {
  loading: false,
  done: getMatch().done,
  userName: getUserName(),
  matchHash: getMatch().matchHash,
  turns: getMatch().turns || 0,
  userBoard: getMatch().userBoard || [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ],
  scores: [],
};

export const game = (state = initialState, action) => {
  switch (action.type) {
    case Type.GAME_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case Type.GAME_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
      };

    case Type.GAME_CLEAR_BOARD:
      return {
        ...state,
        loading: false,
        matchHash: undefined,
        userBoard: [
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
        ],
      };

    case Type.GAME_POST_NEW_GAME_SUCCESS:
      return {
        ...state,
        loading: false,
        matchHash: action.matchHash,
        userName: action.userName,
        turns: action.turns,
        done: action.done,
        userBoard: action.userBoard,
      };

    case Type.GAME_POST_PLAY_SUCCESS:
      return {
        ...state,
        loading: false,
        turns: action.turns,
        done: action.done,
        userBoard: action.userBoard,
      };

    case Type.GAME_GET_GENERAL_SUCCESS:
      return {
        ...state,
        loading: false,
        scores: action.scores,
      };

    default: {
      return {
        ...state,
      };
    }
  }
};

export default game;
