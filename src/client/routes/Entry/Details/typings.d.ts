/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

import Entry from '../../../../typings/entry'

declare namespace Details {
  type DeleteEntryData = {
    deleteEntry: Entry.Entry['_id']
  }

  type DeleteEntryVariables = {
    _id: Entry.Entry['_id']
  }
}

export default Details
