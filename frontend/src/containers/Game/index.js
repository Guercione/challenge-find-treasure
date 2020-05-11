import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { gameGetGeneralScoreSaga } from "redux/actions/gameAction";

import Start from "./start";
import Board from "containers/Board";
import GameScore from "./gameScore";
import GeneralScore from "containers/GeneralScore";
import If from "components/If";
import Loading from "components/Loading";

import "./style.css";

const Game = ({
  userName,
  board,
  matchHash,
  done,
  loading,
  error,
  gameGetGeneralScoreSaga,
}) => {
  const renderContent = () => {
    if (done) return <GameScore />;

    if (userName && matchHash && board.length) {
      return <Board />;
    }

    return <Start />;
  };

  React.useEffect(() => {
    gameGetGeneralScoreSaga();
  }, [done]);

  return (
    <React.Fragment>
      <div className="game-content">
        <div>{renderContent()}</div>
        <div>
          <If condition={userName}>
            <div>Username: {userName}</div>
          </If>

          <h3>Legends:</h3>
          <p>T - Treasure</p>
          <p>3 - Closest proximity</p>
          <p>2 - Diagonal proximity, second to '3'</p>
          <p>1 - Second to '2'</p>

          <If condition={loading}>
            <Loading />
          </If>

          <If condition={error.active}>
            <div>
              {error.type}: {error.message}
            </div>
          </If>
        </div>
        <GeneralScore />
      </div>
    </React.Fragment>
  );
};

Game.propTypes = {
  done: PropTypes.bool,
  userName: PropTypes.string,
  matchHash: PropTypes.number,
  error: PropTypes.shape({
    type: PropTypes.string,
    active: PropTypes.bool,
    message: PropTypes.string,
  }),
  board: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  gameGetGeneralScoreSaga: PropTypes.func.isRequired,
};

Game.defaultProps = {
  done: false,
  userName: "",
  matchHash: 0,
  error: {
    type: "",
    active: false,
    message: "",
  },
};

export default connect(
  ({ game, notification }) => ({
    loading: game.loading,
    userName: game.userName,
    board: game.userBoard,
    matchHash: game.matchHash,
    done: game.done,
    error: notification,
  }),
  { gameGetGeneralScoreSaga }
)(Game);
