/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

import { useKeydownFromClick } from 'keydown-from-click'
import React from 'react'
import { useHistory } from 'react-router-dom'

import Icon from '../../Icon'

import styles from './styles.css'

const EntryAdder: React.FC = () => {
  const history = useHistory()

  const handleClick = React.useCallback(() => {
    history.push('/entries/new')
  }, [history])

  const handleKeydown = useKeydownFromClick(handleClick)

  return (
    <div
      className={styles.container}
      onClick={handleClick}
      onKeyDown={handleKeydown}
      role="button"
      tabIndex={0}
    >
      <Icon className={styles.icon} name="plus" />
    </div>
  )
}

export default EntryAdder
