import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { clearScore } from '../redux/actions/gameActions';

class FeedBack extends React.Component {
  getScoreInfo = () => {
    const initialRanking = [];
    const { score, name, email, gravatarEndPoint } = this.props;
    const rankingInfo = JSON.parse(localStorage.getItem('ranking')) || initialRanking;
    localStorage.setItem('ranking', JSON.stringify([...rankingInfo, {
      gravatarEndPoint,
      email,
      name,
      score,
    }]));
  }

  clearScore = () => {
    const { clearScoreDispatch } = this.props;
    clearScoreDispatch();
  }

  render() {
    this.getScoreInfo();
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

        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ranking
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  assertions: store.player.assertions,
  score: store.player.score,
  email: store.player.email,
  name: store.player.name,
  gravatarEndPoint: store.player.gravatarEndPoint,
});

const mapDispatchToProps = (dispatch) => ({
  clearScoreDispatch: () => dispatch(clearScore()),
});

FeedBack.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  clearScoreDispatch: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  gravatarEndPoint: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedBack);
