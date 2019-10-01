/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

import Typings from './typings'

export const getClassName = (
  styles: Record<string, string>,
  kind: Typings.Kind,
  isFixed: boolean,
): string => {
  const baseClass = styles.button

  if (!kind || kind === 'neutral') {
    return baseClass
  }

  return `${baseClass} ${[styles[kind]]}${
    isFixed ? ` ${styles.buttonFixed}` : ''
  }`
}
