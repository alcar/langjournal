/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

import React from 'react'
import Select from 'react-select'
import { ValueType } from 'react-select/src/types'

import { LANGUAGE_OPTIONS } from '../../../../consts/language'
import { REACT_SELECT_INPUT_ID } from '../consts'
import Description from '../Description'
import Label from '../Label'
import FormTypings from '../typings'

import styles from './styles.css'

type Props = {
  setValue: FormTypings.SetValue
  value?: string
}

const LanguageSelector: React.FC<Props> = ({ setValue, value }) => {
  const defaultValue = React.useMemo(
    () => LANGUAGE_OPTIONS.find(option => option.value === value),
    [value],
  )

  const handleChange = React.useCallback(
    (option: ValueType<typeof LANGUAGE_OPTIONS[0], false>) => {
      if (option && !Array.isArray(option) && option.value) {
        setValue('language', option.value)
      }
    },
    [setValue],
  )

  return (
    <div>
      <Label
        htmlFor={REACT_SELECT_INPUT_ID}
        messageId="form.field.language.label"
      />

      <Description messageId="form.field.language.description" />

      <Select
        className={styles.select}
        defaultValue={defaultValue}
        onChange={handleChange}
        options={LANGUAGE_OPTIONS}
      />
    </div>
  )
}

export default LanguageSelector
