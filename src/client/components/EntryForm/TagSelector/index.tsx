/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

import React from 'react'
import Creatable from 'react-select/creatable'
import { FocusEventHandler, ValueType } from 'react-select/src/types'

import { MAX_TAG_LENGTH, MAX_TAGS_AMOUNT } from '../../../../consts/mutation'
import { REACT_SELECT_INPUT_ID } from '../consts'
import Description from '../Description'
import Label from '../Label'
import FormTypings from '../typings'

import styles from './styles.css'
import Typings from './typings'

type Props = {
  initialValue?: FormTypings.Values['tags']
  setValue: FormTypings.SetValue
}

type State = {
  inputValue: string
  value: Readonly<Typings.Value[]>
}

const TagSelector: React.FC<Props> = ({ initialValue, setValue }) => {
  const [state, setState] = React.useReducer<
    React.Reducer<State, Partial<State>>
  >((prevState, state) => ({ ...prevState, ...state }), {
    inputValue: '',
    value: initialValue
      ? initialValue.map(item => ({ label: item, value: item }))
      : [],
  })

  const updateFormValue = React.useCallback(
    (value: State['value']) => {
      setValue(
        'tags',
        value.map(item => item.value),
      )
    },
    [setValue],
  )

  const addUniqueValue = React.useCallback(
    (inputValue: State['inputValue'], value: State['value']) => {
      const newValue = [
        ...value.filter(item => item.value !== inputValue),
        { label: inputValue, value: inputValue },
      ]

      setState({
        inputValue: '',
        value: newValue,
      })

      updateFormValue(newValue)
    },
    [updateFormValue],
  )

  const handleBlur = React.useCallback<FocusEventHandler>(
    ({ target }) => {
      if (state.inputValue && target instanceof HTMLInputElement) {
        addUniqueValue(target.value, state.value)
      }
    },
    [addUniqueValue, state.inputValue, state.value],
  )

  const handleChange = React.useCallback(
    (newValue: ValueType<Typings.Value>) => {
      if (newValue) {
        setState({
          value: Array.isArray(newValue) ? newValue : [newValue],
        })
      } else {
        setState({ value: [] })
      }
    },
    [],
  )

  const handleInputChange = React.useCallback(
    (inputValue: State['inputValue']) => {
      if (inputValue.length > 1 && inputValue[inputValue.length - 1] === ' ') {
        addUniqueValue(inputValue.slice(0, inputValue.length - 1), state.value)
      } else if (
        inputValue !== ' ' &&
        inputValue.length <= MAX_TAG_LENGTH &&
        state.value.length < MAX_TAGS_AMOUNT
      ) {
        setState({ inputValue })
      }
    },
    [addUniqueValue, state.value],
  )

  const handleKeydown = React.useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      const { inputValue, value } = state

      if (inputValue && ['Enter', 'Tab', ' '].includes(event.key)) {
        addUniqueValue(inputValue, value)

        event.preventDefault()
      } else if (!inputValue && value.length > 0 && event.key === 'Backspace') {
        const newValue = value.slice(0, value.length - 1)

        setState({
          value: newValue,
        })

        updateFormValue(newValue)

        event.preventDefault()
      }
    },
    [addUniqueValue, state, updateFormValue],
  )

  return (
    <div>
      <Label
        htmlFor={REACT_SELECT_INPUT_ID}
        messageId="form.field.tags.label"
      />

      <Description messageId="form.field.tags.description" />

      <Creatable<Typings.Value>
        className={state.value.length === 0 ? styles.creatable : undefined}
        components={{ DropdownIndicator: null }}
        inputValue={state.inputValue}
        isClearable
        isMulti
        menuIsOpen={false}
        onBlur={handleBlur}
        onChange={handleChange}
        onInputChange={handleInputChange}
        onKeyDown={handleKeydown}
        placeholder=""
        value={state.value}
      />
    </div>
  )
}

export default TagSelector
