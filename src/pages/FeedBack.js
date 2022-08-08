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
    const { assertions } = this.props;
    return (
      <div>
        <Header />
        <Link to="/game">
          <button
            type="button"
            onClick={ this.clearScore }
          >
            Jogar Novamente
          </button>
        </Link>
        <h3 data-testid="feedback-text">
          { (assertions < three) ? 'Could be better...' : 'Well Done!' }
        </h3>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  assertions: store.player.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  clearScoreDispatch: () => dispatch(clearScore()),
});

FeedBack.propTypes = {
  assertions: PropTypes.number.isRequired,
  clearScoreDispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedBack);
