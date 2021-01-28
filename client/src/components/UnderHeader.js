import React from 'react';
import { Icon } from 'semantic-ui-react';
import { withTranslation } from 'react-i18next';
import 'react-notifications-component/dist/theme.css';
import lang from '../utils/translations';

const UnderHeader = () => {
  return (
    <>
      <h1>Who are we?</h1>
      <div className="Separator"></div>
      <p>VubaRwanda Community started with Five (5) members, Two (2) programmers,  One (1) Designer and Two(2) Translators. 
        <br />
        We are willing to develop world class applications for different companies and associations 
        by developping their web applications, android applications, IOs applications and desktop applications at lower price.
      </p>

      <h1>{lang.t('Our Core Values')} </h1>
      <div className="Separator"></div>

      <div className="timeline">
        <div className="containerTimeline left">
          <div className="contentTimeline">
            <h2>Time is Money</h2>
            <p>Delivering clients' applications on time.</p>
          </div>
        </div>
        <div className="containerTimeline right">
          <div className="contentTimeline">
            <h2><Icon name="arrow right" /> Client is our King</h2>
            <p>We consider our clients as kings. To let them explaining their ideas and we put those ideas into actions by developping a world class applications using the modern technologies.
            </p>
          </div>
        </div>
        <div className="containerTimeline left">
          <div className="contentTimeline">
            <h2>Money comes last</h2>
            <p>For us money couldn't come first. The first thing is to hear our client and respect what he/she says. <br />
              After analysing what he/she said we make those ideas into action at lower price.
            </p>
          </div>
        </div>
        <div className="containerTimeline right">
          <div className="contentTimeline">
            <h2><Icon name="arrow right" /> Availability</h2>
            <p>We work for 24/7. Means that we can not joke with time! 
              Every second we are here for our clients to give support to them.
            </p>
          </div>
        </div>
        <div className="containerTimeline left">
          <div className="contentTimeline">
            <h2>Up-to-date</h2>
            <p> For us a new technology in term of programming we are ready to implement any project using it.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default withTranslation()(UnderHeader);
