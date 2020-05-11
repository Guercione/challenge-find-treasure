import { takeLatest, all } from "redux-saga/effects";

import Types from "redux/types";

import {
  gamePostPlaySaga,
  gamePostNewGameSaga,
  gameGetGeneralScoreSaga,
} from "redux/saga/gameSaga";
export default function* rootSaga() {
  yield all([
    takeLatest(Types.game.GAME_POST_PLAY_SAGA, gamePostPlaySaga),
    takeLatest(Types.game.GAME_POST_NEW_GAME_SAGA, gamePostNewGameSaga),
    takeLatest(Types.game.GAME_GET_GENERAL_SAGA, gameGetGeneralScoreSaga),
  ]);
}
