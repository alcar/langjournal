/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

import { MAX_LIMIT } from '../../../../../consts/query'
import Entry from '../../../../../typings/entry'
import GraphQL from '../../../../../typings/graphql'
import errors, { throwWithLog } from '../../../errors'

import { findEntriesInDb } from './database'

const entries = async (
  _: object,
  args: GraphQL.OptionalArgs,
  context: GraphQL.Context,
): Promise<Entry.Entry[] | undefined> => {
  const { db, userId } = context

  if (!userId) {
    throw new Error(errors.AUTH)
  }

  const limit = args.limit || 0

  if (limit > MAX_LIMIT) {
    throw new Error(errors.query.LIMIT)
  }

  const skip = args.skip || 0

  try {
    const dbEntries = await findEntriesInDb(limit, skip, userId, db)

    return dbEntries
  } catch (err) {
    throwWithLog(err, errors.db.GENERAL)
  }
}

export default entries
