import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { requestQuestions } from '../redux/actions/gameActions';
import Questions from '../components/Questions';

class Game extends React.Component {
  componentDidMount() {
    console.log('oi');
    const { requestQuestionsDispatch } = this.props;
    const token = localStorage.getItem('token');
    const URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
    console.log(token);
    requestQuestionsDispatch(URL);
  }

  render() {
    console.log('tchau');
    const { responseCode, questions } = this.props;
    if (questions === undefined) return '';
    const invalidTokenCode = 3;
    const questionsComponent = (<Questions questions={ questions } />);
    return (
      <div>
        { responseCode === invalidTokenCode ? <Redirect exact path="/" /> : '' }
        { questionsComponent }
        Game Page
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  requestQuestionsDispatch: (URL) => dispatch(requestQuestions(URL)),
});

const mapStateToProps = (store) => ({
  responseCode: store.gameReducer.responseCode,
  questions: store.gameReducer.questions,
});

Game.propTypes = {
  requestQuestionsDispatch: PropTypes.func.isRequired,
  responseCode: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
