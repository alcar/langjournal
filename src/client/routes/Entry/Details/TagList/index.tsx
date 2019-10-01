/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

import React from 'react'
import { FormattedMessage } from 'react-intl'

import Entry from '../../../../../typings/entry'

import styles from './styles.css'
import Tag from './Tag'

type Props = {
  items: Entry.CommonFields['tags']
}

const TagList: React.FC<Props> = ({ items }) => {
  if (items.length === 0) {
    return (
      <FormattedMessage id="entry.field.tags.emptyState">
        {message => <div className={styles.emptyState}>{message}</div>}
      </FormattedMessage>
    )
  }

  return (
    <div className={styles.tags}>
      {items.map(tag => (
        <Tag key={tag} text={tag} />
      ))}
    </div>
  )
}

export default TagList
