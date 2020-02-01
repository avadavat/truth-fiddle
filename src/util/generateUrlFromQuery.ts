// Given a query string, like 'p and q', returns the url
// 'truthfiddle.com?q=p%20and%20q'.
// Appends the ?q parameter to the base url and then URI encodes the string.
export function generateUrlFromQuery(query: string): string {
  const baseURL = window.location.host;
  const url = baseURL + '?q=' + query;
  return encodeURI(url);
}
