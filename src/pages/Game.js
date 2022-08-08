import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { receiveScore, requestQuestions } from '../redux/actions/gameActions';
import Questions from '../components/Questions';
import Timer from '../components/Timer';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      timer: 30,
      disabled: false,
      showBorder: false,
    };
  }

  componentDidMount() {
    // console.log('oi');
    this.counterTimer();
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
        timer: (prevState.timer > 0)
          ? prevState.timer - 1
          : 0,
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
      console.log('resposta-correta');
      this.correctAnswer(name);
    }
  }

  changeShowBorderPerTime = () => {
    this.setState({
      showBorder: true,
    });
  }

  render() {
    // console.log('render');
    const { responseCode, questions } = this.props;
    const { timer, disabled, showBorder } = this.state;

    if (questions === undefined) return '';
    const invalidTokenCode = 3;
    const questionsComponent = (
      <Questions
        showBorder={ showBorder }
        changeShowBorder={ this.changeShowBorder }
        questions={ questions }
        disabled={ disabled }
      />
    );
    return (
      <div className="Game">
        {
          // cria o componente timer e desmonta quando o tempo acabar
          (timer > 0)
            ? <Timer changeShowBorder={ this.changeShowBorderPerTime } timer={ timer } />
            : ''
        }
        { responseCode === invalidTokenCode ? <Redirect exact path="/" /> : '' }
        { questionsComponent }
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
