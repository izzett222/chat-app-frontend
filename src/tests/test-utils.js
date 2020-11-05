import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { SnackbarProvider } from 'notistack';
import store from '../redux/store'
import { Provider } from 'react-redux'


function render(
  ui,
  {
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}><SnackbarProvider maxSnack={1}>{children}</SnackbarProvider></Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

export * from '@testing-library/react'
export { render }
