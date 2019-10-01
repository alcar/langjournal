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
import { FormattedMessage, useIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'

import { LANGUAGES } from '../../../../consts/language'
import Entry from '../../../../typings/entry'
import Icon from '../../../components/Icon'
import PageTitle from '../../../components/PageTitle'

import DeleteButton from './DeleteButton'
import DeleteEntryMutation from './DeleteEntry.gql'
import EditButton from './EditButton'
import FieldWithIcon from './FieldWithIcon'
import styles from './styles.css'
import TagList from './TagList'
import Typings from './typings'
import { storeUpdater } from './utils'

type Props = {
  entry: Entry.Entry
}

type State = {
  isDeleting: boolean
  wasErrorThrown: boolean
}

const Details: React.FC<Props> = ({
  entry: { _id, dateTime, description, language, tags, title },
}) => {
  const history = useHistory()

  const [state, setState] = React.useReducer<
    React.Reducer<State, Partial<State>>
  >((prevState, state) => ({ ...prevState, ...state }), {
    isDeleting: false,
    wasErrorThrown: false,
  })

  const handleBack = React.useCallback(() => {
    history.push('/')
  }, [history])

  const [deleteEntry] = useMutation<
    Typings.DeleteEntryData,
    Typings.DeleteEntryVariables
  >(DeleteEntryMutation)

  const handleDelete = React.useCallback(async () => {
    setState({ isDeleting: true })

    try {
      await deleteEntry({
        update: storeUpdater,
        variables: {
          _id,
        },
      })

      history.push('/')
    } catch (err) {
      setState({
        isDeleting: false,
        wasErrorThrown: true,
      })
    }
  }, [_id, deleteEntry, history])

  const handleEdit = React.useCallback(() => {
    history.push(`/entries/${_id}/edit`)
  }, [_id, history])

  const intl = useIntl()

  const dateTimeObj = React.useMemo(() => new Date(dateTime), [dateTime])

  return (
    <>
      <PageTitle text={title} />

      <div className={styles.titleContainer}>
        <Icon
          className={styles.titleIcon}
          isGray
          name="arrow-left"
          onClick={handleBack}
        />
        <h1 className={styles.title}>{title}</h1>
      </div>

      <FieldWithIcon
        className={styles.fieldWithIcon}
        iconName="info"
        titleId="details.tooltip.description"
      >
        <div className={styles.description}>{description}</div>
      </FieldWithIcon>

      <FieldWithIcon
        className={styles.fieldWithIcon}
        iconName="globe"
        titleId="details.tooltip.language"
      >
        <div className={styles.language}>{LANGUAGES[language]}</div>
      </FieldWithIcon>

      <FieldWithIcon
        className={styles.fieldWithIcon}
        iconName="tag"
        titleId="details.tooltip.tags"
      >
        <TagList items={tags} />
      </FieldWithIcon>

      <FieldWithIcon
        className={styles.fieldWithIcon}
        iconName="calendar"
        titleId="details.tooltip.dateTime"
      >
        <div className={styles.dateTime}>
          {dateTimeObj.toLocaleString(intl.locale)}
        </div>
      </FieldWithIcon>

      <div className={styles.actions}>
        {state.wasErrorThrown && (
          <FormattedMessage id="general.error">
            {(message): React.ReactElement => (
              <div className={styles.error}>{message}</div>
            )}
          </FormattedMessage>
        )}

        <div className={styles.buttons}>
          <EditButton isDisabled={state.isDeleting} onClick={handleEdit} />

          <DeleteButton isDisabled={state.isDeleting} onClick={handleDelete} />
        </div>
      </div>
    </>
  )
}

export default Details
