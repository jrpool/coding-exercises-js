/*
  Function declaration for iso8601ify and export statement making that
  function the default export from this module.
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
export default function iso8601ify(string) {
  // If the arguments are superficially valid:
  if (
    arguments.length === 1
    && typeof string === 'string'
  ) {
    let matches;
    // For each permitted format, return its conversion to ISO 8601.
    if (/^\d{4}-\d\d-\d\d$/.test(string)) {
      return string;
    }
    else if (matches = string.match(/^(\d\d)\/(\d\d)\/(\d\d)$/)) {
      const century = matches[3] > '49' ? '19' : '20';
      return century + matches[3] + '-' + matches[1] + '-' + matches[2];
    }
    else if (matches = string.match(/^(\d\d)#(\d\d)#(\d\d)$/)) {
      const century = matches[2] > '49' ? '19' : '20';
      return century + matches[2] + '-' + matches[1] + '-' + matches[3];
    }
    else if (matches = string.match(/^(\d\d)\*(\d\d)\*(\d{4})$/)) {
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
      if (matches = string.match(/^([A-Z][a-z]{2}) (\d\d), (\d\d)$/)) {
        const century = matches[3] > '49' ? '19' : '20';
        const month = months[matches[1]];
        if (month !== undefined) {
          return century + matches[3] + '-' + month + '-' + matches[2];
        }
      }
      else if (matches = string.match(/^([A-Z][a-z]{2}) (\d\d), (\d{4})$/)) {
        const month = months[matches[1]];
        if (month !== undefined) {
          return matches[3] + '-' + month + '-' + matches[2];
        }
      }
    }
  }
}
