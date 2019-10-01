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
import { validateLimits } from '../../utils'

import { insertEntryIntoDb } from './database'

const createEntry = async (
  _: object,
  args: Entry.CommonFields,
  context: GraphQL.Context,
): Promise<Entry.Entry | undefined> => {
  const { db, userId } = context

  if (!userId) {
    throw new Error(errors.AUTH)
  }

  const { dateTime, description, language, tags, title } = args

  const entry = {
    dateTime,
    description,
    language,
    tags: tags || [],
    title,
  }

  validateLimits(entry)

  try {
    const newEntry = await insertEntryIntoDb(entry, userId, db)

    if (!newEntry) {
      throw new Error(errors.db.INSERT)
    }

    return newEntry
  } catch (err) {
    throwWithLog(err, errors.db.GENERAL)
  }
}

export default createEntry
