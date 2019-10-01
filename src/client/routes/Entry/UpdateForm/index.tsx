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

import Entry from '../../../../typings/entry'
import EntryForm from '../../../components/EntryForm'
import EntryFormTypings from '../../../components/EntryForm/typings'

import Typings from './typings'
import UpdateEntryMutation from './UpdateEntry.gql'
import { storeUpdater } from './utils'

type Props = {
  entry: Entry.Entry
}

const UpdateForm: React.FC<Props> = ({ entry }) => {
  const [updateEntry] = useMutation<
    Typings.UpdateEntryData,
    Typings.UpdateEntryVariables
  >(UpdateEntryMutation)

  const handleSubmit: EntryFormTypings.SubmitHandler = React.useCallback(
    values =>
      updateEntry({
        update: storeUpdater,
        variables: {
          _id: entry._id,
          dateTime: new Date().toISOString(),
          description: values.description,
          language: values.language,
          tags: values.tags,
          title: values.title,
        },
      }),
    [entry._id, updateEntry],
  )

  return <EntryForm initialValues={entry} onSubmit={handleSubmit} />
}

export default UpdateForm
