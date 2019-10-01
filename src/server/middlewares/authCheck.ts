/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

import { NextFunction, Request, Response } from 'express'

import { LOGIN_PATH } from '../../consts/path'

const authCheckHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (!req.user) {
    const callbackUrl = (req.query && req.query.callback) || req.originalUrl

    res.redirect(
      callbackUrl ? `${LOGIN_PATH}?callback=${callbackUrl}` : LOGIN_PATH,
    )
  } else {
    next()
  }
}

export default authCheckHandler
