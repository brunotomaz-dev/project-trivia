import React from 'react';
import Ranking from '../pages/Ranking';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('testando o componente Ranking', () => {
  it('as informações que aparecem no ranking estão de acordo com localStorage', async () => {
    renderWithRouterAndRedux(<Ranking />);
  })
});
