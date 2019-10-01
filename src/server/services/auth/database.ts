/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

import { Db } from 'mongodb'

import User from '../../../typings/user'

import {
  collections,
  findOne,
  insertOne,
  userFields,
} from '../../utils/database'

export const findAuthData = (
  authFilter: User.AuthData,
  db: Db,
): Promise<User.AuthData | null> =>
  findOne<User.AuthData>(
    collections.USERS,
    { [userFields.AUTH]: authFilter },
    db,
  )

export const insertAuthData = (
  authData: User.AuthData,
  db: Db,
): Promise<User.AuthData> =>
  insertOne<User.AuthData>(
    collections.USERS,
    { [userFields.AUTH]: authData },
    db,
  )
