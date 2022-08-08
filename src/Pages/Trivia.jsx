import React, { Component } from 'react';
import Proptypes from 'prop-types';
import Header from '../Components/Header';
import Questions from '../Components/Questions';

class Trivia extends Component {
  render() {
    return (
      <>
        {/* <div>Trivia</div> */}
        <Header />
        <Questions />
        <footer
          className="footer-login"
        >
          Powered by: Group-27 - Trybe: Trivia Project
        </footer>
        {/* <Answers /> Idéia para renderizar o quadro com perguntas e re */}
      </>
    );
  }
}

export default (Trivia);

Trivia.propTypes = {
  tokenInfo: Proptypes.string,
}.isRequired;
