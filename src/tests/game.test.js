import React from 'react';
import FeedBack from '../pages/Feedback';
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import { cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Game from '../pages/Game';
import { clear, firstInitialState, fourthInitialState, secondInitialState, thirdInitialState } from './helpers/helpsForTests';
import App from '../App';


describe('component FeedBack', () => {
  beforeEach(cleanup)
  test('os valores do componente FeedBack aparecem na tela', () => {
    renderWithRouterAndRedux(<FeedBack />, firstInitialState);
    // screen.logTestingPlaygroundURL();
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
  });

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

    expect(store.getState()).toStrictEqual(clear)
    // screen.logTestingPlaygroundURL();
  });

  test('conferindo as questions', async () => {
    const { history } = renderWithRouterAndRedux(<Game />, thirdInitialState, '/game');
    // screen.logTestingPlaygroundURL();
    const repeat = 4;
    for (let index = 0; index < repeat; index++) {
        const choose = screen.getByTestId('correct-answer');
        userEvent.click(choose);

        const next = screen.getByTestId('btn-next')
        userEvent.click(next);
        // screen.logTestingPlaygroundURL();
      }
      // no último teste vou clicar na opção errada
      const choose = screen.getByTestId('wrong-answer-1');
      userEvent.click(choose);
      
      const next = screen.getByTestId('btn-next')
      userEvent.click(next);
      expect(history.location.pathname).toBe('/feedback');
    });

  test('conferindo as questions', async () => {
    const { history } = renderWithRouterAndRedux(<Game />, fourthInitialState, '/game');
    // expect(history.location.pathname).toBe('/game');
    await waitFor(() => expect(history.location.pathname).toBe('/'));
    // screen.logTestingPlaygroundURL();
  });

  jest.useFakeTimers();
  jest.spyOn(global, 'setInterval');
  test('conferindo as questions', () => {
    localStorage.clear();
    const { history } = renderWithRouterAndRedux(<App />, thirdInitialState, '/game');
    console.log(history);
    jest.advanceTimersByTime(5000);
    screen.getByText('25');

    userEvent.click(screen.getByTestId('correct-answer'));
    userEvent.click(screen.getByRole('button', { name: /next/i }));
    userEvent.click(screen.getByTestId('correct-answer'));
    userEvent.click(screen.getByRole('button', { name: /next/i }));
    userEvent.click(screen.getByTestId('correct-answer'));
    userEvent.click(screen.getByRole('button', { name: /next/i }));
    userEvent.click(screen.getByTestId('correct-answer'));
    userEvent.click(screen.getByRole('button', { name: /next/i }));
    userEvent.click(screen.getByTestId('correct-answer'));
    userEvent.click(screen.getByRole('button', { name: /próxima/i }));
    // screen.logTestingPlaygroundURL();
    userEvent.click(screen.getByRole('button', { name: /ranking/i }));
    screen.logTestingPlaygroundURL();
  });
})