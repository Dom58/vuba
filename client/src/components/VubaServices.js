import React from 'react';
import { withTranslation } from 'react-i18next';
import 'react-notifications-component/dist/theme.css';
import { Label, Image } from 'semantic-ui-react';
import LEARNING_PC from '../assets/learning.jpg';
import PHOTOGRAPHY_PC from '../assets/cameras.webp';
import DOMAIN_NAME_REGIATRATION_PC from '../assets/logoFooter.png';

const VubaService = () => {
  return (
    <>
    <div className="column" id="column" style={{marginBottom: "60px"}}>
      <div className="ui card" id="home-card">
        <div className="header">
          <h1 style={{padding: '10px'}}>Teaching How To Code Professional</h1>
        </div>

        <div className="image" >
          <Image src={ LEARNING_PC } alt="Learning Image" className="image-cover"/>
        </div>

        <div className="extra content">
          <p>Give Trainings in the following programming languages with their most common frameworks.</p>
          <Label.Group size='huge'>
            <Label>JavaScript</Label>
            <Label>PHP</Label>
            <Label>Python</Label>
            <Label>Android/IOs</Label>
            <Label>CSS/SCSS/SASS</Label>
            <Label>HTML5</Label>
            <Label>Database</Label>
          </Label.Group>
      </div>
      </div>
    </div>

    <div className="column" id="column" style={{marginBottom: "60px"}}>
      <div className="ui card" id="home-card">
        <div className="header">
          <h1 style={{padding: '10px'}}>Training in Designing and Photography</h1>
        </div>
        
        <div className="image" >
          <Image src={ PHOTOGRAPHY_PC } alt="Learning Image" className="image-cover"/>
        </div>

        <div className="extra content">
          <p>Give Trainings in the following domains</p>
          <Label.Group size='huge'>
            <Label>Web and Mobile Designing</Label>
            <Label>Illustration</Label>
            <Label>Photoshopping</Label>
            <Label>Photography</Label>
            {/* <br />
            <br /> */}
          </Label.Group>
      </div>
      </div>
    </div>

    <div className="column" id="column" style={{marginBottom: "60px"}}>
      <div className="ui card" id="home-card">
        <div className="header">
          <h1 style={{padding: '10px'}}>Web Hosting and Domain Name Registration</h1>
        </div>
        
        <div className="image" >
          <Image src={ DOMAIN_NAME_REGIATRATION_PC } alt="Learning Image" className="image-cover"/>
        </div>

        <div className="extra content">
          <p>Web hosting and Domain name registration</p>
          <Label.Group size='huge'>
            <Label>Web hosting</Label>
            <Label>Domain name registration</Label>
            <Label>Web deployment</Label>
            <br />
            <br />
          </Label.Group>
      </div>
      </div>
    </div>
    </>
  );
};

export default withTranslation()(VubaService);
