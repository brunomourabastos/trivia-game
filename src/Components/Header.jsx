import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import md5 from 'crypto-js/md5';
import '../styles/header.css';

class Header extends Component {
  render() {
    const { emailGravatar: { gravatarEmail, name }, score } = this.props;
    // Conversão utiliza a criptografia da biblioteca md5, conforme solicitado pelo requisito
    const userConverted = md5(gravatarEmail).toString();
    return (
      <header className="header">
        <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${userConverted}` } alt="foto-gravatar" />
        <aside className="header-aside">
          <div
            className="player-data"
            data-testid="header-player-name"
          >
            {name}
          </div>
          <div
            className="player-data"
            data-testid="header-score"
          >
            {score}
          </div>
          <span className="score-header"> pontos</span>
        </aside>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  emailGravatar: state.player,
  token: state.token.token,
  score: state.player.score,
});

Header.propTypes = {
  emailGravatar: Proptypes.string,
  score: Proptypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
