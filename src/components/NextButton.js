import React from 'react';
import PropTypes from 'prop-types';

class NextButton extends React.Component {
  render() {
    const { changeIndex } = this.props;
    return (
      <button
        type="button"
        className="game-next-button"
        onClick={ changeIndex }
        data-testId="btn-next"
      >
        Next
      </button>
    );
  }
}

NextButton.propTypes = {
  changeIndex: PropTypes.func.isRequired,
};

export default NextButton;
