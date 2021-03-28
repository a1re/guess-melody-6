import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {resetGame} from '../../store/action';

const WinScreen = (props) => {
  const {questionsCount, mistakesCount, onReplayButtonClick, onResetGame} = props;
  const correctlyQuestionsCount = questionsCount - mistakesCount;

  return (
    <section className="result">
      <div className="result__logo">
        <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" />
      </div>
      <h2 className="result__title">Вы настоящий меломан!</h2>
      <p className="result__total">Вы ответили правильно на {correctlyQuestionsCount} вопросов и совершили {mistakesCount} ошибки</p>
      <button
        onClick={() => {
          onResetGame();
          onReplayButtonClick();
        }}
        className="replay"
        type="button"
      >
        Сыграть ещё раз
      </button>
    </section>
  );
};

WinScreen.propTypes = {
  questionsCount: PropTypes.number.isRequired,
  mistakesCount: PropTypes.number.isRequired,
  onReplayButtonClick: PropTypes.func.isRequired,
  onResetGame: PropTypes.func.isRequired
};

const mapStateToProps = ({GAME}) => ({
  questionsCount: GAME.step,
  mistakesCount: GAME.mistakes
});

const mapDispatchToProps = (dispatch) => ({
  onResetGame() {
    dispatch(resetGame());
  }
});


export {WinScreen};
export default connect(mapStateToProps, mapDispatchToProps)(WinScreen);
