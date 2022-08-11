import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { actionGetGravatar } from '../redux/actions/headerActions';

class Header extends React.Component {
  componentDidMount() {
    const { getGravatar, email } = this.props;
    getGravatar(email);
  }

  render() {
    const { score, name, gravatarEndPoint } = this.props;
    return (
      <header className="header">
        <div>
          <h2 className="header-player-name" data-testid="header-player-name">
            { name }
          </h2>
          <img
            src={ gravatarEndPoint }
            alt="gravatar"
            data-testid="header-profile-picture"
          />
        </div>
        <div>
          <h2 className="header-score" data-testid="header-score">
            Pontuação:
            {' '}
            { score }
          </h2>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (store) => ({
  email: store.player.email,
  score: store.player.score,
  name: store.player.name,
  gravatarEndPoint: store.player.gravatarEndPoint,
});

const mapDispatchToProps = (dispatch) => ({
  getGravatar: (email) => dispatch(actionGetGravatar(md5(email))),
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  getGravatar: PropTypes.func.isRequired,
  gravatarEndPoint: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
