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

    // await screen.findByText('Game Page');

    await waitFor(() => {
      const {location: {pathname}} = history;
      expect(pathname).toBe('/game');
    });
  })

  test('Testando o click no botão de Configurações: ', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const configButton = screen.getByTestId('btn-settings');
    // screen.logTestingPlaygroundURL();
    userEvent.click(configButton);
    screen.getByText(/Settings/i);
  })
  
});

const initialState = {
  player: {
    name: 'loenardo',
    assertions: 0,
    email: 'loenardo@loenardo.com',
    gravatarEndPoint: '',
    score: 0
  },
  gameReducer: {}
}

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve({
    response_code: 0,
    response_message: "Token Generated Successfully!",
    token: "5452bc28b97cdb366bd3cc955bbdb784aced415034afe8c9db1b4515202ede06",
  })
}))

describe('teste Login com mocks', () => {
  // afterEach(jest.clearAllMocks());

  test('testando a requisição a API', async () => {
    const { history, store  } = renderWithRouterAndRedux(<App />, initialState, '/');

    userEvent.type(screen.getByRole('textbox', { name: /name:/i }), 'loenardo');
    userEvent.type(screen.getByRole('textbox', { name: /email:/i }), 'loenardo@gmail.com');
    userEvent.click(screen.getByRole('button', { name: /play/i }));

    await waitFor(() => expect(history.location.pathname).toBe('/game'));
    expect(window.localStorage.getItem('token'))
      .toBe("5452bc28b97cdb366bd3cc955bbdb784aced415034afe8c9db1b4515202ede06");

    screen.logTestingPlaygroundURL();
  });
})