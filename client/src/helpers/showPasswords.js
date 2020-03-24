export const showPasswords = () => {
  const passwordShow = document.querySelector('#password');
  const newPasswordShow = document.querySelector('#newPassword');
  const confirmPasswordShow = document.querySelector(
    '#confirm_password',
  );

  if (passwordShow.type === 'password') {
    passwordShow.type = 'text';
    newPasswordShow.type = 'text';
    confirmPasswordShow.type = 'text';
  } else {
    passwordShow.type = 'password';
    newPasswordShow.type = 'password';
    confirmPasswordShow.type = 'password';
  }
};

export const showTwoPasswords = () => {
  const newPasswordShow = document.querySelector('#newPassword');
  const confirmPasswordShow = document.querySelector(
    '#confirm_password',
  );

  if (newPasswordShow.type === 'password') {
    newPasswordShow.type = 'text';
    confirmPasswordShow.type = 'text';
  } else {
    newPasswordShow.type = 'password';
    confirmPasswordShow.type = 'password';
  }
};

export const showOnePassword = () => {
  const passwordShow = document.querySelector('#password');

  if (passwordShow.type === 'password') {
    passwordShow.type = 'text';
  } else {
    passwordShow.type = 'password';
  }
};
