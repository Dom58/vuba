import { useState } from 'react';

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);
  const onChangeHandle = e =>
    setValues({ ...values, [e.target.name]: e.target.value });
  const onSubmitHandle = e => {
    e.preventDefault();
    callback();
  };

  return {
    onChangeHandle,
    onSubmitHandle,
    values,
  };
};
