import React from 'react';
import FeedBack from '../pages/Feedback';
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import { cleanup, screen, waitFor } from '@testing-library/react';
import { toHaveTextContent } from '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

const firstInitialState = {
  player: {
    name:"Leonardo",
    assertions: 0,
    email:"leo@gmail.com",
    gravatarEndPoint:"https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e",
    score: 0,
  }
}

const secondInitialState = {
  player: {
    name: "Leonardo",
    assertions: 5,
    email: "leo@gmail.com",
    gravatarEndPoint: "https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e",
    score: 200,
  }
}

const clear = {
    player: {
      name: '',
      assertions: 0,
      email: '',
      gravatarEndPoint: '',
      score: 0,
    },
    gameReducer: {},
}

describe('component FeedBack', () => {
  beforeEach(cleanup)
  test('os valores do componente FeedBack aparecem na tela', () => {
    renderWithRouterAndRedux(<FeedBack />, firstInitialState);
    screen.logTestingPlaygroundURL();
    const score = screen.getByTestId('header-score');
    const playerName = screen.getByRole('heading', { name: /leonardo/i });
    const gravatar = screen.getByRole('img', { name: /gravatar/i });
    const information = screen.getByRole('heading', { name: /could be better\.\.\./i });
    const totalScore = screen.getByTestId('feedback-total-score');
    const totalAssertions = screen.getByTestId('feedback-total-question');

    expect(score).toHaveTextContent('0');
    expect(playerName).toHaveTextContent('Leonardo');
    expect(gravatar)
      .toHaveAttribute('src','https://www.gravatar.com/avatar/d397d8c641072ae5f98eb2c444f66c2a');
    expect(information).toHaveTextContent('Could be better...');
    expect(totalScore).toHaveTextContent('0');
    expect(totalAssertions).toHaveTextContent('0');
  })

  test('os valores do componente FeedBack aparecem na tela', async () => {
    const { store } = renderWithRouterAndRedux(<FeedBack />, secondInitialState);
    const score = screen.getByTestId('header-score');
    const playerName = screen.getByRole('heading', { name: /leonardo/i });
    const gravatar = screen.getByRole('img', { name: /gravatar/i });
    const information = screen.getByRole('heading', { name: /Well Done!/i });
    const totalScore = screen.getByTestId('feedback-total-score');
    const totalAssertions = screen.getByTestId('feedback-total-question');
    
    expect(score).toHaveTextContent('0');
    expect(playerName).toHaveTextContent('Leonardo');
    expect(gravatar)
    .toHaveAttribute('src','https://www.gravatar.com/avatar/d397d8c641072ae5f98eb2c444f66c2a');
    expect(information).toHaveTextContent('Well Done!');
    expect(totalScore).toHaveTextContent('200');
    expect(totalAssertions).toHaveTextContent('5');
    
    userEvent.click(screen.getByRole('button', { name: /play again/i }));
    console.log(store.getState());
    expect(store.getState()).toStrictEqual(clear)
    screen.logTestingPlaygroundURL();
  })
})