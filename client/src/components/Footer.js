import React from 'react';
import { Menu, Divider, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logoFooter.png';
// import FooterSelectLanguage from '../common/FooterSelectLanguage';

export default function Footer() {
  return (
    <div className="footer">
      <Link to="/">
        {' '}
        <Image
          src={Logo}
          size="small"
          className="logo-footer"
          title="vubaRwanda"
        />{' '}
        {/* <Spinner /> */}
      </Link>
      <Divider />
      {/* <input type="text" placeholder="Subscriber..."/>  */}
      <Menu secondary>
        <Menu.Menu>
          <div
            // style={{ color: '#d6cece', marginLeft: '20px' }}
            id="copyright"
          >
            &copy; 2019 - {new Date().getFullYear()} vubaRwanda Community. &nbsp;&nbsp; All Rights Reserved.
          </div>
        </Menu.Menu>

        <Menu.Menu position="right">
          <div className="termsPrivacy">
            <Link to="/#privacy">Privacy</Link> <span style={{color: 'black'}}>|</span> 
            <Link to="/#terms">Terms and Conditions</Link>
          </div>
        </Menu.Menu>
      </Menu>
    </div>
  );
}
