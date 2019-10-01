/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

import { Db, ObjectId } from 'mongodb'

import Entry from '../../../../../typings/entry'
import User from '../../../../../typings/user'
import { collections, insertOne } from '../../../../utils/database'
import { formatDbEntry } from '../../utils'

export const insertEntryIntoDb = async (
  entry: Entry.CommonFields,
  userId: User.Id,
  db: Db,
): Promise<Entry.Entry | null> => {
  const completeEntry = {
    ...entry,
    dateTime: new Date(entry.dateTime),
    userId: new ObjectId(userId),
  }

  const newEntry = await insertOne<Entry.DbEntry>(
    collections.ENTRIES,
    completeEntry,
    db,
  )

  if (!newEntry._id) {
    return null
  }

  return formatDbEntry(newEntry)
}
