import { clsx } from "clsx"
import { Octokit } from "octokit";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}



/**
 * @param string A string (in kebab or snake case) to be converted to title case.
 * @returns The input string formatted to lower case.
 * transactions__today-tomorrow becomes transactions today tomorrow
 * https://stackoverflow.com/a/64489760/15063835
 */
export function convertKebabAndSnakeToLowerCase(string) {
  if (!string || typeof string !== 'string') {
    return '';
  }

  // Remove hyphens and underscores
  const formattedString = string
    .replace(/^[-_]*(.)/, (_, c) => c.toUpperCase())
    .replace(/[-_]+(.)/g, (_, c) => ' ' + c.toUpperCase());
  return formattedString.toLowerCase();
}



/**
 * Github official query libraray octokit
 * https://docs.github.com/en/rest/using-the-rest-api/libraries-for-the-rest-api?apiVersion=2022-11-28
 */
export const octokit = new Octokit({
  auth: import.meta.env.VITE_GITHUB_SECRET
})



// Usage example
export function validateRepoName(name) {
  // Regular expression to match GitHub repository naming pattern
  const regex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
  return regex.test(name);
}

