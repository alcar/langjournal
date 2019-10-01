/* eslint-disable notice/notice */

/*
 * Temporary fix for https://github.com/microsoft/TypeScript/issues/17002
 * Source: https://stackoverflow.com/questions/56248618/how-to-check-if-an-object-is-a-readonly-array-in-typescript/56249765#56249765
 */

interface ArrayConstructor {
  isArray(arg: ReadonlyArray<unknown> | unknown): arg is ReadonlyArray<unknown>
}
