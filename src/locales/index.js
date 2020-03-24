import en from './en';
import rw from './rw';
import fr from './fr';

const translate = (content, lang) => {
  switch (lang) {
    case 'rw':
      if (!rw[content]) {
        throw new Error(`No translate for *${content}* -> ${lang}`);
      }
      return en[content];

    case 'en':
      if (!en[content]) {
        throw new Error(`No translation for *${content}* -> ${lang}`);
      }
      return en[content];

    case 'fr':
      if (!fr[content]) {
        throw new Error(`No translation for *${content}* -> ${lang}`);
      }
      return en[content];

    default:
      if (!en[content]) {
        throw new Error(`No translation for *${content}* -> ${lang}`);
      }
      return en[content];
  }
};

export default translate;
