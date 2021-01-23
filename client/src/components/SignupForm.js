import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { showOnePassword } from '../helpers/showPasswords';
import lang from '../utils/translations';
import PropTypes from 'prop-types';

const SignupForm = ({
  variables,
  loading,
  onChangeHandle,
  handleSubmit,
}) => {
  return (
    <Form.Field>
      <div className="contact-us-divs">
      <div className="form-inputs" id="auth">
          <h1 style={{fontSize: '40px', color: '#f36405'}}>SUBSCRIBE</h1>
          <p>{lang.t('Full Name')}: </p>
          <input
            placeholder="Full Name..."
            name="fullName"
            type="text"
            onChange={onChangeHandle}
            value={variables.fullName}
          />

          <p>Email: </p>
          <input
            placeholder="Eg: username@examples.com"
            name="email"
            type="email"
            onChange={onChangeHandle}
            value={variables.email}
          />

          <p>Password: </p>
          <input
            placeholder="Password..."
            name="password"
            type="password"
            id="password"
            onChange={onChangeHandle}
            value={variables.password}
          />

          <Form.Checkbox
            name="show_password"
            label={lang.t('Show Password')}
            onClick={() => showOnePassword()}
          />

          <Button
            type="button"
            loading={loading}
            onClick={() => !loading && handleSubmit()}
          > 
          <i className="send icon"></i> {lang.t('SUBSCRIBE')}
          </Button>
          <h3>
            Have an account? <Link to="/auth/login"> Login Here</Link>
          </h3>
        </div>
      </div>
    </Form.Field>
  );
};

SignupForm.propTypes = {
  variables: PropTypes.instanceOf(Object),
  loading: PropTypes.bool,
  onChangeHandle: PropTypes.func,
  handleSubmit: PropTypes.func,
};

SignupForm.defaultProps = {
  variables: {},
  loading: true,
  onChangeHandle: () => true,
  handleSubmit: () => true,
};

export default withTranslation() (SignupForm);
