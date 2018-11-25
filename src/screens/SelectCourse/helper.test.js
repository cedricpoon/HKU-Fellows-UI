import { formBreadcrumbString } from './helper';

describe('Testing formBreadcrumbString(array)', () => {

  it('returns null with empty array', () => {
    expect(formBreadcrumbString([])).toBeUndefined();
  });

  it('returns string with array', () => {
    expect(
      typeof formBreadcrumbString([{ id: 0, title: 'a' }]
    )).toBe('string');
  });
});
