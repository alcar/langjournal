/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

import { DataProxy } from 'apollo-cache'
import { MutationUpdaterFn } from 'apollo-client'

import EntriesData from '../../components/EntryPreviewList/Entries.gql'

import Typings from './typings'

const cacheAccessParameters = {
  query: EntriesData,
}

const readEntriesFromStore = (store: DataProxy): Typings.QueryData =>
  store.readQuery(cacheAccessParameters)

const writeEntriesToStore = (
  newData: Typings.EntriesData,
  store: DataProxy,
): void => {
  store.writeQuery({
    data: newData,
    ...cacheAccessParameters,
  })
}

export const getStoreUpdater = <T = unknown>(
  getNewData: Typings.NewDataGetter<T>,
): MutationUpdaterFn<T> => (store, result) => {
  const mutationResultData = result.data

  try {
    const queryData = readEntriesFromStore(store)

    if (mutationResultData && queryData) {
      const newData = getNewData(mutationResultData, queryData)

      writeEntriesToStore(newData, store)
    }
  } catch (err) {
    console.warn("No cache found for 'Entries'.")
  }
}
