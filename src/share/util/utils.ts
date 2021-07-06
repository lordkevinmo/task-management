/**
 * Checks if the given argument is undefined
 * @param obj is the argument provides by the user. obj is any type.
 * @returns true if the argument is undefined and false otherwise.
 */
export function isUndefined(obj: any): boolean {
  return typeof obj === 'undefined';
}
