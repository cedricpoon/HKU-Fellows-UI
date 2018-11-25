import {
  getCoursePathById,
  getCoursePathByIndex,
  getIndexByBreadcrumb
} from './helper';

const dummyCourses = [{ id: 'a', title: 'A', children: [{ id: 'b', title: 'B' }] }];
const nestedCourse = [
  {
    id: 'a',
    title: 'A',
    children: [
      {
        id: 'b',
        title: 'B',
        children: [
          {
            id: 'c',
            title: 'C',
            children: [
              {
                id: 'd',
                title: 'D'
              }
            ]
          }
        ]
      },
      {
        id: 'b2',
        title: 'B2',
        children: [
          {
            id: 'c2',
            title: 'C2',
            children: [
              {
                id: 'd2',
                title: 'D2'
              }
            ]
          }
        ]
      }
    ]
  }
];

describe('Testing getCoursePathByIndex(courses, parentId, index)', () => {

  it('returns empty array with empty courses', () => {
    expect(getCoursePathByIndex([], '', 0)).toEqual([]);
  });

  it('returns path with matching index and parentId', () => {
    expect(getCoursePathByIndex(dummyCourses, 'a', 0)).toEqual([
      { id: 'a', title: 'A'},
      { id: 'b', title: 'B'}
    ]);
  });

  it('returns path with first level index', () => {
    expect(getCoursePathByIndex(dummyCourses, '', 0)).toEqual([
      { id: 'a', title: 'A'}
    ]);
  });

  it('returns path with deep nested index', () => {
    expect(getCoursePathByIndex(nestedCourse, 'c2', 0)).toEqual([
      { id: 'a', title: 'A'},
      { id: 'b2', title: 'B2'},
      { id: 'c2', title: 'C2'},
      { id: 'd2', title: 'D2'}
    ]);
  });

  it('returns empty array with failed query', () => {
    expect(getCoursePathByIndex([], 'c', 0)).toEqual([]);
  });
});

describe('Testing getCoursePathById(courses, id)', () => {

  it('returns empty array with empty courses', () => {
    expect(getCoursePathById([], '')).toEqual([]);
  });

  it('returns path with matching id', () => {
    expect(getCoursePathById(dummyCourses, 'b')).toEqual([
      { id: 'a', title: 'A'},
      { id: 'b', title: 'B'}
    ]);
  });

  it('returns path with first level index', () => {
    expect(getCoursePathById(dummyCourses, 'a')).toEqual([
      { id: 'a', title: 'A'}
    ]);
  });

  it('returns path with deep nested index', () => {
    expect(getCoursePathById(nestedCourse, 'd2')).toEqual([
      { id: 'a', title: 'A'},
      { id: 'b2', title: 'B2'},
      { id: 'c2', title: 'C2'},
      { id: 'd2', title: 'D2'}
    ]);
  });

  it('returns empty array with failed query', () => {
    expect(getCoursePathById([], 'c')).toEqual([]);
  });
})

describe('Testing getIndexByBreadcrumb(courses, breadcrumb, pid)', () => {

  it('returns undefined with empty breadcrumb', () => {
    expect(getIndexByBreadcrumb(dummyCourses, [], '')).toBeUndefined();
  });

  it('returns index with breadcrumb', () => {
    expect(getIndexByBreadcrumb(dummyCourses, [{id: 'a', title: 'A'}], '')).toBe(0);
  });
});
