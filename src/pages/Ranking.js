import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import '../CSS/ranking.css';

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
        className="btn-go-home"
      >
        Home
      </button>
    );

    const rankingInfo = JSON.parse(localStorage.getItem('ranking')) || [];
    // console.log(rankingInfo);
    const rankingInfoOrdered = rankingInfo.sort((a, b) => b.score - a.score);
    // console.log(rankingInfoOrdered);
    const rankingList = (
      <ul className="list-container-ul">
        { rankingInfoOrdered.map((player, index) => (
          <div key={ index } className="list-container">
            <div className="score-name">
              <li
                data-testid={ `player-name-${index}` }
                className="list-item name"
              >
                { player.name }
              </li>
              <li
                data-testid={ `player-score-${index}` }
                className="list-item score"
              >
                { player.score }
              </li>
            </div>
            <img
              alt=""
              src={ player.gravatarEndPoint }
              className="list-item gravatar"
            />
          </div>
        ))}
      </ul>
    );
    return (
      <div className="ranking-container">
        <h3
          data-testid="ranking-title"
          className="ranking-title"
        >
          Ranking
        </h3>
        { redirectHome ? <Redirect to="/" /> : '' }
        <div className="ranking-main">
          { rankingList }
          { homeButton }
        </div>
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
