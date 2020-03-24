import React from 'react';
import { withTranslation } from 'react-i18next';
import 'react-notifications-component/dist/theme.css';
import { Icon, Label, Image } from 'semantic-ui-react';
import SEBA_PROFILE_PC from '../assets/seba.png';

const VubaRwandaDesigners = () => {
  return (
    <>
    <div className="column" id="column" style={{marginBottom: "80px"}}>     
      <div className="ui card" id="home-card">
        <div className="image" >
            <Image src={ SEBA_PROFILE_PC } alt="car" className="image-cover"/>
        </div>

        <div className="content">
          <div className="header">Iradukunda Sebastien</div>
            <br />
            <Label className="dev-title"> Designer </Label>
            <h3 className="developer-role" > Mockup and Logo Designer </h3>
            <h3 className="website"> 
              <Icon name="globe" /> 
              <a href="/#seba"> Sebastien
              </a> 
            </h3>
        </div>

        <div className="extra content">
        <Label.Group size='large'>
          <Label> Adobe XD</Label>
          <Label> Figma</Label>
          <Label> Adobe PhotoShop</Label>
          <Label> Illustrator</Label>
          <Label> Adobe InDisign</Label>
        </Label.Group>
        </div>
      </div>
      
    </div>
    </>
  );
};

export default withTranslation()(VubaRwandaDesigners);
