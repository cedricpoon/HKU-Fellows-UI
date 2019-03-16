import { noZ } from './helper';

describe('Test noZ for ISO format', () => {
  const isoTimeFormat = '2019-03-15T21:22:24.000Z';
  const newDateFormat = 'Fri, 15 Mar 2019, 9:17 PM';

  it('removes ISO time format Z', () => {
    expect(noZ(isoTimeFormat)).toEqual(isoTimeFormat.slice(0, -1));
  });

  it('does nothing to other time format', () => {
    expect(noZ(newDateFormat)).toEqual(newDateFormat);
  });

  it('does nothing to non timestamp string', () => {
    expect(noZ('abc')).toEqual('abc');
  });
});
