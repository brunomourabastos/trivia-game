import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { actionFetchTrivia, saveScore, updateHits } from '../Actions/Actions';
import { fetchTrivia } from '../Services/fetchApi';
import './index.css';

let numberOfHits = 0;

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      triviaData: [],
      options: [],
      position: 0,
      checked: false,
      isDisabled: false,
      seconds: 30,
    };
  }

  componentDidMount = async () => {
    const { token } = this.props;
    const { results } = await fetchTrivia(token);
    this.setState({
      triviaData: results,
    });
    this.shuffleAnswers();
    this.myTimer();
  }

  // timer de 30 segundos
  // https://www.visualdicas.com.br/programacao/js/53-como-usar-temporizaores-em-javascript
  myTimer = () => {
    const att = 1000;
    const tempo = setInterval(this.decreaseSecond, att);
    this.setState({ tempo }); // Criei esse 'tempo' somente para passar para o clearInterval
  }

  decreaseSecond = () => {
    this.setState((prev) => ({ seconds: prev.seconds - 1 }), () => {
      const { seconds, tempo } = this.state;
      if (seconds === 0) {
        this.setState({ checked: true, isDisabled: true });
        clearInterval(tempo);
      }
    });
  };

  // Será chamada / implementada depois;
  incrementPosition = (e) => {
    e.preventDefault();
    const { position } = this.state;
    const { history } = this.props;

    const maxPosition = 4;
    if (position === maxPosition) {
      history.push('/feedback');
    }
    this.setState({
      position: (position + 1),
      checked: false,
      seconds: 30,
      isDisabled: false,
    }, () => this.shuffleAnswers());
    this.myTimer();
  }

  checkAnswer = (elem) => {
    elem.preventDefault();
    const { tempo, seconds } = this.state;
    this.setState({ checked: true, isDisabled: true });
    const { saveScoreTotal, hitsProps } = this.props;
    let score = 0;
    const numberTen = 10;
    const numberthree = 3;

    if (elem.target.name === 'correct') {
      numberOfHits += 1;
      if (elem.target.id === 'medium') {
        score = numberTen + (seconds * 2);
        saveScoreTotal(score);
      } if (elem.target.id === 'hard') {
        score = numberTen + (seconds * numberthree);
        saveScoreTotal(score);
      } else {
        score = (numberTen + seconds);
        saveScoreTotal(score);
      }
    }
    hitsProps(numberOfHits);
    clearInterval(tempo);
  }

  shuffleAnswers = () => {
    const randomRate = 0.5;
    const { triviaData, position } = this.state;
    this.setState({
      options: ([triviaData[position]
        .correct_answer, ...triviaData[position].incorrect_answers])
        .sort(() => Math.random() - randomRate),
    });
  }

  showQuestions = () => {
    const { triviaData, position, checked, isDisabled, options } = this.state;
    return (
      <div data-testid="answer-options" className="alternative-btns">
        {
          options.map((element, index) => {
            if (element === triviaData[position].correct_answer) {
              return (
                <button
                  key={ element }
                  type="button"
                  name="correct"
                  data-testid="correct-answer"
                  className={ checked ? 'correct-choice' : 'default' }
                  onClick={ this.checkAnswer }
                  disabled={ isDisabled }
                  id={ triviaData[position].difficulty }
                >
                  {element}
                </button>
              );
            }
            return (
              <button
                key={ element }
                type="button"
                data-testid={ `wrong-answer-${index}` }
                className={ checked ? 'wrong-choice' : 'default' }
                onClick={ this.checkAnswer }
                disabled={ isDisabled }
              >
                {element}
              </button>
            );
          })
        }
      </div>
    );
  }

  render() {
    const { triviaData, position, checked, seconds } = this.state;
    console.log(triviaData[position]);
    return (
      <div className="main-questions">
        {
          triviaData.length > 0 && (

            <div>
              <p
                className="trivia-category"
                data-testid="question-category"
              >
                {triviaData[position].category}
              </p>
              <p
                className="trivia-data"
                data-testid="question-text"
              >
                {triviaData[position].question}
              </p>
              { this.showQuestions() }
            </div>
          )
        }

        {checked
        && (
          <button
            data-testid="btn-next"
            type="button"
            onClick={ this.incrementPosition }
          >
            Next

          </button>) }
        <div>{ seconds }</div>
      </div>

    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  chamarTrivia: () => dispatch(actionFetchTrivia()),
  saveScoreTotal: (score) => dispatch(saveScore(score)),
  hitsProps: (hits) => dispatch(updateHits(hits)),
});

const mapStateToProps = (state) => ({
  triviaApi: state.trivia,
  token: state.token,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Questions));

Questions.propTypes = {
  triviaApi: Proptypes.func,
  history: Proptypes.objectOf(Proptypes.any),
  hitsProps: Proptypes.func,
}.isRequired;
