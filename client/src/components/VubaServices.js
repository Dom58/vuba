import React from 'react';
import { withTranslation } from 'react-i18next';
import 'react-notifications-component/dist/theme.css';
import { Label, Image } from 'semantic-ui-react';
import PROGRAM from '../assets/program.png';
import LEARNING_PC from '../assets/learning.jpg';
import PHOTOGRAPHY_PC from '../assets/cameras.webp';
import DOMAIN_NAME_REGIATRATION_PC from '../assets/logoFooter.png';


const VubaService = () => {
  return (
    <>
    <div className="column" id="column" style={{marginBottom: "60px"}}>
      <div className="ui card" id="home-card">
        <div className="header">
          <h2 style={{padding: '10px'}}>
            Applications Development
          (Web, Desktop and Mobile)
          </h2>
        </div>

        <div className="image">
          <Image src={ PROGRAM } alt="Learning Image" className="image-cover" />
        </div>

        <div className="extra content">
          <p>Developing the world class applications which are specific in UI/UX and by respecting the client needs.</p>
          <Label.Group>
            <Label>Web Development</Label>
            <Label>Mobile Development</Label>
            <Label>Desktop Applications</Label>
            <Label>Software Updates</Label>
            <Label>Secure Existing Applications</Label>
            <Label>APIs Development</Label>
          </Label.Group>
        </div>
      </div>
    </div>

    <div className="column" id="column" style={{marginBottom: "60px"}}>
      <div className="ui card" id="home-card">
        <div className="header">
          <h2 style={{padding: '10px'}}>Web Hosting & Domain Name Registration</h2>
        </div>
        
        <div className="image" >
          <Image src={ DOMAIN_NAME_REGIATRATION_PC } alt="Learning Image" className="image-cover"/>
        </div>

        <div className="extra content">
          <p>Web hosting and Domain name registration</p>
          <Label.Group>
            <Label>Web Hosting</Label>
            <Label>Domain Name Registration</Label>
            <Label>Web Deployment</Label>
            <br />
            <br />
          </Label.Group>
      </div>
      </div>
    </div>

    <div className="column" id="column" style={{marginBottom: "60px"}}>
      <div className="ui card" id="home-card">
        <div className="header">
          <h2 style={{padding: '10px'}}>Teaching How To Code Professional</h2>
        </div>

        <div className="image" >
          <Image src={ LEARNING_PC } alt="Learning Image" className="image-cover"/>
        </div>

        <div className="extra content">
          <p>Give Trainings in the following programming languages with the most common frameworks in it.</p>
          <Label.Group>
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
          <h2 style={{padding: '10px'}}>Photography, Film Making and Designing</h2>
        </div>
        
        <div className="image" >
          <Image src={ PHOTOGRAPHY_PC } alt="Learning Image" className="image-cover"/>
        </div>

        <div className="extra content">
          <p>Give Trainings in the following domains</p>
          <Label.Group>
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
    </>
  );
};

export default withTranslation()(VubaService);
