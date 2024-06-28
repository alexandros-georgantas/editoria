/* eslint-disable react/prop-types */

import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'

import { Normalize } from 'styled-normalize'

import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
  split,
} from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { setContext } from '@apollo/client/link/context'
import { WebSocketLink } from '@apollo/client/link/ws'
import { createUploadLink } from 'apollo-upload-client'

import { th } from '@pubsweet/ui-toolkit'

import { serverUrl } from './getUrl'

const StyleRoot = styled.div`
  background-color: ${th('colorBackground')};
  color: ${th('colorText')};
  font-family: ${th('fontInterface')}, sans-serif;
  font-size: ${th('fontSizeBase')};
  line-height: ${th('lineHeightBase')};

  * {
    box-sizing: border-box;
  }
`

const replaceHttpWithWs = url => {
  let wsUrl = url.replace(/^http:/, 'ws:')
  wsUrl = wsUrl.replace(/^https:/, 'wss:')
  return wsUrl
}

const wsMinTimeout = process.env.CLIENT_WS_MIN_TIMEOUT || 1000
const wsTimeout = process.env.CLIENT_WS_TIMEOUT || 30000

// See https://github.com/apollographql/apollo-feature-requests/issues/6#issuecomment-465305186
export function stripTypenames(obj) {
  Object.keys(obj).forEach(property => {
    if (
      obj[property] !== null &&
      typeof obj[property] === 'object' &&
      !(obj[property] instanceof File)
    ) {
      /* eslint-disable-next-line no-param-reassign */
      delete obj.property
      const newData = stripTypenames(obj[property], '__typename')
      /* eslint-disable-next-line no-param-reassign */
      obj[property] = newData
    } else if (property === '__typename') {
      /* eslint-disable-next-line no-param-reassign */
      delete obj[property]
    }
  })
  return obj
}

// Construct an ApolloClient. If a function is passed as the first argument,
// it will be called with the default client config as an argument, and should
// return the desired config.
const makeApolloClient = (makeConfig, connectToWebSocket) => {
  const uploadLink = createUploadLink({
    uri: `${serverUrl}/graphql`,
  })

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token')
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    }
  })

  const removeTypename = new ApolloLink((operation, forward) => {
    if (operation.variables) {
      /* eslint-disable-next-line no-param-reassign */
      operation.variables = stripTypenames(operation.variables)
    }

    return forward(operation)
  })

  let link = ApolloLink.from([removeTypename, authLink, uploadLink])

  if (connectToWebSocket) {
    const wsLink = new WebSocketLink({
      uri: `${replaceHttpWithWs(serverUrl)}/subscriptions`,
      options: {
        reconnect: true,
        minTimeout: wsMinTimeout,
        timeout: wsTimeout,
        connectionParams: () => ({ authToken: localStorage.getItem('token') }),
      },
    })

    link = split(
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query)
        return kind === 'OperationDefinition' && operation === 'subscription'
      },
      wsLink,
      link,
    )
  }

  const config = {
    link,
    cache: new InMemoryCache(),
  }

  return new ApolloClient(makeConfig ? makeConfig(config) : config)
}

const Root = ({
  makeApolloConfig,
  routes,
  theme,
  connectToWebSocket = true,
}) => (
  <div>
    <Normalize />
    <ApolloProvider
      client={makeApolloClient(makeApolloConfig, connectToWebSocket)}
    >
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <StyleRoot>{routes}</StyleRoot>
        </ThemeProvider>
      </BrowserRouter>
    </ApolloProvider>
  </div>
)

export default Root
