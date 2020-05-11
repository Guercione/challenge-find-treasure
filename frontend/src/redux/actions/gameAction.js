import Type from "redux/types/gameType";
import { getUserName } from "utils/localStorage";

export const gamePostNewGameSaga = (userName) => ({
  type: Type.GAME_POST_NEW_GAME_SAGA,
  userName,
});

export const gamePostPlaySaga = (positions) => ({
  type: Type.GAME_POST_PLAY_SAGA,
  positions,
});

export const gamePostRestartSaga = () => ({
  type: Type.GAME_POST_NEW_GAME_SAGA,
  userName: getUserName(),
});

export const gameGetGeneralScoreSaga = () => ({
  type: Type.GAME_GET_GENERAL_SAGA,
});

export const gameClearBoard = () => ({
  type: Type.GAME_CLEAR_BOARD,
});
