import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { gamePostNewGameSaga } from "redux/actions/gameAction";

import "./style.css";
import If from "components/If";

const Start = ({ gamePostNewGameSaga }) => {
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState("");

  function handlePlay() {
    if (name && name.length >= 4 && RegExp(/^[a-zA-Z0-9]*$/).test(name)) {
      gamePostNewGameSaga(name);
      setError("");
      return;
    }

    setError(
      "Name must contain at minimum 4 characters, letters and numbers only"
    );
  }

  return (
    <div className="game-start">
      <label>Insert your username:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handlePlay}>Play</button>
      <If condition={error}>
        <span>{error}</span>
      </If>
    </div>
  );
};

Start.propTypes = {
  gamePostNewGameSaga: PropTypes.func.isRequired,
};

Start.defaultProps = {};

export default connect(null, { gamePostNewGameSaga })(Start);
