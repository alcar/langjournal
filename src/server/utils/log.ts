/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

import { isDevelopment } from '../utils/env'

const log = (err: Error): void => {
  if (isDevelopment) {
    console.error(err)
  } else {
    // TODO: Log somewhere else with relevant data
  }
}

export default log
