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

import PageTitle from '../../../PageTitle'

import styles from './styles.css'

const NotFound: React.FC = () => {
  const pageTitleId = 'general.error.404.title'

  return (
    <>
      <PageTitle textId={pageTitleId} />

      <div className={styles.container}>
        <FormattedMessage id={pageTitleId}>
          {message => <h1 className={styles.title}>{message}</h1>}
        </FormattedMessage>

        <FormattedMessage id="general.error.404.message">
          {message => <h2 className={styles.text}>{message}</h2>}
        </FormattedMessage>
      </div>
    </>
  )
}

export default NotFound
