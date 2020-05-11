import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { gamePostRestartSaga } from "redux/actions/gameAction";

import "./style.css";

const PersonalScore = ({ turns, gamePostRestartSaga }) => {
  return (
    <div className="game-personal-score">
      <span>Your score: {turns}</span>
      <button onClick={gamePostRestartSaga}>Play again</button>
    </div>
  );
};

PersonalScore.propTypes = {
  turns: PropTypes.number,
  gamePostRestartSaga: PropTypes.func.isRequired,
};

PersonalScore.defaultProps = {
  turns: 0,
};

export default connect(
  ({ game }) => ({
    turns: game.turns,
  }),
  { gamePostRestartSaga }
)(PersonalScore);
