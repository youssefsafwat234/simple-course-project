
/**
 * Slice a given text to a specified limit, and append '...' if the text is longer than the limit.
 * @param {string} text - The text to be sliced.
 * @param {number} [limit=50] - The maximum length of the returned text.
 * @returns {string} - The sliced text.
 */
export function sliceText(text: string, limit: number = 50) {
    return text.length > limit ? text.slice(0, limit) + '...' : text;
}