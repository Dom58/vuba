import React, { useContext, useState } from 'react';
import { Container, Divider } from 'semantic-ui-react';
import jwtDecode from 'jwt-decode';
import { useMutation } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import lang from '../utils/translations';
import { AuthContext } from '../context/auth';
import { CREATE_USER } from '../graphql/mutations/users';
import displayError from '../helpers/displayError';
import SignupForm from '../components/SignupForm';
import MainHeader from '../components/MainHeader';
import Footer from '../components/Footer';

function Signup() {
  const history = useHistory();
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const [variables, setVariables] = useState({
    fullName: '',
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

  const [createUser] = useMutation(CREATE_USER, {
    update(
      proxy,
      {
        data: {
          createUser: { token, message },
        },
      },
    ) {
      toast.success(message);
      setLoading(false);
      context.login({ ...jwtDecode(token), token });

      return token ? history.push('/') : null;
    },
    onError(err) {
      if (err) {
        const onerr = err.graphQLErrors[0].message.split(',');
        setErrors(onerr);
        displayError(err);
      }
      setLoading(false);
    },
    variables: { ...variables },
  });

  const handleSubmit = async () => {
    const {
      fullName,
      password,
    } = variables;

    if (fullName.length < 4) {
      toast.error(
        `${lang.t('Full name must be atleast four characters!!')}`,
      );
    } else if (password.length < 6) {
      toast.error(
        `${lang.t(
          'Password should not be less than six characters!',
        )}`,
      );
    } else {
      setLoading(true);
      createUser();
    }
  };

  return (
    <>
      <MainHeader />
      <Container>
        <Divider hidden/>

         <SignupForm
          loading={ loading }
          onChangeHandle = {onChangeHandle }
          handleSubmit= {handleSubmit }
          variables= { variables }
         />

      </Container>
      
      <br />
      <Footer />
    </>
  );
}

export default Signup;
