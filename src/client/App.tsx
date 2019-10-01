/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

import React from 'react'
import { hot } from 'react-hot-loader'
import { IntlProvider } from 'react-intl'
import { useLocation } from 'react-router-dom'

import { LOGIN_PATH } from '../consts/path'

import LoginPage from './components/LoginPage'
import PageContent from './components/PageContent'
import { getLocale, messagesByLocale } from './i18n'

type Props = {
  serverLanguages?: string[]
}

const App: React.FC<Props> = ({ serverLanguages }) => {
  const location = useLocation()

  const languages =
    serverLanguages ||
    (navigator.language
      ? [...navigator.languages, navigator.language]
      : navigator.languages)

  const locale = getLocale(languages)

  return (
    <IntlProvider locale={locale} messages={messagesByLocale[locale]}>
      {location.pathname === LOGIN_PATH ? <LoginPage /> : <PageContent />}
    </IntlProvider>
  )
}

export { Helmet } from 'react-helmet'

export default hot(module)(App)
