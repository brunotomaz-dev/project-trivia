import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Questions from '../components/Questions';
import Timer from '../components/Timer';
import { receiveScore, requestQuestions } from '../redux/actions/gameActions';
import Header from '../components/Header';
import NextButton from '../components/NextButton';
import '../CSS/game.css';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      timer: 30,
      disabled: false,
      showBorder: false,
      index: 0,
    };
  }

  componentDidMount() {
    // console.log('oi');
    this.counterTimer();
    this.receiveAPI();
  }

  receiveAPI = () => {
    const { requestQuestionsDispatch } = this.props;
    const token = localStorage.getItem('token');
    const URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
    // console.log(token);
    requestQuestionsDispatch(URL);
  }

  counterTimer = () => {
    const oneSecond = 1000;
    setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    }, oneSecond);
  }

  correctAnswer = (difficulty) => {
    const { timer } = this.state;
    const { receiveNewScore } = this.props;
    const ten = 10;
    const points = ten + (timer * Math.floor(difficulty));
    receiveNewScore(points);
  }

  changeShowBorder = ({ target }) => {
    this.setState({
      showBorder: true,
    });
    const { name, id } = target;
    if (id === 'correct-answer') {
      // console.log('resposta-correta');
      this.correctAnswer(name);
    }
  }

  changeShowBorderPerTime = () => {
    this.setState({
      showBorder: true,
    });
  }

  changeIndex = () => {
    const maxIndex = 4;
    this.setState((prevState) => ({
      showBorder: false,
      timer: 30,
      index: (prevState.index < maxIndex) ? prevState.index + 1 : 0,
    }));
  }

  render() {
    // console.log('render');
    const { responseCode, questions } = this.props;
    const { timer, disabled, showBorder, index } = this.state;

    // console.log('reponseCode', responseCode);
    // console.log('questions', questions);

    if (questions === undefined) return '';
    const invalidTokenCode = 3;
    const questionsComponent = (
      <Questions
        indexQuestion={ index }
        showBorder={ showBorder }
        changeShowBorder={ this.changeShowBorder }
        questions={ questions }
        disabled={ disabled }
      />
    );
    return (
      <div className="Game">
        <Header />
        {
          // cria o componente timer e desmonta quando o tempo acabar
          (timer > 0 && showBorder === false)
            ? <Timer changeShowBorder={ this.changeShowBorderPerTime } timer={ timer } />
            : ''
        }
        { responseCode === invalidTokenCode ? <Redirect to="/" /> : '' }
        { questionsComponent }
        {
          (showBorder)
            ? <NextButton changeIndex={ this.changeIndex } indexQuestion={ index } />
            : ''
        }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  requestQuestionsDispatch: (URL) => dispatch(requestQuestions(URL)),
  receiveNewScore: (score) => dispatch(receiveScore(score)),
});

const mapStateToProps = (store) => ({
  responseCode: store.gameReducer.responseCode,
  questions: store.gameReducer.questions,
});

Game.propTypes = {
  requestQuestionsDispatch: PropTypes.func.isRequired,
  receiveNewScore: PropTypes.func.isRequired,
  responseCode: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
