import React from 'react';
// import {Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { Divider, Icon } from 'semantic-ui-react';

function OnTopOfDashboard() {

  return (
    <>
    <h1>
        <Icon name="dashboard" /> Dashboard
        {/* <Link to="/create/new/stock" style={{ float: 'right' }}>
            <Icon name="add circle" /> Create a New Car
        </Link> */}
    </h1>
    <Divider hidden />
    </>
  );
}

export default withTranslation()(OnTopOfDashboard);
