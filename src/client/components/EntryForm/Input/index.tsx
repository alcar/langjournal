/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

import React from 'react'

import {
  MAX_INPUT_LENGTH,
  MAX_TEXTAREA_LENGTH,
} from '../../../../consts/mutation'
import Description from '../Description'
import Label from '../Label'
import Typings from '../typings'

import styles from './styles.css'

type Props = {
  hasError?: boolean
  isTextarea?: boolean
  name: string
  setValue: Typings.SetValue
  value?: string
}

const Input: React.FC<Props> = ({
  hasError = false,
  isTextarea = false,
  name,
  setValue,
  value,
}) => {
  const handleChange = React.useCallback<
    React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  >(
    event => {
      setValue(name, event.target.value)
    },
    [name, setValue],
  )

  const className = React.useMemo(() => {
    let completeClassName = [
      styles.input,
      isTextarea ? styles.textarea : styles.simpleInput,
    ].join(' ')

    if (hasError) {
      completeClassName = [completeClassName, styles.error].join(' ')
    }

    return completeClassName
  }, [hasError, isTextarea])

  const commonProps = {
    className,
    name,
    onChange: handleChange,
    value,
  }

  return (
    <div className={styles.container}>
      <Label messageId={`form.field.${name}.label`}>
        <Description messageId={`form.field.${name}.description`} />

        {isTextarea ? (
          <textarea maxLength={MAX_TEXTAREA_LENGTH} {...commonProps} />
        ) : (
          <input maxLength={MAX_INPUT_LENGTH} type="text" {...commonProps} />
        )}
      </Label>
    </div>
  )
}

export default Input
