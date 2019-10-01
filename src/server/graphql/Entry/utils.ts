/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

import { LANGUAGES } from '../../../consts/language'
import {
  MAX_INPUT_LENGTH,
  MAX_TAG_LENGTH,
  MAX_TAGS_AMOUNT,
  MAX_TEXTAREA_LENGTH,
} from '../../../consts/mutation'
import Entry from '../../../typings/entry'
import errors from '../errors'

export const formatDbEntry = (dbEntry: Entry.DbEntry): Entry.Entry => {
  const { _id, dateTime, description, language, tags, title } = dbEntry

  return {
    _id: _id.toString(),
    dateTime,
    description,
    language,
    tags,
    title,
  }
}

export const validateLimits = ({
  description,
  language,
  tags,
  title,
}: Entry.CommonFields): void => {
  if (description.length > MAX_TEXTAREA_LENGTH) {
    throw new Error(errors.mutation.limit.DESCRIPTION)
  }

  if (!LANGUAGES[language]) {
    throw new Error(errors.mutation.invalid.LANGUAGE)
  }

  if (tags.length > MAX_TAGS_AMOUNT) {
    throw new Error(errors.mutation.limit.tags.AMOUNT)
  }

  if (tags.find(tag => tag.length > MAX_TAG_LENGTH)) {
    throw new Error(errors.mutation.limit.tags.LENGTH)
  }

  if (title.length > MAX_INPUT_LENGTH) {
    throw new Error(errors.mutation.limit.TITLE)
  }
}
