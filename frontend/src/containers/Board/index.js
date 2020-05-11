import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import {
  gamePostPlaySaga,
  gamePostRestartSaga,
} from "redux/actions/gameAction";

import "./style.css";

const Board = ({ board, turns, gamePostPlaySaga, gamePostRestartSaga }) => {
  const [selected, setSelected] = React.useState([]);

  const handleClass = (value, x, y) => {
    const clicked = selected.find((item) => item.x === x && item.y === y);
    const obj = {
      0: "board-empty",
      1: "board-one",
      2: "board-two",
      3: "board-three",
    };

    return clicked ? "board-active" : obj[value] || "board-treasure";
  };

  function handleSquareClick(x, y) {
    if (selected.length === 2 || turns >= 8) {
      gamePostPlaySaga([...selected, { x, y }]);
      setSelected([]);
      return;
    }

    setSelected([...selected, { x, y }]);
  }

  function handleRestart() {
    gamePostRestartSaga();
    setSelected([]);
  }

  return (
    <div className="board-board">
      {board.map((x, xIndex) => {
        return x.map((y, yIndex) => (
          <div
            key={`${xIndex}-${yIndex}`}
            className={`board-square ${handleClass(y, xIndex, yIndex)}`}
            onClick={() => handleSquareClick(xIndex, yIndex)}
          />
        ));
      })}
      <button onClick={handleRestart}>Restart Match</button>
    </div>
  );
};

Board.propTypes = {
  turns: PropTypes.number,
  board: PropTypes.array.isRequired,
  gamePostPlaySaga: PropTypes.func.isRequired,
  gamePostRestartSaga: PropTypes.func.isRequired,
};

Board.defaultProps = {
  turns: 0,
};

export default connect(
  ({ game }) => ({
    board: game.userBoard,
    turns: game.turns,
  }),
  { gamePostPlaySaga, gamePostRestartSaga }
)(Board);
