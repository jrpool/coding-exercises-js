import queryJson from 'query-json';

/*
  Function declaration for jsonSearch and export statement making that
  function the default export from this module.
  Enforced argument requirements:
    0. The argument count is 2.
    1. json is an object compliant with JSON specifications.
    2. value is a number or a string.
*/
export default function jsonSearch(json, value) {
  // If the arguments are valid:
  if (
    arguments.length === 2
    && typeof json === 'object'
    && ! Array.isArray(json)
    && (typeof value === 'number' || typeof value === 'string')
  ) {
    // Return the path to the value.
    return queryJson.search(json, value).join(' -> ');
  }
}
