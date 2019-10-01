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

import { LANGUAGES } from '../../../../../consts/language'
import Entry from '../../../../../typings/entry'

import MaybeHidden from './MaybeHidden'
import styles from './styles.css'

type Props = {
  description: Entry.Entry['description']
  language: Entry.Entry['language']
  onClick: () => void
  shouldHideFields: boolean
  title: Entry.Entry['title']
}

const Preview: React.FC<Props> = ({
  description,
  language,
  onClick,
  shouldHideFields,
  title,
}) => {
  const handleKeydown = useKeydownFromClick(onClick)

  return (
    <div
      className={styles.container}
      onKeyDown={handleKeydown}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <div className={styles.content}>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>{title}</h2>
        </div>

        <MaybeHidden shouldHide={shouldHideFields}>
          <div className={styles.description}>{description}</div>

          <div className={styles.language}>{LANGUAGES[language]}</div>
        </MaybeHidden>
      </div>
    </div>
  )
}

export default Preview
