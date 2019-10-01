/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

import React from 'react'

import ItemWithLink from './ItemWithLink'
import styles from './styles.css'
import Typings from './typings'

const topItems: Typings.ItemWithLink[] = [
  {
    iconName: 'home',
    path: '/',
    textId: 'sidebar.home',
  },
  {
    iconName: 'book-open',
    path: '/review',
    textId: 'sidebar.review',
  },
]

const bottomItems: Typings.ItemWithLink[] = [
  {
    iconName: 'log-out',
    path: '/auth/logout',
    shouldHitServer: true,
    textId: 'sidebar.logout',
  },
]

const Sidebar: React.FC = () => (
  <nav className={styles.container}>
    <ul>
      {topItems.map(item => (
        <li key={item.path}>
          <ItemWithLink
            iconName={item.iconName}
            path={item.path}
            shouldHitServer={item.shouldHitServer}
            textId={item.textId}
          />
        </li>
      ))}
    </ul>
    <ul>
      {bottomItems.map(item => (
        <li key={item.path}>
          <ItemWithLink
            iconName={item.iconName}
            isBottom
            path={item.path}
            shouldHitServer={item.shouldHitServer}
            textId={item.textId}
          />
        </li>
      ))}
    </ul>
  </nav>
)

export default Sidebar
