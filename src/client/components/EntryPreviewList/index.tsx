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
import { FormattedMessage } from 'react-intl'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'

import GraphQL from '../../../typings/graphql'
import Button from '../../components/Button'
import Error from '../../components/Error'
import Loader from '../../components/Loader'

import EntriesQuery from './Entries.gql'
import EntryPreview from './EntryPreview'
import styles from './styles.css'
import Typings from './typings'

type Props = {
  isReview?: boolean
  limit?: number
  skip?: number
}

const EntryPreviewList: React.FC<Props> = ({ isReview, limit, skip }) => {
  const history = useHistory()

  const handleClick = React.useCallback(() => {
    history.push('/entries/new')
  }, [history])

  const { data, error, loading } = useQuery<
    Typings.EntriesData,
    GraphQL.OptionalArgs
  >(EntriesQuery, {
    variables: {
      limit,
      skip,
    },
  })

  if (loading) {
    return <Loader />
  }

  if (error || !data) {
    return <Error />
  }

  const { entries } = data

  return (
    <div className={styles.container}>
      {entries.length > 0 ? (
        <>
          {!isReview && (
            <div className={styles.button}>
              <Button
                isFixed
                kind="positive"
                onClick={handleClick}
                textId="home.button.new"
              />
            </div>
          )}

          <ul className={styles.previewList}>
            {entries.map(entry => (
              <li className={styles.preview} key={entry._id}>
                <EntryPreview
                  _id={entry._id}
                  description={entry.description}
                  isReview={isReview}
                  language={entry.language}
                  title={entry.title}
                />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className={styles.emptyState}>
          <FormattedMessage id="entries.emptyState.0" />

          <div className={styles.emptyStateSuggestion}>
            <FormattedMessage
              id="entries.emptyState.1"
              values={{
                link: (
                  <Link
                    className={styles.emptyStateSuggestionLink}
                    to="/entries/new"
                  >
                    <FormattedMessage id="entries.emptyState.1.link" />
                  </Link>
                ),
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default EntryPreviewList
