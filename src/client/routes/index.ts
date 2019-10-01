/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

import Entry from './Entry'
import Home from './Home'
import NewEntry from './NewEntry'
import Review from './Review'

const routes = [
  {
    Component: Home,
    exact: true,
    path: '/',
  },
  {
    Component: NewEntry,
    exact: true,
    path: '/entries/new',
  },
  {
    Component: Entry,
    exact: true,
    path: '/entries/:id',
  },
  {
    Component: Entry,
    exact: true,
    path: '/entries/:id/edit',
  },
  {
    Component: Review,
    exact: true,
    path: '/review',
  },
]
export default routes
