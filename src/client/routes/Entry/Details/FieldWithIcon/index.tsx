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

import Icon from '../../../../components/Icon'

import styles from './styles.css'

type Props = {
  className?: string
  iconName: string
  titleId?: string
}

const FieldWithIcon: React.FC<Props> = ({
  className,
  children,
  iconName,
  titleId,
}) => {
  const intl = useIntl()

  return (
    <div
      className={
        className ? `${styles.container} ${className}` : styles.container
      }
    >
      <Icon
        className={styles.icon}
        isGray
        name={iconName}
        title={titleId && intl.formatMessage({ id: titleId })}
      />
      {children}
    </div>
  )
}

export default FieldWithIcon
