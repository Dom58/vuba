import translate from '../locales';

export const NOT_FOUND = lang => translate('Not found', lang);
export const NOT_REMOVED = lang => translate('Not removed', lang);
export const NOT_DELETED = lang => translate('Not deleted', lang);
export const NOT_MODIFIED = lang => translate('Not modified', lang);
export const INVALID_TOKEN = lang =>
  translate('Failed to authenticate token', lang);
export const NOT_AUTHENTICATED = lang =>
  translate("You're not authenticated!", lang);
export const NOT_SIGNED_IN = lang => translate('Please, sign-in!', lang);
export const CONFLICT = lang => translate('already used', lang);
export const UNEXPECTED_ERROR = lang =>
  translate('Oops, something went wrong', lang);
export const ACCOUNT_NOT_VERIFIED = lang =>
  translate('This account is not verified', lang);
export const EMAIL_REQUIRED = lang => translate('Email is required', lang);
export const NAME_REQUIRED = lang =>
  translate('Name is required (4 characters minimum)', lang);
export const ONLY_LETTERS_ALLOWED = lang =>
  translate('Only letters are allowed', lang);
export const INVALID_EMAIL = lang => translate('Invalid email', lang);
export const INVALID_PASSWORD = lang => translate('Invalid password', lang);
export const USER_NOT_FOUND = lang => translate('User not found', lang);
export const PASSWORD_NOT_MATCH = lang =>
  translate('Password did not match. Please try again!', lang);
export const INVALID_DATE_RANGE = lang =>
  translate('The starting date can not be greater than the ending date', lang);
export const NOT_AUTHORIZED = lang => translate('Access denied!', lang);

export const PROJECT_NOT_FOUND = lang => translate('Project not found!', lang);
export const CONTACT_NOT_FOUND = lang => translate('Feedback not found!', lang);
export const CATEGORY_NOT_FOUND = lang => translate('Category not found!', lang);
