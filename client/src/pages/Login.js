import React, { useContext, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container, Divider } from 'semantic-ui-react';
import lang from '../utils/translations';
import { AuthContext } from '../context/auth';
import { LOGIN_USER } from '../graphql/mutations/users';
import LoginForm from '../components/LoginForm';
import displayError from '../helpers/displayError';
import MainHeader from '../components/MainHeader';

function Login(props) {
  const history = useHistory();
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const [variables, setVariables] = useState({
    email: '',
    password: '',
  });

  const onChangeHandle = ({ target: { name, value } }) => {
    setVariables({
      ...variables,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const [loginUser] = useMutation(LOGIN_USER, {
    update(
      proxy,
      {
        data: {
          loginUser: { token },
        },
      },
    ) {
      toast.success(`${lang.t('Welcome Back!')}`);

      setLoading(false);
      context.login({ ...jwtDecode(token), token });

      // const { location } = props;
      // if (location.state.from && location.state.from['pathname']) {
      //   return (window.location.href = location.state.from.pathname);
      // }

      // if (location.state.from !== '') {
      //   return (window.location.href = location.state.from);
      // }

      return token ? history.push('/') : null;
    },
    onError(err) {
      if (err) {
        let onerr = err.graphQLErrors[0].message.split(',');
        setErrors(onerr);
        displayError(err);
      }
      setLoading(false);
    },
    variables: { ...variables },
  });

  const handleSubmit = async () => {
    setLoading(true);
    loginUser();
  };

  return (
    <>
      <MainHeader {...props} />
      <Container>
        <Divider hidden/>

         <LoginForm 
          loading={ loading }
          onChangeHandle = {onChangeHandle }
          handleSubmit= {handleSubmit }
          variables= { variables }
         />
         
      </Container>
      
      <br />
      {/* <Footer /> */}
    </>
  );
}

export default Login;
