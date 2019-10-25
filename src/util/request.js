import 'whatwg-fetch';

/**
 * Custom error class for passing meaningful information through from server
 *
 * */
class RequestError extends Error {
  constructor(body = {}, ...params) {
    super(...params);
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RequestError);
    }
    // Custom debugging information
    this.body = body;
  }
}

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
async function parseJSON(response) {
  if (response.status === 204) {
    return {};
  }
  const body = await response.text();
  return JSON.parse(
    body
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '\\"')
      .replace(/&#39;/g, "'")
  );
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
async function checkStatus(response) {
  if (response.ok) {
    return response;
  }
  const { url, status, statusText } = response;

  ///////////////////////////////////////////////////////////////////////////
  // Avoid throwing RequestError exception with the body if body is undefined.
  // 404 returns incorrectly formatted json causing response.json() to
  //  throw an exception.
  ///////////////////////////////////////////////////////////////////////////

  const body = await response.json();
  if (Object.keys(body).length) {
    throw new RequestError({ body, status, statusText, url }, statusText);
  } else {
    throw new RequestError({ status, statusText, url }, statusText);
  }
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON);
}

export function downloadFile(url, options) {
  return fetch(url)
    .then(checkStatus)
    .then(response => response.blob());
}
