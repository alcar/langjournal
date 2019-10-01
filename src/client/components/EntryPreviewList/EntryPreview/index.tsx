/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

import React from 'react'
import { useHistory } from 'react-router-dom'

import Entry from '../../../../typings/entry'

import Preview from './Preview'

type Props = {
  _id: Entry.Entry['_id']
  description: Entry.Entry['description']
  isReview?: boolean
  language: Entry.Entry['language']
  title: Entry.Entry['title']
}

const EntryPreview: React.FC<Props> = ({
  _id,
  description,
  isReview,
  language,
  title,
}) => {
  const history = useHistory()

  const [shouldHideFields, setShouldHideFields] = React.useState(!!isReview)

  const getDetailsNavigationHandler = React.useCallback(
    (id: string) => () => {
      history.push(`/entries/${id}`)
    },
    [history],
  )

  const toggleFieldsVisibility = React.useCallback(() => {
    setShouldHideFields(state => !state)
  }, [])

  const clickHandler = isReview
    ? toggleFieldsVisibility
    : getDetailsNavigationHandler(_id)

  return (
    <Preview
      description={description}
      onClick={clickHandler}
      language={language}
      shouldHideFields={shouldHideFields}
      title={title}
    />
  )
}

export default EntryPreview
