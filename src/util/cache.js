/**
 * Constructs a string by which to store and retrieve requests in cache
 *
 * @param  {string} requestType e.g. GET
 * @param  {string} resourceType e.g. PROJECTS
 * @param  {object} [options] options used by the request e.g. {id: 1, query: '&concise=true'}
 *
 * @return {string} A string identifier with options appended alphabetically, e.g. GET/PROJECTS?concise=true&id=1
 */
export const buildCacheString = (requestType, resourceType, options = {}) =>
  Object.keys(options)
    .sort()
    .reduce((cacheString, option, i, allKeys) => {
      const optionString = !!options[option]
        ? `${option}=${options[option]}`
        : '';
      return `${cacheString}${optionString}${
        i === allKeys.length - 1 ? '' : '&'
      }`;
    }, `${requestType}/${resourceType}?`);
