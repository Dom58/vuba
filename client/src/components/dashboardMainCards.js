import React from 'react';
import { withTranslation } from 'react-i18next';
import { Grid, Icon, Label } from 'semantic-ui-react';
import { useQuery } from '@apollo/react-hooks';
import { GET_USERS } from '../graphql/queries/users';
import { GET_PROGECTS } from '../graphql/queries/projects';
import { GET_CONTACTS } from "../graphql/queries/contacts";
import Spinner from '../common/Spinner';

function MainCardsOfDashboard() {
  const {
    data: { users: { data = [] } = {} } = {},
    loading,
    error,
  } = useQuery(GET_USERS);

  const {
    data: { getProjects: { data: result = [] } = {} } = {},
    loading: spinning,
  } = useQuery(GET_PROGECTS);

  const {
    data: { getContacts: { data: response = [] } = {} } = {},
    loading: loadingContacts,
  } = useQuery(GET_CONTACTS);
  

  if (error) {
    return (
      <>
        <div className="container">
          <div
            className="s-flex-center"
            style={{ flexDirection: 'column' }}
          >
            <h2 style={{ color: 'brown' }}>
              {error.graphQLErrors[0].message}.
            </h2>
            <br />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Grid>
        <Grid.Column mobile={16} tablet={5} computer={5}>
          <div className="ui card">
            <div className="content">
              <Label
                as="a"
                color="blue"
                ribbon
                style={{ fontSize: '18px' }}
              >
                <Icon name="users" /> Users
              </Label>
              <div className="header" style={{ fontSize: '60px' }}>
                {!loading ? data.length : <Spinner />}
              </div>
              <div className="description">
                <p> VubaRwanda Users</p>
              </div>
            </div>
          </div>
        </Grid.Column>

        <Grid.Column mobile={16} tablet={5} computer={5}>
          <div className="ui card">
            <div className="content">
              <Label
                as="a"
                color="green"
                ribbon
                style={{ fontSize: '18px' }}
              >
                <Icon name="car" /> Projects
              </Label>
              <div className="header" style={{ fontSize: '60px' }}>
                {!spinning ? result.length : <Spinner />}
              </div>
              <div className="description">
                Projects Submitted
              </div>
            </div>
          </div>
        </Grid.Column>

        <Grid.Column mobile={16} tablet={6} computer={6}>
          <div className="ui card">
            <div className="content">
              <Label
                as="a"
                color="brown"
                ribbon
                style={{ fontSize: '18px' }}
              >
                <Icon name="car" /> Feedback
              </Label>
              <div className="header" style={{ fontSize: '60px' }}>
                {!loadingContacts ? response.length : <Spinner />}
              </div>
              <div className="description">
                Feedback Submitted
              </div>
            </div>
          </div>
        </Grid.Column>
      </Grid>
    </>
  );
}

export default withTranslation()(MainCardsOfDashboard);
