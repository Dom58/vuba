import React, { useContext } from 'react';
import { Menu, Image, Dropdown, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';
import { AuthContext } from '../context/auth';
import { withTranslation } from 'react-i18next';

function Header() {
  const { user, logout } = useContext(AuthContext);
  return (
    <div className="header1">
      <Menu secondary>
        <Menu.Item>
          <Link to="/">
            {' '}
            <Image src={Logo} className="logo-header" id="logo-header"/>{' '}
          </Link>
        </Menu.Item>

        {/* <Menu.Item>
          <div className="ui">
            <SelectLanguage />
          </div>
        </Menu.Item> */}

        <div className="right menu">
          <Menu.Item>
            {user ? (
              <>
                <b>
                  <Dropdown
                    icon="sidebar"
                    style={{
                      fontSize: '20px',
                      marginRight: '30px',
                    }}
                    
                  >
                    <Dropdown.Menu
                      style={{
                        color: 'black',
                        backgroundColor: 'rgb(14, 17, 59)',
                        // border: '1px solid white',
                      }}
                    >
                      <Link
                        to={`/auth/profile/${user && user.username}`}
                      >
                        <Dropdown.Item icon="at" text={user.role} />
                      </Link>
                      <Divider />

                      <Link
                        to={`/dashboard/ui/${user && user.username}`}
                      >
                        {' '}
                        <Dropdown.Item icon="cogs" text="Dashboard" />
                      </Link>
                      <Divider />

                      <Link to="/create/new/expense">
                        {' '}
                        <Dropdown.Item
                          icon="add circle"
                          text="Insert new expense"
                        />
                      </Link>
                      <Divider />

                      <Dropdown.Item
                        icon="logout"
                        text="Logout"
                        onClick={() => logout()}
                        id="logout"
                      />
                      {/* <Divider /> */}
                    </Dropdown.Menu>
                  </Dropdown>
                </b>
              </>
            ) : (
              ''
            )}
          </Menu.Item>
        </div>
      </Menu>
    </div>
  );
}

export default withTranslation()(Header);
