import React from 'react';
import Ranking from '../pages/Ranking';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('testando o componente Ranking', () => {
  const text = '[{"gravatarEndPoint":"https://www.gravatar.com/avatar/1cb6abcfe8b268401155c97'
    + 'f5c7b71ed","email":"leonardo@schneider.com","name":"Leonardo Schneider","score":176},{'
    + '"gravatarEndPoint":"https://www.gravatar.com/avatar/a005d9223ef4561f21b282cec39ac7ec",'
    + '"email":"felipe@donatto.com","name":"Felipe Donatto","score":70},{"gravatarEndPoint":"'
    + 'https://www.gravatar.com/avatar/d87da56c4a662552aedaa8fcf6115f66","email":"bruno@tomaz'
    + '.com","name":"Bruno Tomaz","score":204},{"gravatarEndPoint":"https://www.gravatar.com/'
    + 'avatar/89e4e654019119f10b00f1eaf1b9a37d","email":"danilo@leao.com","name":"Danilo Leão'
    + '","score":107},{"gravatarEndPoint":"https://www.gravatar.com/avatar/8e4b8378153981f260'
    + 'c9053cce7cc762","email":"leo@leo.com","name":"leo@leo.com","score":0}]';
  beforeEach(() => localStorage.setItem('ranking', text))
  it('as informações que aparecem no ranking estão de acordo com localStorage', async () => {
    renderWithRouterAndRedux(<Ranking />);
    // screen.logTestingPlaygroundURL();

    const playersScore = screen.getAllByTestId(/player-score/i);

    expect(playersScore[0]).toHaveTextContent('204');
    expect(playersScore[1]).toHaveTextContent('176');
    expect(playersScore[2]).toHaveTextContent('107');
    expect(playersScore[3]).toHaveTextContent('70');

    userEvent.click(screen.getByRole('button', { name: /home/i }));

  })
});
