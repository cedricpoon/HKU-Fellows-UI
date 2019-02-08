export function classifyQuery (query) {
  // this method should return either keyword object or solid query string
  if (query && /^#.*[^# ]$/.test(query)) {
    // keyword pattern: '#xxx#yyy'
    const keywords = query.replace(/ /g, '').split('#').filter(Boolean);
    return {
      primary: keywords[0],
      ...(keywords[1] && { secondary: keywords[1] })
    }
  } else {
    // query pattern: 'xxxyyy'
    return query;
  }
}
