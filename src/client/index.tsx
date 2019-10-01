/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

import 'regenerator-runtime/runtime'

import { ApolloProvider } from '@apollo/react-common'
import React from 'react'
import { hydrate, render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import apolloClient from './services/apolloClient'

const WrappedApp = (
  <ApolloProvider client={apolloClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
)

const rootElement = document.getElementById('root')

if (module.hot) {
  render(WrappedApp, rootElement)
} else {
  hydrate(WrappedApp, rootElement)
}
