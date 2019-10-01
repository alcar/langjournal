/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

import { IntlFormatters } from 'react-intl'
import * as Yup from 'yup'

import Typings from './typings'

export const getValidationSchema = (
  intl: IntlFormatters,
): Yup.Schema<Partial<Typings.Values>> =>
  Yup.object().shape({
    description: Yup.string().required(
      intl.formatMessage({
        id: 'form.error.required',
      }),
    ),
    title: Yup.string().required(
      intl.formatMessage({
        id: 'form.error.required',
      }),
    ),
  })
