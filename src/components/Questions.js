import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../CSS/questions.css';

class Questions extends React.Component {
  render() {
    const difficultyPoints = {
      easy: 1,
      medium: 2,
      hard: 3,
    };
    const { questions, responseCode } = this.props;
    const { showBorder, changeShowBorder } = this.props;

    const invalidCode = 3;
    if (questions === undefined || responseCode === invalidCode) return '';
    const currentQuestion = questions[0];
    const {
      category,
      question,
    } = currentQuestion;
    const correctAnswer = currentQuestion.correct_answer;
    const incorrectAnswers = currentQuestion.incorrect_answers;
    const { difficulty } = currentQuestion;

    const correctAnswerElement = (
      <button
        type="button"
        data-testid="correct-answer"
        id="correct-answer"
        name={ difficultyPoints[difficulty] }
        onClick={ changeShowBorder }
        className={ showBorder ? 'correct' : '' }
        disabled={ showBorder }
      >
        { correctAnswer }
      </button>
    );
    const incorrectAnswersElement = incorrectAnswers
      .map((answer, index) => (
        <button
          key={ index }
          type="button"
          data-testid={ `wrong-answer-${index}` }
          id={ `wrong-answer-${index}` }
          name={ difficultyPoints[difficulty] }
          onClick={ changeShowBorder }
          className={ showBorder ? 'wrong' : '' }
          disabled={ showBorder }
        >
          { answer }
        </button>
      ));
    const categoryElement = (<h3 data-testid="question-category">{ category }</h3>);
    const textElement = (<h3 data-testid="question-text">{ question }</h3>);

    const randomNumber = 0.5;
    const answers = [...incorrectAnswersElement, correctAnswerElement];
    const answerRandom = answers.sort(() => Math.random() - randomNumber); // algoritimo conhecido que randomiza array
    const answerRandomElement = answerRandom.map((answer, index) => (
      <div
        key={ index }
        data-testid="answer-options"
      >
        { answer }
      </div>
    ));

    return (
      <div>
        Questions Page
        { categoryElement }
        { textElement }
        { answerRandomElement }
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  responseCode: store.gameReducer.responseCode,
});

Questions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  responseCode: PropTypes.number.isRequired,
  showBorder: PropTypes.bool.isRequired,
  changeShowBorder: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, null)(Questions);
