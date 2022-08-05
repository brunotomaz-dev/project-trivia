import React from "react";
import App from "../App";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import userEvent from "@testing-library/user-event";
import { cleanup, screen, waitFor } from "@testing-library/react";
import userMock from "./helpers/helpsForTests";

describe('Testa a página de login', () => {
  beforeEach(cleanup);
  test('Testa se o input name e email estão na tela', () => {
    renderWithRouterAndRedux(<App />);
    const inputName = screen.getByLabelText(/name/i);
    const inputEmail = screen.getByLabelText(/email/i);

    expect(inputName).toBeDefined();
    expect(inputEmail).toBeDefined();
  });
  test('Testa se os botãoe de play e configuraçãoes estão na tela', () => {
    renderWithRouterAndRedux(<App />);
    const playButton = screen.getByRole('button', {name: 'Play'})
    const configButton = screen.getByRole('button', {name: 'Configurações'})

    expect(playButton).toBeDefined();
    expect(configButton).toBeDefined();
  })
  test('Testa se quando preenchidos corretamente os inputs, o botão play desbloqueia e redireciona para /game', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputName = screen.getByLabelText(/name/i);
    const inputEmail = screen.getByLabelText(/email/i);
    const playButton = screen.getByRole('button', {name: 'Play'})
    
    userEvent.type(inputName, userMock.name);
    userEvent.type(inputEmail, userMock.email);
    userEvent.click(playButton);
    // screen.logTestingPlaygroundURL();

    await screen.findByText('Game Page');

    waitFor(() => {
      const {location: {pathname}} = history;
      expect(pathname).toBe('/game');
    })
  })

  test('Testando o click no botão de Configurações: ', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const configButton = screen.getByTestId('btn-settings');
    // screen.logTestingPlaygroundURL();
    userEvent.click(configButton);
    screen.getByText(/Settings/i);
  })
  
});