export const formBreadcrumbString = (breadcrumbArray) => {
  if (breadcrumbArray.length === 0)
    return;

  var retn = '';
  const seperator = ' / ';

  breadcrumbArray.forEach((item) => {
    if (retn !== '')
      retn += seperator;
    retn += item.title
  });

  return retn;
}
