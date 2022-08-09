import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { clearScore } from '../redux/actions/gameActions';
import { connect } from 'react-redux';

class FeedBack extends React.Component {
  clearScore = () => {
    const { clearScoreDispatch } = this.props;
    clearScoreDispatch();
  }

  render() {
    const three = 3;
    const { assertions, score } = this.props;
    return (
      <div>
        <Header />
        <Link to="/">
          <button
            type="button"
            onClick={ this.clearScore }
            data-testid="btn-play-again"
          >
            Play Again
          </button>
        </Link>
        <h3 data-testid="feedback-text">
          { (assertions < three) ? 'Could be better...' : 'Well Done!' }
        </h3>
        <div className="feedback-result">
          <h3 data-testid="feedback-total-score">{ score }</h3>
          <h3 data-testid="feedback-total-question">{ assertions}</h3>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  assertions: store.player.assertions,
  score: store.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  clearScoreDispatch: () => dispatch(clearScore()),
});

FeedBack.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  clearScoreDispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedBack);
