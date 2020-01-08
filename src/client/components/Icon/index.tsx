/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

import feather from 'feather-icons'
import { useKeydownFromClick } from 'keydown-from-click'
import React from 'react'

import styles from './styles.css'

type Props = {
  className?: string
  isGray?: boolean
  isSpan?: boolean
  name: string
  onClick?: () => void
  svgOptions?: feather.FeatherAttributes
  title?: string
}

const noOp = (): void => {
  return
}

const Icon: React.FC<Props> = ({
  className,
  isGray,
  isSpan,
  name,
  onClick,
  svgOptions,
  title,
}) => {
  const keydownHandler = useKeydownFromClick(onClick || noOp)

  const finalClassName = onClick
    ? [className, styles.link].join(' ')
    : className

  const icon = feather.icons[name].toSvg({
    ...svgOptions,
    ...(isGray && { color: '#999' }),
  })

  const isInteractive = !!onClick

  const handleKeydown = isInteractive ? keydownHandler : undefined

  const role = isInteractive ? 'button' : 'img'

  const tabIndex = isInteractive ? 0 : undefined

  const props = {
    className: finalClassName,
    dangerouslySetInnerHTML: { __html: icon },
    onClick,
    onKeyDown: handleKeydown,
    role,
    tabIndex,
    title,
  }

  if (isSpan) {
    return <span {...props} />
  }

  return <div {...props} />
}

export default Icon
