import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { actionFetchToken, emailGravatar } from '../Actions/Actions';
import '../styles/login.css';
import trivia from '../trivia.png';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      nickName: '',
      disabled: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validateLogin);
  }

  handleSubmit = async () => {
    const { history, tokenInfo, emailGrav } = this.props;
    await tokenInfo();
    emailGrav(this.state);
    history.push('/playgame');
  }

  validateLogin = () => {
    const { email, nickName } = this.state;
    const re = /\S+@\S+\.\S+/;
    const emailValidation = re.test(email);
    const characterNumber = 2;
    const nickNameValidation = nickName.length > characterNumber;
    if (emailValidation && nickNameValidation) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  render() {
    const { email, nickName, disabled } = this.state;
    const { history } = this.props;
    return (
      <main className="main-login">
        <img src={ trivia } alt="logo" className="header-title" />
        <div className="container">
          <input
            type="email"
            value={ email }
            className="input-login"
            onChange={ this.handleChange }
            name="email"
            data-testid="input-gravatar-email"
            placeholder="e-mail"
            required
          />
          <input
            type="nickName"
            value={ nickName }
            className="input-login"
            onChange={ this.handleChange }
            name="nickName"
            placeholder="Seu nickname"
            data-testid="input-player-name"
          />
        </div>
        <button
          disabled={ disabled }
          type="button"
          className="btn"
          data-testid="btn-play"
          onClick={ this.handleSubmit }
        >
          Play

        </button>

        <button
          type="submit"
          className="btn"
          data-testid="btn-settings"
          onClick={ () => history.push('/config') }
        >
          Configuração

        </button>
        <footer
          className="footer-login"
        >
          Powered by: Group-27 - Trybe: Trivia Project
        </footer>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  tokenInfo: () => dispatch(actionFetchToken()),
  emailGrav: (state) => dispatch(emailGravatar(state)),
});

Login.propTypes = {
  emailInfo: Proptypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
