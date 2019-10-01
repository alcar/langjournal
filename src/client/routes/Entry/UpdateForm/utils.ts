/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

import { getStoreUpdater } from '../../../utils/entriesCache'

import Typings from './typings'

export const storeUpdater = getStoreUpdater<Typings.UpdateEntryData>(
  (mutationResultData, queryData) => {
    const { entries } = queryData

    const updatedEntry = mutationResultData.updateEntry

    const entryIndex = entries.findIndex(
      entry => entry._id === updatedEntry._id,
    )

    const updatedEntries = [
      updatedEntry,
      ...entries.slice(0, entryIndex),
      ...entries.slice(entryIndex + 1),
    ]

    return {
      ...queryData,
      entries: updatedEntries,
    }
  },
)
