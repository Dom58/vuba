import React from 'react';
import { withTranslation } from 'react-i18next';
import 'react-notifications-component/dist/theme.css';
import { Icon, Label, Image } from 'semantic-ui-react';
import DOM_PROFILE_PC from '../assets/dom58.jpg';
import AUDACE_PROFILE_PC from '../assets/audace.jpg';
// import KAGAME_PROFILE_PC from '../assets/kagame.jpeg';

const VubaRwandaDevs = () => {
  return (
    <>
    <div className="column" id="column" style={{marginBottom: "80px"}}>
      <div className="ui card" id="home-card">
        <div className="image" >
            <Image src={DOM_PROFILE_PC} alt="car" className="image-cover"/>
        </div>

        <div className="content">
          <div className="header">Ndahimana Dominique Xavier</div>
            <br />
            <Label className="dev-title">Founder & CEO</Label>
            <h3 className="developer-role" > Full-Stack Developer </h3>
            <h3 className="website"> 
              <Icon name="globe" /> 
              <a href="https://dom58.github.io/dom58.me"> Dom58 </a> &nbsp; | &nbsp;

              <Icon name="phone" /> 
              <a href="tel:+250788863488"> +250788863488 </a> 
            </h3>
        </div>

        <div className="extra content">
        <Label.Group size='large'>
          <Label>Nodejs</Label>
          <Label>ReactJs</Label>
          <Label>React Native</Label>
          <Label>JavaScript</Label>
          <Label>Postgres</Label>                        
          <Label>MySQL</Label>
          <Label>CSS/SCSS</Label>
          <Label>ExpressJs</Label>
          <Label>Redux</Label>
          <Label>TDD</Label>
          <Label>HTML5</Label>
          <Label>GraphQL</Label>
          <Label>MongoDB</Label>
          <Label>NPM</Label>
          <Label>PHP/Laravel</Label>
          <Label>Android / IOs</Label>
        </Label.Group>
        </div>
      </div>
      
    </div>

    <div className="column" id="column" style={{marginBottom: "80px"}}>
      <div className="ui card" id="home-card">
        <div className="image" >
            <Image src={ AUDACE_PROFILE_PC } alt="car" className="image-cover"/>
        </div>

        <div className="content">
          <div className="header">Uhiriwe Audace</div>
            <br />
            <Label className="dev-title">Contributor</Label>
            <h3 className="developer-role"> Full-Stack Developer </h3>
            <h3 className="website"> 
              <Icon name="globe" /> 
              <a href="/#audace"> Audace
              </a> 
            </h3>
        </div>

        <div className="extra content">
          <Label.Group size='large'>
            <Label>Nodejs</Label>
            <Label>ReactJs</Label>
            <Label>JavaScript</Label>
            <Label>React Native</Label>
            <Label>Postgres</Label>                          
            <Label>ExpressJs</Label>
            <Label>CSS/SCSS</Label>
            <Label>HTML5</Label>
            <Label>GraphQL</Label>
            <Label>MongoDB</Label>
            <Label>AngularJs</Label>
            <Label>VueJs</Label>
            <Label>Docker</Label>
            <Label>Redux</Label>
            <Label>VueX</Label>
            <Label>TDD</Label>
          </Label.Group>
        </div>
      </div>      
    </div>


    {/* <div className="column" id="column" style={{marginBottom: "80px"}}>
      <div className="ui card" id="home-card">
        <div className="image" >
            <Image src={ KAGAME_PROFILE_PC } alt="car" className="image-cover"/>
        </div>

        <div className="content">
          <div className="header">Kagame Alex</div>
            <br />
            <Label className="dev-title">Co-Founder</Label>
            <h3 className="developer-role"> Full-Stack Developer </h3>
            <h3 className="website"> 
              <Icon name="globe" /> 
              <a href="/#"> Alex
              </a> 
            </h3>
        </div>

        <div className="extra content">
          <Label.Group size='large'>
            <Label>Nodejs</Label>
            <Label>ReactJs</Label>
            <Label>JavaScript</Label>                       
            <Label>MySQL</Label>
            <Label>CSS/SCSS</Label>
            <Label>HTML5</Label>
            <Label>NPM</Label>
            <Label>PHP/Laravel</Label>
          </Label.Group>
        </div>
      </div>      
    </div> */}
    </>
  );
};

export default withTranslation()(VubaRwandaDevs);
