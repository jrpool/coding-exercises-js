/*
  Function declaration for symlinks and export statement making that
  function the default export from this module.
  Enforced argument requirements:
    0. The argument count is 1.
    1. string is a string containing newline-delimited specifications:
      1.0. a link count.
      1.1. links equal in count to the link count and in alphabetical order.
      1.2. for each link,a pointer and a target, colon-delimited.
      1.3. after the links, a path.
*/
export default function symlinks(string) {
  // If the arguments are superficially valid:
  if (
    arguments.length === 1
    && typeof string === 'string'
  ) {
    // Identify an array of the newline-delimited segments of string.
    const segments = string.split('\n');
    // Identify the segment count.
    const segmentCount = segments.length;
    /*
      If there are fewer than 2 segments or segment 0 is incompatible with
      the segment count:
    */
    if (segmentCount < 2 || segments[0] != segmentCount - 2) {
      // Return a failure.
      return undefined;
    }
    // Otherwise, i.e. if there are a stated and valid count of segments:
    else {
      // For each link:
      for (let i = 1; i < segmentCount - 1; i++) {
        // If its format is invalid:
        if (! /^[^:]+:[^:]+$/.test(segments[i])) {
          // Return a failure.
          return undefined;
        }
        /*
          If it is not the first link and its pointer does not follow the
          previous link’s pointer in alphabetical order
        */
        if (
          i > 1 && segments[i].split(':')[0] <= segments[i - 1].split(':')[0]
        ) {
          // Return a failure.
          return undefined;
        }
      }
      // Initialize a table of link pointers and targets.
      const links = {};
      // For each link:
      for (let j = 1; j < segmentCount - 1; j++) {
        // Identify its pointer and its target.
        const linkParts = segments[j].split(':');
        // Populate the table.
        links[linkParts[0]] = linkParts[1];
      }
      // Initialize the link cycles as productive.
      let productive = true;
      // As long as the last cycle was productive:
      while (productive) {
        // Initialize the cycle as unproductive.
        productive = false;
        // For each link A:
        for (const linkA in links) {
          // For each link B:
          for (const linkB in links) {
            // If the links are not the same one:
            if (linkB !== linkA) {
              // If B can change A:
              if (links[linkA].startsWith(linkB)) {
                // Replace the matching start of the segment.
                links[linkA]
                  = links[linkB] + links[linkA].slice(linkB.length);
                // If B has made A point to itself:
                if (links[linkA] === linkA) {
                  // Return a failure.
                  return undefined;
                }
                // Identify the cycle as productive.
                productive = true;
              }
            }
          }
        }
      }
      // Initialize the path cycles as productive.
      productive = true;
      // As long as the last cycle was productive:
      while (productive) {
        // Initialize the cycle as unproductive.
        productive = false;
        // For each link:
        for (const link in links) {
          // If it can change the path:
          if (segments[segments.length - 1].startsWith(link)) {
            // Replace the matching start of the segment.
            segments[segments.length - 1]
              = links[link]
              + segments[segments.length - 1].slice(link.length);
            // Identify the cycle as productive.
            productive = true;
          }
        }
      }
      // Return the converted path.
      return segments[segmentCount - 1];
    }
  }
}
