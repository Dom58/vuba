import React, { useContext } from 'react';
import {
  Divider,
  Grid,
  Icon,
  Table,
  Button,
  Form,
  Container,
} from 'semantic-ui-react';
import { useQuery } from '@apollo/react-hooks';
import moment from 'moment';
import { CSVLink } from 'react-csv';
import { AuthContext } from '../context/auth';
import MainHeader from '../components/MainHeader';
import LeftSideDashboard from '../components/LeftSideDashboard';
import MainCardsOfDashboard from '../components/dashboardMainCards';
import OnTopOfDashboard from '../components/dashboardOnTopOfMainCards';
import lang from '../utils/translations';
import { searchInTableFunc } from '../helpers/searchInTable';
import SaveAsButtons from '../components/SaveAsButtons';
import Spinner from '../common/Spinner';
import {
  GET_USERS,
} from '../graphql/queries/users';

export default function Dashboard() {
  const { user: userRole } = useContext(AuthContext);

  const headers = [
    { label: 'Full Name', key: 'fullName' },
    { label: 'Email', key: 'email' },
    { label: 'Role', key: 'role' },
    { label: 'Date Joined', key: 'createdAt' },
  ];

  const {
    data: { users: { data = [] } = {} } = {},
    loading,
    error,
  } = useQuery(GET_USERS);

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
              <Icon name="info circle" /> {error.graphQLErrors[0].message}.
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
                <h1>
                  <Icon name="users" /> {lang.t('Users')}
                </h1>
                <Divider />
                <div>
                  <Form.Input
                    icon="users"
                    iconPosition="left"
                    placeholder="Search users..."
                    id="searchInput"
                    onKeyUp={() => searchInTableFunc()}
                  />

                  <div className="saveAsDocButton">
                    <SaveAsButtons />

                    <span className="export">
                      {!loading ? (
                        <>
                          <CSVLink
                            data={data}
                            headers={headers}
                            filename={
                              moment(new Date()).format('LLLL') +
                              '-vubaRwanda-users.csv'
                            }
                          >
                            <Button
                              content="Save All as CSV"
                              icon="download"
                              style={{
                                backgroundColor: '#2573ad',
                                color: 'white',
                              }}
                            />
                          </CSVLink>
                        </>
                      ) : (
                        ' '
                      )}
                    </span>
                  </div>
                </div>
                <div className="table-responsive" id="tableContainer">
                  <Table striped id="tableItems">
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>No.</Table.HeaderCell>
                        {/* <Table.HeaderCell>Profile</Table.HeaderCell> */}
                        <Table.HeaderCell>Full Name</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>Role</Table.HeaderCell>
                        <Table.HeaderCell>Date Joined</Table.HeaderCell>
                        <Table.HeaderCell>Options</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {!loading ? (
                        data &&
                        data.map((user, index) => (
                          <Table.Row key={index + 1}>
                            <Table.Cell>{index + 1}</Table.Cell>
                            <Table.Cell>{user.fullName}</Table.Cell>
                            <Table.Cell>{user.email}</Table.Cell>
                            <Table.Cell>{user.role}</Table.Cell>
                            <Table.Cell>
                              {moment(user.createdAt).format('LL')}
                            </Table.Cell>
                            <Table.Cell>
                              {userRole && userRole.role === 'admin' ? (
                                <>
                                  <Button
                                    icon="edit"
                                    positive
                                    title= {'Change role of '+user.username}
                                    // onClick={() =>
                                    //   openEditUserModel(
                                    //     user.id,
                                    //     user.email,
                                    //   )
                                    // }
                                    key={user.id}
                                  />
                                   <br />
                                  <br />
                                  <Button
                                    icon="trash"
                                    title="Delete User"
                                    style={{
                                      backgroundColor: 'brown',
                                      color: 'white',
                                    }}
                                  />
                                </>
                              ) : (
                                ' '
                              )}
                            </Table.Cell>
                          </Table.Row>
                        ))
                      ) : (
                        <Table.Row>
                          <Table.Cell className="loader-centered">
                            <Spinner />
                          </Table.Cell>
                        </Table.Row>
                      )}
                    </Table.Body>
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
