import React, {useContext, useState} from 'react';
import { Form, Button, Divider, Icon } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import { withTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import 'react-notifications-component/dist/theme.css';
import lang from '../utils/translations';
import { AuthContext } from '../context/auth';
import displayError from '../helpers/displayError';
import { SUBMIT_PROJECT } from '../graphql/mutations/projectSubmitions';

const ProjectForm = () => {
  const history = useHistory();
  const {user} = useContext(AuthContext);
  const [variables, setVariables] = useState({
    fullName: user ? user.fullName :'',
    telephone: '',
    email: user?user.email :'',
    projectName: '',
    companyName: '',
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

  const [createProject] = useMutation(SUBMIT_PROJECT, {
    update(
      proxy,
      {
        data
      },
    ) {
      toast.success(`${lang.t('Project details submited successffuly!')}`);
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
    }else if (body.length < 1) {
      toast.error(
        `${lang.t(
          'Project description is required!',
        )}`,
      );
    } else {
      setLoading(true);
      createProject();
      setVariables({
        fullName: user ? user.fullName :'',
        telephone: '',
        email: user?user.email :'',
        projectName: '',
        companyName: '',
        body: '',
    });
    }
  }

  return (
    <>
    <div className="column" id="project-column" style={{marginBottom: "80px"}}>
      <div className="project-form">
      <h1>{lang.t('Do you have a project that we can help you to develop?')}</h1>
      <Divider />
      <h1>{lang.t('Fill This Form')}</h1>
      
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
        <p>{lang.t("FullName")}</p>
        <Form.Input 
          placeholder="Your FullName"
          name="fullName"
          type="text"
          icon = "user"
          required
          value={variables.fullName}
          onChange={onInputChange}
        />
        
        <p>{lang.t("Telephone")}</p>
        <Form.Input
          placeholder="Your Telephone"
          name="telephone"
          type="text"
          icon = "phone"
          required
          value={variables.telephone}
          onChange={onInputChange}
        />

        <p>{lang.t("Email")}</p>
        <Form.Input 
          placeholder="Email"
          name="email"
          type="email"
          icon = "envelope"
          required
          value={variables.email}
          onChange={onInputChange}
        />

        <p>{lang.t("Company Name")}</p>
        <Form.Input 
          placeholder="Company Name"
          name="companyName"
          type="text"
          icon = "home"
          value={variables.companyName}
          onChange={onInputChange}
        />

        <p>{lang.t("Project Name")}</p>
        <Form.Input 
          placeholder="Project Name"
          name="projectName"
          type="text"
          icon = "edit"
          required
          value={variables.projectName}
          onChange={onInputChange}
        />

        <p>{lang.t("Description")}</p>
        <Form.TextArea 
          placeholder="Describe your project..."
          name="body"
          type="text"
          style={{ minHeight: 300 }}
          value={variables.body}
          onChange={onInputChange}
        />
        <Icon name="info circle" style= {{color: 'brown'}}/>
        <i className="p-warning"> When you shared with us your project with all required information filled,  
        we call you directly inorder to know how we will going to implement your project and we keep your idea from the third part.</i>

        <Button 
          type="submit" 
          id="button"
          loading={loading}
          onClick={() => !loading && handleSubmit()}
          >
          <i className="send icon"></i> {lang.t('Submit Project')}
        </Button>
      </Form>
      </div>
    </div>
    </>
  );
};

export default withTranslation()(ProjectForm);
