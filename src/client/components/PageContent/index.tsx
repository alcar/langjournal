/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

import React from 'react'
import { useLocation } from 'react-router-dom'

import PageTitle from '../PageTitle'

import EntryAdder from './EntryAdder'
import Router from './Router'
import Sidebar from './Sidebar'
import styles from './styles.css'

const PageContent: React.FC = () => {
  const location = useLocation()

  return (
    <div className={styles.container}>
      <PageTitle />

      <div className={styles.page}>
        <div className={styles.content}>
          <Sidebar />

          <main className={styles.main}>
            <Router />
          </main>

          {location.pathname === '/' && <EntryAdder />}
        </div>
      </div>
    </div>
  )
}

export default PageContent
