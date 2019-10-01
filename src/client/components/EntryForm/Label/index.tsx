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
  htmlFor?: string
  messageId: string
}

const Label: React.FC<Props> = ({ children, htmlFor, messageId }) => (
  <label htmlFor={htmlFor}>
    <FormattedMessage id={messageId}>
      {message => <span className={styles.label}>{message}</span>}
    </FormattedMessage>

    {children}
  </label>
)

export default Label
