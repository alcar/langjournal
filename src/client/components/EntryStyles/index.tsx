/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

import React from 'react'

import styles from './styles.css'

const EntryStyles: React.FC = ({ children }) => (
  <div className={styles.container}>
    <div className={styles.card}>{children}</div>
  </div>
)

export default EntryStyles
