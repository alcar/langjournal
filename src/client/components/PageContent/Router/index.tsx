/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import routes from '../../../routes'

import NotFound from './NotFound'
import RouteWithStatus from './RouteWithStatus'

const Router: React.FC = () => (
  <Switch>
    <Redirect exact from="/entries" to="/" />

    <Redirect exact from="/entries/new/*" to="/entries/new" />

    {routes.map(route => (
      <Route exact={route.exact} key={route.path} path={route.path}>
        <route.Component />
      </Route>
    ))}

    <Redirect from="/entries/:id/*" to="/entries/:id" />

    <RouteWithStatus statusCode={404}>
      <NotFound />
    </RouteWithStatus>
  </Switch>
)

export default Router
