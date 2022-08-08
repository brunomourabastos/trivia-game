import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStorage } from '../Services/handleStorage';
import { resetScore, updateHits } from '../Actions/Actions';
import '../styles/ranking.css';

class Ranking extends Component {
  // listar em ordem decrescente, em uma tabela;
  scoreBoard = () => {
    const sortRanking = getStorage('playerRanking')
      .sort((a, b) => b.score - a.score);
    return (
      <thead>
        { sortRanking.map((player, index) => (
          <>
            <tr key={ index }>
              <th>Player</th>
              <th>Score</th>
            </tr>
            <tr>
              <td data-testid={ `player-name-${index}` }>{player.name}</td>
              <td data-testid={ `player-score-${index}` }>{player.score}</td>
            </tr>
          </>
        ))}
      </thead>
    );
  };

  // resetará o placar do estado antes de enviar para um novo jogo;
  handlePlayAgain = () => {
    const { scoreProps, hitsProps, history } = this.props;
    const reset = 0;
    scoreProps(reset);
    hitsProps(reset);
    history.push('/');
  };

  render() {
    const { handlePlayAgain, scoreBoard } = this;
    return (
      <div>
        <h2 className="header" data-testid="ranking-title">Ranking</h2>
        <table className="main-ranking">{ scoreBoard() }</table>

        <button
          type="button"
          className="btn-ranking"
          data-testid="btn-go-home"
          onClick={ handlePlayAgain }
        >
          Página Inicial
        </button>

      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  scoreProps: (score) => dispatch(resetScore(score)),
  hitsProps: (hits) => dispatch(updateHits(hits)),
});

export default connect(null, mapDispatchToProps)(Ranking);
