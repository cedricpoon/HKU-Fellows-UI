import enHK from './en-hk';

const localization = {
  'en-hk': enHK
};

export const localize = ({ language, country }) => {
  return localization[`${language.toLowerCase()}-${country.toLowerCase()}`] ?
    localization[`${language.toLowerCase()}-${country.toLowerCase()}`] : {};
};

export default { localize };
