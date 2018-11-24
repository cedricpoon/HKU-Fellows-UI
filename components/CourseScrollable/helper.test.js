import {
  getCoursePathById,
  getCoursePathByIndex
} from './helper';

describe('Testing getCoursePathByIndex(courses, parentId, index)', () => {
  const dummyCourses = [{ id: 'a', title: 'A', children: [{ id: 'b', title: 'B' }] }];

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

  it('returns empty array with failed query', () => {
    expect(getCoursePathByIndex([], 'c', 0)).toEqual([]);
  });
});

describe('Testing getCoursePathById(courses, id)', () => {
  const dummyCourses = [{ id: 'a', title: 'A', children: [{ id: 'b', title: 'B' }] }];

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
    expect(getCoursePathByIndex(dummyCourses, 'a')).toEqual([
      { id: 'a', title: 'A'}
    ]);
  });

  it('returns empty array with failed query', () => {
    expect(getCoursePathByIndex([], 'c')).toEqual([]);
  });
})
