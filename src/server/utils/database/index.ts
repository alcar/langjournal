/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

import { Cursor, Db, DeleteWriteOpResultObject, ObjectId } from 'mongodb'

import Entry from '../../../typings/entry'
import User from '../../../typings/user'

import Typings from './typings'

export const collections = {
  ENTRIES: 'entries',
  USERS: 'users',
}

export const userFields = {
  AUTH: 'auth',
}

export const deleteOne = (
  collection: string,
  filter: object,
  db: Db,
): Promise<DeleteWriteOpResultObject> =>
  db.collection(collection).deleteOne(filter)

export const getDateTimeSort = (isAscending = false): Typings.DateTimeSort => ({
  dateTime: isAscending ? 1 : -1,
})

const getEntryFilter = (entryId: Entry.Id): Typings.EntryFilter => ({
  _id: new ObjectId(entryId),
})

export const getUserFilter = (userId: User.Id): Typings.UserFilter => ({
  userId: new ObjectId(userId),
})

export const getEntryAndUserFilter = (
  entryId: Entry.Id,
  userId: User.Id,
): Typings.EntryFilter & Typings.UserFilter => ({
  ...getEntryFilter(entryId),
  ...getUserFilter(userId),
})

export const insertOne = async <T>(
  collection: string,
  obj: object,
  db: Db,
): Promise<T> => {
  const response = await db.collection(collection).insertOne(obj)

  return response.ops[0]
}

export const findMany = <T>(
  collection: string,
  filter: object,
  limit = 0,
  skip = 0,
  sort: object = {},
  db: Db,
): Cursor<T> =>
  db
    .collection(collection)
    .find(filter)
    .limit(limit)
    .skip(skip)
    .sort(sort)

export const findOne = <T>(
  collection: string,
  filter: object,
  db: Db,
): Promise<T | null> => db.collection(collection).findOne(filter)

export const replaceOne = async <T>(
  collection: string,
  filter: object,
  obj: object,
  db: Db,
): Promise<T> => {
  const response = await db.collection(collection).replaceOne(filter, obj)

  return response.ops[0]
}

export const wasDeleteSuccessful = (
  response: DeleteWriteOpResultObject,
  count: number,
): boolean => response.deletedCount === count
