import React from 'react';
import { withTranslation } from 'react-i18next';
import 'react-notifications-component/dist/theme.css';
import { Icon, Label, Image } from 'semantic-ui-react';
import NOELLA_PROFILE_PC from '../assets/noella.jpg';
import DAMAS_PROFILE_PC from '../assets/dams.jpg';

const VubaRwandaTranslators = () => {
  return (
    <>
    
    <div className="column" id="column" style={{marginBottom: "80px"}}> 
      <div className="ui card" id="home-card">
        <div className="image" >
            <Image src={ NOELLA_PROFILE_PC } alt="car" className="image-cover-devs"/>
        </div>

        <div className="content">
          <div className="header">Kanyamuneza Marie Noella</div>
            <br />
            <Label className="dev-title"> Translator </Label>
            <h3 className="developer-role" > French & Kirundi Translator</h3>
            <h3 className="website"> 
              <Icon name="globe" /> 
              <a href="/#noella"> Noella
              </a> 
            </h3>
        </div>

        <div className="extra content">
        <Label.Group>
          {/* <Label>IOs</Label> */}
        </Label.Group>
        </div>
      </div>
      
    </div>

    <div className="column" id="column" style={{marginBottom: "80px"}}>
      <div className="ui card" id="home-card">
        <div className="image" >
            <Image src={ DAMAS_PROFILE_PC } alt="car" className="image-cover-devs"/>
        </div>

        <div className="content">
          <div className="header">Ntihinyurwa Damas</div>
            <br />
            <Label className="dev-title">Translator</Label>
            <h3 className="developer-role"> Swahili Translator </h3>
            <h3 className="website"> 
              <Icon name="globe" /> 
              <a href="/#damas"> Damas
              </a> 
            </h3>
        </div>

        <div className="extra content">
          <Label.Group>
            {/* <Label>IOs</Label> */}
          </Label.Group>
        </div>
      </div>      
    </div>
    </>
  );
};

export default withTranslation()(VubaRwandaTranslators);
