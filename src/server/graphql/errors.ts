/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

import {
  MAX_INPUT_LENGTH,
  MAX_TAG_LENGTH,
  MAX_TAGS_AMOUNT,
  MAX_TEXTAREA_LENGTH,
} from '../../consts/mutation'
import { MAX_LIMIT } from '../../consts/query'
import log from '../utils/log'

const getDbErrorMessage = (operation?: string): string =>
  `Database ${operation ? `${operation} error` : 'error'}`

const getInvalidValueErrorMessage = (fieldName: string): string =>
  `Invalid "${fieldName}"`

const getLengthLimitErrorMessage = (
  fieldName: string,
  maxLength: number,
): string => `The maximum allowable length for "${fieldName}" is ${maxLength}`

const getValueLimitErrorMessage = (
  fieldName: string,
  maxValue: number,
): string => `The maximum allowable value for "${fieldName}" is ${maxValue}`

const errors = {
  AUTH: 'Unauthorized',
  db: {
    DELETE: getDbErrorMessage('DELETE'),
    GENERAL: getDbErrorMessage(),
    INSERT: getDbErrorMessage('INSERT'),
    UPDATE: getDbErrorMessage('UPDATE'),
  },
  mutation: {
    invalid: {
      LANGUAGE: getInvalidValueErrorMessage('language'),
    },
    limit: {
      DESCRIPTION: getLengthLimitErrorMessage(
        'description',
        MAX_TEXTAREA_LENGTH,
      ),
      tags: {
        AMOUNT: getLengthLimitErrorMessage('tags', MAX_TAGS_AMOUNT),
        LENGTH: getLengthLimitErrorMessage('tag', MAX_TAG_LENGTH),
      },
      TITLE: getLengthLimitErrorMessage('title', MAX_INPUT_LENGTH),
    },
  },
  query: {
    LIMIT: getValueLimitErrorMessage('limit', MAX_LIMIT),
  },
}

export const getErrorStatusFromMessage = (message: string): number =>
  message === errors.AUTH ? 401 : 500

export const throwWithLog = (err: Error, customMessage: string): void => {
  log(err)

  throw new Error(customMessage)
}

export default errors
