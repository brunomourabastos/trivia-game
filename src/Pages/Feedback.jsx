import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../Components/Header';
import { resetScore, updateHits } from '../Actions/Actions';
import { setStorage, getStorage } from '../Services/handleStorage';
import '../styles/feedback.css';

class Feedback extends Component {
  componentDidMount() {
    this.storeScoreboard();
  }

  // puxa as funções de armazenamento do service para o Ranking usar os dados do localStorage;
  storeScoreboard = () => {
    const { name, score } = this.props;
    const ranking = { name, score };
    if (getStorage('playerRanking') === null) {
      setStorage('playerRanking', [ranking]);
    } else {
      setStorage('playerRanking', [...getStorage('playerRanking'), ranking]);
    }
  }

  feedbackText = () => {
    const { assertions } = this.props;
    const minHits = 3;
    return (
      assertions >= minHits
        ? <h2 data-testid="feedback-text">Well Done!</h2>
        : <h2 data-testid="feedback-text">Could be better...</h2>
    );
  }


  handlePlayAgain = () => {
    const { scoreProps, hitsProps, history } = this.props;
    const reset = 0;
    scoreProps(reset);
    hitsProps(reset);
    history.push('/');
  };

  handleRanking = (event) => {
    event.preventDefault();
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { assertions, score } = this.props;
    const { handlePlayAgain, handleRanking } = this;
    return (
      <>
        <Header />
        <span className="main-ranking">
          {this.feedbackText()}
        </span>
        <section className="trivia-data">
          <span>Questões certas:</span>
          <p data-testid="feedback-total-question">

            { (assertions) }

          </p>
          <span>Marcou estes pontos:</span>
          <p data-testid="feedback-total-score">

            { (score) }

          </p>
        </section>

        <section className="btn-feedback">
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ handlePlayAgain }
          >
            Play Again
          </button>

          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ handleRanking }
          >
            Ranking
          </button>
        </section>

      </>
    );
  }
}

Feedback.propTypes = {
  assertions: Proptypes.number,
  score: Proptypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  name: state.player.name,
  assertions: state.player.assertions,
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  scoreProps: (score) => dispatch(resetScore(score)),
  hitsProps: (hits) => dispatch(updateHits(hits)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);