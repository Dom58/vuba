import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react';
import { withTranslation } from 'react-i18next';
import { showOnePassword } from '../helpers/showPasswords';
import lang from '../utils/translations';
import PropTypes from 'prop-types';

const LoginForm = ({
  variables,
  loading,
  onChangeHandle,
  handleSubmit,
}) => {
  return (
    <Form.Field>
      <div className="contact-us-divs">
        <div className="form-inputs">
          <p>Email: </p>
          <input
            placeholder="Email..."
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
            onChange={onChangeHandle}
            value={variables.password}
            id="password"
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
            {lang.t('LOGIN')}
          </Button>
          <h3>
            New User? <Link to="/auth/signup">Subscribe Here</Link>
          </h3>
        </div>
      </div>
    </Form.Field>
  );
};

LoginForm.propTypes = {
  variables: PropTypes.instanceOf(Object),
  loading: PropTypes.bool,
  onChangeHandle: PropTypes.func,
  handleSubmit: PropTypes.func,
};

LoginForm.defaultProps = {
  variables: {},
  loading: true,
  onChangeHandle: () => true,
  handleSubmit: () => true,
};
export default withTranslation()(LoginForm);
