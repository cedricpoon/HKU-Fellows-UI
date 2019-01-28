export const hotPostMinIndex = 5;

export const persistStoreKey = 'hkufui.local';

const refNo = postId => `Ref No.: ${postId}`;
export const email = {
  address:'fyp18005@cs.hku.hk',
  subject: 'Report Abuse',
  ref: postId => refNo(postId),
  template: postId => `Your UID:\n\nIncident Location:\n\nIncident Details:\n\n${refNo(postId)}`
};

// eslint-disable-next-line no-undef
export const environment = process.env['NODE_ENV'];
