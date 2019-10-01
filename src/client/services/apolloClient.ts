/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

import { InMemoryCache } from 'apollo-cache-inmemory'
import ApolloClient from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { HttpLink } from 'apollo-link-http'

import { LOGIN_PATH } from '../../consts/path'
import GraphQL from '../../typings/graphql'

const apolloClient = new ApolloClient({
  cache: new InMemoryCache({
    cacheRedirects: {
      Query: {
        entry: (_, args, { getCacheKey }) =>
          getCacheKey({ _id: args._id, __typename: 'Entry' }),
      },
    },
  }).restore(window.__APOLLO_STATE__),
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.forEach(({ message, status }: GraphQL.Error) => {
          console.error(`[GraphQL error] ${message}`)

          if (status === 401) {
            location.href = `${LOGIN_PATH}?callback=${location.pathname}`
          }
        })
      }

      if (networkError) {
        console.error(`[Network error] ${networkError}`)
      }
    }),
    new HttpLink({
      credentials: 'same-origin',
      uri: '/graphql',
    }),
  ]),
})

export default apolloClient
