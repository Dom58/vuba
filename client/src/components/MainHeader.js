import React, { useContext } from 'react';
import { Menu, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react';
import { withTranslation } from 'react-i18next';
import Logo from '../assets/logo.png';
import { AuthContext } from '../context/auth';
// import SelectLanguage from '../common/SelectLanguage';
import lang from '../utils/translations';

function MainHeader(props) {
  
  // When the user scrolls the page, execute myFunction 
  
  // window.onscroll = function() { myFunction() };
  // const myFunction = () => {
  //   var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  //   var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  //   var scrolled = (winScroll / height) * 100;
  //   document.getElementById("myBar").style.width = scrolled + "%";
  // }

  
  const { user, logout } = useContext(AuthContext);
  const menuBar = (
    <div className="header1">

      {/* <div className="headerScroll" >
        <div className="progress-container">
          <div className="progress-bar" id="myBar"></div>
        </div>  
      </div> */}

      <div className="middle-header">
      <Menu
        secondary
        style={{
          marginRight: '30px',
        }}
      >
        <Menu.Item>
          <Link to="/">
            {' '}
            <Image
              src={Logo}
              size="tiny"
              className="logo-header"
            />{' '}
            {/* <Spinner /> */}
          </Link>
        </Menu.Item>

        {/* <Menu.Item>
          <div className="ui">
            <SelectLanguage />
          </div>
        </Menu.Item> */}

        <Menu.Menu position="right" id="right-auth">
          <Dropdown.Item>
            <Dropdown
              icon="sidebar"
              style={{
                fontSize: '20px',
                marginRight: '30px',
              }}
              id="dropdown-menu"
            >
              <Dropdown.Menu
                style={{
                  color: 'black',
                  backgroundColor: 'rgb(57, 83, 50)',
                  // border: '1px solid white',
                }}
              > 
            { !user ? (
              <>
              <Dropdown.Item>
                <Link
                to={{
                  pathname: '/auth/signup',
                  state: {
                    from: props.location
                      ? props.location.pathname
                      : '/',
                  },
                }}
                style={{ color: '#fff' }}
                id="sign-in"
              >
                <i className="plus circle icon"></i> {lang.t('Subscribe')}{' '}
              </Link>
              </Dropdown.Item>

              <Dropdown.Item>
              <Link
                to={{
                  pathname: '/auth/login',
                  state: {
                    from: props.location
                      ? props.location.pathname
                      : '/',
                  },
                }}
                style={{ color: '#fff' }}
                id="sign-in"
              >
                <i className="sign-in icon"></i> {lang.t('Login')}{' '}
              </Link>
              </Dropdown.Item>

              </>
            ) : ' '}

              { user ? (
                <>
                { user.role === "admin" ? (
                  <Dropdown.Item>
                    <Link
                      to={{
                        pathname: `/dashboard/ui/${user.email}`,
                        state: {
                          from: props.location
                            ? props.location.pathname
                            : '/',
                        },
                      }}
                      style={{ color: '#fff' }}
                      id="sign-in"
                    >
                    <i className="dashboard icon"></i> {lang.t('Dashboard')}{' '}
                    </Link>
                  </Dropdown.Item>
                  ) : ' '
                }

                  <Dropdown.Item
                    icon="sign-out"
                    text={lang.t('Logout')}
                    onClick={() => logout()}
                    id="logout"
                  />
                </>
                ) : (' ')
              }
              </Dropdown.Menu>
            </Dropdown>
          </Dropdown.Item>
        </Menu.Menu>
      </Menu>
      </div>
    </div>
  );

  return menuBar;
}

export default withTranslation()(MainHeader);
