/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

import 'isomorphic-unfetch'

import { ApolloProvider } from '@apollo/react-common'
import { renderToStringWithData } from '@apollo/react-ssr'
import accepts from 'accepts'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { SchemaLink } from 'apollo-link-schema'
import { NextFunction, Request, Response } from 'express'
import { GraphQLSchema } from 'graphql'
import React from 'react'
import { HelmetData } from 'react-helmet'
import { StaticRouterContext } from 'react-router'
import { StaticRouter } from 'react-router-dom'
import { renderToStaticMarkup } from 'react-dom/server'

import Html from '../components/Html'
import { isDevelopment } from '../utils/env'

const DEFAULT_STATUS_CODE = 200

const renderPage = async (
  req: Request,
  res: Response,
  schema: GraphQLSchema,
): Promise<void> => {
  if (isDevelopment) {
    const html = renderToStaticMarkup(<Html />)

    res.status(DEFAULT_STATUS_CODE).send(`<!DOCTYPE html>${html}`)
  } else {
    const { default: App, Helmet } = await import('../../client/App')

    const routerContext: StaticRouterContext = {}

    const schemaLinkContext = {
      db: req.app.locals.db,
      userId: req.user,
    }

    const apolloClient = new ApolloClient({
      cache: new InMemoryCache(),
      link: new SchemaLink({ context: schemaLinkContext, schema }),
      ssrMode: true,
    })

    const languages = accepts(req).languages()

    const WrappedApp = (
      <ApolloProvider client={apolloClient}>
        <StaticRouter context={routerContext} location={req.url}>
          <App serverLanguages={languages} />
        </StaticRouter>
      </ApolloProvider>
    )

    const appWithData = await renderToStringWithData(WrappedApp)

    if (routerContext.url) {
      res.writeHead(301, {
        Location: routerContext.url,
      })

      res.end()
    } else {
      const statusCode = routerContext.statusCode || DEFAULT_STATUS_CODE

      const helmetData: HelmetData = Helmet.renderStatic()

      const initialState = apolloClient.extract()

      const title = helmetData.title.toComponent()

      const html = renderToStaticMarkup(
        <Html
          appWithData={appWithData}
          initialState={initialState}
          language={languages[0]}
          title={title}
        />,
      )

      res.status(statusCode).send(`<!DOCTYPE html>${html}`)
    }
  }
}

const handleSsr = async (
  req: Request,
  res: Response,
  next: NextFunction,
  schema: GraphQLSchema,
): Promise<void> => {
  try {
    await renderPage(req, res, schema)
  } catch (err) {
    next(err)
  }
}

export default handleSsr
