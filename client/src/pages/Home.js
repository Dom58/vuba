import React from 'react';
import { Container, Divider  } from 'semantic-ui-react';
import { withTranslation } from 'react-i18next';
import 'react-notifications-component/dist/theme.css';
import lang from '../utils/translations';
import MainHeader from '../components/MainHeader';
import UnderHeader from '../components/UnderHeader';
import ProjectForm from '../components/ProjectForm';
import VubaRwandaDevs from '../components/VubaRwandaDevs';
import VubaRwandaTranslators from '../components/VubaRwandaTranslators';
import VubaRwandaDesigners from '../components/VubaRwandaDesigners';
import ContactUsForm from '../components/ContactUsForm';
import Footer from '../components/Footer';

function Home(props) {
  return (
    <>
      <MainHeader {...props} />
      <Container>
        <div className="about-us-div">

          <UnderHeader />
          
        </div>

      </Container>
        <Divider hidden/>
        <div style={{fontSize: "17px"}} className="project-div">
          <Container>
            <Divider hidden/>
              <div className="ui one column grid" id="three-columns" >
                  <div className="row">

                    <ProjectForm />
                    
                  </div>
              </div>
            </Container>
          </div>     

            <Divider hidden/>
            <Container >
              <h1 style={{fontSize: '35px'}}>{lang.t('vubaRwanda Developers')}</h1>
              <div className="Separator"></div>
              
              <div className="ui two column grid" id="three-columns" >
                <div className="row">
                  
                  <VubaRwandaDevs />

                </div>
              </div>

              <Divider hidden/>

              <h1 style={{fontSize: '35px'}}>{lang.t('vubaRwanda Translators')}</h1>
              <div className="Separator"></div>

              <div className="ui two column grid" id="three-columns" >
                <div className="row">

                  <VubaRwandaTranslators />

                </div>
              </div>


              <Divider hidden/>
              <h1 style={{fontSize: '35px'}}>{lang.t('vubaRwanda Mockup and Logo Designer')}</h1>
              
              <div className="Separator"></div>

              <div className="ui two column grid" id="three-columns" >
                <div className="row">
                  
                  <VubaRwandaDesigners />

                </div>
              </div>
            </Container>


        <Divider hidden/>
        <div style={{fontSize: "17px"}} className="contact-us-div">        
          <Container>
                <h1 id="contactVuba">{lang.t('Contact vubaRwanda Community')}</h1>
                <Divider hidden />
                <Divider />
                <div className="ui two column grid" id="three-columns" >
                    <div className="row">
                      
                      <ContactUsForm />

                    </div>
                </div>
              </Container>
            </div>
      {/* </Container> */}
      
      <br />
      <Footer />
    </>
  );
}

export default withTranslation()(Home);
