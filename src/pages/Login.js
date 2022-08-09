import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Settings from './Settings';
import { actionSetEmail } from '../redux/actions/headerActions';
import { clearScore } from '../redux/actions/gameActions';
import '../CSS/login.css';

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

  componentDidMount() {
    const { clearScoreDispatch } = this.props;
    clearScoreDispatch();
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

  submitClick = async (event) => {
    const { history } = this.props;
    event.preventDefault();
    // fazer requisição e salver o token no localStorage
    const fetchToken = await fetch('https://opentdb.com/api_token.php?command=request');
    const returnToken = await fetchToken.json();
    localStorage.setItem('token', returnToken.token);
    // alterar Email do State Global
    const { changeEmail } = this.props;
    const { email, name } = this.state;
    changeEmail(email, name);
    // alterar a url da aplicação
    history.push('/game');
  }

  render() {
    const { name, email, buttonDisabled, redirectConfig } = this.state;
    return (
      <div style={ { display: 'flex' } }>
        <div style={ { display: 'flex', justifyContent: 'flex-end' } }>
          <img className="riddleImg wobble-hor-bottom" src="https://i.pinimg.com/originals/5e/da/84/5eda849200c4e02d288d91ea2564d944.png" alt="riddler" />
        </div>
        <div className="Login">
          {redirectConfig ? <Settings /> : ''}
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
            Play
          </button>

          <button
            type="button"
            data-testid="btn-settings"
            onClick={ () => this.setState({ redirectConfig: true }) }
          >
            Configurações
          </button>
        </div>
        <div>
          <img className="riddleImg wobble-hor-bottom" src="https://i.pinimg.com/originals/5e/da/84/5eda849200c4e02d288d91ea2564d944.png" alt="riddler" />
        </div>

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  changeEmail: (email, name) => dispatch(actionSetEmail(email, name)),
  clearScoreDispatch: () => dispatch(clearScore()),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  changeEmail: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
