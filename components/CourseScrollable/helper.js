export const getCoursePathByIndex = (courses, parentId, index) => {

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
};

export const getCoursePathById = (courses, id) => {
  return getCoursePathByIndex(courses, id, null);
}
