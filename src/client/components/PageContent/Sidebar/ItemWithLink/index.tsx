/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

import React, { useCallback } from 'react'
import { FormattedMessage } from 'react-intl'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

import Icon from '../../../Icon'
import SidebarTypings from '../typings'

import styles from './styles.css'

type Props = SidebarTypings.ItemWithLink & {
  isBottom?: boolean
}

const ItemWithLink: React.FC<Props> = ({
  iconName,
  isBottom = false,
  path,
  shouldHitServer = false,
  textId,
}) => {
  const location = useLocation()

  const isActive = location.pathname === path

  const Item = useCallback(
    () => (
      <div
        className={[styles.item, isBottom ? styles.bottom : styles.top].join(
          ' ',
        )}
      >
        <Icon
          className={styles.icon}
          name={iconName}
          svgOptions={isActive ? { color: '#2584ff' } : undefined}
        />

        <FormattedMessage id={textId}>
          {message => (
            <div
              className={
                isActive ? [styles.active, styles.text].join(' ') : styles.text
              }
            >
              {message}
            </div>
          )}
        </FormattedMessage>
      </div>
    ),
    [iconName, isActive, isBottom, textId],
  )

  if (shouldHitServer) {
    return (
      <a className={styles.link} href={path}>
        <Item />
      </a>
    )
  }

  return (
    <Link className={styles.link} to={path}>
      <Item />
    </Link>
  )
}

export default ItemWithLink
