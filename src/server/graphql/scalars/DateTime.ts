/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

import { GraphQLScalarType } from 'graphql'
import { isISO8601 } from 'validator'

import Entry from '../../../typings/entry'

const validate = (value: Entry.DateTime): Entry.DateTime | null => {
  if (!isISO8601(value)) {
    return null
  }

  return value
}

const DateTime = new GraphQLScalarType({
  description: 'An ISO-8601–compliant string.',
  name: 'DateTime',
  parseLiteral: ast => ast.kind === 'StringValue' && validate(ast.value),
  parseValue: validate,
  serialize: dateTimeObj => validate(dateTimeObj.toISOString()),
})

export default DateTime
