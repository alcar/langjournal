/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

import enUs from './messages/en_US.json'
import esAr from './messages/es_AR.json'
import ptBr from './messages/pt_BR.json'

import { MessagesByLocale } from './typings'

const DEFAULT_LOCALE = 'en'

export const messagesByLocale: MessagesByLocale = {
  /* eslint-disable @typescript-eslint/camelcase */
  en: enUs,
  en_US: enUs,
  es: esAr,
  es_AR: esAr,
  pt: ptBr,
  pt_BR: ptBr,
  /* eslint-enable @typescript-eslint/camelcase */
}

const formatLocale = (target: string): string => target.replace('-', '_')

export const getLocale = (languages: Readonly<string[]>): string => {
  const rawLocale =
    languages
      .map(formatLocale)
      .find(formattedLocale =>
        Object.keys(messagesByLocale).includes(formattedLocale),
      ) || DEFAULT_LOCALE

  const locale = rawLocale.split('_')[0]

  return locale
}
