import React, { useContext } from 'react';
import {
  Divider,
  Grid,
  Icon,
  Table,
  Button,
  Form,
  Container,
  Popup,
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
  GET_PROGECTS,
} from '../graphql/queries/projects';

export default function Project() {
  const { user } = useContext(AuthContext);

  const headers = [
    { label: 'Client Name', key: 'fullName' },
    { label: 'Telephone Number', key: 'telephone' },
    { label: 'Email', key: 'email' },
    { label: 'Project Name', key: 'projectName' },
    { label: 'Company Name', key: 'companyName' },
    { label: 'Description', key: 'body' },
  ];

  const {
    data: { getProjects: { data = [] } = {} } = {},
    loading,
    error,
  } = useQuery(GET_PROGECTS);

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
                  <Icon name="balance scalear" /> {lang.t('Projects')}
                </h1>
                <Divider />
                <div>
                  <Form.Input
                    icon="balance scalear"
                    iconPosition="left"
                    placeholder="Search Project..."
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
                              '-vubaRwanda-submitted-Projects.csv'
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
                        <Table.HeaderCell>telephone</Table.HeaderCell>
                        <Table.HeaderCell>projectName</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>                
                        <Table.HeaderCell>CreatedAt</Table.HeaderCell>                
                        <Table.HeaderCell>Options</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {!loading ? (
                        data &&
                        data.map((project, index) => (
                          <Popup
                            trigger = {
                              <Table.Row key={index + 1}>
                              <Table.Cell>{index + 1}</Table.Cell>
                              <Table.Cell>{project.fullName}</Table.Cell>
                              <Table.Cell><a href={`mailto:${project.email}?subject=${project.projectName}+Received`}>{project.email}</a></Table.Cell>
                              <Table.Cell><a href={`tel:${project.telephone}`}> {project.telephone} </a></Table.Cell>
                              <Table.Cell>{project.projectName ? project.projectName.substr(0, 20)+'...': '-'}</Table.Cell>
                              <Table.Cell>{project.body? project.body.substr(0, 20)+'...': '-'}</Table.Cell>
                              <Table.Cell>
                                {moment(project.createdAt).format('LLL')}
                              </Table.Cell>
                              <Table.Cell>
                                {user && user.role === 'admin' ? (
                                  <>
                                    <Button
                                      icon="trash"
                                      title="Delete Prorject"
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
                          }

                          content = {
                            <>
                            <h3>{project.projectName}</h3>
                             <Divider />
                            <p>{project.body}</p>
                            </>
                          }
                          position='center center'
                        />
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
