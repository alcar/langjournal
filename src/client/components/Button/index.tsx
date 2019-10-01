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

import Icon from '../Icon'

import { COLOR_BY_KIND } from './consts'
import styles from './styles.css'
import Typings from './typings'
import { getClassName } from './utils'

type Props = {
  isDisabled?: boolean
  isFixed?: boolean
  kind?: Typings.Kind
  onClick?: () => void
  responsiveIconKind?: Typings.Kind
  responsiveIconName?: string
  textId: string
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type']
}

const SubmitButton: React.FC<Props> = ({
  isDisabled = false,
  isFixed = false,
  kind = 'neutral' as Typings.Kind,
  onClick,
  responsiveIconKind = kind,
  responsiveIconName,
  textId,
  type,
}) => (
  <button
    className={getClassName(styles, kind, isFixed)}
    disabled={isDisabled}
    onClick={onClick}
    type={type}
  >
    {responsiveIconName && (
      <Icon
        className={styles.icon}
        name={responsiveIconName}
        isSpan
        svgOptions={{
          color: isDisabled ? '#eee' : COLOR_BY_KIND[responsiveIconKind],
        }}
      />
    )}

    <FormattedMessage id={textId}>
      {message => <span className={styles.text}>{message}</span>}
    </FormattedMessage>
  </button>
)

export default SubmitButton
