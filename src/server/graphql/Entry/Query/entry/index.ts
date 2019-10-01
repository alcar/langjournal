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

import { findEntryInDb } from './database'

const entry = async (
  _: object,
  args: Entry.ControlFields,
  context: GraphQL.Context,
): Promise<Entry.Entry | null | undefined> => {
  const { _id } = args

  const { db, userId } = context

  if (!userId) {
    throw new Error(errors.AUTH)
  }

  try {
    const dbEntry = await findEntryInDb(_id, userId, db)

    return dbEntry
  } catch (err) {
    throwWithLog(err, errors.db.GENERAL)
  }
}

export default entry
