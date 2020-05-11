import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { gamePostPlaySaga } from "redux/actions/gameAction";

import "./style.css";
import If from "components/If";

const GeneralScore = ({ scores }) => {
  return (
    <div className="generalscore-general-score">
      <h4>TOP 10 Best Players</h4>
      <If condition={!scores.length}>
        <div>No score found</div>
      </If>
      <If condition={scores.length}>
        <ul>
          {scores.map((player, index) => (
            <li key={`${player.userName}-${index}`}>
              Player name: {player.userName} - {player.turns}
            </li>
          ))}
        </ul>
      </If>
    </div>
  );
};

GeneralScore.propTypes = {
  scores: PropTypes.array,
  gamePostPlaySaga: PropTypes.func.isRequired,
};

GeneralScore.defaultProps = {
  scores: [],
};

export default connect(
  ({ game }) => ({
    scores: game.scores,
  }),
  { gamePostPlaySaga }
)(GeneralScore);
