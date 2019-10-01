/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

import React from 'react'
import { Route, RouteProps } from 'react-router-dom'

type Props = RouteProps & {
  statusCode: number
}

const RouteWithStatus: React.FC<Props> = ({
  children,
  exact,
  path,
  statusCode,
}) => (
  <Route
    exact={exact}
    path={path}
    render={({ staticContext }) => {
      if (staticContext) {
        staticContext.statusCode = statusCode
      }

      return children
    }}
  />
)

export default RouteWithStatus
