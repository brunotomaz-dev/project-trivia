import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { clearScore } from '../redux/actions/gameActions';
import '../CSS/feedback.css';

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
      <div className="feedback-container">
        <div className="feedback-header">
          <Header />
        </div>

        <div className="feedback-body">
          <h3 data-testid="feedback-text" className="feedback-message">
            { (assertions < three) ? 'Could be better...' : 'Well Done!' }
          </h3>
          <div className="feedback-result">
            <div className="score-container">
              <h3>Score:</h3>
              &nbsp;
              <h3
                data-testid="feedback-total-score"
                className="feedback-score"
              >
                { score }
              </h3>
            </div>
            <div className="assertions-container">
              <h3>Assertions:</h3>
              &nbsp;
              <h3 data-testid="feedback-total-question" className="total">
                { assertions}
              </h3>
            </div>
          </div>
          <div className="buttons">
            <Link to="/">
              <button
                type="button"
                onClick={ this.clearScore }
                data-testid="btn-play-again"
                className="btn"
              >
                Play Again
              </button>
            </Link>
            <Link to="/ranking">
              <button
                type="button"
                data-testid="btn-ranking"
                className="btn"
              >
                Ranking
              </button>
            </Link>
          </div>
        </div>
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
