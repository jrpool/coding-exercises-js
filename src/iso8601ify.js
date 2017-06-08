/*
  Function declaration for iso8601ify.
  Enforced argument requirements:
    0. The argument count is 1.
    1. string is a string in any of the following formats:
      yyyy-mm-dd
      mm/dd/yy
      mm#yy#dd
      dd*mm*yyyy
      (month in words) dd, yy
      (month in words) dd, yyyy
    2. “(month in words)” must be replaced by any of the following:
      Jan
      Feb
      Mar
      Apr
      May
      Jun
      Jul
      Aug
      Sep
      Oct
      Nov
      Dec
*/
const iso8601ify = (...argument) => {
  // If the arguments are superficially valid:
  if (
    argument !== undefined
    && argument.length === 1
    && typeof argument[0] === 'string'
  ) {
    let matches;
    // Identify the date to be converted.
    const date = argument[0];
    // For each permitted format, return its conversion to ISO 8601.
    if (/^\d{4}-\d\d-\d\d$/.test(date)) {
      return date;
    }
    else if (matches = date.match(/^(\d\d)\/(\d\d)\/(\d\d)$/)) {
      const century = matches[3] > '49' ? '19' : '20';
      return century + matches[3] + '-' + matches[1] + '-' + matches[2];
    }
    else if (matches = date.match(/^(\d\d)#(\d\d)#(\d\d)$/)) {
      const century = matches[2] > '49' ? '19' : '20';
      return century + matches[2] + '-' + matches[1] + '-' + matches[3];
    }
    else if (matches = date.match(/^(\d\d)\*(\d\d)\*(\d{4})$/)) {
      return matches[3] + '-' + matches[2] + '-' + matches[1];
    }
    else {
      const months = {
        Jan: '01',
        Feb: '02',
        Mar: '03',
        Apr: '04',
        May: '05',
        Jun: '06',
        Jul: '07',
        Aug: '08',
        Sep: '09',
        Oct: '10',
        Nov: '11',
        Dec: '12'
      };
      if (matches = date.match(/^([A-Z][a-z]{2}) (\d\d), (\d\d)$/)) {
        const century = matches[3] > '49' ? '19' : '20';
        const month = months[matches[1]];
        if (month !== undefined) {
          return century + matches[3] + '-' + month + '-' + matches[2];
        }
      }
      else if (matches = date.match(/^([A-Z][a-z]{2}) (\d\d), (\d{4})$/)) {
        const month = months[matches[1]];
        if (month !== undefined) {
          return matches[3] + '-' + month + '-' + matches[2];
        }
      }
    }
  }
};

/*
  Function declaration for iso8601ifyFile.
  Preconditions:
    0. file is a text file containing 1 date per line.
    1. Each date in file complies with the argument requirements of
      iso8601ify.
*/
const iso8601ifyFile = (file) => {
  const fs = require('fs');
  // Identify the dates as a newline-delimited string.
  const dates = fs.readFileSync(file, 'utf8');
  // Initialize the result.
  let conversions = '';
  // Identify the dates as an array.
  const dateArray = dates.split('\n');
  // For each date:
  for (const date of dateArray) {
    // Append it to the result.
    conversions += (iso8601ify(date) + '\n');
  }
  // Return the result.
  return conversions;
};

export { iso8601ify as default, iso8601ifyFile };
