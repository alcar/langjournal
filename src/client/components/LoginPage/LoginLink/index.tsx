/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

import React from 'react'
import { useLocation } from 'react-router-dom'

import { ALT_TEXT_BY_SERVICE, SRC_BY_SERVICE } from './consts'
import Typings from './typings'

type Props = {
  service: Typings.LoginService
}

const LoginLink: React.FC<Props> = ({ service }) => {
  const location = useLocation()

  return (
    <a href={`/auth/${service}${location.search}`}>
      <img alt={ALT_TEXT_BY_SERVICE[service]} src={SRC_BY_SERVICE[service]} />
    </a>
  )
}

export default LoginLink
