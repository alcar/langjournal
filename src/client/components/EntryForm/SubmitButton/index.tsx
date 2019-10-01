/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

import React from 'react'

import Button from '../../Button'

type Props = {
  isDisabled: boolean
  isNew: boolean
}

const SubmitButton: React.FC<Props> = ({ isDisabled, isNew }) => (
  <Button
    isDisabled={isDisabled}
    kind="positive"
    responsiveIconName="check"
    textId={`form.button.submit.${isNew ? 'new' : 'edit'}`}
    type="submit"
  />
)

export default SubmitButton
