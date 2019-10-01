/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

import { useQuery } from '@apollo/react-hooks'
import React from 'react'
import { useLocation, useParams } from 'react-router-dom'

import EntryStyles from '../../components/EntryStyles'
import Error from '../../components/Error'
import Loader from '../../components/Loader'

import Details from './Details'
import EntryQuery from './Entry.gql'
import Typings from './typings'
import UpdateForm from './UpdateForm'

const Entry: React.FC = () => {
  const location = useLocation()
  const { id } = useParams()

  const { data, error, loading } = useQuery<Typings.EntryData>(EntryQuery, {
    variables: { _id: id },
  })

  const isEditMode = React.useMemo(() => {
    const splittedPathname = location.pathname.split('/')

    return splittedPathname[splittedPathname.length - 1] === 'edit'
  }, [location.pathname])

  if (loading) {
    return <Loader />
  }

  if (error || !data || !data.entry) {
    return <Error />
  }

  const { entry } = data

  return (
    <EntryStyles>
      {isEditMode ? <UpdateForm entry={entry} /> : <Details entry={entry} />}
    </EntryStyles>
  )
}

export default Entry
