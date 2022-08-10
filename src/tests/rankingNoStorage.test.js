import React from 'react';
import Ranking from '../pages/Ranking';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('testando o componente Ranking', () => {
  it('as informações que aparecem no ranking estão de acordo com localStorage', async () => {
    renderWithRouterAndRedux(<Ranking />);
    // screen.logTestingPlaygroundURL();

    userEvent.click(screen.getByRole('button', { name: /home/i }));

  })
});
