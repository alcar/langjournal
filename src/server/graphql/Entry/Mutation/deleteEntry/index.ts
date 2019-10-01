/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

import Entry from '../../../../../typings/entry'
import GraphQL from '../../../../../typings/graphql'
import errors, { throwWithLog } from '../../../errors'

import { deleteEntryFromDb } from './database'

const deleteEntry = async (
  _: object,
  args: Entry.ControlFields,
  context: GraphQL.Context,
): Promise<string | undefined> => {
  const { db, userId } = context

  if (!userId) {
    throw new Error(errors.AUTH)
  }

  const { _id } = args

  try {
    const entryId = await deleteEntryFromDb(_id, userId, db)

    if (!entryId) {
      throw new Error(errors.db.DELETE)
    }

    return entryId
  } catch (err) {
    throwWithLog(err, errors.db.GENERAL)
  }
}

export default deleteEntry
