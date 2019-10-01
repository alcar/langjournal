/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

export const formatDate = (date: Date): string => {
  const dateObj = new Date(date)

  const day =
    dateObj.getDate() < 10
      ? `0${dateObj.getDate()}`
      : dateObj.getDate().toString()

  const month =
    dateObj.getMonth() + 1 < 10
      ? `0${dateObj.getMonth() + 1}`
      : (dateObj.getMonth() + 1).toString()

  const year = dateObj.getFullYear()

  return `${day}/${month}/${year}`
}
