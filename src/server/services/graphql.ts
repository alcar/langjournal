/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

import { ApolloServer } from 'apollo-server-express'
import { Application } from 'express'
import { GraphQLSchema } from 'graphql'

import GraphQL from '../../typings/graphql'
import { getErrorStatusFromMessage } from '../graphql/errors'

const addGraphql = (
  expressApp: Application,
  schema: GraphQLSchema,
): Application => {
  const graphQLServer = new ApolloServer({
    context: ({ req }): GraphQL.Context => ({
      db: req.app.locals.db,
      userId: req.user as string,
    }),
    formatError: (err: GraphQL.Error): GraphQL.Error => ({
      message: err.message,
      status: getErrorStatusFromMessage(err.message),
    }),
    schema,
  })

  graphQLServer.applyMiddleware({ app: expressApp })

  return expressApp
}

export default addGraphql
