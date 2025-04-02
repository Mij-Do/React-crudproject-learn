/**
 * Truncates a given text to a specified maximum length and appends "..." if truncated.
 *
 * @param {string} txt - The text to be truncated.
 * @param {number} [max=50] - The maximum allowed length before truncation (default is 50).
 * @returns {string | undefined} The truncated text with "..." appended, or undefined if no truncation is needed.
 */

export function txtSlices (txt: string, max: number = 50) {
    if (txt.length >= max) {
        return `${txt.slice(0, max)}...`;
    }
}