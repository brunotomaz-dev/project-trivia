import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Ranking extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectHome: false,
    };
  }

  render() {
    const { redirectHome } = this.state;
    const homeButton = (
      <button
        data-testid="btn-go-home"
        onClick={ () => this.setState({ redirectHome: true }) }
        type="button"
      >
        Home
      </button>
    );

    const rankingInfo = JSON.parse(localStorage.getItem('ranking')) || [];
    // console.log(rankingInfo);
    const rankingInfoOrdered = rankingInfo.sort((a, b) => b.score - a.score);
    // console.log(rankingInfoOrdered);
    const rankingList = (
      <ul>
        { rankingInfoOrdered.map((player, index) => (
          <div key={ index }>
            <li
              data-testid={ `player-name-${index}` }
            >
              { player.name }
            </li>
            <li
              data-testid={ `player-score-${index}` }
            >
              { player.score }
            </li>
            <img
              alt=""
              src={ player.gravatarEndPoint }
            />
          </div>
        ))}
      </ul>
    );
    return (
      <div>
        <h3 data-testid="ranking-title">Ranking</h3>
        { redirectHome ? <Redirect to="/" /> : '' }
        { homeButton }
        { rankingList }
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  email: store.player.email,
  score: store.player.score,
  name: store.player.name,
  gravatarEndPoint: store.player.gravatarEndPoint,
});

export default connect(mapStateToProps, null)(Ranking);
