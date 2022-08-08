import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class NextButton extends React.Component {
  render() {
    const { changeIndex, indexQuestion } = this.props;
    const lastQuestionIndex = 4;
    return (indexQuestion === lastQuestionIndex) ? (
      <Link to="/feedback">
        <button
          type="button"
          className="game-next-button"
          onClick={ changeIndex }
          data-testid="btn-next"
        >
          Próxima
        </button>
      </Link>
    ) : (
      <button
        type="button"
        className="game-next-button"
        onClick={ changeIndex }
        data-testid="btn-next"
      >
        Next
      </button>
    );
  }
}

NextButton.propTypes = {
  changeIndex: PropTypes.func.isRequired,
  indexQuestion: PropTypes.number.isRequired,
};

export default NextButton;
