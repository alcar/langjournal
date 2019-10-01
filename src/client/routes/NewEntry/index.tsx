/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

import { useMutation } from '@apollo/react-hooks'
import React from 'react'

import EntryForm from '../../components/EntryForm'
import EntryFormTypings from '../../components/EntryForm/typings'
import EntryStyles from '../../components/EntryStyles'

import CreateEntryMutation from './CreateEntry.gql'
import Typings from './typings'
import { storeUpdater } from './utils'

const NewEntry: React.FC = () => {
  const [createEntry] = useMutation<
    Typings.CreateEntryData,
    Typings.CreateEntryVariables
  >(CreateEntryMutation)

  const handleSubmit: EntryFormTypings.SubmitHandler = React.useCallback(
    values =>
      createEntry({
        update: storeUpdater,
        variables: {
          dateTime: new Date().toISOString(),
          description: values.description,
          language: values.language,
          tags: values.tags,
          title: values.title,
        },
      }),
    [createEntry],
  )

  return (
    <EntryStyles>
      <EntryForm onSubmit={handleSubmit} />
    </EntryStyles>
  )
}

export default NewEntry
