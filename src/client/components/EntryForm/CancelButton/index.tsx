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
  onClick: () => void
}

const CancelButton: React.FC<Props> = ({ isDisabled, onClick }) => (
  <Button
    isDisabled={isDisabled}
    kind="neutral"
    onClick={onClick}
    responsiveIconKind="negative"
    responsiveIconName="x"
    textId="form.button.cancel"
  />
)

export default CancelButton
