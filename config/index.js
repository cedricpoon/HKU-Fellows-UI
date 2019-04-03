export const hotPostMinIndex = 5;

export const persistStoreKey = 'hkufui.local';

export const cipherKey = 'DoNotGoGentleIntoThatGoodNight';

const refNo = postId => `Ref No.: ${postId}`;
export const email = {
  address:'fyp18005@cs.hku.hk',
  subject: 'Report Abuse',
  ref: postId => refNo(postId),
  template: (uid, postId) => `Your UID: ${uid}\n\nIncident Location:\n\nIncident Details:\n\n${refNo(postId)}`
};

export const deepLink = {
  prefix: 'fellows://',
  post: i => `post/${i}`
};

export const markdownTutorialLink = 'https://guides.github.com/features/mastering-markdown/';

export const settings = 'app-settings:';

// eslint-disable-next-line no-undef
export const environment = process.env['NODE_ENV'];
