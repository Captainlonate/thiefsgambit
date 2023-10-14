/**
 * Format a number to have commas in the thousands place
 * ```
 * // '1,234,567'
 * formatCommas(1234567)
 * ```
 */
export const formatCommas = (num: number | string) => (
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
)

/**
 * Starting with the largest font size, decrease it by
 * decPerChar for every digit longer than the min length.
 *
 * Example:
 * ```
 *   decFontSize(32, 1, 3, 'abcdefg') = (32 - (1 * 4)) = 28
 * ```
 */
export function decFontSize(base: number, decPerChar: number, minLength: number, str: string): number {
  const length = str.length
  const charsOverMin = (length > minLength) ? (length - minLength) : 0
  return base - (decPerChar * charsOverMin)
}

export function validateEmail(email: string): boolean {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

export function arrayIsNotEmpty<T>(arr: T[]): boolean {
  return (Array.isArray(arr) && arr.length > 0)
}