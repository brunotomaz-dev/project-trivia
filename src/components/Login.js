import React from 'react';
import { connect } from 'react-redux';
import Settings from './Settings';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      buttonDisabled: true,
      redirectConfig: false,
    };
  }

  validateInput = () => {
    const { name, email } = this.state;
    const testMail = /\S+@\S+\.\S+/.test(email);
    const validate = (
      name.length > 0
      && testMail
    );
    this.setState({
      buttonDisabled: !validate,
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validateInput());
  }

  submitClick = (event) => {
    event.preventDefault();
  }

  render() {
    const { name, email, buttonDisabled, redirectConfig } = this.state;
    return (
      <div className="Login">
        { redirectConfig ? <Settings /> : '' }
        <label htmlFor="input-player-name">
          NAME:
          <input
            type="text"
            id="input-player-name"
            data-testid="input-player-name"
            value={ name }
            name="name"
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="input-gravatar-email">
          EMAIL:
          <input
            type="email"
            id="input-gravatar-email"
            data-testid="input-gravatar-email"
            value={ email }
            name="email"
            onChange={ this.handleChange }
          />
        </label>

        <button
          type="submit"
          data-testid="btn-play"
          onClick={ this.submitClick }
          disabled={ buttonDisabled }
        >
          PLAY
        </button>

        <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => this.setState({ redirectConfig: true }) }
        >
          Configurações
        </button>
      </div>
    );
  }
}

export default connect(null, null)(Login);
