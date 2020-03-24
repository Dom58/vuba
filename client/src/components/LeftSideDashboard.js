import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { Divider, Icon, List } from 'semantic-ui-react';
import { AuthContext } from '../context/auth';

function LeftSideDashboard() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <List animated verticalAlign="middle">
        <List.Item>
          <List.Content>
            <List.Header>
              {' '}
              <Icon name="users" />
              <Link to={`/dashboard/ui/${user && user.email}`}>
                {' '}
                Users{' '}
              </Link>
            </List.Header>
          </List.Content>
        </List.Item>
        <Divider />

        <List.Item>
          <List.Content>
            <List.Header>
              {' '}
              <Icon name="balance scalear" />
              <Link to="/dashboard/all/projects"> Submitted projects</Link>
            </List.Header>
          </List.Content>
        </List.Item>
        <Divider />

        <List.Item>
          <List.Content>
            <List.Header>
              {' '}
              <Icon name="comments" />
              <Link to="/dashboard/all/feedback">
                {' '}
                View all feedback
              </Link>
            </List.Header>
          </List.Content>
        </List.Item>
        <Divider />
      </List>
    </>
  );
}

export default withTranslation()(LeftSideDashboard);
