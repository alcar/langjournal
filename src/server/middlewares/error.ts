/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

import { NextFunction, Request, Response } from 'express'

const errorHandler = (
  err: Express.Error,
  _: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (res.headersSent) {
    next(err)
  } else if (err.stack) {
    res.status(err.status || 500).send({ error: err.stack })
  } else {
    res.sendStatus(500)
  }
}

export default errorHandler
