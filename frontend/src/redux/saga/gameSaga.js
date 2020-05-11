import { put, call } from "redux-saga/effects";

import { requestStatusCheck } from "utils/httpErrors";
import { setMatch, getMatch, setUserName } from "utils/localStorage";

import Types from "redux/types";
import {
  gamePostNewGameApi,
  gamePostPlayApi,
  gameGetGeneralScoreApi,
} from "services/gameService";

export function* gamePostNewGameSaga(data) {
  try {
    yield put({
      type: Types.notification.NOTIFICATION_CLEAR_MESSAGE,
    });

    yield put({
      type: Types.game.GAME_REQUEST,
    });

    yield call(gameGetGeneralScoreSaga);

    const api = requestStatusCheck(
      yield call(gamePostNewGameApi, { userName: data.userName }),
      "create new game"
    );

    if (!api.data || api.error) {
      yield put({
        type: Types.notification.NOTIFICATION_REQUEST_ERROR,
        message: api.error,
      });

      yield put({
        type: Types.game.GAME_REQUEST_FAILURE,
      });

      return;
    }

    yield put({
      type: Types.game.GAME_POST_NEW_GAME_SUCCESS,
      ...api.data,
    });

    setMatch({ ...api.data });
    setUserName(data.userName);

    return;
  } catch (error) {
    console.error(error);
    yield put({
      type: Types.game.GAME_REQUEST_FAILURE,
    });

    yield put({
      type: Types.notification.NOTIFICATION_REQUEST_ERROR,
      message: error,
    });
  }
}

export function* gamePostPlaySaga(data) {
  try {
    yield put({
      type: Types.notification.NOTIFICATION_CLEAR_MESSAGE,
    });

    yield put({
      type: Types.game.GAME_REQUEST,
    });

    const api = requestStatusCheck(
      yield call(gamePostPlayApi, {
        matchHash: getMatch().matchHash,
        positions: data.positions,
      }),
      "play"
    );

    if (!api.data || api.error) {
      yield put({
        type: Types.notification.NOTIFICATION_REQUEST_ERROR,
        message:
          api.status === 404
            ? "Your match doesn't exist anymore, please restart the game"
            : api.error,
      });

      yield put({
        type: Types.game.GAME_REQUEST_FAILURE,
      });

      return;
    }

    yield put({
      type: Types.game.GAME_POST_PLAY_SUCCESS,
      ...api.data,
    });

    setMatch({ ...api.data });

    return;
  } catch (error) {
    console.error(error);
    yield put({
      type: Types.game.GAME_REQUEST_FAILURE,
    });

    yield put({
      type: Types.notification.NOTIFICATION_REQUEST_ERROR,
      message: error,
    });
  }
}

export function* gameGetGeneralScoreSaga() {
  try {
    yield put({
      type: Types.notification.NOTIFICATION_CLEAR_MESSAGE,
    });

    yield put({
      type: Types.game.GAME_REQUEST,
    });

    const api = requestStatusCheck(yield call(gameGetGeneralScoreApi), "score");

    if (!api.data || api.error) {
      yield put({
        type: Types.game.GAME_REQUEST_FAILURE,
      });

      return;
    }

    yield put({
      type: Types.game.GAME_GET_GENERAL_SUCCESS,
      scores: api.data,
    });

    return;
  } catch (error) {
    console.error(error);
    yield put({
      type: Types.game.GAME_REQUEST_FAILURE,
    });

    yield put({
      type: Types.notification.NOTIFICATION_REQUEST_ERROR,
      message: error,
    });
  }
}
