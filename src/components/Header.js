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

  componentDidUpdate() {
    const { getGravatar, email } = this.props;
    getGravatar(email);
  }

  render() {
    const { score, name, gravatarEndPoint } = this.props;
    return (
      <header className="header">
        <p>Game Page</p>
        <h2 className="header-score" data-testid="header-score">
          { score }
        </h2>
        <h2 className="header-player-name" data-testid="header-player-name">
          { name }
        </h2>
        <img
          src={ gravatarEndPoint }
          alt="gravatar"
          data-testid="header-profile-picture"
        />
      </header>
    );
  }
}

const mapStateToProps = (store) => ({
  email: store.headerReducer.email,
  score: store.headerReducer.score,
  name: store.headerReducer.name,
  gravatarEndPoint: store.headerReducer.gravatarEndPoint,
});

const mapDispatchToProps = (dispatch) => ({
  getGravatar: (email) => dispatch(actionGetGravatar(md5(email))),
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  getGravatar: PropTypes.func.isRequired,
  gravatarEndPoint: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
