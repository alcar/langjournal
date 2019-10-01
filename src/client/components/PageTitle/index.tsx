/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

import React from 'react'
import { useIntl } from 'react-intl'

import { Helmet } from '../../App'

type Props = {
  text?: string
  textId?: string
}

const PageTitle: React.FC<Props> = ({ text, textId }) => {
  const intl = useIntl()

  const baseTitle = intl.formatMessage({ id: 'general.title' })

  const pageSpecificTitle =
    text || (textId && intl.formatMessage({ id: textId }))

  const title = pageSpecificTitle
    ? `${pageSpecificTitle} - ${baseTitle}`
    : baseTitle

  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  )
}

export default PageTitle
