import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { SnackbarProvider } from 'notistack';
import store from '../redux/store'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'


function render(
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route]}),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <Router history={history}>
          <SnackbarProvider maxSnack={1}>{children}</SnackbarProvider>
        </Router>
      </Provider>)
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

export * from '@testing-library/react'
export { render }
