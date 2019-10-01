/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

import { ASSETS_PATH } from '../../../../consts/path'

import Typings from './typings'

export const ALT_TEXT_BY_SERVICE: Record<Typings.LoginService, string> = {
  google: 'Sign in with Google',
}

export const SRC_BY_SERVICE: Record<Typings.LoginService, string> = {
  google: `${ASSETS_PATH}/login-google.png`,
}
