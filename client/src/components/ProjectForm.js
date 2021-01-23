import React, {useContext, useState} from 'react';
import { Form, Button, Icon } from 'semantic-ui-react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { withTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import 'react-notifications-component/dist/theme.css';
import lang from '../utils/translations';
import { AuthContext } from '../context/auth';
import displayError from '../helpers/displayError';
import { SUBMIT_PROJECT } from '../graphql/mutations/projectSubmitions';
import {
  GET_CATEGORIES,
} from '../graphql/queries/projectCategories';

// import SUBMIT_PROJECT_IMAGE from '../assets/submit.png';

const ProjectForm = () => {
  const history = useHistory();
  const {user} = useContext(AuthContext);
  const [variables, setVariables] = useState({
    fullName: user ? user.fullName :'',
    telephone: '',
    email: user?user.email :'',
    projectName: '',
    category_id: 0,
    companyName: '',
    companyAddress: '',
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
    variables: {
       ...variables,
       category_id: parseInt(variables.category_id),
     },
  });


  const {
    data: { getProjectCategories: { data = [] } = {} } = {},
    // loading,
    // error,
  } = useQuery(GET_CATEGORIES);

  const handleSubmit = async () => {
    const {
      fullName,
      telephone,
      email,
      body,
      category_id,
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
    }else if (category_id === 0) {
      toast.error(
        `${lang.t(
          'Project Category is Required!',
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
    {/* <div className="column" id="project-column" style={{marginBottom: "80px"}}>
      <div className=""> 
        <div className="image" style={{marginTop: "10px"}}>
          <Image src={ SUBMIT_PROJECT_IMAGE } alt="car" className="image-submit-project"/>
        </div>
      </div>
    </div> */}

    <div className="column" id="project-column" style={{marginBottom: "80px"}}>
      <div className="project-form">
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

        <p>{lang.t("Project Category")}</p>
        <select className="ui fluid multiple selection dropdown" name="category_id" onChange={onInputChange}>
          <option value='0'>Select project category...</option>
          { data && data
            .map((category, i) => (
              <option key={i} value={category.id}>{category.name} {' '} ({category.description})</option>
            ))
          }
            {/* <option value={ProfileData.getOneUserProfile.role}>{ProfileData.getOneUserProfile.role}</option> */}
        </select>

        <p>{lang.t("Company Name")}</p>
        <Form.Input 
          placeholder="Company Name"
          name="companyName"
          type="text"
          icon = "home"
          value={variables.companyName}
          onChange={onInputChange}
        />

        <p>{lang.t("Company Address")}</p>
        <Form.Input 
          placeholder="Eg: Kigali/Nyarugenge/Biryogo or KN 512 ST"
          name="companyAddress"
          type="text"
          icon = "globe"
          value={variables.companyAddress}
          onChange={onInputChange}
        />

        <p>{lang.t("Description")}</p>
        <Form.TextArea 
          placeholder="Tell us more about your project..."
          name="body"
          type="text"
          // style={{ minHeight: 500 }}
          value={variables.body}
          onChange={onInputChange}
          id="inputTextArea"
        />
        <Icon name="info circle" style= {{color: 'brown'}}/>
        <i className="p-warning">
          When you share your project with us,  
          automatically we call you inorder to know how we will going to develop your project and we keep your idea from the third part.
          <a href="/#" style={{marginLeft: 5}}>View our terms and conditions</a>.
        </i>

        <Button 
          type="submit" 
          id="button"
          loading={loading}
          onClick={() => !loading && handleSubmit()}
          >
          <i className="send icon"></i> {lang.t('SUBMIT PROJECT')}
        </Button>
      </Form>
      </div>
    </div>
    </>
  );
};

export default withTranslation()(ProjectForm);
