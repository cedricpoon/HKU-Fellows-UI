import { environment } from './index';

const protocol = environment === 'development' ? 'http' : 'https';

const baseUrl = environment === 'development' ? 'localhost:8080' : 'api.hkufellows.ga';

export const login = {
  password: '/login/password',
  passphrase: '/login/passphrase',
  validate: '/login/validate'
}

export const post = ({ code, index }) => `/post/${code}/${index}`;

export const link = (path) => `${protocol}://${baseUrl}${path}`
