import React, { useContext, useState, useEffect } from 'react';
import {
  Divider,
  Grid,
  Icon,
  Table,
  Button,
  Form,
  Container,
  Accordion,
  Modal
} from 'semantic-ui-react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import moment from 'moment';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import displayError from '../helpers/displayError';
import { AuthContext } from '../context/auth';
import MainHeader from '../components/MainHeader';
import LeftSideDashboard from '../components/LeftSideDashboard';
import MainCardsOfDashboard from '../components/dashboardMainCards';
import OnTopOfDashboard from '../components/dashboardOnTopOfMainCards';
import lang from '../utils/translations';
import { searchInTableFunc } from '../helpers/searchInTable';
import Spinner from '../common/Spinner';
import {
  GET_CATEGORIES,
  GET_CATEGORY
} from '../graphql/queries/projectCategories';
import { 
  CREATE_PROJECT_CATEGORY,
  DELETE_CATEGORY,
  UPDATE_CATEGORY 
} from '../graphql/mutations/projectCategory';

export default function DashbardProjectCategory() {
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const [activeIndex, setActiveIndex] = useState(1);
  const [open, setOpen] = useState(false);
  const [openUpdating, setOpenUpdating ] = useState(false);
  const [variables, setVariables] = useState({
    name: '',
    description: '',
  });
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({ id: 0 });
  const [theId, setId] = useState(0)
  const [updateVariables, setUpdateVariables] = useState({
    id: values.id,
    name: '',
    description: '',
    createdAt: new Date(),
  });

  const close = () => {
    setOpen(false);
  }

  const onChangeHandle = ({ target: { name, value } }) => {
    setVariables({
      ...variables,
      [name]: value,
    });
  }

  const onChangeUpdateHandle = ({ target: { name, value } }) => {
    setUpdateVariables({
      ...updateVariables,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleClick = (e, titleProps) => {
		const { index } = titleProps;
		const newIndex = activeIndex === index ? -1 : index;
		setActiveIndex(newIndex);
	};

  const {
    data: { getProjectCategories: { data = [] } = {} } = {},
    theLoading,
    error,
  } = useQuery(GET_CATEGORIES);

  const {
    data: { getProjectCategory } = {},
    loading: loadingCategory,
    error: categoryError,
  } = useQuery(GET_CATEGORY , {
    variables: { id: theId },
  }) || {};

  const [createProjectCategory] = useMutation(CREATE_PROJECT_CATEGORY, {
    update(
      proxy,
      {
        data
      },
    ) {
      toast.success(`${lang.t('Project Category submitted successffuly!')}`);
      setLoading(false);
      return data ? history.push('/dashboard/all/project-categories') : null;
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
    refetchQueries: [{ query: GET_CATEGORIES }],
    awaitRefetchQueries: true
  });

  const [deleteProjectCategory, { loading: DeleteLoading }] = useMutation(
    DELETE_CATEGORY,
    {
      update(
        proxy,
        {
          data: {
            deleteProjectCategory: { message },
          },
        },
      ) {
        toast.success(`${lang.t(message)}`);
      },
      onError(err) {
        if (err.graphQLErrors.length > 0) {
          let onerr = err.graphQLErrors[0].message.split(',');
          setErrors(onerr);
        }
      },
      variables: { id: values.id },
      refetchQueries: [{ query: GET_CATEGORIES }],
      awaitRefetchQueries: true
    },
  );

  const [updateProjectCategory] = useMutation(UPDATE_CATEGORY, {
    update(proxy, { data }) {
      toast.success(
        `${lang.t('Category updated successfully!')}`,
      );
    },
    onError(err) {
      if (err) {
        const onerr = err.graphQLErrors[0].message.split(',');
        setErrors(onerr);
        displayError(err);
      }
      setOpenUpdating(false);
    },
    variables: {
      ...updateVariables,
      id: theId,
    },
    refetchQueries: [{ query: GET_CATEGORIES }],
    awaitRefetchQueries: true
  });

  useEffect(() => {
    if (getProjectCategory) {
			setUpdateVariables({
        name: getProjectCategory.name,
        description: getProjectCategory.description,
        createdAt: getProjectCategory.createdAt,
      });
		}
  }, [getProjectCategory]);

  const handleSubmit = async () => {
    const {
      name,
      description
    } = variables;

    if (name.length < 4) {
      toast.error(
        `${lang.t('Project category name must be atleast four characters!!')}`,
      );
    } else if (description === '') {
      toast.error(
        `${lang.t(
          'Project description is Required!',
        )}`,
      );
    } else {
      setLoading(true);
      createProjectCategory();
      setVariables({
        name: '',
        description: '',
    });
    }
  }

  const onClickDelete = (id) => {
    setOpen(true)
    setValues({ id: id });
  }

  const onDeleteHandler = () => {
    deleteProjectCategory();
    setOpen(false);
  }

  const onClickUpdate = (id) => {
    setOpenUpdating(true);
    setId(id);
  }

  const onUpdateHandler =() => {
    updateProjectCategory();
    setOpenUpdating(false);
  }

  if(errors) {
    console.log(errors);
    console.clear();
  }

  if (error) {
    return (
      <>
      <MainHeader />
        <Container>
          <div
            className="s-flex-center"
            style={{ flexDirection: 'column' }}
          >
            <h2 style={{ color: 'brown', textAlign: 'center' }}>
              <Icon name="info circle" /> {error && error.graphQLErrors[0].message}.
            </h2>
            <br />
          </div>
        </Container>
      </>
    );
  }

  return (
    <>
      <MainHeader />

        <Container>
          <div style={{fontSize: "17px"}} className="about-us-div">
            <Divider hidden />
            <OnTopOfDashboard />

            <MainCardsOfDashboard />

            <Grid>
              <Grid.Column
                mobile={4}
                tablet={4}
                computer={4}
                style={{ fontSize: '20px' }}
              >
                <Divider hidden />
                <h1>
                  <Icon name="linkify" /> Links
                </h1>
                <Divider hidden />

                <LeftSideDashboard />
              </Grid.Column>

              <Grid.Column mobile={12} tablet={12} computer={12}>
                <Divider hidden />
                 <Accordion style={{ float: 'right', padding: 5}}>
                    <Accordion.Title active={activeIndex === 0} index={0} onClick={handleClick}>
                      <Button>
                        <Icon name="add circle" /> {lang.t('Add New Project Category')}
                      </Button>
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 0} style={{ backgroundColor: 'white', padding: '10px', position: 'absolute',}}>
                      <Form>
                        <Form.Input 
                          placeholder="Category name..."
                          name="name"
                          type="text"
                          required
                          value={variables.name}
                          onChange={onChangeHandle}
                        />
                        <Form.Input
                          placeholder="Description..."
                          name="description"
                          type="text"
                          required
                          value={variables.description}
                          onChange={onChangeHandle}
                        />
                      </Form>
                      <br />
                      <Button primary loading={loading} onClick={() => !loading && handleSubmit()}>
                        <Icon name="add circle" /> {lang.t('SAVE CATEGORY')}
                      </Button>
                    </Accordion.Content>
                  </Accordion>
                  <Divider hidden/>
                <h1>
                  <Icon name="list" /> {lang.t('Project Categories')}
                </h1>
                 
                <Divider />

                <div>
                  <Form.Input
                    icon="search"
                    iconPosition="left"
                    placeholder="Search..."
                    id="searchInput"
                    onKeyUp={() => searchInTableFunc()}
                  />
                </div>
                <div className="table-responsive" id="tableContainer" style={{marginTop: 20}}>
                  <Table striped id="tableItems">
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>No.</Table.HeaderCell>
                        {/* <Table.HeaderCell>Profile</Table.HeaderCell> */}
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        {/* <Table.HeaderCell>Value</Table.HeaderCell> */}
                        <Table.HeaderCell>Description</Table.HeaderCell>              
                        <Table.HeaderCell>CreatedAt</Table.HeaderCell>                
                        <Table.HeaderCell>Options</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    
                      {!theLoading ? (
                        data &&
                        data.map((category, index) => (
                          <Table.Body>
                            <Table.Row key={index + 1}>
                              <Table.Cell>{index + 1}</Table.Cell>
                              <Table.Cell>{category.name}</Table.Cell>
                              {/* <Table.Cell>{category.value}</Table.Cell> */}
                              <Table.Cell>{category.description}</Table.Cell>
                              <Table.Cell>
                                {moment(category.createdAt).format('LL')}
                              </Table.Cell>
                              <Table.Cell>
                                {user && user.role === 'admin' ? (
                                  <>
                                  <Button
                                      primary
                                      icon="edit"
                                      title="Edit Category"
                                      style={{
                                        color: 'white',
                                      }}
                                      onClick={() => onClickUpdate(category.id)}
                                    />
                                    <Button
                                      icon="trash"
                                      title="Delete Project Category"
                                      style={{
                                        backgroundColor: 'brown',
                                        color: 'white',
                                      }}
                                      onClick={() => onClickDelete(category.id)}
                                    />
                                  </>
                                ) : (
                                  ' '
                                )}
                              </Table.Cell>
                            </Table.Row>
                            {
                              open && (
                                <Modal size="tiny" open={open} onClose={close}>
                                  <Modal.Header>Do you want to delete this category?</Modal.Header>
                                  <Modal.Content>
                                    <p style={{ color: "black" }}>
                                      <b style={{ color: "brown" }}>
                                          <i className="info circular icon"></i>
                                      </b>
                                      If you click on Delete Button, This category will be deleted permanently!
                                    </p>
                                  </Modal.Content>
                                  <Modal.Actions>
                                    {
                                      DeleteLoading ? <Spinner /> :
                                        (
                                          <>
                                            <button
                                              positive
                                              icon='trash'
                                              labelPosition='right'
                                              content='YES'
                                              onClick={onDeleteHandler}
                                              className= 'modelButton'
                                              style={{ backgroundColor: "#005ac2" }}
                                            >
                                              Yes
                                            </button>

                                            <button
                                              className= 'modelButton'
                                              onClick={() => setOpen(false)}
                                              style={{ backgroundColor: "gray" }}
                                            >
                                              No
                                            </button>
                                          </>
                                        )
                                    }
                                  </Modal.Actions>
                                </Modal>
                              )
                            }

                            {/* +++++++++++++++ Updating ++++++++++++ */}
                            { 
                              openUpdating && (
                                <Modal
                                  size="tiny"
                                  open={openUpdating}
                                  onClose={() => setOpenUpdating(false)}
                                  closeIcon
                                >
                                  <Modal.Header>
                                    UPDATE 
                                  </Modal.Header>
                                  {!loadingCategory && !categoryError ? (
                                    <>
                                      <Modal.Content
                                        style={{
                                          backgroundColor:
                                            '#f1eeee',
                                        }}
                                      >
                                        <div>
                                          <h5>Category Name: </h5>
                                          <input
                                            name="name"
                                            type="text"
                                            value={updateVariables.name}
                                            onChange={onChangeUpdateHandle}
                                          />

                                          <h5>Category Name: </h5>
                                          <input
                                            name="description"
                                            type="text"
                                            value={updateVariables.description}
                                            onChange={onChangeUpdateHandle}
                                          />

                                          <h5>CreatedAt: </h5>
                                          <input
                                            name="createdAt"
                                            type="date"
                                            value={updateVariables.createdAt}
                                            onChange={onChangeUpdateHandle}
                                          />
                                        </div>       
                                      </Modal.Content>
                                      <Modal.Actions>
                                        <button
                                          positive
                                          icon='trash'
                                          labelPosition='right'
                                          content='YES'
                                          onClick={onUpdateHandler}
                                          className= 'modelButton'
                                          style={{ backgroundColor: "#005ac2" }}
                                        >
                                          Update
                                        </button>

                                        <button
                                          className= 'modelButton'
                                          onClick={() => setOpenUpdating(false)}
                                          style={{ backgroundColor: "gray" }}
                                        >
                                          Cancel
                                        </button>
                                      </Modal.Actions>
                                    </>
                                  ): <Spinner />}
                                </Modal>
                              )
                            }
                          </Table.Body>
                        ))
                      ) : (
                        <Table.Body>
                          <Table.Row>
                            <Table.Cell className="loader-centered">
                              <Spinner />
                            </Table.Cell>
                          </Table.Row>
                        </Table.Body>
                      )}
                  </Table>
                </div>
                <Divider hidden />
              </Grid.Column>
          </Grid>
        </div>
      </Container>
    </>
  );
}
