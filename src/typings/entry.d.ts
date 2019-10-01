/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

import { ObjectId } from 'mongodb'

import { LANGUAGES } from '../consts/language'

declare namespace Entry {
  type CommonFields = {
    dateTime: DateTime
    description: Description
    language: Language
    tags: Tags
    title: Title
  }

  type ControlFields = {
    _id: Id
  }

  type DateTime = string

  type Description = string

  type DbControlFields = {
    _id: DbId
  }

  type DbEntry = CommonFields & DbControlFields

  type DbId = ObjectId

  type Entry = CommonFields & ControlFields

  type Language = keyof typeof LANGUAGES

  type Id = string

  type Tags = string[]

  type Title = string
}

export default Entry
