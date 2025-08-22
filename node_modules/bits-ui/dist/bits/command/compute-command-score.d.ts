/**
 * Given a command, a search query, and (optionally) a list of keywords for the command,
 * computes a score between 0 and 1 that represents how well the search query matches the
 * abbreviation and keywords. 1 is a perfect match, 0 is no match.
 *
 * The score is calculated based on the following rules:
 * - The scores are arranged so that a continuous match of characters will result in a total
 * score of 1. The best case, this character is a match, and either this is the start of the string
 * or the previous character was also a match.
 * - A new match at the start of a word scores better than a new match elsewhere as it's more likely
 * that the user will type the starts of fragments.
 * - Word jumps between spaces are scored slightly higher than slashes, brackets, hyphens, etc.
 * - A continuous match of characters will result in a total score of 1.
 * - A new match at the start of a word scores better than a new match elsewhere as it's more likely that the user will type the starts of fragments.
 * - Any other match isn't ideal, but we include it for completeness.
 * - If the user transposed two letters, it should be significantly penalized.
 * - The goodness of a match should decay slightly with each missing character.
 * - Match higher for letters closer to the beginning of the word.
 *
 * @param command - The value to score against the search string (e.g. a command name like "Calculator")
 * @param search - The search string to score against the value/aliases
 * @param commandKeywords - An optional list of aliases/keywords to score against the search string - e.g. ["math", "add", "divide", "multiply", "subtract"]
 * @returns A score between 0 and 1 that represents how well the search string matches the
 * command (and keywords)
 */
export declare function computeCommandScore(command: string, search: string, commandKeywords?: string[]): number;
