/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

import { Db } from 'mongodb'

import Entry from '../../../../../typings/entry'
import User from '../../../../../typings/user'
import {
  collections,
  findOne,
  getEntryAndUserFilter,
} from '../../../../utils/database'
import { formatDbEntry } from '../../utils'

export const findEntryInDb = async (
  entryId: Entry.Id,
  userId: User.Id,
  db: Db,
): Promise<Entry.Entry | null> => {
  const dbEntry = await findOne<Entry.DbEntry>(
    collections.ENTRIES,
    getEntryAndUserFilter(entryId, userId),
    db,
  )

  if (!dbEntry) {
    return null
  }

  return formatDbEntry(dbEntry)
}
