import React, { useReducer, createContext } from 'react';
import jwtDecode from 'jwt-decode';
import Jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const initialState = {
  user: null,
};
const getToken = localStorage.getItem('token');
if (getToken) {
  const decodeToken = jwtDecode(getToken);
  if (decodeToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('token');
  } else {
    initialState.user = decodeToken;
  }
}
const AuthContext = createContext({
  user: null,
  login: userData => {},
  setUpdateUserInfo: userData => {},
  logout: () => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'SET_UPDATE_USER_INFO':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  function login(userData) {
    localStorage.setItem('token', userData.token);
    dispatch({
      type: 'LOGIN',
      payload: userData,
    });
  }

  function setUpdateUserInfo(userData) {
    const newToken = Jwt.sign(
      userData,
      `${process.env.REACT_APP_SECRET_JWT_KEY}`,
      { expiresIn: '24h' },
    );
    localStorage.setItem('token', newToken);
    dispatch({
      type: 'SET_UPDATE_USER_INFO',
      payload: userData,
    });
  }

  function logout() {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  }

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout, setUpdateUserInfo }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
