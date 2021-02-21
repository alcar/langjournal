/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

import { Form, Formik, FormikHelpers } from 'formik'
import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'

import { useId } from '../../hooks/useId'
import PageTitle from '../PageTitle'

import CancelButton from './CancelButton'
import { INITIAL_VALUES } from './consts'
import ErrorMessage from './ErrorMessage'
import Input from './Input'
import LanguageSelector from './LanguageSelector'
import styles from './styles.css'
import SubmitButton from './SubmitButton'
import TagSelector from './TagSelector'
import Typings from './typings'
import { getValidationSchema } from './utils'

type Props = {
  initialValues?: Typings.Values
  onSubmit: Typings.SubmitHandler
}

const EntryForm: React.FC<Props> = ({ initialValues, onSubmit }) => {
  const history = useHistory()
  const id = useId()

  const isNew = !id

  const completeInitialValues = React.useMemo(
    () => ({ ...INITIAL_VALUES, ...initialValues }),
    [initialValues],
  )

  const handleCancel = React.useCallback(() => {
    history.push(isNew ? '/' : `/entries/${id}`)
  }, [id, history, isNew])

  const handleSubmit = React.useCallback(
    async (values: Typings.Values, actions: FormikHelpers<Typings.Values>) => {
      actions.setStatus()

      try {
        await onSubmit(values)

        history.push(isNew ? '/entries' : `/entries/${id}`)
      } catch (err) {
        actions.setStatus('error.graphql')

        actions.setSubmitting(false)
      }
    },
    [id, history, isNew, onSubmit],
  )

  const intl = useIntl()

  const pageTitleId = `form.title.${isNew ? 'new' : 'edit'}`

  return (
    <>
      <PageTitle textId={pageTitleId} />

      <FormattedMessage id={pageTitleId}>
        {(message): React.ReactElement => (
          <h1 className={styles.title}>{message}</h1>
        )}
      </FormattedMessage>

      <Formik<Typings.Values>
        initialValues={completeInitialValues}
        onSubmit={handleSubmit}
        validationSchema={getValidationSchema(intl)}
      >
        {({
          errors,
          isSubmitting,
          setFieldValue,
          status,
          touched,
          values,
        }): React.ReactElement => (
          <Form className={styles.container}>
            {!!status && (
              <div className={styles.formErrorContainer}>
                <FormattedMessage id="general.error">
                  {(message): React.ReactElement => (
                    <span className={styles.formError}>{message}</span>
                  )}
                </FormattedMessage>
              </div>
            )}

            <div className={styles.field}>
              <Input
                hasError={!!errors.title && touched.title}
                name="title"
                setValue={setFieldValue}
                value={values.title}
              />

              {errors.title && touched.title && (
                <ErrorMessage message={errors.title} />
              )}
            </div>

            <div className={styles.field}>
              <Input
                hasError={!!errors.description && touched.description}
                isTextarea
                name="description"
                setValue={setFieldValue}
                value={values.description || ''}
              />

              {errors.description && touched.description && (
                <ErrorMessage message={errors.description} />
              )}
            </div>

            <div className={styles.field}>
              <LanguageSelector
                setValue={setFieldValue}
                value={values.language}
              />
            </div>

            <div className={styles.field}>
              <TagSelector
                initialValue={values.tags}
                setValue={setFieldValue}
              />
            </div>

            <div className={styles.buttons}>
              <SubmitButton isDisabled={isSubmitting} isNew={isNew} />

              <CancelButton isDisabled={isSubmitting} onClick={handleCancel} />
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default EntryForm
