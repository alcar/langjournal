/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

import fs from 'fs'
import path from 'path'
import React from 'react'
import { HelmetData } from 'react-helmet'

import { isDevelopment } from '../../utils/env'

import { getApolloStateScript, getAssetPath } from './utils'

type Props = {
  appWithData?: string
  initialState?: object
  language?: string
  title?: ReturnType<HelmetData['title']['toComponent']>
}

const Html: React.SFC<Props> = ({
  appWithData,
  initialState,
  language,
  title,
}) => {
  const { scripts, styles } = React.useMemo(() => {
    if (isDevelopment) {
      return {}
    }

    const dynamicAssetsJson = fs.readFileSync(
      path.join(__dirname, 'dynamicAssets.json'),
      'utf8',
    )

    return JSON.parse(dynamicAssetsJson)
  }, [])

  return (
    <html lang={language}>
      <head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />

        <meta charSet="utf-8" />

        {title || <title>LangJournal</title>}

        <link
          href="https://fonts.googleapis.com/css?family=Inconsolata"
          rel="stylesheet"
        />

        <link rel="stylesheet" href={getAssetPath('reset.css')} />

        <link rel="stylesheet" href={getAssetPath('global.css')} />

        {styles &&
          styles.map((style: string) => (
            <link key={style} rel="stylesheet" href={getAssetPath(style)} />
          ))}

        {initialState && (
          <script
            dangerouslySetInnerHTML={{
              __html: getApolloStateScript(initialState),
            }}
          />
        )}
      </head>

      <body>
        <div
          id="root"
          dangerouslySetInnerHTML={{ __html: appWithData || '' }}
        />

        {scripts ? (
          scripts.map((script: string) => (
            <script key={script} src={getAssetPath(script)} />
          ))
        ) : (
          <script src={getAssetPath('bundle.js')} />
        )}
      </body>
    </html>
  )
}

export default Html
