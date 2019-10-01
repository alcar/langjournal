/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

import path from 'path'

import { ASSETS_PATH } from '../../../consts/path'

export const getApolloStateScript = (state: object): string => `
  window.__APOLLO_STATE__ = ${JSON.stringify(state).replace(/</g, '\\u003c')}
`

export const getAssetPath = (filename: string): string =>
  path.join(ASSETS_PATH, filename)
