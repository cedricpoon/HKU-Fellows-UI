import { classifyQuery } from './helper';

describe('Testing classifyQuery(array)', () => {
  it('returns same string', () => {
    expect(classifyQuery('apple')).toEqual('apple');
  });

  it('returns primary hashtag', () => {
    expect(classifyQuery('#apple')).toEqual({ primary: 'apple' });
  });

  it('returns primary and secondary hashtag', () => {
    expect(classifyQuery('#apple #orange')).toEqual({ primary: 'apple', secondary: 'orange' });
  });

  it('remove extra spaces in hashtag', () => {
    expect(classifyQuery('#     apple')).toEqual({ primary: 'apple' });
  });

  it('returns same string for misformatted hastag', () => {
    expect(classifyQuery('#####')).toEqual('#####');
  });
});
