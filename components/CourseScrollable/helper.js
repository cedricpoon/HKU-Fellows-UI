export function getCoursePathByIndex(courses, parentId, index) {
  const transverse = (list, id) => {
    var retn = [];
    list.forEach((item) => {
      if (item.id === id) {
        if (index !== null && item.children && item.children.length > index)
          retn.unshift({
            id: item.children[index].id,
            title: item.children[index].title
          });
        retn.unshift({ id: item.id, title: item.title });
      } else if (item.children && retn.length == 0) {
        retn = transverse(item.children, id);
        if (retn.length != 0) {
          retn.unshift({ id: item.id, title: item.title });
        }
      }
    });
    return retn;
  };

  if (parentId === '') {
    return transverse([{ id: '', title: '', children:courses }], parentId).slice(1);
  } else
    return transverse(courses, parentId);
}

export function getCoursePathById(courses, id) {
  return getCoursePathByIndex(courses, id, null);
}

function getIndexByCourseId(courses, id, pid) {
  var parent;

  const transverse = (list, id, prev) => {
    list.forEach((item) => {
      if (item.id == id)
        parent = prev;
      else if (item.children && !parent) {
        transverse(item.children, id, item);
      }
    });
  };

  transverse(courses, id, {});
  if (parent && Object.keys(parent).length === 0 && pid == '')
    return courses.indexOf(courses.filter(item => item.id === id)[0]);
  else if (parent && parent.id === pid) {
    return parent.children.indexOf(parent.children.filter(item => item.id === id)[0]);
  }
  else
    return;
}

export function getIndexByBreadcrumb(courses, breadcrumb, pid) {
  var result;
  breadcrumb.forEach(item => {
    let retn = getIndexByCourseId(courses, item.id, pid);
    if (typeof retn !== 'undefined')
      result = retn;
  });
  return result;
}
