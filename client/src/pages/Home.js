import React from 'react';
import { 
  Container,
  Divider,
} from 'semantic-ui-react';
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
import VubaServices from '../components/VubaServices';
import LatestProducts from '../components/LatestProducts';

function Home(props) {
  return (
    <>
    <MainHeader {...props} />
    
    <div id="test">
    <Container >
      <div className="about-us-div" >

        <UnderHeader />
        
      </div>
    </Container>
    </div>
    <Divider hidden/>

    <div style={{fontSize: "17px"}} className="project-services" id="project-services">
      <Container>
        <Divider hidden/>
                <div style={{marginBottom: 20, marginTop: 80}}>
                  <h1>{lang.t('Our Services')}</h1>
                  <div className="Separator"></div>
                </div>
          <div className="ui three column grid" id="three-columns" >
              
              <div className="row" >

                <VubaServices />
              </div>
          </div>          
      </Container>
    </div>

    <Divider hidden/>
    
    <div style={{fontSize: "17px"}} className="project-div">
      <Container>
        <Divider hidden/>
          <div className="ui one column grid" id="three-columns" >
              <div className="row">
                <div style={{marginBottom: 20, marginTop: 30}}>
                  <h1>{lang.t('Do you have some project that we can help you to develop?')}</h1>
                  <div className="Separator" style={{width: '100%'}}></div>
                </div>

                <ProjectForm />
                
              </div>
          </div>
      </Container>
    </div>     

    <Divider hidden/>
    <div style={{backgroundColor:'white', marginBottom: 20}}>
      <Container>
        <br />
        <h1 style={{fontSize: '35px', marginTop: 80}}>{lang.t('vubaRwanda Developers')}</h1>
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
    </div>

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

        <div className="ui one column grid" id="three-columns" >
          <div className="row">
            
          <h1>MAP</h1>
          <Divider />

            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d249.2169452236583!2d30.062541273210545!3d-1.9654278810742822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca5d71adcba55%3A0x83ba5b527bbefaec!2sKN%20132%20St%2C%20Kigali!5e0!3m2!1sen!2srw!4v1585996633448!5m2!1sen!2srw"
              style={{ width:"100%", height:"650px", frameborder:"0", border:"1px solid rgb(18, 49, 10)", allowfullscreen:"true"}} id="company-map" title="googlemap">
            </iframe>
          </div>
        </div>
      </Container>
    </div>

    <Divider hidden/>
    <div style={{backgroundColor:'white'}}>
      <Container>
        <div className="ui four column grid" id="three-columns" style={{marginTop: 80}}>
          <br />
          {/* <h1>Our Latest Products</h1> */}
          <div className="row" style={{marginTop: 20}}>
            <LatestProducts />
          </div>
        </div>
      </Container>
    </div>

    <br />
    <Footer />
    </>
  );
}

export default withTranslation()(Home);
