import { environment } from './index';

const protocol = environment === 'development' ? 'http' : 'https';

const baseUrl = environment === 'development' ? 'localhost:8080' : 'api.hkufellows.ga';

export const login = {
  password: () => '/login/password',
  passphrase: () => '/login/passphrase',
  validate: () => '/login/validate'
}

export const post = ({ code, index, time, filter }) => {
  const filterQS = filter !== null ? `&filter=${filter}` : '';
  return `/post/${code}/${index}?time=${time}${filterQS}`;
};

export const view = ({ topicId }) => `/view/${topicId}`;

export const profile = {
  temperature: () => '/profile/temperature'
}

export const vote = {
  up: ({ postId }) => `/vote/${postId}/up`,
  down: ({ postId }) => `/vote/${postId}/down`,
}

export const link = (path) => `${protocol}://${baseUrl}${path}`
