import React from 'react';
import PropTypes from 'prop-types';

class Timer extends React.Component {
  componentWillUnmount() {
    const { changeShowBorder } = this.props;
    changeShowBorder();
  }

  render() {
    const { timer } = this.props;
    return (
      <h3 className="game-timer heartbeat">
        { timer }
      </h3>
    );
  }
}

Timer.propTypes = {
  timer: PropTypes.number.isRequired,
  changeShowBorder: PropTypes.func.isRequired,
};

export default Timer;
