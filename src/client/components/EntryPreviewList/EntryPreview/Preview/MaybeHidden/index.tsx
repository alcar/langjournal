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

import styles from './styles.css'

type Props = {
  shouldHide: boolean
}

const MaybeHidden: React.FC<Props> = ({ children, shouldHide }) => (
  <>
    {shouldHide ? (
      <>
        <FormattedMessage id="review.entry.instructions.0">
          {message => <div className={styles.message}>{message}</div>}
        </FormattedMessage>

        <FormattedMessage id="review.entry.instructions.1">
          {message => <div className={styles.message}>{message}</div>}
        </FormattedMessage>
      </>
    ) : (
      children
    )}
  </>
)

export default MaybeHidden
