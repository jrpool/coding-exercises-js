const valueSearch = (object, value) => {
  for (const key in Object.keys(object)) {
    if (object[key] === value) {
      return [key];
    }
    else {
      if (typeof(object[key]) === 'object') {
        const childKeys = valueSearch(object[key], value);
        if (childKeys !== undefined) {
          return [key].concat(childKeys);
        }
      }
    }
  }
};

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
    return valueSearch(json, value).join(' -> ');
  }
}
