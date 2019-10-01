/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

import { GraphQLScalarType } from 'graphql'

import { LANGUAGES } from '../../../consts/language'
import Entry from '../../../typings/entry'

const isLanguage = (value: string): value is Entry.Language =>
  Object.prototype.hasOwnProperty.call(LANGUAGES, value)

const validate = (value: string): Entry.Language => {
  if (!isLanguage(value)) {
    return 'en'
  }

  return value
}

const Language = new GraphQLScalarType({
  description: 'A string that represents a language.',
  name: 'Language',
  parseLiteral: ast => ast.kind === 'StringValue' && validate(ast.value),
  parseValue: validate,
  serialize: validate,
})

export default Language
