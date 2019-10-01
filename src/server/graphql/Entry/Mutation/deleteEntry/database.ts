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
  deleteOne,
  getEntryAndUserFilter,
  wasDeleteSuccessful,
} from '../../../../utils/database'

export const deleteEntryFromDb = async (
  entryId: Entry.Id,
  userId: User.Id,
  db: Db,
): Promise<string | null> => {
  const response = await deleteOne(
    collections.ENTRIES,
    getEntryAndUserFilter(entryId, userId),
    db,
  )

  return wasDeleteSuccessful(response, 1) ? entryId : null
}
