import React, {useContext, useState} from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import { withTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import 'react-notifications-component/dist/theme.css';
import lang from '../utils/translations';
import { AuthContext } from '../context/auth';
import displayError from '../helpers/displayError';
import { CREATE_CONTACT } from '../graphql/mutations/contacts';

const ContactUsForm = () => {
  const history = useHistory();
  const {user} = useContext(AuthContext);
  const [variables, setVariables] = useState({
    fullName: user ? user.fullName :'',
    telephone: '',
    email: user?user.email :'',
    subject: '',
    body: '',
  });

  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const onInputChange = ({ target: { name, value } }) => {
  setVariables({
      ...variables,
      [name]: value,
  });
  setLoading(false);
  };

  const [createContact] = useMutation(CREATE_CONTACT, {
    update(
      proxy,
      {
        data
      },
    ) {
      toast.success(`${lang.t('Your message received successffuly!')}`);
      setLoading(false);
      return data ? history.push('/') : null;
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
    const {
      fullName,
      telephone,
      email,
      subject,
      body,
    } = variables;

    if (fullName.length < 4) {
      toast.error(
        `${lang.t('Full name must be atleast four characters!!')}`,
      );
    } else if (telephone.length < 9) {
      toast.error(
        `${lang.t(
          'Phone number must be atleast 9 digits!',
        )}`,
      );
    } else if (email.length < 1) {
      toast.error(
        `${lang.t(
          'Email is required!',
        )}`,
      );
    }else if (subject.length < 1) {
      toast.error(
        `${lang.t(
          'Subject is required!',
        )}`,
      );
    }else if (body.length < 1) {
      toast.error(
        `${lang.t(
          'Message body is required!',
        )}`,
      );
    } else {
      setLoading(true);
      createContact();
      setVariables({
        fullName: user ? user.fullName :'',
        telephone: '',
        email: user?user.email :'',
        subject: '',
        body: '',
    });
    }
  }


  return (
    <>
    <div className="column" id="column" style={{marginBottom: "80px"}}>
      <h2>Contact Information</h2>
      <div className="Separator"></div>
      {/* <p><b>{lang.t('Company')}:</b> Mudacumura Publishing House Ltd</p> */}
      <p><b>{lang.t('Address')}:</b> Kigali- Nyarugenge</p>
      <p><b>{lang.t('Road')}:</b> KN 132 ST, Kigali</p>
      <p><b>{lang.t('Website')}: </b><a href="https://vubarwanda.herokuapp.com" target="_blank" rel="noopener noreferrer"> VubaRwanda</a> </p>
      <p><b>{lang.t('Tel')}: </b><a href="tel:+250788863488"  target="_blank" rel="noopener noreferrer"> (+250) 788863488</a></p>
      <p><b>{lang.t('Email')}: </b><a href="mailto:dndahimana58@gmail.com"  target="_blank" rel="noopener noreferrer"> dndahimana58@gmail.com</a></p>

    </div>

  <div className="column" id="column" style={{marginBottom: "80px"}}>
    <h1>{lang.t('Contact Us?')}</h1>
    <h1>{lang.t('Contact Us Form')}</h1>
    <div className="Separator"></div>
    
      {
        errors &&(
            <div className="ui error message">
                <ul className="list">
                    {errors&&errors.map(value=>(<li key={value}>{value}</li>))}
                </ul>
            </div>
        )
      }
      <Form>
        <Form.Input 
          label={lang.t("FullName")}
          placeholder="Your Full Name"
          name="fullName"
          type="text"
          icon = "user"
          required
          value={variables.fullName}
          onChange= {onInputChange}
        />

        <Form.Input 
          label={lang.t("Telephone")}
          placeholder="Your Telephone"
          name="telephone"
          type="text"
          icon = "phone"
          required
          value={variables.telephone}
          onChange={onInputChange}
        />

        <Form.Input 
          label={lang.t("Email")}
          placeholder="Email"
          name="email"
          type="email"
          icon = "envelope"
          required
          value={variables.email}
          onChange={onInputChange}
        />

        <Form.Input 
          label={lang.t("Subject")}
          placeholder="subject"
          name="subject"
          type="text"
          icon = "pencil"
          required
          value={variables.subject}
          onChange={onInputChange}
        />

        <Form.TextArea 
          label={lang.t("Message")}
          placeholder="Type your message..."
          name="body"
          type="text"
          style={{ minHeight: 200 }}
          value={variables.body}
          onChange={onInputChange}
          required
        />

        <Button 
          type="submit" 
          id="Button"
          loading={loading}
          onClick={() => !loading && handleSubmit()}
        >
        <i className="send icon"></i> {lang.t('SUBMIT')}
        </Button>
      </Form>
    </div>
    </>
  );
};

export default withTranslation()(ContactUsForm);
