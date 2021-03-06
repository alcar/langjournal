/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

import Entry from '../../../typings/entry'

declare namespace Database {
  export type DateTimeSort = {
    dateTime: -1 | 1
  }

  export type EntryFilter = {
    _id: Entry.DbId
  }

  export type UserFilter = {
    userId: Entry.DbId
  }
}

export default Database
