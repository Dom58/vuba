import { toast } from 'react-toastify';

import lang from '../utils/translations';

export default error => {
  if (error.graphQLErrors && error.graphQLErrors.length) {
    error.graphQLErrors.forEach(({ message, extensions }) => {
      if (extensions && extensions.errors) {
        Object.keys(extensions.errors).forEach(key =>
          toast.error(extensions.errors[key]),
        );
      } else {
        toast.error(message);
      }
    });
  } else {
    toast.error(lang.t('Network error'));
  }
};
