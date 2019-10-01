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
  messageId: string
}

const Description: React.FC<Props> = ({ messageId }) => (
  <FormattedMessage id={messageId}>
    {message => <div className={styles.description}>{message}</div>}
  </FormattedMessage>
)

export default Description
